require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const authRouts = require("./routs/auth");
const port = process.env.PORT || 5000;
const app = express();

//middleware
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

//verifyToken
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

//mobile-fs
// IQcdR6SUCKK5ACC9

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.jq7qb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const db = client.db("MFS");
    const userCollection = db.collection("user");
    const totalBalanceCollection = db.collection("total-balance");
    const transactionCollection = db.collection("transaction");

    //verifyAdmin  middleware
    const verifyAdmin = async (req, res, next) => {
      const email = req.user?.email;
      const query = { email };
      const result = await userCollection.findOne(query);
      if (!result || result?.role !== "admin") {
        return res
          .status(403)
          .send({ message: "Forbidden Access Admin Only Actions" });
      }

      next();
    };

    //register
    app.post("/sign-up", async (req, res) => {
      const { email, name, nidNumber, mobileNumber, role, pin } = req.body;

      const existingUser = await userCollection.findOne({
        $or: [{ mobileNumber }, { email }, { nidNumber }],
      });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }

      //has pin
      const hasPin = await bcrypt.hash(pin, 10);

      //set initial balance
      const initialBalance = role === "agent" ? 100000 : 40;

      const newUser = {
        email,
        name,
        nidNumber,
        mobileNumber,
        role,
        pin: hasPin,
        balance: initialBalance,
        isApproved: role === "agent" ? false : true,
      };
      await userCollection.insertOne(newUser);
      res.status(201).json({ message: "Registration successful!" });
    });

    //login
    app.post("/login", async (req, res) => {
      const { mobileNumber, pin } = req.body;
      console.log(mobileNumber, pin);
      const user = await userCollection.findOne({ mobileNumber });
      if (!user) {
        return res.status(400).json({ message: "User Not Found" });
      }
      // PIN validate
      const isMatch = await bcrypt.compare(pin, user.pin);
      if (!isMatch) return res.status(400).json({ message: "Invalid PIN!" });
      const token = jwt.sign(
        { userId: user._id, role: user.accountType },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "365d" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ token, message: "Login successful!" });
    });

    //send user
    app.get("/me", verifyToken, async (req, res) => {
      res.json(req.user); // Send user info if the token is valid
    });

    // Generate jwt token
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
      } catch (err) {
        res.status(500).send(err);
      }
    });

    //save user in db
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user?.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        res.send({
          message: "User Already in exist",
          insertedId: null,
        });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    //send money
    app.post("/send-money", verifyToken, async (req, res) => {
      const { recipientPhone, amount } = req.body;
      const { userId } = req.user;

      // Minimum amount check
      if (amount < 50) {
        return res.status(400).json({ message: "Minimum amount is 50 BDT" });
      }

      // Find sender and recipient
      const sender = await userCollection.findOne({
        _id: new ObjectId(userId),
      });
      const recipient = await userCollection.findOne({
        mobileNumber: recipientPhone,
      });

      if (!recipient) {
        return res.status(400).json({ message: "Recipient not found" });
      }
      if (sender.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      // Calculate the fee (5 BDT if amount > 100)
      const fee = amount > 100 ? 5 : 0;

      // Deduct from sender, add to recipient
      await userCollection.updateOne(
        { _id: sender._id },
        { $inc: { balance: -amount - fee } }
      );
      await userCollection.updateOne(
        { _id: recipient._id },
        { $inc: { balance: amount } }
      );

      // Add fee to admin (assuming admin has a specific userId)
      const admin = await userCollection.findOne({ role: "admin" });
      await userCollection.updateOne(
        { _id: admin._id },
        { $inc: { balance: fee } }
      );

      // Update total system balance
      const systemStats = await totalBalanceCollection.findOne({
        _id: "totalMoney",
      });
      const newTotalBalance = systemStats.totalBalance + amount + fee;

      await totalBalanceCollection.updateOne(
        { _id: "totalMoney" },
        { $set: { totalBalance: newTotalBalance } }
      );

      res.json({
        message: `Sent ${amount} BDT to ${recipientPhone}, Fee: ${fee} BDT`,
      });
    });

    // cash out
    app.post("/cash-out", verifyToken, async (req, res) => {
      const { agentPhone, amount, pin } = req.body;
      const { userId } = req.user;

      // Minimum cash-out amount check
      if (amount < 100) {
        return res
          .status(400)
          .json({ message: "Minimum cash-out amount is 100 BDT" });
      }

      // Find user and agent
      const user = await userCollection.findOne({ _id: new ObjectId(userId) });
      const agent = await userCollection.findOne({
        mobileNumber: agentPhone,
        role: "agent",
        isApproved: true,
      });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      if (!agent) {
        return res
          .status(400)
          .json({ message: "Agent not found or not approved" });
      }

      // PIN validation
      const isPinValid = await bcrypt.compare(pin, user.pin);
      if (!isPinValid) {
        return res.status(400).json({ message: "Invalid PIN!" });
      }

      // Check user balance
      const fee = amount * 0.015; // 1.5% fee
      const totalDeduction = amount + fee;
      if (user.balance < totalDeduction) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      // Calculate agent & admin income
      const agentIncome = amount * 0.01; // 1% to agent
      const adminIncome = amount * 0.005; // 0.5% to admin

      // Deduct from user
      await userCollection.updateOne(
        { _id: user._id },
        { $inc: { balance: -totalDeduction } }
      );

      // Add amount to agent
      await userCollection.updateOne(
        { _id: agent._id },
        { $inc: { balance: amount + agentIncome } }
      );

      // Update admin income
      const admin = await userCollection.findOne({ role: "admin" });
      await userCollection.updateOne(
        { _id: admin._id },
        { $inc: { balance: adminIncome } }
      );

      // Update total system balance
      const systemStats = await totalBalanceCollection.findOne({
        _id: "totalMoney",
      });
      const newTotalBalance = systemStats.totalBalance - amount;
      await totalBalanceCollection.updateOne(
        { _id: "totalMoney" },
        { $set: { totalBalance: newTotalBalance } }
      );

      // Insert transaction into transactionCollection
      const transaction = {
        type: "Cash-Out",
        userId: user._id,
        userName: user.name,
        userPhone: user.mobileNumber,
        agentId: agent._id,
        agentName: agent.name,
        agentPhone: agent.mobileNumber,
        amount: amount,
        fee: fee,
        agentIncome: agentIncome,
        adminIncome: adminIncome,
        timestamp: new Date(),
      };

      await transactionCollection.insertOne(transaction);

      res.json({
        message: `Cash-out successful! Withdrawn: ${amount} BDT, Fee: ${fee} BDT`,
      });
    });

    // cash-in // agent route and agentVerify
    app.post("/cash-in", verifyToken, async (req, res) => {
      const { userPhone, amount, agentPin } = req.body;
      const { userId } = req.user; // The authenticated agent

      // Minimum cash-in amount check (optional, can adjust as needed)
      if (amount < 100) {
        return res
          .status(400)
          .json({ message: "Minimum cash-in amount is 100 BDT" });
      }

      // Find the user by phone number
      const user = await userCollection.findOne({ mobileNumber: userPhone });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Find the agent by userId (the agent is the currently authenticated user)
      const agent = await userCollection.findOne({
        _id: new ObjectId(userId),
        role: "agent",
        isApproved: true,
      });

      if (!agent) {
        return res
          .status(400)
          .json({ message: "Agent not found or not approved" });
      }

      // Validate the agent's PIN
      const isPinValid = await bcrypt.compare(agentPin, agent.pin);
      if (!isPinValid) {
        return res.status(400).json({ message: "Invalid Agent PIN!" });
      }

      // Update the user's balance
      await userCollection.updateOne(
        { _id: user._id },
        { $inc: { balance: amount } }
      );

      // Update the total system balance
      const systemStats = await totalBalanceCollection.findOne({
        _id: "totalMoney",
      });
      const newTotalBalance = systemStats.totalBalance + amount;
      await totalBalanceCollection.updateOne(
        { _id: "totalMoney" },
        { $set: { totalBalance: newTotalBalance } }
      );

      // Insert the transaction into the transactionCollection
      const transaction = {
        type: "Cash-In",
        userId: user._id,
        userName: user.name,
        userPhone: user.mobileNumber,
        agentId: agent._id,
        agentName: agent.name,
        agentPhone: agent.mobileNumber,
        amount: amount,
        timestamp: new Date(),
      };

      await transactionCollection.insertOne(transaction);

      // Send a notification or response
      res.json({
        message: `Cash-in successful! Amount: ${amount} BDT has been credited to the user's account.`,
      });
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("mobile FS is running");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

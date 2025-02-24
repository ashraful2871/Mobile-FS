require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
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

const { MongoClient, ServerApiVersion } = require("mongodb");
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
      //   console.log(amount);
      if (amount < 10) {
        return res.status(400).json({ message: "Minimum amount is 10 BDT" });
      }
      //   console.log(req.user.email);
      const sender = await userCollection.findOne({ email: req.user.email });
      //   console.log(sender);
      const recipient = await userCollection.findOne({
        mobileNumber: recipientPhone,
      });
      //   console.log(recipient);
      if (!recipient) {
        return res.status(400).json({ message: "Recipient not found" });
      }
      if (sender.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      // // Deduct from sender, add to recipient
      await userCollection.updateOne(
        { _id: sender._id },
        { $inc: { balance: parseInt(-amount) } }
      );

      await userCollection.updateOne(
        { _id: recipient._id },
        { $inc: { balance: parseInt(amount) } }
      );

      res.json({ message: `Sent ${amount} BDT to ${recipientPhone}` });
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

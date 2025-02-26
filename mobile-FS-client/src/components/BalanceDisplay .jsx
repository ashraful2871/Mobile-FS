import { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const BalanceDisplay = ({ balance }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Determine balance text based on role
  let balanceText = "";
  if (balance.role === "admin") {
    balanceText = `${balance.balance} BDT (Income) | Total: ${balance.balance} BDT`;
  } else {
    balanceText = `${balance.balance} BDT`;
  }

  return (
    <div
      className="flex items-center gap-2 text-2xl font-semibold cursor-pointer"
      onClick={() => setIsVisible(!isVisible)}
    >
      <span>
        <TbCurrencyTaka />
      </span>
      <span>{isVisible ? balanceText : "*****"}</span>
      <span>
        {isVisible ? (
          <AiOutlineEyeInvisible className="text-gray-500" />
        ) : (
          <AiOutlineEye className="text-gray-500" />
        )}
      </span>
    </div>
  );
};

export default BalanceDisplay;

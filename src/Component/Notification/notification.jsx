import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { MdError } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GoX } from "react-icons/go";
import "./notification.css";
import { CloudMoonRain } from "lucide-react";
const Notification = ({ type = "info", message, onClose = () => {} }) => {
  const iconStyle = {
    fontSize: "20px",
    color: "#fff9f9",
    marginRight: "15px",
  };

  const icons = {
    info: <FaCircleInfo style={iconStyle} />,
    warning: <IoIosWarning style={iconStyle} />,
    error: <MdError style={iconStyle} />,
    success: <AiOutlineCheckCircle style={iconStyle} />,
  };

  return (
    <>
      <div className={`notification ${type}`}>
        {/*Icons*/}
        {icons[type]}

        {/*Message*/}
        <p>{message}</p>
        {/*close button*/}
        <GoX onClick={onClose} className="close-btn" />
        {/* <div className="notification-bottom-loader"></div> */}
      </div>
      
    </>
  );
};

export default Notification;

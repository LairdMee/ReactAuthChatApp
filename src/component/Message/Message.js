import React, { useState } from "react";
import { format } from "date-fns";
import { useAuth } from "../../providers/AuthProvider";
import "./Message.css";

const Message = ({ text, createdTime, userId, username }) => {
  const [showTime, setShowTime] = useState(false);
  const { user } = useAuth();
  const isMyMessage = user.id === userId;
  const mouseEnterHandler = () => {
    // should display the time when hovering on the message
    setShowTime(true);
  };

  const mouseLeaveHandler = () => {
    // should hide the time when not hovering on the message
    setShowTime(false);
  };
  // your message should be blue and on the right hand side
  // another user's message should be grey on the left hand side
  return (
    <div className={`message ${isMyMessage ? "self" : "other"}`}>
      {!isMyMessage && <div className="message-username">{username}</div>}
      <div
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        className={`bubble ${isMyMessage ? "text-self" : "text-other"}`}
      >
        {text}
      </div>
      {showTime && (
        <div
          className={`createdTime ${
            isMyMessage ? "createdTime-self" : "createdTime-other"
          }`}
        >
          {format(createdTime.toDate(), "HH:mm aaaa")}
        </div>
      )}
    </div>
  );
};

export default Message;

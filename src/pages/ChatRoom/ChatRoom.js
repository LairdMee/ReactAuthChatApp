import React, { useEffect, useState } from "react";
import Message from "../../component/Message/Message";
import { sendMessage, listenOnMessages } from "../../firebase";
import { useAuth } from "../../providers/AuthProvider";
import "./ChatRoom.css";

const tempMessages = [
  {
    text: "hello",
    createdTime: new Date(),
    user: {
      username: "Morgan",
      userId: "1",
    },
    messageId: "100",
  },
  {
    text: "whats up?",
    createdTime: new Date(),
    user: {
      username: "Alex",
      userId: "2",
    },
    messageId: "101",
  },
  {
    text: "Nothing much, how was your trip?",
    createdTime: new Date(),
    user: {
      username: "Morgan",
      userId: "1",
    },
    messageId: "102",
  },
  {
    text: "My trip was excellent",
    createdTime: new Date(),
    user: {
      username: "Megan",
      userId: "3",
    },
    messageId: "103",
  },
];

const ChatRoom = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const sendHandler = async () => {
    // create a document on firestore for the new message
    await sendMessage(message, user.id, user.username);
    setMessage("");
  };

  useEffect(() => {
    const unsubscribe = listenOnMessages(setMessages);
    return unsubscribe; // when unmounting, it will be called
  }, []);

  return (
    <div className="chat-container">
      <section className="chat-messages">
        {messages.map((m) => (
          <Message
            key={m.messageId}
            text={m.text}
            userId={m.user.userId}
            username={m.user.username}
            createdTime={m.createdTime}
          />
        ))}
      </section>
      <section className="chat-input-area">
        <input
          className="chat-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendHandler}>send</button>
      </section>
    </div>
  );
};

export default ChatRoom;

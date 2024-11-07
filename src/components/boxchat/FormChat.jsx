// Import Modules
import React, { useRef } from "react";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/formChat.module.css";

// Import Icons
import { IoIosSend } from "react-icons/io";

export default function FormChat({ messages, onGetSendMessage }) {
  // Create + use Hooks
  const messageClientRef = useRef();

  // Create + use event handles
  const sendMessageHandle = async () => {
    const valueMessage = messageClientRef.current.value;
    if (valueMessage.length === 0) return false;

    try {
      const res = await APIServer.message.send(messages.roomID, valueMessage);
      if (res.status === 200) {
        const { messages } = res.data;
        onGetSendMessage(messages);

        // If admin chat /end => Leave room
        if (messages.length === 0) {
          const { messages, rooms } = res.data;
          onGetSendMessage(messages, rooms);
          localStorage.removeItem("room_current_id");
        }
        messageClientRef.current.value = "";
      }
    } catch (error) {
      console.log(error);

      const { data } = error.response;
      alert(data.message);
    }
  };

  return (
    <div className={classes["form-chat"]}>
      <div className={classes["form-chat-section"]}>
        {messages.value.map((message) => (
          <div
            className={
              message.sender === "admin"
                ? classes["media-chat-admin"]
                : classes["media-chat-client"]
            }
            key={message._id}
          >
            <div
              className={
                message.sender === "admin"
                  ? classes["message-admin"]
                  : classes["message-client"]
              }
            >
              <span
                className={
                  message.sender === "admin"
                    ? classes["messsage-admin-name"]
                    : classes["messsage-client-name"]
                }
              >
                {message.sender === "admin" ? "ADMIN" : "YOU:"}
              </span>
              <span
                className={
                  message.sender === "admin"
                    ? classes["messsage-admin-content"]
                    : classes["messsage-client-content"]
                }
              >
                {message.content}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={classes["form-chat-footer"]}>
        <input
          type="text"
          placeholder="Enter Message!"
          ref={messageClientRef}
        />
        <IoIosSend
          className={classes["icon-send-text"]}
          onClick={sendMessageHandle}
        />
      </div>
    </div>
  );
}

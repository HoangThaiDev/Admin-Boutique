// Import Modules
import React, { useEffect, useState } from "react";
import { getSocket } from "../../utils/socket";
import { useSelector } from "react-redux";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Components
import Rooms from "./Rooms";
import FormChat from "./FormChat";
import APIServer from "../../API/customAPI";

export default function Layout() {
  // Create + use socketIO
  const socket = getSocket();

  // Create + use States
  const user = useSelector((state) => state.user);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState({ roomID: "", value: [] });

  const roomID = localStorage.getItem("room_current_id") || null;

  // Side Effects
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await APIServer.chatRoom.getRooms();
        if (res.status === 200) {
          setRooms(res.data);
        }
      } catch (error) {
        const { data } = error.response;
        alert(data.message);
      }
    };

    if (user.isLoggedIn) {
      fetchRooms();
    }
  }, [user]);

  useEffect(() => {
    const fetchRoomById = async () => {
      try {
        const res = await APIServer.message.get(roomID);
        if (res.status === 200) {
          const { messages, chatRoomId } = res.data;

          setMessages((prevState) => ({
            ...prevState,
            roomID: chatRoomId,
            value: messages,
          }));
        }
      } catch (error) {
        const { data } = error.response;
        alert(data.message);
      }
    };
    if (user.isLoggedIn && roomID) {
      fetchRoomById();
    }
  }, [user]);

  // Use socket method
  socket.on("Server:createNewRoom", (rooms) => {
    setRooms(rooms);
  });

  socket.on("Server:clientSendMessage", (messages) => {
    const roomID = localStorage.getItem("room_current_id");

    if (roomID) {
      setMessages((prevState) => ({
        ...prevState,
        roomID: roomID,
        value: messages,
      }));
    }
  });

  socket.on("Server:clientEndChat", (data) => {
    const { rooms } = data;
    localStorage.removeItem("room_current_id");
    setMessages({
      roomID: "",
      value: [],
    });
    setRooms(rooms);
    alert("Client was end chat!");
  });

  socket.on("Server:adminJoinRoom", (data) => {
    const { messages: messageID, rooms, adminID } = data;

    if (user.accessToken === adminID) {
      localStorage.setItem("room_current_id", messageID.chatRoomId);
      // Update States
      setRooms(rooms);
      setMessages((prevState) => ({
        ...prevState,
        roomID: messageID.chatRoomId,
        value: messageID.messages,
      }));
    }
  });

  // Create + use event Handles
  const getSendMessageHandle = (messages, rooms) => {
    if (messages.length === 0) {
      localStorage.removeItem("room_current_id");
      setMessages({
        roomID: "",
        value: [],
      });
      setRooms(rooms);
      return false;
    }

    const roomID = localStorage.getItem("room_current_id");
    setMessages((prevState) => ({
      ...prevState,
      roomID: roomID,
      value: messages,
    }));
  };

  return (
    <div className={classes["box-chat"]}>
      <div className={classes["box-chat-container"]}>
        <h3>Admin / Box Chat</h3>

        <div className={classes["box-chat-row"]}>
          <div
            className={`${classes["box-chat-col"]} ${classes["box-chat-rooms"]}`}
          >
            <Rooms user={user} rooms={rooms} />
          </div>
          <div
            className={`${classes["box-chat-col"]} ${classes["box-chat-form-chat"]}`}
          >
            <FormChat
              messages={messages}
              onGetSendMessage={getSendMessageHandle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

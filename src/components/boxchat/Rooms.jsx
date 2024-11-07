// Import Modules
import React from "react";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/rooms.module.css";

// Import Icons
import { FaRegUserCircle } from "react-icons/fa";

export default function Rooms({ user, rooms }) {
  // Create + use events
  const joinRoomHandle = async (room) => {
    const isPermission =
      user.role !== "client"
        ? true
        : alert("You need permission to use LiveChat!");

    if (isPermission) {
      try {
        const res = await APIServer.chatRoom.joinRoom(
          room._id,
          user.accessToken
        );
        if (res.status === 200) return;
      } catch (error) {
        const { data } = error.response;
        alert(data.message);
      }
    }
  };

  return (
    <div className={classes["rooms"]}>
      <div className={classes["form-search"]}>
        <input type="text" placeholder="Search Contact" />
      </div>
      <div className={classes["rooms_list"]}>
        {rooms.length > 0 &&
          rooms.map((room) => (
            <div
              className={
                room.roomStatus === "full"
                  ? `${classes["room"]} ${classes["room-full"]} `
                  : classes["room"]
              }
              key={room._id}
              onClick={() => joinRoomHandle(room)}
            >
              <FaRegUserCircle className={classes["room-client-avatar"]} />
              <p className={classes["room-client-id"]}>{room.clientID}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

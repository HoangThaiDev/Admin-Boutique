import { io } from "socket.io-client";
import { API_ROOT } from "./constants";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(API_ROOT, {
      withCredentials: true,
      transports: ["websocket"],
    });
  }
  return socket;
};

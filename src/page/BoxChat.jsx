// Import Modules
import React from "react";
import { getSocket } from "../utils/socket";

// Import Components
import Layout from "../components/boxchat/Layout";

export default function BoxChat() {
  // Create + use Socket
  const socket = getSocket();

  return (
    <>
      <Layout socket={socket} />
    </>
  );
}

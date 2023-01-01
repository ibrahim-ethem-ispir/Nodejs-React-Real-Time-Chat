import "./App.css";
import React, { useState } from "react";
import Room from "./components/Room";
import Chat from "./components/Chat";
import socketio from "socket.io-client";

const socketUrl = "http://localhost:5000";
const socket = socketio.connect(socketUrl);

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [screen, setScreen] = useState(false);

  return (
    <div className="App">
      {screen ? (
        <Chat socket={socket} username={username} room={room} />
      ) : (
        <Room
          socket={socket}
          setScreen={setScreen}
          username={username}
          room={room}
          setUsername={setUsername}
          setRoom={setRoom}
        />
      )}
    </div>
  );
}

export default App;

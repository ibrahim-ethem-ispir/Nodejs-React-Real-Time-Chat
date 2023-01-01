import React from "react";

const Room = ({ room, setRoom, username, setUsername, socket, setScreen }) => {
  const sendRoom = () => {
    socket.emit("room", room);
    setScreen(true)
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[400px] pt-14 bg-[#f1f5f9] space-y-4 p-3">
        <h1 className="font-bold">Hoş Geldiniz</h1>
        <input
          className="h-12 rounded-xl p-3 outline-none"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="Username"
        />
        <input
          className="h-12 rounded-xl p-3 outline-none"
          onChange={(e) => setRoom(e.target.value)}
          value={room}
          type="text"
          placeholder="Room"
        />
        <br />
        <button
          type="button"
          onClick={sendRoom}
          className="hover:opacity-60 border h-9 text-3 text-center text-white bg-red-600 rounded-xl w-2/3"
        >
          Chat !!!
        </button>
      </div>
    </div>
  );
};

export default Room;

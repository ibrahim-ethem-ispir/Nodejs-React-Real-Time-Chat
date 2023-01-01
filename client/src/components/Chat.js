import React, { useState, useEffect } from "react";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    const payload = {
      message: message,
      room,
      username,
      date:
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
    };
    await socket.emit("message", payload);
    setMessageList((prev) => [...prev, payload]);
    setMessage("");
  };

  console.log("message", messageList);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[500px] bg-[#f1f5f9] relative">
        <div className="w-full h-16 bg-[#334155] flex items-center">
          <div className="w-12 h-12 bg-[#f1f5f9] rounded-full"></div>
        </div>

        <div className={` w-full h-[400px] overflow-y-auto pb-4`}>
          {messageList &&
            messageList.map((item) => (
              <>
                <div
                  className={` flex  m-3 ${
                    username === item.username ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`w-2/3 h-auto  text-white text-sm m-2 rounded-xl rounded-br-none ${
                      username === item.username
                        ? "bg-[#e11d48]"
                        : "bg-green-600"
                    } p-2 text-start`}
                  >
                    <div>{item.message}</div>
                    <div className="w-full text-[.7rem] text-end">
                      {item.username} <br /> {item.date}
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>

        <div className="absolute bottom-0 left-0 p-3 w-full">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-3/4 h-12 border outline-none p-3"
            type="text"
            placeholder="Mesaj Gönder"
          />
          <button
            onClick={sendMessage}
            className="w-1/4 h-12  bg-[#dc2626] hover:bg-[#fecaca] hover:text-black text-white"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

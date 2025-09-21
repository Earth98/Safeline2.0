import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

export const AdminChat = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const connect = new HubConnectionBuilder()
        .withUrl(`${window.location.origin}/safeLine`) // backend URL
      .build();

    connect.start().then(() => {
      console.log("Connected to SafeLine chatHub");
      connect.on("ReceiveMessage", (user, message) => {
        setMessages((prev) => [...prev, { user, message }]);
      });
    });
    setConnection(connect);
  }, []);

  const sendMessage = async () => {
    if (connection && input) {
      await connection.invoke("SendMessage", "SafeLine Admin", input);
      setInput("");
    }
  };

  return (
    <div>
      <h2>SafeLine Chat</h2>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>
            <b>{m.user}</b>: {m.message}
          </li>
        ))}
      </ul>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
export const ChannelChat = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [channel, setChannel] = useState({
    Joined: false,
    Name: "",
    UserName: ""
  });

  useEffect(() => {
    const connect = new HubConnectionBuilder()
        .withUrl(`${window.location.origin}/safeLine`) // backend URL
      .build();

    connect.start().then(() => {
      console.log("Connected to SafeLine chatHub");
      connect.on("ReceiveMessage", (user, message) => {
        setMessages((prev) => [...prev, { user, message }]);
      });
    });
    console.log("Chat connection established", connect);
    setConnection(connect);
  }, []);

  const sendMessage = async () => {
    if (connection && input) {
      await connection.invoke("SendMessageToChannel", channel.Name, channel.UserName, input);
      setInput("");
    }
  };
  const joinChannel = async () => {
    if (connection && channel.Name) {
      await connection.invoke("JoinChannel", channel.Name);
      setChannel(prev => ({ ...prev, Joined: true }));
    }
  };
  const leaveChannel = async () => {
    if (connection && channel.Name) {
      await connection.invoke("LeaveChannel", channel.Name);
      setChannel({ Joined: false, Name: "", UserName: "" });
      setMessages([]);
    }
  };

  return (
    <div>
      <h2>SafeLine Created Channel</h2>
      {channel.Joined ? 
        <>
          <div>Joined Channel: {channel.Name}</div>
          <ul>
            {messages.map((m, i) => (
              <li key={i}>
                <b>{m.user}</b>: {m.message}
              </li>
            ))}
          </ul>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
          <button onClick={leaveChannel}>Leave Channel</button>
        </>
        :
        <>
          <div>
            Channel Name
            <br />
            <input
              value={channel.Name}
              onChange={(e) => setChannel(prev => ({ ...prev, Name: e.target.value.toLocaleLowerCase() }))}
              placeholder="Channel Name"
            />
            <br />
            <input
              value={channel.UserName}
              onChange={(e) => setChannel(prev => ({ ...prev, UserName: e.target.value }))}
              placeholder="User Name"
            />
            {channel.Name.length > 0 && channel.UserName.length > 0 && <button onClick={joinChannel}>join Channel</button>}
          </div>
        </>
      }
    </div>
  );
}

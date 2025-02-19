import React, { useEffect, useState } from "react";
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
import { NavLink, Outlet } from "react-router-dom";
import { slugify } from "../functions/slugify";
import '../index.css';


interface Chat {
  chatId: string;
  title: string;
  messages: any[];
  metadata: any;
}

const Sidebar = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState<string>('');

  useEffect(() => {
    const fetchChats = async () => {
      fetch("http://192.168.11.79:8000/get-chats")
      .then((response) => response.json())
      .then((data) => {
        setChats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setTimeout(fetchChats, 5000);
      });
    };
    fetchChats();
  }, []);

  console.log(selectedChat);

  if (loading) return <Dots />

  return (
    <div className="chatContainer">
      <div className="sidebar">
        <div className="chatList">
          {chats.map((chat) => (
            <button
              key={chat.chatId}
              className={`chatRow ${selectedChat === chat.chatId ? 'selectedChatRow' : ''}`}
              onClick={() => (selectedChat === chat.chatId) ? setSelectedChat('') : setSelectedChat(chat.chatId)}>
              {chat.title}
            </button>
          ))
          }
        </div>
        <NavLink className="bigButton" to={`/chats/${selectedChat}`}>
          <text style={{fontSize: 20}}>{selectedChat === '' ? 'New Chat' : 'Continue'}</text>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Sidebar;
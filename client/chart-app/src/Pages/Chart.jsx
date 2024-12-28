import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contacts from "./Contacts";
import { API, HOST } from "../utility/APIutility";
import { toast } from "react-toastify";
import Welcome from "./Welcome";
import ChartContainer from "./ChartContainer";
import { io } from "socket.io-client";
const toastOptions = {
  autoClose: 800,
  pauseOnHover: true,
  position: "bottom-right",
};
export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedChat, setSelectedChat] = useState(null);
  const socket = useRef();
  const fetchContacts = async (id) => {
    try {
      const { data } = await axios.get(API + `/contacts/${id}`);
      setContacts(data.allUser);
    } catch (err) {
      toast.error(err);
    }
  };
  const handleChat = (chat) => {
    setSelectedChat(chat);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else {
      setCurrentUser(user);
      fetchContacts(user._id);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(HOST);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            userName={currentUser.name}
            avatarImage={currentUser.avatarImage}
            handleChat={handleChat}
          />
          {!selectedChat ? (
            <Welcome />
          ) : (
            <ChartContainer
              chatReciever={selectedChat}
              from={currentUser._id}
              socket={socket}
            />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

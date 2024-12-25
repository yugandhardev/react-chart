import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChartInput";
import Logout from "./Logout";
import styled from "styled-components";
import axios from "axios";
import { API } from "../utility/APIutility";

const ChartContainer = ({ chatReciever, from, socket }) => {
  const [allMessages, setAllMessages] = useState();
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const sendMessage = async (message) => {
    try {
      socket.current.emit("send-msg", {
        to: chatReciever._id,
        from: from,
        message,
      });
      const { data } = await axios.post(API + "/message/addMessage", {
        to: chatReciever._id,
        from: from,
        message,
      });
      const messages = [...allMessages];
      messages.push({ sentMesg: true, message: message });
      setAllMessages(messages);
    } catch (error) {
      console.log(error);
    }
  };
  const loadMessages = async () => {
    try {
      const data = await axios.post(API + "/message/getMessages", {
        to: chatReciever._id,
        from,
      });
      if (data.status) {
        setAllMessages(data.data.mapMessages);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (chatReciever) {
      loadMessages();
    }
  }, [chatReciever]);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg);
        setArrivalMessage({ sentMesg: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setAllMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${chatReciever.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{chatReciever.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {allMessages?.map((message, index) => {
          return (
            <div key={index} ref={scrollRef}>
              <div
                className={`message ${
                  message.sentMesg ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={sendMessage} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChartContainer;

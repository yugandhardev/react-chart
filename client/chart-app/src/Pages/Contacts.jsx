import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/moving.png";
export default function Contacts({
  contacts,
  userName,
  avatarImage,
  handleChat,
}) {
  const handleSelectedChat = (c) => {
    handleChat(c);
  };
  return (
    <>
      <Container>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h4>snappy</h4>
        </div>
        <div className="contacts">
          {contacts?.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className="contact"
                onClick={() => handleSelectedChat(contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact?.avatarImage}`}
                    alt="avatr"
                  />
                </div>
                <div className="username">
                  <h4>{contact.name}</h4>
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h4>{userName}</h4>
          </div>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h4 {
      color: white;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.1rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h4 {
          color: white;
        }
      }
    }

    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h4 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h4 {
          font-size: 1rem;
        }
      }
    }
  }
`;

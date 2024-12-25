import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import { styled } from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import loader from "../assets/loading.gif";
import { API } from "../utility/APIutility";
import { Navigate, useNavigate } from "react-router-dom";
const Avatar = () => {
  const [avatars, setAvatars] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const avatarImageApi = "https://api.multiavatar.com/";
  const toastOptions = {
    autoClose: 800,
    pauseOnHover: true,
    position: "bottom-right",
  };
  const navigate = useNavigate();
  //   const fetchAvatars = async () => {
  //     const data = [];
  //     for (let i = 0; i < 4; i++) {
  //       const image = await axios.get(
  //         `${avatarImageApi}` + Math.round(Math.random() * 10000)
  //       );
  //       const buffer = new Buffer(image.data).toString("base64");
  //       data.push(buffer);
  //     }
  //     setAvatar(data);
  //     setLoading(false);
  //   };
  //   const fetchAvatars = async () => {
  //     try {
  //       setIsLoading(true);
  //       const promise = Array.from({ length: 4 }, async () => {
  //         const image = await axios.get(
  //           `${avatarImageApi}` + Math.round(Math.random() * 10000)
  //         );
  //         return Buffer.from(image.data).toString("base64");
  //       });
  //       const newAvatars = await Promise.all(promise); // Wait for all promises to resolve
  //       setAvatars((prevAvatars) => [...(prevAvatars || []), ...newAvatars]);
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  const fetchAvatars = async () => {
    try {
      setIsLoading(true);
      const promises = [...Array(4)].map(async () => {
        const randomNumber = Math.round(Math.random() * 10000);
        const image = await axios.get(`${avatarImageApi}${randomNumber}`);
        return Buffer.from(image.data).toString("base64");
      });
      const newAvatars = await Promise.all(promises); // Wait for all promises to resolve
      setAvatars(newAvatars); // Replace with new avatars
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching avatars:", err);
      setIsLoading(false);
    }
  };
  const setProfile = async () => {
    if (selectedAvatar === undefined || selectedAvatar === null) {
      toast.error("Select profile first", toastOptions);
    } else {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const { data } = await axios.post(`${API}/setAvatar/${user._id}`, {
          image: avatars[selectedAvatar],
        });
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("user"));
    if (!local) {
      navigate("/login");
    }
    if (local && local?.isAvatarImageSet) {
      navigate("/");
    } else {
      fetchAvatars();
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h4>Pick an Avatar as your profile picture</h4>
          </div>
          <div className="avatars">
            {avatars?.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="submit-btn"
            onClick={setProfile}
            // disabled={selectedAvatar === ""}
          >
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h4 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
export default Avatar;

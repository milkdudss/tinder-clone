import React from "react";
import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import ChatContainer from '../components/ChatContainer';
import axios from 'axios';


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(['user']);

  // Get request user data responses are pulled from Mongdb database
  const userId = cookies.UserId
  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId }
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  console.log('user', user);

  const db = [
    {
      name: "Richard Hendricks",
      url: "https://imgur.com/MWAcQRM.jpg",
    },
    {
      name: "Erlich Bachman",
      url: "https://imgur.com/Q9WPlWA.jpg",
    },
    {
      name: "Monica Hall",
      url: "https://imgur.com/OckVkRo.jpg",
    },
    {
      name: "Mary Dunn",
      url: "https://imgur.com/wDmRJPc.jpg",
    },
    {
      name: "Dinesh Chugtai",
      url: "https://imgur.com/Lnt9K7l.jpg",
    },
  ];

  const characters = db;
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };
  return (
    <>
    { user && 
    <div className="dashboard">
      <ChatContainer user={user} />
      <div className="swipe-container">
        <div className="card-container">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card">
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
          </div>
        </div>
      </div>
    </div>}</>
  );
};

export default Dashboard;

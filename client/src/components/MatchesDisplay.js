import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const MatchesDisplay = ({matches}) => {

    const [matchedProfiles, setMatchedProfiles] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(null);
  
    const matchedUserIds = matches.map(({ user_id }) => user_id);
    const userId = cookies.UserId;

    const getMatches = async () => {
        try {
          const response = await axios.get("http://localhost:8000/users", {
            params: { userIds: JSON.stringify(matchedUserIds) },
          });
          setMatchedProfiles(response.data);
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        getMatches();
    }, [matches]);
    
    return (
        <div className="matches-display">
            MatchesDisplay
        </div>
    )
}

export default MatchesDisplay
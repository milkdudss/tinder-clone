import axios from 'axios';
import React, {useEffect} from 'react';
import Chat from './Chat';
import ChatInput from './ChatInput';
import {Axios} from 'axios';
import {useState} from 'react';

const ChatDisplay = ({ user, clickedUser}) => {
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;
    const [usersMessages, setUsersMessages] = useState(null);
    const [setClickedUsersMessages] = useState(null);

    const getUsersMessages = async ( ) => {
        try {
            const response = await axios.get("http://localhost:8000/messages", {
                params: {userId: userId, correspondingUserId: clickedUserId}
            });
            setUsersMessages(response.data)
        } 
        catch (error) {
            console.log(error);
        }
    }

    const getClickedUsersMessages = async ( ) => {
        try {
            const response = await axios.get("http://localhost:8000/messages", {
                params: {userId: clickedUserId, correspondingUserId: userId}
            });
            setClickedUsersMessages(response.data)
        } 
        catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getUsersMessages();
        getClickedUsersMessages();
    }, []);

    const messages = [];

    console.log("usersMessages", usersMessages);

    usersMessages?.forEach(message => {
        const formattedMessage = {};
        formattedMessage["name"] = user?.first_name;
        formattedMessage["img"] = user?.url;
        formattedMessage["message"] = message.message;
        formattedMessage["timestamp"] = message.timestamp;
        messages.push(formattedMessage);
    })

    setClickedUsersMessages?.forEach(message => {
        const formattedMessage = {};
        formattedMessage["name"] = clickedUser?.first_name;
        formattedMessage["img"] = clickedUser?.url;
        formattedMessage["message"] = message.message;
        formattedMessage["timestamp"] = message.timestamp;
        messages.push(formattedMessage);
    })

    // console.log("usersMessages", usersMessages);
    // console.log("formattedMessages", messages);

    const descendingOrderMessages = messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp))

    return (
        <>
            <Chat descendingOrderMessages={descendingOrderMessages} />
            <ChatInput />
        </>
    )
}

export default ChatDisplay
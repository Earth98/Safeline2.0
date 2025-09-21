import { HubConnectionBuilder } from '@microsoft/signalr';
import React, { useEffect, useState } from 'react'

export const useSignal = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [Details, setDetails] = useState({
        Joined: false,
        SecretCode: "",
        Name: "",
        UserName: ""
    });
    console.log("channel state", Details);
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

    const sendMessage = async (input, callback = () => {}) => {
        if (connection && input) {
            await connection.invoke("SendMessageToChannel", Details.SecretCode, Details.UserName, input);
            callback();
        }
    };
    const joinChannel = async (channelName) => {
        if (connection && channelName) {
            await connection.invoke("JoinChannel", channelName);
            setDetails(prev => ({ ...prev, SecretCode: channelName, Joined: true }));
        }
    };
    const leaveChannel = async () => {
        if (connection && Details.SecretCode) {
            await connection.invoke("LeaveChannel", Details.SecretCode);
            setDetails({ Joined: false, Name: "", UserName: "" });
            setMessages([]);
        }
    };
    return { connection, messages, Details, setDetails, sendMessage, joinChannel, leaveChannel };
}


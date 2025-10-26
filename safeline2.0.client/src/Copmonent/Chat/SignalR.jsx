import { HubConnectionBuilder } from '@microsoft/signalr';
import React, { useEffect, useState } from 'react'
import { setHub } from '../Storage/Slice/SignlaR';
import { useDispatch, useSelector } from 'react-redux';
import { setConnectedChatRooms } from '../Storage/Slice/State';

export const useSignal = () => {
    const { hub: connection } = useSelector(state => state.SignalR);
    const { ChatRooms } = useSelector(state => state.Safeline);
    const { ConnectedChatRooms } = useSelector(state => state.SafelineState);
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [Details, setDetails] = useState({
        Joined: false,
        SecretCode: "",
        Name: "",
        UserName: ""
    });


    const sendMessage = async (input, callback = () => { }) => {
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

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(`${window.location.origin}/safeLine`) // backend URL
            .build();

        connect.start().then(() => {
            connect.on("ReceiveMessage", (user, message) => {
                setMessages((prev) => [...prev, { user, message }]);
            });
            dispatch(setHub(connect));
        });
    }, []);

    useEffect(() => {
        // this for join channel cleanup
        if (connection) {
            ChatRooms.forEach(async (room) => {
                if (connection && room.ChatRoomID && !ConnectedChatRooms.includes(room.ChatRoomID)) {
                    await connection.invoke("JoinChannel", room.ChatRoomID);
                    dispatch(setConnectedChatRooms({ ChatRoomID: room.ChatRoomID }));
                }
            });
        }
    }, [ChatRooms, connection, ConnectedChatRooms, dispatch]);

    return { connection, messages, Details, setDetails, sendMessage, joinChannel, leaveChannel };
}


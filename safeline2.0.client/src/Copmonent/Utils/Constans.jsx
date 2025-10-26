import { useEffect, useState } from "react";
import { ChatRoomStatusEnum, ChatRoomStepEnum, StatusEnum as T } from "./Enum";
import { useDispatch, useSelector } from "react-redux";
import { setChatRoomStep, setSelectedChatRoom } from "../Storage/Slice/State";
import { generateConversationName, generateUserName } from "./Methods";
import { CreateChatRoom, setSecretCode } from "../Storage/Slice/User";

export const Icons = {
    GithubProfileIcon: "https://avatars.githubusercontent.com/u/187251518?s=96&v=4",
    ArrowRight: "https://www.svgrepo.com/show/257703/right-arrow-next.svg",
    sms: "https://www.svgrepo.com/show/474993/sms.svg",
    email: "https://www.svgrepo.com/show/484995/email-part-2.svg",
    whatsapp: "https://www.svgrepo.com/show/475692/whatsapp-color.svg",
    copyLink: "https://www.svgrepo.com/show/310707/copy-link.svg",
};

export const COLOR = {
    dark: {
        background: "bg-gray-800",
        text: "text-gray-100",
        DisableText: "text-gray-100",
        box: "bg-gray-700",
        // buttonHover: "bg-blue-600",
    },
    light: {
        background: "bg-white",
        text: "text-gray-900",
        DisableText: "text-gray-900",
        box: "bg-white",
        // buttonHover: "bg-blue-600",
    },
};
export const defultSecret = {
    status: T.IdleDeadline, // idle, loading, success, error"
    Mode: "light", // light, dark
};

export const useSecret = () => {
    const [seacrates, setSeacrates] = useState(defultSecret);
    useEffect(() => {
        if (seacrates.status === T.IdleDeadline) {
            setSeacrates({ ...seacrates, status: T.Ideal });
            return;
        }
        return;
    }, [seacrates]);

    return { seacrates };
};

export const useUserdetails = () => {
    const { UserName } = useSelector(state => state.Safeline.UserDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!UserName) {
            const { Username, UserID } = generateUserName();
            dispatch(setSecretCode({ ID: UserID, UserName: Username }));
        }
    }, [UserName, dispatch]);
};

export const useChatRooms = () => {
    const { ChatRooms } = useSelector(state => state.Safeline);
    const dispatch = useDispatch();

    useEffect(() => {
        if (ChatRooms.length === 0) {
            dispatch(setChatRoomStep(ChatRoomStepEnum.CreateChat));
        }
    }, [ChatRooms, dispatch]);
};

export const useCreateChat = () => {
    const [Details, setDetails] = useState({
        ConversationName: "",
        ChatRoomID: ""
    });
    const dispatch = useDispatch();

    const addConversation = () => {
        // Logic to add the conversation
        dispatch(CreateChatRoom({ ChatRoomID: Details.ChatRoomID, ConversationName: Details.ConversationName }));
        dispatch(setChatRoomStep(ChatRoomStepEnum.ChatList));
    };

    useEffect(() => {
        if (!Details.ConversationName) {
            const { ConversationName, ChatRoomID } = generateConversationName();
            setDetails({ ConversationName, ChatRoomID });
        }
    }, [Details.ConversationName]);

    return { ConversationName: Details.ConversationName, addConversation };
};
export const useChatList = () => {
    const dispatch = useDispatch();

    const SelectChatRoom = (room) => {
        if (!room || !room.ChatRoomID) return;
        switch (room.Status) {
            case ChatRoomStatusEnum.Invited:
                // Handle invited status
                dispatch(setChatRoomStep(ChatRoomStepEnum.Invite));
                break;
            default:
                dispatch(setChatRoomStep(ChatRoomStepEnum.ChatRoom));
                break;
        }
        dispatch(setSelectedChatRoom(room));
    };

    const CreateChat = () => {
        dispatch(setChatRoomStep(ChatRoomStepEnum.CreateChat));
    };

    return { CreateChat, SelectChatRoom };
};


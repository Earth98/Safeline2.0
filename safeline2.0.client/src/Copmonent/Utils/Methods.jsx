import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatRoomStepEnum, safelineStepEnum, StatusEnum } from "./Enum";
import { setStatus, setStep } from "../Storage/Slice/State";
import UserNames from "../../assets/secretline_usernames.json";
import ConversationNames from "../../assets/secretline_conversations.json";


export const useApp = () => {
    const { Status } = useSelector(state => state.SafelineState);
    const { hub } = useSelector(state => state.SignalR);
    const { NewUser } = useSelector(state => state.Safeline);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Status === StatusEnum.Ideal && hub) {
            dispatch(setStatus(StatusEnum.Loaded));
        }
        if (Status === StatusEnum.Loaded) {
            if (NewUser) {
                dispatch(setStep(safelineStepEnum.Welcome));
            } else {
                dispatch(setStep(safelineStepEnum.Userdetails));
            }
        }
    }, [Status, hub, NewUser, dispatch]);   
};
export const generateUserName = () => {
    const Number = Math.floor(Math.random() * UserNames.length);
    const DigitNumber = Math.floor(Math.random() * 100);
    const DigitID = Math.floor(Math.random() * 100000000);
    const Username = `${UserNames[Number]} ${DigitNumber}`;
    const UserID = Username.replace(/\s+/g, '-').toLowerCase() + `-${DigitID}`;
    return { Username, UserID };
};
export const generateConversationName = () => {
    const Number = Math.floor(Math.random() * ConversationNames.length);
    const DigitID = Math.floor(Math.random() * 100000000);
    const ConversationName = ConversationNames[Number];
    const ChatRoomID = ConversationName.replace(/\s+/g, '-').toLowerCase() + `-${DigitID}`;
    return { ConversationName, ChatRoomID };
};

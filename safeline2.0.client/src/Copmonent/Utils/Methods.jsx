import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { safelineStepEnum, StatusEnum } from "./Enum";
import { setStatus, setStep } from "../Storage/Slice/State";

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
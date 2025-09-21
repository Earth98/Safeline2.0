import { useEffect, useState } from "react";
import { StatusEnum as T } from "./Enum";
export const COLOR = {
    dark: {
        background: "bg-gray-800",
        text: "text-gray-100",
        box: "bg-gray-700",
        // buttonHover: "bg-blue-600",
    },
    light: {
        background: "bg-white",
        text: "text-gray-900",
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
            setSeacrates({ ...seacrates, status: T.Idle });
            return;
        }
        return;
    }, [seacrates]);

    return { seacrates };
};
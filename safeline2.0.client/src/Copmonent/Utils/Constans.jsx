import { useEffect, useState } from "react";
import { StatusEnum as T } from "./Enum";

export const Icons = {
    GithubProfileIcon: "https://avatars.githubusercontent.com/u/187251518?s=96&v=4",
    ArrowRight: "https://www.svgrepo.com/show/257703/right-arrow-next.svg"
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
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "./Constans";
import { selectLoader } from "../Storage/Selector/Selector";
import { safelineStepEnum } from "./Enum";
import { SetNewUser, setSecretCode } from "../Storage/Slice/User";
import Names from "../../assets/secretline_usernames.json";
import { useEffect, useState } from "react";

export const Components = {
    Button: ({ children, onClick, className = "" }) => (
        <button className={`px-4 py-2 rounded ${className}`} onClick={onClick}>
            {children}
        </button>
    ),
    Card: ({ children, color }) => (
        <div className={`flex items-center justify-center `}>
            <div className={`rounded-lg shadow-lg p-10  ${color.box} ${color.text} max-w-sm w-full`}>
                {children}
            </div>
        </div>
    ),
    H2: ({ children }) => (
        <h2 className="text-xl font-semibold mb-2">{children}</h2>
    ),
    Icons: ({ url, className = "", imageClassName = "w-8 h-8" }) => (
        <div className={`flex space-x-4 ${className}`}>
            <img src={url} alt="Icon" className={imageClassName} />
        </div>
    ),
    AnimatedName: () => {
        const [displayed, setDisplayed] = useState("");
        const { UserName } = useSelector(state => state.Safeline.UserDetail);
        useEffect(() => {
            if (!UserName) return;
            setDisplayed(""); // Reset before typing
            let i = 0;
            const interval = setInterval(() => {
                setDisplayed(UserName.slice(0, i + 1) + "_");
                i++;
                if (i >= UserName.length) {
                    setDisplayed(UserName.slice(0, i + 1));
                    clearInterval(interval)
                };
            }, 150); // Adjust speed here
            return () => clearInterval(interval);
        }, [UserName]);
        return displayed || "_";
    },
    Loader: () => {
        const Loader = useSelector(state => selectLoader(state));
        if (!Loader) return null;
        return (
            <div className="relative z-10 w-full h-full flex flex-col justify-center place-items-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div>
            </div>
        )
    },
    // Glass-style popup component
    GlassPopup: ({ open, onClose, children }) => {
        if (!open) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                {/* Popup content */}
                <div className="relative bg-white/100 backdrop-blur-lg rounded-2xl shadow-2xl p-8 min-w-[300px] max-w-[90vw] z-10">
                    {onClose &&
                        <div
                            className="absolute top-1 right-3 "
                            onClick={onClose}
                            aria-label="Close"
                        >
                            &times;
                        </div>
                    }
                    {children}
                    {/* Blinking status dot, default green */}
                    <span
                        className="absolute top-3 left-3 h-1 w-1 rounded-full animate-pulse"
                        style={{ backgroundColor: 'green', boxShadow: '0 0 5px 1px #22c55e' }}
                        title="Status: Online"
                    />
                </div>
            </div>
        );
    },
    SafeLifeStep: () => {
        const { Step } = useSelector(state => state.SafelineState);
        const { WelcomeComponent, Userdetails, Loader } = Components;
        switch (Step) {
            case safelineStepEnum.Welcome:
                return <WelcomeComponent />;
            case safelineStepEnum.Userdetails:
                return <Userdetails />;
            case safelineStepEnum.ChatRooms:
                return <div>Chat Rooms Step Component</div>;
            default:
                return (<div id="SafeLifeStep" className="relative z-10 w-full h-full flex flex-col justify-center place-items-center"> <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div></div>);
        }
    },
    WelcomeComponent: () => {
        const { GlassPopup } = Components;
        const dispatch = useDispatch();

        return (
            <GlassPopup open={true} >
                <h1 className="text-3xl font-bold mb-4 "> Welcome to Safeline!</h1>
                <span className="text-md">
                    Your privacy matters here. Chat safely and securely everything you share stays confidential.
                    Enjoy your experience!
                </span>
                <div className="mt-4">
                    <Components.Button onClick={() => { dispatch(SetNewUser(false)); }}>Explore Now</Components.Button>
                </div>
                
            </GlassPopup>
        )
    },
    Userdetails: () => {
        const { GlassPopup, AnimatedName } = Components;
        const { UserName } = useSelector(state => state.Safeline.UserDetail);
        const dispatch = useDispatch();

        useEffect(() => {
            if (UserName === "") {
                const Number = Math.floor(Math.random() * Names.length);
                const DigitNumber = Math.floor(Math.random() * 100);
                const DigitID = Math.floor(Math.random() * 100000000);
                const Username = `${Names[Number]} ${DigitNumber}`;
                const UserID = Username.replace(/\s+/g, '-').toLowerCase() + `-${DigitID}`;
                dispatch(setSecretCode({ ID: UserID, UserName: Username }));
            }
        }, [UserName, dispatch]);

        return (
            <GlassPopup open={true} >
                <span className="text-md">
                    For your privacy, we've generated a unique username just for you 
                    <h1><AnimatedName /></h1>
                    <br />
                    You can keep using this ID or set your own name anytime from your profile settings. Whatever you choose, your conversations will remain secure and private.
                </span>
                <div className="mt-4">
                    <Components.Button onClick={() => { dispatch(SetNewUser(false)); }}>
                    {"Dive In >_"} 
                    </Components.Button>
                </div>
            </GlassPopup>
        );
    },
};


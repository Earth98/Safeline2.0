import { useDispatch, useSelector } from "react-redux";
import { Icons, useChatList, useChatRooms, useCreateChat, useUserdetails } from "./Constans";
import { selectLoader } from "../Storage/Selector/Selector";
import { ChatRoomStatusEnum, ChatRoomStepEnum, safelineStepEnum } from "./Enum";
import { SetNewUser } from "../Storage/Slice/User";
import Names from "../../assets/secretline_usernames.json";
import { useEffect, useState } from "react";
import { setChatRoomStep, setStep } from "../Storage/Slice/State";

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
    TypingText: ({ text = "" }) => {
        const [displayed, setDisplayed] = useState("");
        useEffect(() => {
            if (!text) return;
            setDisplayed(""); // Reset before typing
            let i = 0;
            const interval = setInterval(() => {
                setDisplayed(text.slice(0, i + 1) + "_");
                i++;
                if (i >= text.length) {
                    setDisplayed(text.slice(0, i + 1));
                    clearInterval(interval)
                };
            }, 150); // Adjust speed here
            return () => clearInterval(interval);
        }, [text]);
        return displayed || "_";
    },
    Loader: ({ defaultVisible = false }) => {
        const Loader = useSelector(state => selectLoader(state));
        if (!Loader && !defaultVisible) return null;
        return (
            <div className="relative z-10 w-full h-full flex flex-col justify-center place-items-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div>
            </div>
        )
    },
    Shaprater: () => {
        return <hr className="my-4 border-t border-gray-300" />;
    },
    GlassPopup: ({ open, onClose, onAdd, children, title, footer }) => {
        if (!open) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                {/* Popup content */}
                <div
                    className="relative bg-white/100 backdrop-blur-lg rounded-2xl shadow-2xl p-8 min-w-[300px] max-w-[90vw] z-10"
                    style={{
                        width: '100%',
                        height: 'auto',
                        ...(window.innerWidth <= 600
                            ? {
                                minWidth: '90vw',
                                maxWidth: '90vw',
                                minHeight: '90vh',
                                padding: '24px 12px',
                            }
                            : {
                                minWidth: '60vw',
                                minHeight: '60vh',
                                maxWidth: '400px',
                            }),
                    }}
                >
                    {title && (
                        <header className="absolute top-2 left-0 w-full flex justify-center items-center z-20">
                            <span className="font-bold text-lg">{title}</span>
                        </header>
                    )}
                    {onClose &&
                        <div
                            className="absolute top-1 right-3 "
                            onClick={onClose}
                            aria-label="Close"
                        >
                            &times;
                        </div>
                    }
                    {onAdd &&
                        <div
                            className="absolute bottom-3 z-100 right-4  bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-md cursor-pointer hover:bg-white/100 transition text-xl font-bold cursor-pointer rounded-full"
                            onClick={onAdd}
                            aria-label="Add More"
                        >
                            <span className="font-semibold">+</span>
                        </div>
                    }
                    <div className={footer ? "pb-12" : ""}>
                        {children}
                    </div>
                    {/* Blinking status dot, default green */}
                    <span
                        className="absolute top-3 left-3 h-1 w-1 rounded-full animate-pulse"
                        style={{ backgroundColor: 'green', boxShadow: '0 0 5px 1px #22c55e' }}
                        title="Status: Online"
                    />
                    {footer && (
                        <footer className="absolute bottom-2 left-0 w-full flex justify-center items-center z-20">
                            {footer}
                        </footer>
                    )}
                </div>
            </div>
        );
    },
    SafeLifeStep: () => {
        const { Step } = useSelector(state => state.SafelineState);
        const { Loader, WelcomeComponent, Userdetails, ChatRooms } = Components;

        switch (Step) {
            case safelineStepEnum.Welcome:
                return <WelcomeComponent />;
            case safelineStepEnum.Userdetails:
                return <Userdetails />;
            case safelineStepEnum.ChatRooms:
                return <ChatRooms />;
            default:
                return <Loader defaultVisible />;
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
        const dispatch = useDispatch();

        const dive_In = () => {
            dispatch(setStep(safelineStepEnum.ChatRooms));
        };

        useUserdetails();
        return (
            <GlassPopup open={true} >
                <span className="text-md">
                    For your privacy, we've generated a unique username just for you
                    <h1><AnimatedName /></h1>
                    <br />
                    You can keep using this ID or set your own name anytime from your profile settings. Whatever you choose, your conversations will remain secure and private.
                </span>
                <div className="mt-4 animate-pulse">
                    <Components.Button onClick={dive_In}>
                        {"Dive In >_"}
                    </Components.Button>
                </div>
            </GlassPopup>
        );
    },
    ChatRooms: () => {
        const { GlassPopup } = Components;
        const { ChatRoomStep } = useSelector(state => state.SafelineState);
        useChatRooms();
        switch (ChatRoomStep) {
            case ChatRoomStepEnum.CreateChat:
                return <Components.CreateChat />;
            case ChatRoomStepEnum.ChatList:
                return <Components.ChatList />;
            case ChatRoomStepEnum.Invite:
                return <Components.Invite />;
            case ChatRoomStepEnum.ChatArea:
                return <Components.ChatArea />;
            default:
                return <GlassPopup open={true} >
                    <h1 className="text-2xl font-bold mb-4">Chat Rooms Coming Soon!</h1>
                    <span className="text-md">
                        We're working hard to bring you the chat rooms feature. Stay tuned for updates!
                    </span>
                </GlassPopup>;
        }
    },
    CreateChat: () => {
        const { GlassPopup, TypingText, Shaprater } = Components;
        const { ConversationName, addConversation } = useCreateChat();
        return <GlassPopup open={true}>
            <div className="text-md font-semibold">Start a New Chat</div>
            <Shaprater />
            <span className="text-md">
                Create a new chat group by entering a name below. Once started, you can invite others and begin secure conversations instantly!
            </span>
            <h1 className="mt-4 font-semibold"> <TypingText text={ConversationName} /></h1>
            <Shaprater />
            <div className="mt-4 animate-pulse">
                <Components.Button onClick={addConversation}>
                    Create Chat
                </Components.Button>
            </div>
        </GlassPopup>
    },
    ChatList: () => {
        const { ChatRooms } = useSelector(state => state.Safeline);
        const { GlassPopup, TypingText } = Components;
        const { CreateChat, SelectChatRoom } = useChatList();
        return (
            <GlassPopup
                open={true}
                onAdd={CreateChat}
                footer={
                    <span className="block text-xs text-blue-500 mt-2">
                        Tip: You can create new chat rooms or join existing ones. Click a room to start chatting!
                    </span>
                }
                title="Chat Room"
            >
                <div className="max-h-80 overflow-y-auto">
                    <ul className="space-y-2 mb-4 text-left">
                        {ChatRooms.map(room => (
                            <li
                                key={room.ChatRoomID}
                                className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100"
                                onClick={() => SelectChatRoom(room)}
                            >
                                {room.ConversationName}
                                {/* Status indicator */}
                                <span className="flex items-center gap-1" title={room.Status || "online"}>
                                    {room.Status === ChatRoomStatusEnum.Online && (
                                        <span className="h-2 w-2 rounded-full bg-green-500 mr-1" title="Online"></span>
                                    )}
                                    {room.Status === ChatRoomStatusEnum.Offline && (
                                        <span className="h-2 w-2 rounded-full bg-gray-400 mr-1" title="Offline"></span>
                                    )}
                                    {room.Status === ChatRoomStatusEnum.Invited && (
                                        <span className="h-2 w-2 rounded-full bg-yellow-400 mr-1" title="Invited"></span>
                                    )}
                                    <span className="text-xs text-gray-500 capitalize">{room.Status || "online"}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </GlassPopup>
        );
    },
    Invite: () => {
        const { SelectedChat } = useSelector(state => state.SafelineState);
        const dispatch = useDispatch();
        // Static invite link
        const inviteLink = `${window.location.origin}/invite/${SelectedChat?.ChatRoomID || "unknown"}`;
        // Copy to clipboard helper
        const copyToClipboard = async () => {
            try {
                await navigator.clipboard.writeText(inviteLink);
            } catch {
                alert("Failed to copy link.");
            }
        };
        // SMS, Email, WhatsApp logic
        const handleSMS = () => {
            window.open(`sms:?body=Join me on Safeline! ${inviteLink}`, "_blank");
        };
        const handleEmail = () => {
            window.open(`mailto:?subject=Safeline Invitation&body=Join me on Safeline! ${inviteLink}`, "_blank");
        };
        const handleWhatsApp = () => {
            window.open(`https://wa.me/?text=Join%20me%20on%20Safeline!%20${encodeURIComponent(inviteLink)}`, "_blank");
        };
        const BacktoChat = () => { 
            dispatch(setChatRoomStep(ChatRoomStepEnum.ChatList));   
        };

        return (
            <Components.GlassPopup
                open={true}
                title={<h2 className="text-xl font-bold mb-2 text-blue-600">Invite Friends to Join</h2>}
                footer={<div
                    className="absolute bottom-3 z-100 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-md cursor-pointer hover:bg-white/100 transition text-xl font-bold cursor-pointer rounded-full"
                    onClick={BacktoChat}
                    aria-label="Back to Chat Rooms"
                >
                    <span className="font-semibold animate-pulse">
                        {"< Back to chat"}
                    </span>
                </div>
                }
            >
                <div className="flex flex-col items-center gap-4 mt-5">
                    <span className="text-gray-700 text-center mb-4">
                        Share the invitation via your favorite method. Just click below to send an invite!
                    </span>
                    <div className="flex flex-col gap-3 w-full max-w-xs">
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold shadow hover:bg-gray-300 transition"
                            onClick={handleSMS}
                        >
                            <img src={Icons.sms} alt="SMS" className="w-6 h-6" />
                            Invite via SMS
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold shadow hover:bg-gray-300 transition"
                            onClick={handleEmail}
                        >
                            <img src={Icons.email} alt="Email" className="w-6 h-6" />
                            Invite via Email
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold shadow hover:bg-gray-300 transition"
                            onClick={handleWhatsApp}
                        >
                            <img src={Icons.whatsapp} alt="WhatsApp" className="w-6 h-6" />
                            Invite via WhatsApp
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold shadow hover:bg-gray-300 transition"
                            onClick={copyToClipboard}
                        >
                            <img src={Icons.copyLink} alt="link" className="w-6 h-6" />
                            Copy Invite Link
                        </button>
                    </div>
                    <span className="text-xs text-gray-400 mt-4">
                        {inviteLink}
                    </span>
                </div>
            </Components.GlassPopup>
        );
    }
    // ChatRoomsIdea: () => {
    //     // ChatRooms state
    //     const [chatRooms, setChatRooms] = useState([
    //         { id: 1, name: "General" },
    //         { id: 2, name: "Support" },
    //         { id: 3, name: "Random" },
    //     ]);
    //     const [selectedRoom, setSelectedRoom] = useState(chatRooms[0]?.id || null);
    //     const [newRoomName, setNewRoomName] = useState("");
    //     const [showNewRoomInput, setShowNewRoomInput] = useState(false);
    //     // ChatRooms state
    //     const [chatRooms, setChatRooms] = useState([
    //         { id: 1, name: "General" },
    //         { id: 2, name: "Support" },
    //         { id: 3, name: "Random" },
    //     ]);
    //     const [selectedRoom, setSelectedRoom] = useState(chatRooms[0]?.id || null);
    //     const [newRoomName, setNewRoomName] = useState("");
    //     const [showNewRoomInput, setShowNewRoomInput] = useState(false);

    //     // Messages state (simple demo, per room)
    //     const [messages, setMessages] = useState({
    //         1: [
    //             { user: "Alice", text: "Hi everyone!" },
    //             { user: "You", text: "Hello Alice!" }
    //         ],
    //         2: [],
    //         3: [],
    //     });
    //     const [inputMsg, setInputMsg] = useState("");

    //     // Add new chat room
    //     const handleAddRoom = () => {
    //         if (newRoomName.trim() === "") return;
    //         const newId = Date.now();
    //         setChatRooms([...chatRooms, { id: newId, name: newRoomName }]);
    //         setMessages({ ...messages, [newId]: [] });
    //         setSelectedRoom(newId);
    //         setNewRoomName("");
    //         setShowNewRoomInput(false);
    //     };

    //     // Send message
    //     const handleSendMsg = () => {
    //         if (inputMsg.trim() === "" || !selectedRoom) return;
    //         setMessages(prev => ({
    //             ...prev,
    //             [selectedRoom]: [
    //                 ...prev[selectedRoom],
    //                 { user: "You", text: inputMsg }
    //             ]
    //         }));
    //         setInputMsg("");
    //     };

    //     return (
    //         <div className="flex h-[80vh] w-full">
    //             {/* Left Bar: Chat List */}
    //             <aside className="w-1/4 bg-gray-100 border-r flex flex-col p-4">
    //                 <h2 className="text-lg font-bold mb-4">Chat Rooms</h2>
    //                 <ul className="space-y-2 flex-1 overflow-y-auto">
    //                     {chatRooms.map(room => (
    //                         <li
    //                             key={room.id}
    //                             className={`p-2 rounded cursor-pointer font-medium ${selectedRoom === room.id ? "bg-blue-100" : "hover:bg-gray-200"}`}
    //                             onClick={() => setSelectedRoom(room.id)}
    //                         >
    //                             {room.name}
    //                         </li>
    //                     ))}
    //                 </ul>
    //                 {showNewRoomInput ? (
    //                     <div className="mt-2 flex gap-2">
    //                         <input
    //                             type="text"
    //                             className="border rounded px-2 py-1 flex-1"
    //                             value={newRoomName}
    //                             onChange={e => setNewRoomName(e.target.value)}
    //                             placeholder="Room name"
    //                             autoFocus
    //                         />
    //                         <button
    //                             className="px-2 py-1 bg-green-500 text-white rounded"
    //                             onClick={handleAddRoom}
    //                         >
    //                             Add
    //                         </button>
    //                         <button
    //                             className="px-2 py-1 bg-gray-300 rounded"
    //                             onClick={() => { setShowNewRoomInput(false); setNewRoomName(""); }}
    //                         >
    //                             Cancel
    //                         </button>
    //                     </div>
    //                 ) : (
    //                     <button
    //                         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    //                         onClick={() => setShowNewRoomInput(true)}
    //                     >
    //                         + New Room
    //                     </button>
    //                 )}
    //             </aside>
    //             {/* Chat Component */}
    //             <section className="flex-1 flex flex-col">
    //                 <header className="px-6 py-4 border-b flex items-center justify-between">
    //                     <span className="font-semibold text-xl">
    //                         {chatRooms.find(r => r.id === selectedRoom)?.name || "Select a Room"}
    //                     </span>
    //                     <span className="text-gray-500 text-sm">Online: 5</span>
    //                 </header>
    //                 <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
    //                     <div className="flex flex-col">
    //                         {(messages[selectedRoom] || []).map((msg, idx) => (
    //                             <div
    //                                 key={idx}
    //                                 className={`mb-2 max-w-xs px-4 py-2 rounded-lg ${msg.user === "You" ? "self-end bg-blue-100" : "self-start bg-gray-200"}`}
    //                             >
    //                                 <span className="font-bold text-sm">{msg.user}:</span>
    //                                 <p className="text-sm">{msg.text}</p>
    //                             </div>
    //                         ))}
    //                     </div>
    //                 </div>
    //                 <footer className="px-6 py-4 border-t flex items-center gap-2">
    //                     <input
    //                         type="text"
    //                         className="flex-1 border rounded px-3 py-2 focus:outline-none"
    //                         placeholder="Type your message..."
    //                         value={inputMsg}
    //                         onChange={e => setInputMsg(e.target.value)}
    //                         onKeyDown={e => { if (e.key === "Enter") handleSendMsg(); }}
    //                         disabled={!selectedRoom}
    //                     />
    //                     <button
    //                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    //                         onClick={handleSendMsg}
    //                         disabled={!selectedRoom}
    //                     >
    //                         Send
    //                     </button>
    //                 </footer>
    //             </section>
    //         </div>
    //     );
    // },
};


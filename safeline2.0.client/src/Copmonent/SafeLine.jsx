
import React, { Component, useEffect, useState } from "react";
import { COLOR, Icons } from "./Utils/Constans";
import { Components } from "./Utils/Components";
import { safelineStepEnum as SS } from "./Utils/Enum";

export const SafeLine = () => {
    const { SafeLifeStep, Loader } = Components;
    return <>
        <Loader />
        <SafeLifeStep />
    </>
};
export const SafeLineold = ({ Channel }) => {
    const { connection, Details } = Channel;
    const [safeLineStep, setSafeLineStep] = useState(SS.Ideal);

    useEffect(() => {
        if (connection) {
            console.log(Details);
            if (Details.Joined && Details.UserName) {
                setSafeLineStep(SS.ChatArea);
                return;
            }
            if (Details.Joined) {
                setSafeLineStep(SS.Userdetails);
                return;
            }
            setSafeLineStep(SS.Welcome);
        }
    }, [safeLineStep, Channel, Details])

    if (safeLineStep === SS.Ideal) return <C.Loader />;
    // Redux imports


    return (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 overflow-hidden">
            {/* Overlay for glass effect */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md" />
            {/* Main layout container */}
            <div className="relative z-10 w-full h-full flex flex-col items-stretch justify-stretch">
                {/* Top Bar */}
                <div className="h-16 flex items-center px-6 rounded-b-2xl bg-white/40 backdrop-blur-lg shadow-lg mb-2">
                    {/* Top bar content (blank for now) */}
                    <span className="ml-auto text-xs text-gray-500">{'Mobile'} view</span>
                </div>
                {/* Main content: Sidebar + Chat */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left Sidebar */}
                    <div className="hidden md:flex flex-col w-64 min-w-56 max-w-xs h-full rounded-r-2xl bg-white/40 backdrop-blur-lg shadow-lg mr-2 overflow-y-auto">
                        {/* Sidebar content (blank for now) */}
                        hello
                    </div>
                    {/* Main Chat Box */}
                    <div className="flex-1 h-full rounded-2xl bg-white/60 backdrop-blur-lg shadow-lg overflow-y-auto flex flex-col">
                        {/* Chat box content (blank for now) */}
                        chat
                    </div>
                </div>
            </div>
        </div>
    );
}

const WelcomeBox = ({ mode, Channel }) => {
    const color = COLOR[mode];
    const [InputValue, setInputValue] = useState();

    const handleJoin = () => {
        if (InputValue) {
            Channel.joinChannel(InputValue);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && InputValue) {
            handleJoin();
        }
    };

    return (
        <C.Card color={color}>
            <div className="mb-4">
                <C.H2>
                    Welcome to SafeLine
                    <span className="blink-dot">.</span>
                </C.H2>
                <div className="flex items-center space-x-2 pt-4">
                    <input
                        type="text"
                        placeholder="Secret Code"
                        className="flex-1 p-2 border rounded"
                        value={InputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div
                        className="flex-1 px-2 py-2 rounded text-white flex items-center justify-center disabled:opacity-50"
                        onClick={handleJoin}
                        disabled={!InputValue}
                    >
                        <C.Icons url={Icons.ArrowRight} imageClassName={"w-6 h-6"} />
                    </div>
                </div>
            </div>
        </C.Card>
    );
}

const UserDetailsBox = ({ mode, Channel }) => {
    const color = COLOR[mode];
    const [InputValue, setInputValue] = useState();
    const { setDetails } = Channel;

    const handleJoin = () => {
        if (InputValue) {
            setDetails(prev => ({ ...prev, UserName: InputValue }));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && InputValue) {
            handleJoin();
        }
    };


    return (
        <C.Card color={color}>
            <div className="mb-4">
                <C.H2>
                    Your good name
                    <span className="blink-dot">.</span>
                </C.H2>
                <div className="flex items-center space-x-2 pt-4">
                    <input
                        type="text"
                        placeholder="User Name"
                        className="flex-1 p-2 border rounded"
                        value={InputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div
                        className="flex-1 px-2 py-2 rounded text-white flex items-center justify-center disabled:opacity-50"
                        onClick={handleJoin}
                        disabled={!InputValue}
                    >
                        <C.Icons url={Icons.ArrowRight} imageClassName={"w-6 h-6"} />
                    </div>
                </div>
            </div>
        </C.Card>
    );
}

const ChatAreaBox = ({ mode, Channel }) => {
    const color = COLOR[mode];
    const { messages, Details, sendMessage, leaveChannel } = Channel;
    const [input, setInput] = useState("");


    const SendMessage = () => {
        if (input) {
            sendMessage(input, () => setInput(""));
        }
    };

    const LeaveChat = () => {
        leaveChannel();
    };

    return (
        <C.Card color={color} className="flex flex-col h-[500px] max-w-xl mx-auto shadow-lg">
            <div className="flex items-center justify-between border-b pb-2 mb-2">
                <div className="font-semibold text-lg flex items-center gap-2">
                    <span className="ml-1 animate-pulse text-blue-500 text-2xl leading-none">.</span>
                </div>
                <div
                    className="text-sm text-red-500 hover:underline flex items-center group"
                    onClick={LeaveChat}
                    title="Leave"
                >
                    <svg
                        className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90 group-hover:scale-125"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                        />
                    </svg>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto px-2 py-1 space-y-3 bg-gray-50 dark:bg-gray-900 rounded">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`flex ${m.user === Details.UserName ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-xs px-4 py-2 rounded-lg shadow ${m.user === Details.UserName
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                }`}
                        >
                            <span className="block text-xs font-medium mb-1">
                                {m.user === Details.UserName ? "You" : m.user}
                            </span>
                            <span>{m.message}</span>
                        </div>
                    </div>
                ))}
            </div>
            <form
                className="flex items-center gap-2 mt-2"
                onSubmit={e => {
                    e.preventDefault();
                    SendMessage();
                }}
            >
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message to AI..."
                    className="flex-1 p-2 border rounded focus:outline-none focus:ring"
                    autoFocus
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    disabled={!input.trim()}
                >
                    Send
                </button>
            </form>
        </C.Card>
    );
}

import React, { Component, useState } from "react";
import { COLOR } from "./Utils/Constans";
import { Components } from "./Utils/Components";

// Color palette parameter


export const SafeLine = () => {
    const [mode, setMode] = useState("light");

    const color = COLOR[mode];
    console.log(color);
    return (
        <div>
            <WelcomeBox mode={mode} />
            <Components.Button className="absolute top-4 right-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-900" onClick={() => setMode(mode === "light" ? "dark" : "light")}>Toggle {mode === "light" ? "Dark" : "Light"} Mode</Components.Button>
        </div>
    );
}

const WelcomeBox = ({ mode }) => {
    const color = COLOR[mode];
    return (
        <Components.Card color={color}>
            <Components.H2>Welcome to SafeLine!</Components.H2>
            <p>This is a simple popup message box. You can easily update colors using the COLORS parameter.</p>
            <input className="mt-4 p-2 border rounded w-full" placeholder="Enter your secret code" />
            <br />
            <Components.Button className="" onClick={() => alert('Button Clicked!')}>Click Me</Components.Button>
        </Components.Card>
    );
}
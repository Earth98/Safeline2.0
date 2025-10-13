import './App.css';
import {  ChannelChat } from './Copmonent/Chat/Chat';
import { useSignal } from './Copmonent/Chat/SignalR';
import { SafeLine } from './Copmonent/SafeLine';
import { useApp } from './Copmonent/Utils/Methods';

function App() {
    useSignal();
    useApp();
    return (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 overflow-hidden">
            <SafeLine />
        </div>
    );
}

export default App;
import './App.css';
import {  ChannelChat } from './Copmonent/Chat/Chat';
import { useSignal } from './Copmonent/Chat/SignalR';
import { SafeLine } from './Copmonent/SafeLine';

function App() {
    const Channel = useSignal();
    return (
        <div>
            <SafeLine Channel={Channel}/>
        </div>
    );
}

export default App;
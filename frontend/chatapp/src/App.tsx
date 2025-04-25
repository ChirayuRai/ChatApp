import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { SendingForm } from './components/SendingForm.tsx';
import Chat from './components/Chat.tsx'

const App: React.FC = () => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [messageQueue, setMessageQueue] = useState<any[]>([]); // TODO: Adjust type based on actual event data

    useEffect(() => {
        const onConnect = () => setIsConnected(true);
        const onDisconnect = () => setIsConnected(false);
        const onMessageFound = (msg: string) => { 
            setMessageQueue(previous => [...previous, msg]);
            console.log(msg)
        };

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chat_message', onMessageFound);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onMessageFound);
        };
    }, []);

    return (
        <>
            <Chat messageQueue={messageQueue}/>
            <p>Current connection state: {isConnected ? 'Connected' : 'Disconnected'}</p>
            <SendingForm/>

        </>
    );
};

export default App;

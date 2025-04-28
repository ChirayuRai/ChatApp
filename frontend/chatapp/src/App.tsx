import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { SendingForm } from './components/SendingForm.tsx';
import Chat from './components/Chat.tsx'

const App: React.FC = () => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [messageQueue, setMessageQueue] = useState<any[]>([]); // TODO: Adjust type based on actual event data
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Define functions for socket events
        const onConnect = () => setIsConnected(true);
        const onDisconnect = () => setIsConnected(false);
        const onMessageFound = (msg: string) => { 
            setMessageQueue(previous => [...previous, msg]);
            console.log(msg)
        };
        const onSentMessages = (messageArr: [string]) => {
            // Populate the message queue with every message that's been found
            messageArr.forEach((message) => {
                messageQueue.push(message)
            })
            setIsLoading(false);
        };

        // Attach functions to socket events
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chat_message', onMessageFound);
        socket.on('sent_messages', onSentMessages);

        // Load in previous messages
        socket.emit("get_messages")


        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onMessageFound);
            socket.off('sent_messages', onMessageFound);
        };
    }, []);


    return (
        <>
            {isLoading ? <div>Loading...</div> : <Chat messageQueue={messageQueue}/>}
            <p>Current connection state: {isConnected ? 'Connected' : 'Disconnected'}</p>
            <SendingForm/>

        </>
    );
};

export default App;

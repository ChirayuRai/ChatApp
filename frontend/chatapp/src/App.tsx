import React, { useState, useEffect } from 'react';
import { socket } from './socket';

const App: React.FC = () => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [eventQueue, setEventQueue] = useState<any[]>([]); // Adjust type based on actual event data

    useEffect(() => {
        const onConnect = () => setIsConnected(true);
        const onDisconnect = () => setIsConnected(false);
        const onEventFound = (value: any) => { // Change `any` to a more specific type if possible
            setEventQueue(previous => [...previous, value]);
        };

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onEventFound);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onEventFound);
        };
    }, []);

    return (
        <>
            <p>Current connection state: {isConnected ? 'Connected' : 'Disconnected'}</p>
            <p>Hello World!</p>
        </>
    );
};

export default App;

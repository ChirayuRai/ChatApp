import React, { useState } from "react";
import { socket } from '../socket.tsx';


export function SendingForm() {
    const [value, setValue] = useState<String>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // TODO: Figure out event type
    function onSubmit(event:any) {
        event.preventDefault();
        setIsLoading(true);

        socket.timeout(1).emit('chat_message', value, () => {
            setIsLoading(false);
            setValue('');
            event.target.reset();
        })
    }



    return (
        <form onSubmit={ onSubmit } id='input-form' >
            <input onChange={e => setValue(e.target.value)} />
            <button type="submit" disabled={isLoading}>Submit</button>
        </form>
    )
}

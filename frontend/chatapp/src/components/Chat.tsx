export default function Chat({ messageQueue }) {
    console.log(messageQueue)
    // TODO: Have some kind of logic that cleans up message queue based on some specific interval
    // time? size? 
    // From there, you should be just rendering the messages that appear in the queue whenever they appear.
    return (
        <div>
            <h2>Chat</h2>
            <ul>
                {messageQueue.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    )
}

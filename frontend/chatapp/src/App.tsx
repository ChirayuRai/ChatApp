import {io} from '../../../backend/node_modules/socket.io/client-dist/socket.io.js';
function App() {
    const socket = io();

  return (
    <>
    <p>Hello World!</p>
    </>
  )
}

export default App


import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.MODE == "development" ? "http://localhost:5001" : "/"

// Sets up a socket connection
export function connectSocket(socketRef) {
    if (socketRef.current)
        return;

    socketRef.current = io(SERVER_URL, { autoconnect: false });
    socketRef.current.connect();
};

// Disconnects the socket
export function disconnectSocket(socketRef) {
    if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
    }
};

// Update state when new messages are available
export function listenNewMessages(socketRef, setMessages) {
    if (socketRef.current) {
        socketRef.current.on("new-message", (newMessage) => {
            setMessages((prev) => [newMessage, ...prev]);
        })
    }
}

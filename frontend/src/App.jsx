import { LoaderIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

import api from "./lib/axios.js";

import Header from "./components/Header.jsx";
import RateLimitedUI from "./components/RateLimitedUI.jsx";
import NoMessagesAvailable from "./components/NoMessagesAvailable.jsx";
import MessageWall from "./components/MessageWall.jsx";

import { connectSocket, disconnectSocket, listenNewMessages } from "./lib/socket.js";

function App() {
    const [isFormDisplayed, setIsFormDisplayed] = useState(false);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [loading, setLoading] = useState(true);

    // array containing messages (NOTE: message = { _id, content, createdAt })
    const [messages, setMessages] = useState([]);

    // Store the socket
    const socketRef = useRef(null);

    const toggleAddBox = () => setIsFormDisplayed((val) => !val);

    // Fetch messages and set up sockets on initial load
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Send a GET request to fetch all messages
                const res = await api.get("/wall");

                setMessages(res.data);
                setIsRateLimited(false);
            }
            catch (error) {
                // If rate limit is exceeded
                if (error?.response?.status === 429)
                    setIsRateLimited(true);

                // For any other error
                else
                    toast.error("Failed to load messages");
            }
            finally {
                setLoading(false);
            }
        };

        fetchMessages();
        connectSocket(socketRef);
        listenNewMessages(socketRef, setMessages);

        // Disconnect socket connection while unmounting
        return () => disconnectSocket(socketRef);
    }, []);

    return (
        <div data-theme="dim" className="min-h-screen bg-base-100">
            <Header isFormDisplayed={isFormDisplayed} toggleAddBox={toggleAddBox} />

            {isRateLimited && <RateLimitedUI />}

            {!isRateLimited && (
                <div className="max-w-5xl mx-auto p-4">
                    {loading && (
                        <div className="h-[80vh] bg-base-200 rounded-xl flex items-center justify-center">
                        <LoaderIcon className="animate-spin size-10" />
                        </div>
                    )}

                    {!loading && messages.length === 0 && (
                        <NoMessagesAvailable isFormDisplayed={isFormDisplayed}/>
                    )}

                    {!loading && messages.length > 0 && !isRateLimited && (
                        <MessageWall messages={messages} isFormDisplayed={isFormDisplayed}/>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;

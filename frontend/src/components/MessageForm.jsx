import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import api from "../lib/axios";

const MAX_ROWS = 10;  // for text-area

function MessageForm() {
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const inputRef = useRef(null);


    // For the text area
    const autoResize = () => {
        const box = inputRef.current;
        if (!box) return;

        box.style.height = "auto";

        const lineHeight = parseInt(window.getComputedStyle(box).lineHeight, 10);

        const maxHeight = lineHeight * MAX_ROWS;

        box.style.height = Math.min(box.scrollHeight, maxHeight) + "px";
        box.style.overflowY = box.scrollHeight > maxHeight ? "auto" : "hidden";
    };


    // Resize text area when input content changes
    useEffect(() => {
        autoResize();
    }, [content]);

    // Auto-focus input field
    useEffect(() => {
        if (!submitting)
            inputRef.current?.focus();
    }, [submitting]);


    const handleSubmit = async (e) => {
        e.preventDefault();  // doesn't reload

        if (!content.trim()) {
            toast.error("Can't send an empty message");
            return;
        }

        try {
            setSubmitting(true);
            await api.post("/wall", { content });  // send post request with input field content
            setContent("");                        // reset input field content
        }
        catch (error) {
            // If rate limit exceeded
            if (error?.response?.status === 429)
                toast.error("Rate limited. Try again later.");

            // In case of any other error
            else
                toast.error("Failed to post message");
        }
        finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
                px-4
                py-2
                flex
                items-center
                gap-3
                items-end
            "
        >
            <textarea
                className="
                    textarea
                    textarea-bordered
                    w-full
                    resize-none
                    text-base-content
                "
                ref={inputRef}
                rows={1}
                placeholder="Write a message..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={submitting}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
            />

            <button
                type="submit"
                className="btn btn-sm btn-circle"
                disabled={submitting || !content.trim()}
            >
                <Send size={25} />
            </button>
        </form>
    );
}

export default MessageForm;

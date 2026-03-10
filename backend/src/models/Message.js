
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            maxlength: 1000,
            trim: true,
        },
    },
    {
        timestamps: true,  // gives createdAt and updatedAt
    }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;

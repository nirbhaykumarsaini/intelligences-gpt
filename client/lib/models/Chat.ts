// lib/models/Chat.js
import mongoose from 'mongoose';


const ChatSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    prompt:{type:"string", required:true}
  }, { timestamps: true });


export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema);

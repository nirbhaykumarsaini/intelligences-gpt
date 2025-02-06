const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    prompt:{type:"string", required:true}
  }, { timestamps: true });


module.exports =  mongoose.models.Chat || mongoose.model('Chat', ChatSchema);

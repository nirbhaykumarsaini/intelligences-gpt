const Chat = require("../models/Chat");
const User = require("../models/User");
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.chat = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { prompt } = req.body;

        if (!prompt?.trim()) {
            const error = new Error("Prompt is required");
            error.statusCode = 400;
            throw error;
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 1,
        });

        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        // Maintain chat history limit
        const chatCount = await Chat.countDocuments({ user: userId });
        if (chatCount >= 50) {
            await Chat.deleteOne({ 
                user: userId, 
                _id: await Chat.findOne({ user: userId })
                    .sort({ createdAt: 1 })
                    .select('_id')
            });
        }

        const newChat = new Chat({
            user: userId,
            prompt: response.choices[0].message.content
        });
        await newChat.save();

        res.status(200).json({ 
            message: "Chat created successfully", 
            completion: response.choices[0].message.content 
        });
    } catch (error) {
        next(error);
    }
};

exports.getchatbyuser = async (req, res, next) => {
    try {
        const userId = req.userId;
        const chats = await Chat.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ chats });
    } catch (error) {
        next(error);
    }
};

exports.getchatbyid = async (req, res, next) => {
    try {
        const chat = await Chat.findOne({ 
            user: req.userId, 
            _id: req.params.id 
        });
        
        if (!chat) {
            const error = new Error("Chat not found");
            error.statusCode = 404;
            throw error;
        }
        
        res.status(200).json({ chat });
    } catch (error) {
        next(error);
    }
};

exports.deletechatbyid = async (req, res, next) => {
    try {
        const chat = await Chat.findOneAndDelete({ 
            user: req.userId, 
            _id: req.params.id 
        });
        
        if (!chat) {
            const error = new Error("Chat not found");
            error.statusCode = 404;
            throw error;
        }
        
        res.status(200).json({ 
            message: "Chat deleted successfully",
            deletedChat: chat 
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteAllChats = async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const result = await Chat.deleteMany({ user: userId });
        
        if (result.deletedCount === 0) {
            return res.status(200).json({ 
                message: "No chats found to delete",
            });
        }
        
        res.status(200).json({ 
            message: "All chats deleted successfully",
            result 
        });
    } catch (error) {
        next(error);
    }
};

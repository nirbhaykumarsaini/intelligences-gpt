const express = require("express");
const { chat,getchatbyuser,getchatbyid, deletechatbyid,deleteAllChats } = require("../controllers/chatController");
const userAuth = require("../middlewares/authMiddleware");
const router = express.Router();


router.post("/chat",userAuth, chat);
router.get("/chat",userAuth,getchatbyuser);
router.get("/chat/:id",userAuth,getchatbyid);
router.delete("/chat/:id",userAuth,deletechatbyid);
router.delete("/chat/deleteall",userAuth,deleteAllChats)


module.exports = router;

const express = require("express");
const { projectChatController } = require("../controllers/submissions");

const router = express.Router();

router.post("/project-chat", projectChatController);

module.exports = router;

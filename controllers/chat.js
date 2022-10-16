const Message = require("../models/message");
const io = require('../socket');


exports.createMessage = (req, res, next) => {
  const from = req.body.from;
  const to = req.body.to;
  const content = req.body.content;
  const message = {
    content: content,
    from: from,
    to: to
  };

  io.getIO().emit('new message', message);

  res.status(201).json({
    message: "a post created successfully",
    data: message
  });
  
}


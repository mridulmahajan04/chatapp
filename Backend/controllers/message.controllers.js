import express from "express";
import conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; //Hold The value passed in URl is recipient' user id
        const senderId = req.user._id; //Sender Id that we get through the protectRoute

        let conversations = await conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        })

        if (!conversations) {
            conversations = await conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            conversations.messages.push(newMessage._id);
        }

        await conversations.save();
        await newMessage.save();
        // Socket IO
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: "Internal Error is there" });
        console.log(error);
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversationReceive = await conversation.findOne({
            participants: {
                $all: [senderId, userToChatId]
            }
        }).populate("messages");

        if (!conversationReceive) {
            return res.status(201).json({ error: "Not Any Messages" });
        }
        const messages = conversationReceive.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.log(error.message);
        res.status(201).json({ error: "Error is there" });
    }
}
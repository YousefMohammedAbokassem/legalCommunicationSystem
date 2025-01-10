import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";

const ChatContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  height: "100vh",
  backgroundColor: "#f9f9f9",
});

const ChatList = styled(Box)({
  backgroundColor: "#fff",
  borderRight: "1px solid #ddd",
  overflowY: "auto",
});

const ChatArea = styled(Box)({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f0f4f8",
});

const MessagesArea = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "1rem",
});

const MessageInputArea = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "0.5rem",
  borderTop: "1px solid #ddd",
  backgroundColor: "#fff",
});

export default function Chats() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you?", sender: "lawyer" },
    { id: 2, text: "I need help with a legal matter.", sender: "user" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  return (
    <ChatContainer>
      {/* Chat List */}
      <ChatList>
        <Typography variant="h6" p={2} textAlign="center" fontWeight={600}>
          Conversations
        </Typography>
        <Divider />
        <List>
          {["Lawyer A", "Lawyer B", "Lawyer C"].map((lawyer, index) => (
            <ListItem button key={index}>
              <ListItemAvatar>
                <Avatar>{lawyer[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={lawyer} secondary="Last message preview..." />
            </ListItem>
          ))}
        </List>
      </ChatList>

      {/* Chat Area */}
      <ChatArea>
        <MessagesArea>
          {messages.map((message) => (
            <Box
              key={message.id}
              display="flex"
              justifyContent={message.sender === "user" ? "flex-end" : "flex-start"}
              mb={2}
            >
              <Box
                p={2}
                borderRadius={8}
                bgcolor={message.sender === "user" ? "#5c7c93" : "#e0e0e0"}
                color={message.sender === "user" ? "#fff" : "#000"}
                maxWidth="60%"
              >
                {message.text}
              </Box>
            </Box>
          ))}
        </MessagesArea>

        <MessageInputArea>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <IconButton color="primary" onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </MessageInputArea>
      </ChatArea>
    </ChatContainer>
  );
}

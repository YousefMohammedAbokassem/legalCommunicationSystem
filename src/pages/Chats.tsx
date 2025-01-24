import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";
import Pusher from "pusher-js";

const ChatContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  height: "80vh",
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
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const lawyers = [
    { id: 78, name: "Lawyer A" },
    { id: 2, name: "Lawyer B" },
    { id: 3, name: "Lawyer C" },
  ];

  // Fetch messages from API
  useEffect(() => {
    if (!selectedLawyer) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/chats/${selectedLawyer.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        // تحويل الرسائل إلى الشكل المطلوب
        const fetchedMessages = res.data.messages.map((msg) => ({
          id: msg.id,
          text: msg.content,
          sender: msg?.sender,
        }));
        console.log(res.data.messages);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedLawyer]);
  useEffect(() => {
    // استرجاع الـ token من الـ localStorage
    let accessToken = localStorage.getItem("access_token");

    // إذا كان هناك token قم باضافته في التوثيق (إذا كانت هذه هي حاجتك)
    console.log("Access Token:", accessToken);

    // إعداد Pusher
    let pusher = new Pusher("7e221c9a276e6d97951f", {
      cluster: "mt1",
      forceTLS: true,
      // إضافة الـ token للتوثيق (إذا كنت بحاجة إليه)
      auth: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    // التحقق من الاتصال بـ Pusher
    pusher.connection.bind("connected", () => {
      console.log("Connected to Pusher!");
    });

    pusher.connection.bind("error", (err) => {
      console.error("Pusher connection error:", err);
    });

    // الاشتراك في القنوات مباشرة بدون متغيرات
    pusher.subscribe("conversation_78").bind("message.sent", (data) => {
      console.log("New message received from message.sent channel: ", data);
      const newMessageObj = {
        id: data.id,
        text: data.message,
        sender: data.sender,
      };

      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      // alert(`New message: ${data}`); // يمكن إضافة رسالة منبثقة للاختبار
    });

    pusher
      .subscribe("send.notification.from.user.to.lawyer")
      .bind("new_notification", (data) => {
        console.log("New notification from user to lawyer: ", data);
      });

    pusher
      .subscribe("send.notification.from.representative.to.lawyer")
      .bind("new_notification", (data) => {
        console.log("New notification from representative to lawyer: ", data);
      });

    pusher
      .subscribe("send.notification.from.representative.to.user")
      .bind("new_notification", (data) => {
        console.log("New notification from representative to user: ", data);
      });

    pusher
      .subscribe("send.notification.from.lawyer.to.representative")
      .bind("new_notification", (data) => {
        console.log("New notification from lawyer to representative: ", data);
      });

    pusher
      .subscribe("send.notification.from.lawyer.to.user")
      .bind("new_notification", (data) => {
        console.log("New notification from lawyer to user: ", data);
      });

    // تنظيف عند مغادرة المكون
    return () => {
      pusher.unsubscribe("message.sent");
      pusher.unsubscribe("conversation_78");
      pusher.unsubscribe("send.notification.from.user.to.lawyer");
      pusher.unsubscribe("send.notification.from.representative.to.lawyer");
      pusher.unsubscribe("send.notification.from.representative.to.user");
      pusher.unsubscribe("send.notification.from.lawyer.to.representative");
      pusher.unsubscribe("send.notification.from.lawyer.to.user");
    };
  }, []);
  // Handle sending a new message
  const handleSendMessage = async () => {
    const body = {
      [localStorage.getItem("role") !== "user" ? "user_id" : "lawyer_id"]:
        localStorage.getItem("role") !== "user" ? 3 : 3,
      content: newMessage,
    };
    if (newMessage.trim() && selectedLawyer) {
      console.log(body);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}v1/${localStorage.getItem("role")}s/chats/${selectedLawyer?.id}/send-message`,
          body,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        const newMessageObj = {
          id: res.data.id,
          text: newMessage,
          sender: localStorage.getItem("role"),
        };

        setMessages((prevMessages) => [...prevMessages, newMessageObj]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  console.log(messages);
  return (
    <ChatContainer>
      {/* Chat List */}
      <ChatList>
        <Typography variant="h6" p={2} textAlign="center" fontWeight={600}>
          Conversations
        </Typography>
        <Divider />
        <List>
          {lawyers.map((lawyer) => (
            <ListItem
              button
              key={lawyer.id}
              onClick={() => setSelectedLawyer(lawyer)}
              selected={selectedLawyer?.id === lawyer.id}
            >
              <ListItemAvatar>
                <Avatar>{lawyer.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={lawyer.name}
                secondary={
                  selectedLawyer?.id === lawyer.id
                    ? "Currently viewing"
                    : "Click to view messages"
                }
              />
            </ListItem>
          ))}
        </List>
      </ChatList>

      {/* Chat Area */}
      <ChatArea>
        {selectedLawyer ? (
          <>
            <MessagesArea>
              {loading ? (
                <Typography>Loading messages...</Typography>
              ) : (
                messages.map((message) => (
                  <Box
                    key={message.id}
                    display="flex"
                    justifyContent={
                      message.sender === localStorage.getItem("role")
                        ? "flex-end"
                        : "flex-start"
                    }
                    mb={2}
                  >
                    <Box
                      p={2}
                      borderRadius={8}
                      bgcolor={
                        message.sender === localStorage.getItem("role")
                          ? "#5c7c93"
                          : "#e0e0e0"
                      }
                      color={
                        message.sender === localStorage.getItem("role")
                          ? "#fff"
                          : "#000"
                      }
                      maxWidth="60%"
                    >
                      {message.text}
                    </Box>
                  </Box>
                ))
              )}
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
          </>
        ) : (
          <Typography variant="h6" p={3} textAlign="center">
            Please select a lawyer to view messages.
          </Typography>
        )}
      </ChatArea>
    </ChatContainer>
  );
}

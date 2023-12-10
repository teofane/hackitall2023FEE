import React, { useState } from 'react';
import { createStyles, makeStyles } from "@mui/styles";
import { MessageLeft, MessageRight } from "./Message";
import { TextInput } from "./TextInput";
import {Paper, Box, IconButton, Typography} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat'; // Import Chat icon
import CloseIcon from '@mui/icons-material/Close';
import {useQuery} from "react-query"; // Import Close icon

const useStyles = makeStyles((theme) => createStyles({
  paper: {
    width: '20rem', // Adjusted width
    height: '25rem', // Adjusted height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#f1f0ee',
    borderRadius: '2px',
    padding: theme.spacing(2),
    overflow: 'hidden',
    transition: '0.3s ease-in-out',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    '&:hover': {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    }
  },
  chatClosed: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#888',
    color: 'white',
    padding: theme.spacing(1),
    borderRadius: '20px',
    cursor: 'pointer',
    zIndex: 10,
  },
  chatIcon: {
    marginRight: theme.spacing(1), // Add right margin to the icon
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 10,
  },
  messagesBody: {
    flexGrow: 1,
    width: 'calc(100% - 20px)',
    margin: theme.spacing(1),
    overflowY: 'auto',
    height: 'calc(100% - 80px)', // Adjusted height calculation
    backgroundColor: '#ffffff',
    padding: theme.spacing(2),
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '1rem',
    color: theme.palette.text.primary,
    borderRadius: '2px',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '10px'
    }
  },
}));

export default function ChatAssistant() {
  const classes = useStyles();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{data:"Hello! I am your virtual assistant and I can help you with any question you might have.", who:"chatGPT"}]);
  const [isLoading, setIsLoading] = useState(false)

  const appendNewMessage = (message, who) => {
    setMessages(prevMessages => [...prevMessages, {data: message, who:who}]);
  }
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, right: '10px', zIndex: 1000 }}>
      {!isChatOpen ? (
        <div className={classes.chatClosed} onClick={toggleChat}>
          <ChatIcon /> <span>Let us help you</span>
        </div>
      ) : (
        <Paper className={classes.paper}>
          <IconButton className={classes.closeButton} onClick={toggleChat} variant="contained" style={{ backgroundColor: 'black', color: 'white' }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{ backgroundColor: 'black', color: 'white', textAlign: 'center', width:"100%"}}>
            <Typography variant="body1">Live Support</Typography>
          </Box>
          <Paper id="style-1" className={classes.messagesBody}>
            {messages?.map((el) => {
              if(el.who === "chatGPT") {
                return (
                  <MessageLeft
                    message={el.data}
                    photoURL="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2pvYjcyNC0xODctcC5wbmc.png"
                    displayName="Eco Assistant"
                    avatarDisp={true}
                  />
                );
              } else {
                return (
                  <MessageRight
                  message={el.data}
                  photoURL="https://images.rawpixel.com/image_png_800/cHJpvmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2pvYjcyNC0xODctcC5wbmc.png"
                  displayName="Me"
                  avatarDisp={false}
                />
                )
              }
            })}
          </Paper>
          <TextInput appendNewMessage={appendNewMessage}/>
        </Paper>
      )}
    </Box>
  );
}

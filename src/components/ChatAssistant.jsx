import React, { useState } from 'react';
import { createStyles, makeStyles } from "@mui/styles";
import { MessageLeft, MessageRight } from "./Message";
import { TextInput } from "./TextInput";
import { Paper, Box, IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat'; // Import Chat icon
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon

const useStyles = makeStyles((theme) => createStyles({
  paper: {
    width: '20rem', // Adjusted width
    height: '25rem', // Adjusted height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#f1f0ee',
    borderRadius: '40px',
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
    borderRadius: '15px',
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
          <IconButton className={classes.closeButton} onClick={toggleChat}>
            <CloseIcon />
          </IconButton>
          <Paper id="style-1" className={classes.messagesBody}>
            <MessageLeft
              message="Mesaj chat"
              timestamp="MM/DD 00:00"
              photoURL="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2pvYjcyNC0xODctcC5wbmc.png"
              displayName="Eco assistant"
              avatarDisp={true}
            />
            <MessageRight
              message="Mesaj user"
              timestamp="MM/DD 00:00"
              photoURL="https://images.rawpixel.com/image_png_800/cHJpvmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2pvYjcyNC0xODctcC5wbmc.png"
              displayName="Me"
              avatarDisp={false}
            />
          </Paper>
          <TextInput />
        </Paper>
      )}
    </Box>
  );
}

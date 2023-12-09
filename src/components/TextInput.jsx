import React, {useState} from 'react'
import { createStyles, makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import TextField from "@mui/material/TextField";

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm : {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
      width: "100%"
    },
    button: {
      //margin: theme.spacing(1),
    },
  })
);


export const TextInput = ({appendNewMessage}) => {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleClick = (ev) => {
        ev.preventDefault();
        appendNewMessage(inputValue, "user")
        appendNewMessage("Searching the best results for you...", "chatGPT")
        setInputValue('');
        fetch("http://localhost:8080/chatgpt", {
            method: "post",
            body: inputValue
        }).then(data => data.text())
            .then(data => appendNewMessage(data, "chatGPT"));
    }

    const classes = useStyles();
  return (
    <form className={classes.wrapForm} noValidate autoComplete="off">
      <TextField
        id="standard-text"
        label="Ask me anything"
        className={classes.wrapText}
        size={"small"}
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button variant="contained" color="primary" className={classes.button} onClick={handleClick}>
        <SendIcon />
      </Button>
    </form>
  )
}


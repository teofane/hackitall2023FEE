import React from 'react'
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


export const TextInput = () => {
  const classes = useStyles();
  return (
    <form className={classes.wrapForm} noValidate autoComplete="off">
      <TextField
        id="standard-text"
        label="Ask me anything"
        className={classes.wrapText}
        size={"small"}
        //margin="normal"
      />
      <Button variant="contained" color="primary" className={classes.button}>
        <SendIcon />
      </Button>
    </form>
  )
}


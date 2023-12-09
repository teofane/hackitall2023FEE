import { createStyles, makeStyles } from "@mui/styles";
import { deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles((theme) =>
  createStyles({
    messageRow: {
      display: "flex",
      marginBottom: theme.spacing(1), // Adds spacing between each message row
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: theme.spacing(1),
    },
    messageBlue: {
      position: "relative",
      marginLeft: theme.spacing(2.5),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
      backgroundColor: "#A8DDFD",
      width: "60%",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #97C6E3",
      borderRadius: theme.shape.borderRadius,
      "&:after, &:before": { // Simplifies the arrow styling
        content: "''",
        position: "absolute",
        width: 0,
        height: 0,
        top: 0,
        borderTop: "15px solid #A8DDFD",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        left: "-15px",
      },
      "&:before": {
        borderTopColor: "#97C6E3",
        left: "-17px",
        top: "-1px",
      },
    },
    messageOrange: {
      position: "relative",
      marginRight: theme.spacing(2.5),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
      backgroundColor: "#f8e896",
      width: "60%",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #dfd087",
      borderRadius: theme.shape.borderRadius,
      "&:after, &:before": {
        content: "''",
        position: "absolute",
        width: 0,
        height: 0,
        top: 0,
        borderTop: "15px solid #f8e896",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        right: "-15px",
      },
      "&:before": {
        borderTopColor: "#dfd087",
        right: "-17px",
        top: "-1px",
      },
    },
    messageContent: {
      padding: 0,
      margin: 0,
      marginBottom: theme.spacing(1), // Space between message and timestamp
    },
    messageTimeStampRight: {
      fontSize: ".85em",
      fontWeight: "300",
      position: "absolute",
      bottom: "-15px",
      right: "5px",
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    displayName: {
      marginLeft: theme.spacing(2.5),
    },
  })
);

export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const displayName = props.displayName ? props.displayName : "名無しさん";
  const classes = useStyles();
  return (
    <>
      <div className={classes.messageRow}>
        <Avatar
          alt={displayName}
          className={classes.orange}
          src={photoURL}
        ></Avatar>
        <div>
          <div className={classes.displayName}>{displayName}</div>
          <div className={classes.messageBlue}>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
            <div className={classes.messageTimeStampRight}>{timestamp}</div>
          </div>
        </div>
      </div>
    </>
  );
};
//avatarが右にあるメッセージ（自分）
export const MessageRight = (props) => {
  const classes = useStyles();
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageOrange}>
        <p className={classes.messageContent}>{message}</p>
        <div className={classes.messageTimeStampRight}>{timestamp}</div>
      </div>
    </div>
  );
};

import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import RemoveIcon from "@material-ui/icons/Remove";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { deleteData } from "../services/addData";

const theme = createMuiTheme({
  palette: {
    action: {
      disabled: "#97A1A9",
      disabledBackground: "#97A1A9",
    },
  },
});

const useStyles = makeStyles({
  root: {
    color: "white",
    borderRadius: "8px",
    borderColor: "#14AFF1",
  },
  text: {
    fontFamily: "normal normal normal 20px/24px Ubuntu",
    fontSize: "1rem",
  },
  containedButton: {
    fontFamily: "normal normal normal 20px/24px Ubuntu",
    color: "#ffffff",
    backgroundColor: "#14AFF1",
    fontSize: "1rem",
    borderRadius: "8px",
    textTransform: "None",
    height: "2.3rem",
    marginLeft: "0.7vw",
    "&:hover": {
      backgroundColor: "#158bbd",
    },
  },
  outlinedButton: {
    color: "#ffffff",
    fontFamily: "normal normal normal 20px/24px Ubuntu",
    fontSize: "1rem",
    borderRadius: "8px",
    textTransform: "None",
    height: "2.3rem",
    border: "1px solid #14AFF1",

    "&:hover": {
      border: "1px solid #14AFF1",
    },
  },
  mainButton: {
    color: "#ffffff",
    fontFamily: "normal normal normal 20px/24px Ubuntu",
    fontSize: "1rem",
    borderRadius: "8px",
    textTransform: "None",
    height: "2.3rem",
    width: "6vw",
    padding: "15px 20px 15px 20px",
    border: "1px solid #14AFF1",
    marginLeft: "1vw",
    "&:hover": {
      border: "1px solid #14AFF1",
    },
  },
  spanEdit: {
    color: "#FF5E5E",
  },
});

export default function EditButton(props) {
  const [open, setOpen] = React.useState(false);
  const row = props.selectedRow;
  console.log(row);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async (e) => {
    
    e.preventDefault();
    let response = await deleteData(row);

    if(response){
      window.alert("Deleted row no ",row);
      setOpen(false);
    }
  };

  const classes = useStyles();

  return (
    <div style={{ display: "flex" }}>
      {props.numSelected > 0 ? (
        <Button
          className={classes.mainButton}
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          <RemoveIcon /> Delete
        </Button>
      ) : (
        <ThemeProvider theme={theme}>
          {" "}
          <Button
            disabled
            className={classes.mainButton}
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}
          >
            <RemoveIcon /> Delete
          </Button>
        </ThemeProvider>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle
          style={{
            backgroundColor: "#2A3E4C",
            color: "#FFFFFF",
            position: "relative",
          }}
          id="form-dialog-title"
        >
          Delete record(s)?
          <CloseIcon
            onClick={handleClose}
            className={classes.root}
            variant="outlined"
            color="primary"
            style={{ paddingLeft: "12vw", marginTop: "1vh" }}
          />
        </DialogTitle>

        <div
          style={{
            backgroundColor: "#2A3E4C",
            color: "#97A1A9",
            display: "flex",
          }}
        >
          <DialogContent className={classes.text}>
            You'll lose your record(s) after this action. We can't recover them
            once you delete.
            <Typography>
              <br /> Are you sure you want to{" "}
              <span className={classes.spanEdit}>permanently delete</span> them?{" "}
            </Typography>
            <br />
          </DialogContent>
        </div>

        <DialogActions style={{ backgroundColor: "#2A3E4C" }}>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleClose}
              className={classes.outlinedButton}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className={classes.containedButton}
              variant="contained"
              color="primary"
            >
              Delete
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
    // </div>
  );
}

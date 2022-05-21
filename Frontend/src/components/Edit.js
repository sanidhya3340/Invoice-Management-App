import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { updateData } from "../services/addData";

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
  textButton: {
    color: "#14AFF1",
    fontFamily: "normal normal normal 20px/24px Ubuntu",
    fontSize: "1rem",
    borderRadius: "8px",
    textTransform: "None",
    height: "2.3rem",
    marginLeft: "1.1vw",
  },
  containedButton: {
    fontFamily: "normal normal normal 20px/24px Ubuntu",
    color: "#ffffff",
    backgroundColor: "#14AFF1",
    fontSize: "1rem",
    borderRadius: "8px",
    textTransform: "None",
    height: "2.3rem",
    marginLeft: "1vw",
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
    padding: "15px 20px 15px 20px",
    border: "1px solid #14AFF1",
    marginLeft: "7vw",
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
    padding: "15px 20px 15px 20px",
    border: "1px solid #14AFF1",
    "&:hover": {
      border: "1px solid #14AFF1",
    },
  },
});

export default function EditButton(props) {
  console.log(props);
  const [open, setOpen] = React.useState(false);
  // const [slNo, setSlNo] = React.useState();
  const [invoiceCurrency, setInvoiceCurrency] = React.useState();
  const [custPaymentTerms, setCustPaymentTerms] = React.useState();
  // setSlNo(props.selectedRow)
  // const [edit, setEdit] = React.useState({
  //   sl_no: props.selectedRow,
  //   invoiceCurrency: "",
  //   custPaymentTerms: "",
  // });

  // console.log(edit);

  const handleReset = (event) => {
    setInvoiceCurrency("");
    setCustPaymentTerms("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (invoiceCurrency === "CAD" || invoiceCurrency === "USD") {
      let response = await updateData(
        props.selectedRow,
        invoiceCurrency,
        custPaymentTerms
      );

      if (response) {
        window.alert("Data Updated");
      }

      setOpen(false);
    } else{
      window.alert("Enter valid input")
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
          <EditIcon /> Edit
        </Button>
      ) : (
        <ThemeProvider theme={theme}>
          {" "}
          <Button
            disabled
            variant="outlined"
            className={classes.mainButton}
            onClick={handleClickOpen}
          >
            <EditIcon /> Edit
          </Button>
        </ThemeProvider>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          style={{
            backgroundColor: "#2A3E4C",
            color: "#FFFFFF",
            position: "relative",
          }}
          id="form-dialog-title"
        >
          Edit Invoice
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
          <div>
            <DialogContent>
              Invoice Currency
              <TextField
                required
                autoFocus
                value={invoiceCurrency}
                onChange={(e) => {
                  setInvoiceCurrency(e.target.value);
                }}
                name="total_currency"
                margin="dense"
                id="name"
                label=""
                type="string"
                variant="outlined"
                fullWidth
                InputProps={{ style: { color: "white" } }}
              />
            </DialogContent>
            <DialogContent>
              Customer Payment Terms
              <TextField
                required
                autoFocus
                value={custPaymentTerms}
                onChange={(e) => {
                  setCustPaymentTerms(e.target.value);
                }}
                name="cust_payment_terms"
                margin="dense"
                id="name"
                label=""
                type="string"
                variant="outlined"
                fullWidth
                InputProps={{ style: { color: "white" } }}
              />
            </DialogContent>
          </div>
        </div>

        <DialogActions style={{ backgroundColor: "#2A3E4C" }}>
          <Grid item xs={6}>
            <Button
              onClick={handleClose}
              className={classes.textButton}
              variant="text"
              color="primary"
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleReset}
              className={classes.outlinedButton}
              variant="outlined"
              color="primary"
            >
              Reset
            </Button>
            <Button
              onClick={handleSave}
              className={classes.containedButton}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
    // </div>
  );
}

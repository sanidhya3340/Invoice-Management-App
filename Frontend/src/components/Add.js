import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import { Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { addDatatoBackend } from "../services/addData";

const useStyle = makeStyles((theme) => ({
  root: {
    color: "white",
    borderRadius: "8px",
    borderColor: "#14AFF1",
    "& .Mui-disabled": {
      borderColor: "#356680",
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
  add: {
    marginLeft: theme.spacing(1),
    width: "10vw",
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.primary.main,
    background: "#273D49CC",
  },
  root: {
    maxWidth: 900,
    height: 500,
    margin: "auto",
  },
  paperWidthSm: {
    maxWidth: 1900,
  },
  label: {
    color: "#97A1A9",
  },
  button: {
    float: "right",
  },
  TextField: {
    width: 300,
    height: 60,
    color: "white",
    padding: "0px 0px",
    fontSize: "1rem",
    border: "1px solid #356680",
    borderRadius: "10px",
    opacity: "1",
    backgroundColor: "#fff",
    borderColor: "#356680",
  },
  colour: {
    borderColor: "#14AFF1",
  },
  root: {
    "& .MuiOutlinedInput-input": {
      // padding: "5px 0px",
    },
    "& .MuiInputBase-input": {
      // color: "white",
      paddingLeft: "5px",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      paddingTop: "10px",
    },
  },
}));
export default function AddFormDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [businessCode, setBusinessCode] = useState("");
  const [custNumber, setCustNumber] = useState("");
  const [clearDate, setClearDate] = useState("");
  const [buisnessYear, setBuisnessYear] = useState("");
  const [docId, setDocId] = useState("");
  const [postingDate, setPostingDate] = useState("");
  const [documentCreateDate, setDocumentCreateDate] = useState("");
  const [dueInDate, setDueInDate] = useState("");
  const [invoiceCurrency, setInvoiceCurrency] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [postingId, setPostingId] = useState("");
  const [totalOpenAmount, setTotalOpenAmount] = useState("");
  const [baselineCreateDate, setBaselineCreateDate] = useState("");
  const [custPaymentTerms, setCustPaymentTerms] = useState("");
  const [invoiceId, setInvoiceId] = useState("");

  // console.log(add);

  // const handleChange = (event) => {
  //   setAdd({ ...add, [event.target.name]: event.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = addDatatoBackend(
      businessCode,
      custNumber,
      clearDate,
      buisnessYear,
      docId,
      postingDate,
      documentCreateDate,
      dueInDate,
      invoiceCurrency,
      documentType,
      postingId,
      totalOpenAmount,
      baselineCreateDate,
      custPaymentTerms,
      invoiceId,
    );
    if(response){
      setBusinessCode = ""
      setCustNumber = ""
      setClearDate =""
      buisnessYear =""
      setDocId ="" 
      setPostingDate =""
      setDocumentCreateDate =""
      setDueInDate =""
      setInvoiceCurrency =""
      setDocumentType =""
      setPostingId =""
      setTotalOpenAmount =""
      setBaselineCreateDate =""
      setCustPaymentTerms =""
      setInvoiceId =""
    }
    window.alert("Data Added");
    setOpen(false);
  };

  const classes = useStyle();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const DialogContent = withStyles((theme) => ({
    root: {
      backgroundColor: "#2A3E4C",
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit * 2,
      // width:1000,
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      backgroundColor: "#2A3E4C",
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit,
    },
  }))(MuiDialogActions);
  
  return (
    <div>
      <Button
        className={classes.mainButton}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        <AddIcon /> Add
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: classes.paper,
          root: classes.root,
          paperWidthSm: classes.paperWidthSm,
        }}
      >
        <DialogTitle
          style={{
            backgroundColor: "#2A3E4C",
            color: "#FFFFFF",
            position: "relative",
          }}
          id="form-dialog-title"
        >
          Add Invoice
          <CloseIcon
            onClick={handleClose}
            className={classes.root}
            variant="outlined"
            color="primary"
            style={{ paddingLeft: "24.5vw", marginTop: "1vh" }}
          />
        </DialogTitle>

        <DialogContent>
          <form>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={businessCode}
                  onChange={(e) => setBusinessCode(e.target.value)}
                  label="Business Code"
                  className={classes.TextField}
                  type="String"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={custNumber}
                  onChange={(e) => setCustNumber(e.target.value)}
                  label="Customer Number"
                  className={classes.TextField}
                  // onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={clearDate}
                  onChange={(e) => setClearDate(e.target.value)}
                  label="Clear Date"
                  InputLabelProps={{ shrink: true }}
                  // onChange={handleChange}
                  className={classes.TextField}
                  type="string"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={buisnessYear}
                  onChange={(e) => setBuisnessYear(e.target.value)}
                  label="Business Year"
                  className={classes.TextField}
                  // onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={docId}
                  onChange={(e) => setDocId(e.target.value)}
                  label="Document Id"
                  className={classes.TextField}
                  // onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={postingDate}
                  onChange={(e) => setPostingDate(e.target.value)}
                  label="Posting Date"
                  className={classes.TextField}
                  InputLabelProps={{ shrink: true }}
                  // onChange={handleChange}
                  type="string"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={documentCreateDate}
                  onChange={(e) => setDocumentCreateDate(e.target.value)}
                  label="Document Create Date"
                  className={classes.TextField}
                  InputLabelProps={{ shrink: true }}
                  // onChange={handleChange}
                  type="string"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={dueInDate}
                  onChange={(e) => setDueInDate(e.target.value)}
                  label="Due Date"
                  className={classes.TextField}
                  InputLabelProps={{ shrink: true }}
                  // onChange={handleChange}
                  type="string"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={invoiceCurrency}
                  onChange={(e) => setInvoiceCurrency(e.target.value)}
                  label="Invoice Currency"
                  className={classes.TextField}
                  // onChange={handleChange}
                  type="string"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  label="Document Type"
                  className={classes.TextField}
                  // onChange={handleChange}
                  type="string"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={postingId}
                  onChange={(e) => setPostingId(e.target.value)}
                  label="Posting Id"
                  className={classes.TextField}
                  // onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={totalOpenAmount}
                  onChange={(e) => setTotalOpenAmount(e.target.value)}
                  label="Total Open Amount"
                  className={classes.TextField}
                  // onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={baselineCreateDate}
                  onChange={(e) => setBaselineCreateDate(e.target.value)}
                  label="Baseline Create Date"
                  className={classes.TextField}
                  InputLabelProps={{ shrink: true }}
                  // onChange={handleChange}
                  type="string"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={custPaymentTerms}
                  onChange={(e) => setCustPaymentTerms(e.target.value)}
                  label="Customer Payment Terms"
                  className={classes.TextField}
                  type="string"
                  // onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  required
                  value={invoiceId}
                  onChange={(e) => setInvoiceId(e.target.value)}
                  label="Invoice Id"
                  className={classes.TextField}
                  // onChange={handleChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <div className="ButtonHeader">
            <div className="right">
              <Button
                variant="outlined"
                color="#2C404E"
                onClick={handleSubmit}
                className={classes.colour}
                style={{
                  color: "#FFFFFF",
                  margin: "0 10px 0 0",
                  width: "47vw",
                  borderBlockColor: "#14AFF1",
                  borderColor: "#fff",
                }}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                color="#2C404E"
                className={classes.colour}
                style={{
                  color: "#FFFFFF",
                  width: "47vw",
                  borderBlockColor: "#14AFF1",
                  borderColor: "#fff",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

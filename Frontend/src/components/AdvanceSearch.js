import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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
    "& .Mui-disabled": {
      borderColor: "#356680",
    },
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
    padding: "15px 20px 15px 20px",
    border: "1px solid #14AFF1",
    marginLeft: "1vw",
    "&:hover": {
      border: "1px solid #14AFF1",
    },
  },
});

export default function AdvanceSearch({ newarray, setNewarray }) {
  const [open, setOpen] = React.useState(false);
  const [docId, setDocId] = React.useState("");
  const [invoiceId, setInvoiceId] = React.useState("");
  const [customerId, setCustomerId] = React.useState("");
  const [businessId, setBusinessId] = React.useState("");

  // console.log(docId, invoiceId, customerId, businessId);


  const prevData = newarray;

  const handleSearch = () => {
    let arr = newarray.filter((val) => {
      if (docId === "") {
        return val;
      } else if (val.doc_id.toString().includes(docId.toLowerCase())) {
        return val;
      }
      return null;
    });

    let arr2 = arr.filter((val) => {
      if (invoiceId === 0) {
        return val;
      } else if (val.invoice_id.toString().includes(invoiceId.toString())) {
        return val;
      }
      return null;
    });

    let arr3 = arr2.filter((val) => {
       if (customerId === "") {
         return val;
       } else if (val.cust_number.toLowerCase().includes(customerId.toLowerCase())) {
         return val;
       }
       return null;
    });

    let arr4 = arr3.filter((val) => {
      if (businessId === "") {
        return val;
      } else if (val.business_code.toLowerCase().includes(businessId.toLowerCase())) {
        return val;
      }
      return null;
    });

    setNewarray(arr4);
    setOpen(false);
  };
  const handleReset = () => {
    setDocId("");
    setInvoiceId("");
    setCustomerId("");
    setBusinessId("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <div style={{ display: "flex" }}>
      <ThemeProvider theme={theme}>
        {" "}
        <Button
          className={classes.coloredButton}
          variant=""
          color="primary"
          style={{ color: "white" }}
          onClick={handleClickOpen}
        >
          AdvanceSearch
        </Button>
      </ThemeProvider>

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
          Advance Search
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
              <TextField
                required
                autoFocus
                value={docId}
                onChange={(e) => setDocId(e.target.value)}
                name="document_id"
                margin="dense"
                id="name"
                placeholder="Document Id"
                label=""
                type="string"
                variant="outlined"
                fullWidth
                InputProps={{ style: { color: "white" } }}
              />
            </DialogContent>
            <DialogContent>
              <TextField
                required
                autoFocus
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                name="customer_id"
                margin="dense"
                id="name"
                placeholder="Customer Id"
                label=""
                type="string"
                variant="outlined"
                fullWidth
                InputProps={{ style: { color: "white" } }}
              />
            </DialogContent>
          </div>
          <div>
            <DialogContent>
              <TextField
                required
                autoFocus
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                name="invoice_id"
                margin="dense"
                id="name"
                placeholder="Invoice Id"
                label=""
                type="string"
                variant="outlined"
                fullWidth
                InputProps={{ style: { color: "white" } }}
              />
            </DialogContent>
            <DialogContent>
              <TextField
                required
                autoFocus
                value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
                name="business_id"
                margin="dense"
                id="name"
                placeholder="Business Id"
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
              className={classes.containedButton}
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

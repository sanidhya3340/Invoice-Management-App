import React, { useEffect,useState } from 'react'
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";
import Add from './Add';
import Edit from './Edit';
import RefreshIcon from "@material-ui/icons/Refresh";
import Delete from './Delete'
import { Search } from '@material-ui/icons';

import {
  makeStyles,
  Paper,
  Typography,
  withStyles,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Icon,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@material-ui/core";
// import InfiniteScroll from "react-infinite-scroll-component";
import Checkbox from "@material-ui/core/Checkbox";
import AdvanceSearch from './AdvanceSearch';

const SearchField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#356680",
      },
      "&:hover fieldset": {
        borderColor: "#269fd3",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#14AFF1",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#97A1A9",
    },
  },
})(TextField);

const styles = makeStyles(() => ({
  coloredButton: {
    color: "#ffffff",
    backgroundColor: "#14AFF1",
    fontFamily: "normal normal normal 20px/24px Ubuntu",
    fontSize: "1rem",
    borderRadius: "8px",
    textTransform: "None",
    height: "2.3rem",
    marginRight: "1.1vw",
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
    marginRight: "1vw",
    "&:hover": {
      backgroundColor: "#14AFF1",
    },
  },
  disabledButton: {
    fontFamily: "normal normal normal 20px/24px Ubuntu",
    fontSize: "1rem",
    borderRadius: "8px",
    textTransform: "None",
    height: "2.3rem",
    marginRight: "1.1vw",
  },
  table: {
    marginLeft: "1.2vw",
    marginRight: "1vw",
    marginBottom: " 1vh",
    width: "94.5vw",
  },
}));
export default function Main() {

  const [resdata, setResData] = useState([]);
  const [page,setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [refresh,setRefresh] = useState(1);
  const [newarray, setNewarray] = React.useState(resdata);
  const [pageno, setPageno] = useState(0);
  console.log(pageno);
  const handleClick = (event, invoice_id) => {
    const selectedIndex = selected.indexOf(invoice_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, invoice_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = newarray.map((n) => n.sl_no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `http://localhost:8080/Main_backend/Fetchten.do?page=${page}`
        );
        setResData(response.data)
        setNewarray(response.data)
         
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [page,refresh]);
  const isSelected = (sl_no) => selected.indexOf(sl_no) !== -1;
  const handlePage = () => {
    
      setPage(page+1);
  }
   const handlePagemin = () => {
     if (page > 1) setPage(page - 1);
   };

   const handlegoto = () => {
     setPage(pageno);
   }
  console.log("newarray",newarray);
  const handleSearch = () => {
    let arr = resdata.filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (
        val.cust_number.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val;
      }
      return null;
    });

    setNewarray(arr);
  }

  const classes = styles();
  return (
    <Grid
      container
      direction="column"
      md={12}
      lg={12}
      style={{ padding: "1.5vw" }}
    >
      <Grid item>
        <Typography
          variant="h6"
          style={{ color: "white", paddingBottom: "2vh" }}
        >
          Invoice List
        </Typography>
      </Grid>
      <Grid item>
        <Paper
          style={{
            background: "#273D49CC 0% 0% no-repeat padding-box",
            borderRadius: "0px",
            height: "77vh",
          }}
        >
          <Grid container md={12} lg={12} style={{ padding: "1vw" }}>
            <Grid container>
              <Grid item>
                <Button
                  className={classes.coloredButton}
                  variant="contained"
                  color="primary"
                >
                  Predict
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.coloredButton}
                  variant=""
                  color="primary"
                >
                  ANALYTICS VIEW
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.coloredButton}
                  variant=""
                  color="primary"
                >
                  <AdvanceSearch
                    newarray={newarray}
                    setNewarray={setNewarray}
                  />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.coloredButton}
                  variant=""
                  color="primary"
                  onClick={() => setRefresh(refresh + 1)}
                >
                  <RefreshIcon />
                </Button>
              </Grid>
              <Grid item>
                <SearchField
                  label="Search by custumer number"
                  variant="outlined"
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                  style={{
                    paddingLeft: "2vh",
                    borderColor: "#356680",
                    borderRadius: "8px",
                    textTransform: "None",
                  }}
                  InputProps={{
                    style: {
                      color: "white",
                      paddingBottom: "5vh",
                      width: "15vw",
                      height: "5vh",
                    },
                  }}
                />
                <button
                  onClick={handleSearch}
                  className={classes.coloredButton}
                >
                  <Search />
                </button>
              </Grid>
              <Grid item style={{ marginLeft: "auto" }}>
                <Add numSelected={selected.length} />
              </Grid>
              <Grid item>
                <Edit numSelected={selected.length} selectedRow={selected[0]} />
              </Grid>
              <Grid item>
                <Delete
                  numSelected={selected.length}
                  selectedRow={selected[0]}
                />
              </Grid>
            </Grid>
          </Grid>
          <div id="scrollableDiv" style={{ height: 500, overflow: "auto" }}>
            <InfiniteScroll
              dataLength={resdata.length}
              // next={fetchMoreData}
              // hasMore={isNext}
              loader={<h4>Loading</h4>}
              scrollableTarget="scrollableDiv"
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                className={classes.table}
              >
                <thead>
                  <tr>
                    <TableCell padding="checkbox">
                      {" "}
                      <Checkbox
                        onChange={handleSelectAllClick}
                        inputProps={{ "aria-label": "select all invocies" }}
                      />
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>Sl No</TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Business Code
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Customer Number
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Clear Date
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Bussiness Year
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Document Id
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Posting Date
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Document Create Date
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>Due Date</TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Invoice Currency
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Document Type
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Total Open Amount
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Invoice Id
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Cust Payment Terms
                    </TableCell>
                    <TableCell style={{ color: "#97A1A9" }}>
                      Aging Bucket
                    </TableCell>
                  </tr>
                </thead>
                <tbody>
                  {newarray.map((d, key) => (
                    <tr
                      key={key}
                      hover
                      onClick={(event) => handleClick(event, d.sl_no)}
                      role="checkbox"
                      aria-checked={isSelected(d.sl_no)}
                      tabIndex={-1}
                      selected={isSelected(d.sl_no)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected(d.sl_no)}
                          style={{ color: "white" }}
                        ></Checkbox>
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.sl_no}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.business_code}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.cust_number}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.clear_date}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.business_year}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.doc_id}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.posting_date}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.document_create_date}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.due_in_date}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.invoice_currency}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>RV</TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.total_open_amount}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.invoice_id}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.cust_payment_terms}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {d.aging_bucket}
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </InfiniteScroll>
          </div>
        </Paper>
        <div style={{ display: "flex", height: "15px", alignItems: "center" }}>
          <button onClick={handlePagemin}>-</button>
          <p style={{ color: "white" }}>{page}</p>
          <button onClick={handlePage}>+</button>
          <input value={pageno} onChange={(e) => setPageno(e.target.value)} />
          <button onClick={handlegoto} className={classes.coloredButton}>
            Go
          </button>
        </div>
      </Grid>
    </Grid>
  );
}

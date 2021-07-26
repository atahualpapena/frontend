import React from 'react';
import axios from 'axios';
import {
  Button,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
});

const DevicesTable = () => {
  const classes = useStyles();
  const [devices, setDevices] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  React.useEffect(() => {
    const fetchDevices = async () => {
      const res = await axios.get(`http://localhost:5502/devices/${currentPage}`)
      setDevices(res.data)
    };
    fetchDevices();
  });

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    console.log(currentPage);
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    console.log(currentPage);
  }

  const openDetails = (iccid) => {
    console.log(iccid)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ICCID</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Rate Plan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.iccid} hover={true} onClick={ () => openDetails(device.iccid)}>
              <TableCell component="th" scope="post"  >
                {device.iccid}
              </TableCell>
              <TableCell align="right">{device.status}</TableCell>
              <TableCell align="right">{device.ratePlan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button disabled={currentPage === 1} onClick={ () => handlePreviousPage()}>
      Previous
      </Button>
      <Button onClick={ () => handleNextPage()}>
      Next
      </Button>
    </TableContainer>

  );
}

export default DevicesTable;
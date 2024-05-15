import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Collapse, Typography, Box } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const CollapsibleTable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
  };
  const headingStyle = {
    margin: '0',
    marginRight: '20px', // Pushes the button to the right
  };

  const buttonStyle = {
    /* Add your button styles inline */
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('collapsible_table');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const ParentRow = ({ row, setOpen, open }) => (
    <TableRow>
      <TableCell>
        <IconButton size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </TableCell>
      <TableCell>{row.ORDERKEY}</TableCell>
      <TableCell>{row.O_CUSTKEY}</TableCell>
      <TableCell>{row.O_ORDERSTATUS}</TableCell>

      <TableCell>{row.O_TOTALPRICE}</TableCell>
      <TableCell>{row.O_ORDERDATE}</TableCell>
      <TableCell>{row.O_ORDERPRIORITY}</TableCell>

      <TableCell>{row.O_CLERK}</TableCell>
      <TableCell>{row.O_SHIPPRIORITY}</TableCell>
      <TableCell>{row.O_COMMENT}</TableCell>
    </TableRow>
  );

  const ChildRow = ({ orderLines, isOpen }) => (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
              Child Rows
            </Typography>
            <Table size="small" aria-label="child-rows">
              <TableHead>
                <TableRow>
                  <TableCell>ORDERKEY</TableCell>
                  <TableCell>L_PARTKEY</TableCell>
                  <TableCell>L_QUANTITY</TableCell>
                  <TableCell>L_EXTENDEDPRICE</TableCell>
                  <TableCell>L_RETURNFLAG</TableCell>
                  <TableCell>L_SHIPDATE</TableCell>
                  <TableCell>L_SHIPINSTRUCT</TableCell>
                  <TableCell>L_RECEIPTDATE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderLines.map((orderLine, index) => (
                  <TableRow key={index}>
                    <TableCell>{orderLine.ORDERKEY}</TableCell>
                    <TableCell>{orderLine.L_PARTKEY}</TableCell>
                    <TableCell>{orderLine.L_QUANTITY}</TableCell>
                    <TableCell>{orderLine.L_EXTENDEDPRICE}</TableCell>
                    <TableCell>{orderLine.L_RETURNFLAG}</TableCell>
                    <TableCell>{orderLine.L_SHIPDATE}</TableCell>
                    <TableCell>{orderLine.L_SHIPINSTRUCT}</TableCell>
                    <TableCell>{orderLine.L_RECEIPTDATE}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <div>
    <div style={containerStyle}>
      <Typography style={headingStyle} variant="h4" gutterBottom>
        Collapsible Table
      </Typography>      
      </div>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ORDERKEY</TableCell>
            <TableCell>O_CUSTKEY</TableCell>
            <TableCell>O_ORDERSTATUS</TableCell>

            <TableCell>O_TOTALPRICE</TableCell>
            <TableCell>O_ORDERDATE</TableCell>
            <TableCell>O_ORDERPRIORITY</TableCell>

            <TableCell>O_CLERK</TableCell>
            <TableCell>O_SHIPPRIORITY</TableCell>
            <TableCell>O_COMMENT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <React.Fragment key={index}>
              <ParentRow
                row={row}
                open={selectedRow === index}
                setOpen={() => {
                  if (selectedRow === index) {
                    setSelectedRow(null);
                  } else {
                    setSelectedRow(index);
                  }
                }}
              />
              <ChildRow
                orderLines={row.ORDER_LINES}
                isOpen={selectedRow === index}
              />
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default CollapsibleTable;

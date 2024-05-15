import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function BasicTable() {
    const [data, setData] = useState([]);

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
    const fetchData = async () => {
      try {
        const response = await fetch('/basic_table');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    return (
      <div>    
      <div style={containerStyle}>
      <Typography style={headingStyle} variant="h4" gutterBottom>
        Basic Table
      </Typography>
      <Button style={buttonStyle} onClick={fetchData} variant="contained">Fetch Data</Button>                
      </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>Customer Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Order Date</TableCell>                              
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.O_ORDERKEY}</TableCell>
                  <TableCell>{item.O_CUSTKEY}</TableCell>
                  <TableCell>{item.O_ORDERSTATUS}</TableCell>
                  <TableCell>{item.O_TOTALPRICE}</TableCell>
                  <TableCell>{item.O_ORDERDATE}</TableCell>                                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

export default BasicTable;
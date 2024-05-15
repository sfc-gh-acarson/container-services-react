import React, { useState } from 'react';
import { DataGrid, GridPagination } from '@mui/x-data-grid';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
function Pagination() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5); // Adjust the number of rows per page as needed
  const [rows, setRows] = useState([]);

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
      const response = await axios.get('/paged_table');
      const dataWithIds = response.data.map((row, index) => ({ ...row, id: index + 1 }));

      //const response = await fetch('/context');
      setRows(dataWithIds);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  const handleButtonClick = () => {
    fetchData();
  };

  

  return (
    <div style={{ height: 400, width: '100%' }}>              
      <div style={containerStyle}>
      <Typography style={headingStyle} variant="h4" gutterBottom>
        Pagination
      </Typography>
      <Button style={buttonStyle} onClick={handleButtonClick} variant="contained">Fetch Data</Button>                
      </div>
      <DataGrid
        rows={rows}
        columns={[
          { field: 'O_ORDERKEY', headerName: 'O_ORDERKEY', width: 200 },
          { field: 'O_CUSTKEY', headerName: 'O_CUSTKEY', width: 200 },
          { field: 'O_ORDERSTATUS', headerName: 'O_ORDERSTATUS', width: 200 },
          { field: 'O_TOTALPRICE', headerName: 'O_TOTALPRICE', width: 200 },
          { field: 'O_ORDERDATE', headerName: 'O_ORDERDATE', width: 200 },
          { field: 'O_ORDERPRIORITY', headerName: 'O_ORDERPRIORITY', width: 200 },
          { field: 'O_CLERK', headerName: 'O_CLERK', width: 200 },
          { field: 'O_SHIPPRIORITY', headerName: 'O_SHIPPRIORITY', width: 200 },
          { field: 'O_COMMENT', headerName: 'O_COMMENT', width: 200 },
        
        ]}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]} // Customize the options as needed
        page={page}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        components={{
          Pagination: GridPagination,
        }}
      />
    </div>
  );
}

export default Pagination;

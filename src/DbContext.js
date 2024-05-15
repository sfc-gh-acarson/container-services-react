import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  function BasicTable({rows_new}) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>              
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">CURRENT_USER</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows_new.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.ID}</TableCell>
                <TableCell align="right">{row.CURRENT_USER}</TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
const TableComponent = ({ data }) => {    
    const headers = Object.keys(data[0]);
    const rows = data.map(item => Object.values(item));
  
    return (
      <table>
        <thead>
          <tr>
            {headers.map(header => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => <td key={index}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
function TestApp() {
// usestate for setting a javascript
    // object for storing and using data
    const [data, setdata] = useState({
        name: "",
        age: 0,
        date: "",
        programming: "",
    });
 
    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("/data").then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata({
                    name: data.Name,
                    age: data.Age,
                    date: data.Date,
                    programming: data.programming,
                });
            })
        );
    }, []);
 
    return (
        <div className="App">
            <header className="App-header">
                <h1>React and flask</h1>
                {/* Calling a data from setdata for showing */}
                <p>{data.name}</p>
                <p>{data.age}</p>
                <p>{data.date}</p>
                <p>{data.programming}</p>
 
            </header>
        </div>
    );
}
const DbContextOld = () => {
    const [users, setUsers] = useState();

    const getData = async () => {      
      const response = await fetch('/context')
      const results = await response.json().then((data) => {
        // Setting a data from api
        setUsers({
            id: data.ID,
            current_user: data.CURRENT_USER
        });
    });
      console.log(results.data);      
      //setUsers(results.data);
  //    setUsers({
  //      id: results.data.ID,
  //      current_user: results.data.CURRENT_USER        
  //  });
    };    
    const jsonData = [
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Smith', age: 25 },
        { id: 3, name: 'Bob Johnson', age: 35 }
      ];
    return (
      <div>
        <h1>Text</h1>
        <Button onClick={getData}>Button</Button>
        
       {<p>{users}</p>}
       <TestApp></TestApp>
       <TableComponent data={jsonData} />
      </div>
    );
  };

  function doSomething(){

  }
  
  const DbContext = () => {
    const [users, setUsers] = useState([]);    
    const [test, setTest] = useState(false);    

    const getData = async () => {      
      const response = await fetch('/context')
      const results = await response.json();
      console.log(results.data);      
      setUsers(results.data);
      setTest(true);
      
  //    setUsers({
  //      id: results.data.ID,
  //      current_user: results.data.CURRENT_USER        
  //  });
    };    
    const jsonData = [
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Smith', age: 25 },
        { id: 3, name: 'Bob Johnson', age: 35 }
      ];      
        
      console.log(users)
      
      if (test){
        return (
            <div>                            
            <BasicTable rows_new={users}></BasicTable>     
            </div>
          );       
      } else {
        return (
            <div>                            
            <Button onClick={getData}>Get Data</Button>
            <p>placehodler</p>
            </div>
          ); 
      }
      
  };
  
export default DbContext;


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { MdAccountCircle, MdCancel } from 'react-icons/md';
import { IoMdSettings } from "react-icons/io";

function createData(no, Name, DateCreated, Role, Status, Action) {
    return { no, Name, DateCreated, Role, Status, Action };
}

const rows = [
    createData(1, 'Michael Holz', "04/12/2023", "Admin", "Active"),
    createData(2, 'PAULA Wilson', "04/05/2023", "Publisher", "Active"),
    createData(3, 'Antonio Moreno', "05/08/2023", "Publisher", "Suspended"),
    createData(4, 'Mary Sarveley', "14/11/2023", "Reviewer", "Active"),
    createData(5, 'Martin SOMMER', "06/07/2023", "Moderator", "Inactive"),
];

export default function DataTable() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully");
      };

    const getStatusColor = (status) => (
        status === 'Active' ? 'rgba(0, 255, 0, 0.2)' :
            status === 'Suspended' ? 'rgba(255, 255, 0, 0.2)' :
                status === 'Inactive' ? 'rgba(255, 0, 0, 0.2)' :
                    'transparent'
    );

    return (
        <>
            <div className='flex gap-4 flex-col items-center'>
                <h1 className='font-bold text-5xl text-center'>WELCOME</h1>
                <button  onClick={handleLogout} className='border rounded-lg text-xl p-1 px-4'>Logout</button>
            </div>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <TableContainer className='mt-5 mb-10' component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="right">Date Created</TableCell>
                                    <TableCell align="right">Role</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow
                                        key={row.Name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="left">
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <MdAccountCircle style={{ fontSize: 24, marginRight: 8 }} />
                                                {row.Name}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">{row.DateCreated}</TableCell>
                                        <TableCell align="right">{row.Role}</TableCell>
                                        <TableCell align="right">
                                            <div className='text-center rounded-lg font-bold' style={{ backgroundColor: getStatusColor(row.Status) }}>
                                                {row.Status}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '8px' }}>
                                                    <IoMdSettings style={{ fontSize: 24, color: '#000' }} />
                                                </button>
                                                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                                    <MdCancel style={{ fontSize: 24, color: '#ff0000' }} />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
}

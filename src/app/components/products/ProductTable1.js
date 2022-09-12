import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Paragraph } from 'app/components/Typography';
import { Box, Card, IconButton, Icon } from '@mui/material';
const tableHeadData = [
    { label: 'Sr.No#' },
    { label: 'Name' },
    { label: 'Modification Date' },
    { label: 'Ceated Date' },
    { label: 'Actions' },
];
const tableBodyData = [
    { id: '1', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '2', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '3', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '4', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '5', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '6', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '7', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '8', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '9', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '10', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '11', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '12', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '13', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '14', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '15', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '16', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '17', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '18', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '19', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '20', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '21', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '22', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '23', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '24', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '25', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '26', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
    { id: '27', name: 'LapTop', modidate: '12-10-2018', createddate: '15-10-2020' },
];
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    CardTitle: {
        padding: 20,
        '& h2': {
            FontSize: '60px'
        }
    }
});
export default function CategoeryTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Card className={classes.root}>
            <div className={classes.CardTitle}>
                <h2>Categoery List are Here</h2>
            </div>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {tableHeadData.map((data) => (
                                <TableCell >
                                    {data.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableBodyData.map((todo, index) => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        {todo.id}
                                    </TableCell>
                                    <TableCell>
                                        {todo.name}
                                    </TableCell>
                                    <TableCell>
                                        {todo.modidate}
                                    </TableCell>
                                    <TableCell>
                                        {todo.createddate}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <Icon color="primary">edit</Icon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })};
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={tableBodyData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}
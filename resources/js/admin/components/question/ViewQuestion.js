import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import axios from 'axios';
import RequestService from '../../../Service/RequestService';
import Header from '../../shared-components/header/Header';
import { Button, Fab, Switch, TableHead } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';



function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(id, calories, fat) {
  return { id, calories, fat };
}

const request = new RequestService;



export default function ViewQuestion(props) {

    const [rows,setRows] = React.useState([]);

    React.useEffect(()=>{
        request.getRequest('view-question').then((res)=>{
            setRows(res.data.data);

        }).catch((err)=>{
            console.log(err);
        });
    },[]);


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteQuestion = (id) =>{
    toastr.warning("Please wait...");

    request.DeleteRequest('delete-question/'+id).then((res)=>{

        toastr.success("Question Deleted!");
    }).catch((err)=>{
        console.log(err);
    });


    request.getRequest('view-question').then((res)=>{
        setRows(res.data.data);

    }).catch((err)=>{
        console.log(err);
    });

  }


  const statusQuestion = (id) =>{
    toastr.warning("Please wait...");

    request.PatchRequest('update-question-status/'+id).then((res)=>{

        toastr.success("Question Status Updatad!");
    }).catch((err)=>{
        console.log(err);
    });


    request.getRequest('view-question').then((res)=>{
        setRows(res.data.data);

    }).catch((err)=>{
        console.log(err);
    });

  }

  const editQuestion = (id="") =>{
      props.id(id);
      props.changePage(true);
  }

  const columns = [
    {
        id: 'id',
        label: 'ID',
        minWidth: 40
    },
    {
      id: 'Question',
      label: 'Question',
      align: 'left'
    },
    {
      id: 'answer',
      label: 'Answer',
      align: 'left'
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'center'
    }
  ];

  return (
            <Box maxWidth={1200} margin={"2% auto"}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <h2>View Questions</h2>
                    <Button variant="contained" color="primary" onClick={()=>{
                        props.changePage(true);
                        props.id(0);
                    }}>Add Question</Button>
                </div>
                <TableContainer component={Paper}>
                <Table aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row) => (
                        <TableRow key={row.id}>
                        <TableCell style={{ width: 40 }} component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="left">
                            {row.question}
                        </TableCell>
                        <TableCell align="left">
                            {row.answer}
                        </TableCell>
                        <TableCell align="center">
                            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                <Fab color="secondary" aria-label="delete" size='small' onClick={()=>{
                                    deleteQuestion(row.id);
                                }}>
                                    <DeleteIcon />
                                </Fab>
                                <Fab color="primary" aria-label="edit" size='small' onClick={()=>{
                                    editQuestion(row.id)
                                }}>
                                    <EditIcon />
                                </Fab>
                                <Fab color="default" aria-label="edit" size='small' onClick={()=>{
                                    statusQuestion(row.id);
                                }}>
                                    <Switch {...{ inputProps: { 'aria-label': 'Question status' } }} defaultChecked={row.status == 1?true:false} />
                                </Fab>
                            </Box>
                        </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                            'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                    </TableFooter>
                </Table>
                </TableContainer>
            </Box>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import TableSortLabel from '@mui/material/TableSortLabel';

const fechaConPalabras = (miFecha) => {
  const fecha = new Date(miFecha);
  const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaConPalabras = fecha.toLocaleDateString('es-ES', opcionesFecha);
  return (fechaConPalabras);
};

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  esES,
);

const columns = [
  {
    id: 'iteration_number',
    label: 'Iteración',
    align: 'left',
    minWidth: 100
  },
  {
    id: 'goal',
    label: 'Objetivo',
    align: 'left',
    minWidth: 170
  },
  {
    id: 'state',
    label: 'Estado',
    align: 'left',
    minWidth: 100
  },
  {
    id: 'start_date',
    label: 'Fecha Inicio Iteración',
    align: 'left',
    minWidth: 200
  },
  {
    id: 'end_date',
    label: 'Fecha Término Iteración',
    align: 'left',
    minWidth: 220
  },
  {
    id: 'task_qty',
    label: 'Cantidad Tareas',
    align: 'left',
    minWidth: 170
  },
  {
    id: 'users_qty',
    label: 'Usuarios Activos',
    align: 'left',
    minWidth: 170
  },
  {
    id: 'users_qty_complete',
    label: 'Usuarios Finalizados',
    align: 'left',
    minWidth: 200
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#435F7A',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  '&.MuiTableSortLabel-root': {
    color: '#FFFFFF', // Cambia este valor al color que desees
  },
}));

export default function TableIterations(props) {
  const { content } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('iteration_number');

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <StyledTableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={createSortHandler(column.id)}
                    >
                      {column.label}
                    </StyledTableSortLabel>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(content, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      let value
                      if (column.id === 'start_date' || column.id === 'end_date') {
                        value = fechaConPalabras(row[column.id]);
                      } else if (column.id === 'iteration_number') {
                        value = "Iteración " + row[column.id]
                      } else {
                        value = row[column.id]
                      }
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.id === 'iteration_number' ? (
                            <Link to={row.id.toString()}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </Link>
                          ) : (
                            column.format && typeof value === 'number'
                              ? column.format(value)
                              : value
                          )}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={content.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          classes={{ toolbar: 'centered-pagination' }}
        />
      </Paper>
    </ThemeProvider>
  );
}

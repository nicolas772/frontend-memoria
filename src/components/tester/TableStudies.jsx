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
import TableSortLabel from '@mui/material/TableSortLabel'; // Paso 1: Importar TableSortLabel
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';


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
    id: 'software_name',
    label: 'Nombre Software',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'software_tipe',
    label: 'Tipo',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'active_iteration_qty',
    label: 'Iteraciones Activas',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'iteration_qty',
    label: 'Total Iteraciones',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'url',
    label: 'URL',
    minWidth: 170,
    align: 'left',
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
    color: '#FFFFFF', // Paso 4: Cambiar el color del texto del título de la columna
  },
}));

export default function TableStudies(props) {
  const { content } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [orderBy, setOrderBy] = useState(''); // Paso 2: Definir el estado para la ordenación
  const [order, setOrder] = useState('asc');

  // Paso 3: Crear una función para manejar la ordenación de la tabla
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
                    <StyledTableSortLabel // Paso 1: Agregar TableSortLabel
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
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.id === 'software_name' || column.id === 'url' ? (
                            <Link to={column.id === 'url' ? value : row.id.toString()} target={column.id === 'url' ? "_blank" : ""}>
                              {column.id === 'url' ? 'Sitio Web' : value}
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

// Funciones auxiliares para la ordenación
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Title } from "@tremor/react";

// Función para formatear el tiempo en milisegundos a "x min y seg"
const formatTime = (milliseconds) => {
   const totalSeconds = Math.floor(Math.abs(milliseconds) / 1000);
   const minutes = Math.floor(totalSeconds / 60);
   const seconds = totalSeconds % 60;
   const sign = milliseconds < 0 ? '-' : ''; // Agregamos el signo negativo si es necesario
   return `${sign}${minutes}m ${seconds}s`;
};

// Función para asignar colores basados en la proximidad al máximo
const getRowColor = (value, maxDiference, minNegativeDiference) => {
   if (value >= 0) {
      const intensity = Math.round((value / maxDiference) * 150);
      return `rgba(255, ${255 - intensity}, ${255 - intensity}, 1)`;
   } else {
      const intensity = Math.round((value / minNegativeDiference) * 100); // Ajustamos a 100 para un verde más oscuro
      return `rgba(${255 - intensity}, 255, ${255 - intensity}, 1)`; // Usamos el valor máximo de 255 para verde
   }
};

export default function TableDashGeneralIteration(props) {
   const { content, title, color } = props
   const [orderBy, setOrderBy] = useState('name');
   const [order, setOrder] = useState('asc');

   const handleRequestSort = (property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

   const sortedRows = content.sort((a, b) => {
      if (orderBy === 'name') {
         return order === 'asc' ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]);
      } else {
         const aValue = a[orderBy];
         const bValue = b[orderBy];

         return order === 'asc' ? aValue - bValue : bValue - aValue;
      }
   });

   const maxDiference = Math.max(...content.map(row => (row.diference <= 0) ? 0 : row.diference));
   const minNegativeDiference = Math.min(...content.map(row => (row.diference < 0) ? row.diference : 0));

   return (
      <TableContainer component={Paper} style={{ maxHeight: 396, overflowY: 'auto' }}>
         <Title className='m-4'>{title}</Title>
         <Table stickyHeader sx={{ minWidth: 500, minHeight: 200 }} aria-label="sortable table">
            <TableHead>
               <TableRow>
                  <TableCell>
                     <TableSortLabel
                        active={orderBy === 'name'}
                        direction={orderBy === 'name' ? order : 'asc'}
                        onClick={() => handleRequestSort('name')}
                     >
                        <strong>Tarea</strong>
                     </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                     <TableSortLabel
                        active={orderBy === 'avgTime'}
                        direction={orderBy === 'avgTime' ? order : 'asc'}
                        onClick={() => handleRequestSort('avgTime')}
                     >
                        <strong>Tiempo Promedio</strong>
                     </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                     <TableSortLabel
                        active={orderBy === 'optTime'}
                        direction={orderBy === 'optTime' ? order : 'asc'}
                        onClick={() => handleRequestSort('optTime')}
                     >
                        <strong>Tiempo óptimo</strong>
                     </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                     <TableSortLabel
                        active={orderBy === 'diference'}
                        direction={orderBy === 'diference' ? order : 'asc'}
                        onClick={() => handleRequestSort('diference')}
                     >
                        <strong>Diferencia</strong>
                     </TableSortLabel>
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {sortedRows.map((row) => (
                  <TableRow
                     key={row.name}
                  //sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: getRowColor(row.diference, maxDiference, minNegativeDiference) }}
                  >
                     <TableCell component="th" scope="row" style={{ width: '30%' }}>
                        {row.name}
                     </TableCell>
                     <TableCell align="center">{formatTime(row.avgTime)}</TableCell>
                     <TableCell align="center">{formatTime(row.optTime)}</TableCell>
                     <TableCell align="center" >
                        <div style={{ backgroundColor: getRowColor(row.diference, maxDiference, minNegativeDiference), padding: '8px', borderRadius: '4px' }}>
                           {formatTime(row.diference)}
                        </div>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>

   );
}

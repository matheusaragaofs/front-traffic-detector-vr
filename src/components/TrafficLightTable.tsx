import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export function TrafficLightTable() {
  const data = [
    {
      signal: 'Sinal 1',
      location: 'Av. Conde Boa Vista',
      date: 'Maio 25, 2023',
      status: 'Livre',
      volume: '10%',
    },
    {
      signal: 'Sinal 2',
      location: 'Av. Conde Boa Vista',
      date: 'Maio 25, 2023',
      status: 'Livre',
      volume: '30%',
    },
    {
      signal: 'Sinal 3',
      location: 'Av. Conde Boa Vista',
      date: 'Maio 25, 2023',
      status: 'Livre',
      volume: '20%',
    },
    {
      signal: 'Sinal 4',
      location: 'Av. Conde Boa Vista',
      date: 'Maio 25, 2023',
      status: 'Livre',
      volume: '40%',
    },

  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sinais</TableCell>
            <TableCell>Localização</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.signal}>
              <TableCell>{row.signal}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

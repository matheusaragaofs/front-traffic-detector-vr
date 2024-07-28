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
import './styles.css';
interface Props {
  setCurrentCamerasId: (id: number) => void;
  currentCamerasId: number;
}

type CameraIds = '1' | '2' | '3' | '4' | '5';
type CameraTableInfo = {
  [key in CameraIds]: [
    {
      name: string;
      camera: '1';
    },
    {
      name: string;
      camera: '2';
    }
  ];
};

export function TrafficLightTable({
  setCurrentCamerasId,
  currentCamerasId,
}: Props) {
  const camerasTableInfo: CameraTableInfo = {
    '1': [
      {
        name: 'Camberwell New Rd/Brixton Rd',
        camera: '1',
      },
      {
        name: 'Harleyford St/Ken Pk Rd',
        camera: '2',
      },
    ],
    '2': [
      {
        name: 'Harleyford Rd/Vauxhall Grove',
        camera: '1',
      },
      {
        name: 'Kennington Lane',
        camera: '2',
      },
    ],
    '3': [
      {
        name: 'Parkhurst Rd by Holloway Rd',
        camera: '1',
      },
      {
        name: 'Seven Sisters Rd/Holloway Rd',
        camera: '2',
      },
    ],
    '4': [
      {
        name: 'Marylebone Rd/Osnaburgh St',
        camera: '1',
      },
      {
        name: 'Marylebone Rd/Great Portland Street',
        camera: '2',
      },
    ],
    '5': [
      {
        name: 'Buckingham Palace Rd/Eaton Lane',
        camera: '1',
      },
      {
        name: 'Victoria St / Buckingham Palace Rd',
        camera: '2',
      },
    ],
  };

  const formattedTableData = Object.entries(camerasTableInfo).map((key) => {
    return {
      id: key[0],
      street_1: key[1][0].name,
      street_2: key[1][1].name,
    };
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Rua 1</TableCell>
            <TableCell>Rua 2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedTableData.map((row, index) => (
            <TableRow
              onClick={() => setCurrentCamerasId(Number(row.id))}
              className="table-row"
              style={{
                backgroundColor:
                  currentCamerasId === Number(row.id) ? 'lightgray' : 'white',
              }}
              key={index}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.street_1}</TableCell>
              <TableCell>{row.street_2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

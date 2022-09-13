import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { httpGetSongs } from '../lib/Api'
import Filter from './Filter'

const headCells = [
  {
    id: 'author',
    numeric: false,
    label: 'author',
  },
  {
    id: 'title',
    numeric: false,
    label: 'title',
  },
  {
    id: 'genre',
    numeric: false,
    label: 'genre',
  },
  {
    id: 'year',
    numeric: false,
    label: 'year',
  }
];


function EnhancedTableHead(props) {
  const {order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property) => (event) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const [orderSign, setOrderSign] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('title');
  const [page, setPage] = React.useState(0);
  const [perPage, setPerPage] = React.useState(5);
  const [songs, setSongs] = React.useState([]);
  const [count, setCount] = React.useState(0)
  const [author, setAuthor] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [year, setYear] = React.useState('');

  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const handleChangeGenre = (event) => {
    setGenre(event.target.value);
  };
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const reset = () => {
    setAuthor('')
    setYear('')
    setGenre('')
    setPage(0)
    setPerPage(5);
    setOrderBy('id')
    setOrderSign('asc')
  }

  const getSongs = React.useCallback(async () => {
    const fetchedSongs = await httpGetSongs(orderSign, orderBy, page, perPage, {author, genre, year});
    setSongs(fetchedSongs.data.data);
    setCount(fetchedSongs.data.total);
  }, [orderSign, orderBy, page, perPage, author,genre,year]);

  React.useEffect(() => {
    getSongs();
  }, [getSongs])


  const handleRequestSort = (
    event,
    property,
  ) => {
    console.log(property);
    const isAsc = orderBy === property && orderSign === 'asc';
    setOrderSign(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '80%' }}>
      
      <Filter 
        author={author} 
        genre={genre} 
        year={year} 
        handleChangeAuthor={handleChangeAuthor} 
        handleChangeGenre={handleChangeGenre}
        handleChangeYear={handleChangeYear}
        reset={reset}
        ></Filter>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={orderSign}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={songs.length}
            />
            <TableBody>
              {songs.map((song, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={song.id}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        {song.author}
                      </TableCell>
                      <TableCell >{song.title}</TableCell>
                      <TableCell >{song.genre}</TableCell>
                      <TableCell >{song.year}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 5, 10]}
          component="div"
          count={count}
          rowsPerPage={perPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
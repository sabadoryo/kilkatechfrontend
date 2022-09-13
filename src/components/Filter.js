import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Refresh from '@mui/icons-material/Refresh';
import { httpGetFilterData } from '../lib/Api';

export default function BasicSelect(props) {
    const [authors, setAuthors] = React.useState([])
    const [genres, setGenres] = React.useState([])
    const [years, setYears] = React.useState([])

    const getFilterData = React.useCallback(async () => {
        const fetchedData = await httpGetFilterData();
        setAuthors(fetchedData.data.authors)
        setGenres(fetchedData.data.genres)
        setYears(fetchedData.data.years)
    }, [])

    React.useEffect(() => {
        getFilterData();
      }, [getFilterData])

    return (
        <Box sx={{display: 'flex', gap: '5px'}}>
        <FormControl fullWidth>
            <InputLabel id="author-label">Author</InputLabel>
            <Select
            labelId="author-label"
            id="author"
            value={props.author}
            label="Author"
            onChange={props.handleChangeAuthor}
            >
            {authors.map((author, index) => {
                return (
            <MenuItem
                value={author.author}
                key={index + 'a'} 
            >
                {author.author}
            </MenuItem>
        );
         })}
            </Select>
        </FormControl>
        <FormControl fullWidth>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
            labelId="genre-label"
            id="genre"
            value={props.genre}
            label="Genre"
            onChange={props.handleChangeGenre}
            >
            {genres.map((genre, index) => {
                return (
                    <MenuItem key={index + 'g'} value={genre.genre}>{genre.genre}</MenuItem>
                )
            })}
            </Select>
        </FormControl>
        <FormControl fullWidth>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
            labelId="year-label"
            id="year"
            value={props.year}
            label="Year"
            onChange={props.handleChangeYear}
            >
            {years.map((year,index) => {
                return (
                    <MenuItem key={index + 'y'} value={year.year}>{year.year}</MenuItem>
                )
            })}
            </Select>
        </FormControl>
        <IconButton aria-label="delete" onClick={props.reset}>
            <Refresh />
        </IconButton>
        </Box>
    );
}
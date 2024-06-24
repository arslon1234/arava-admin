import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Lang</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Lang"
          onChange={handleChange}
          sx={{height: 50 }}
        >
          <MenuItem value={10}>Uz</MenuItem>
          <MenuItem value={20}>Ru</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

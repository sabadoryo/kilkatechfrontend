import DataTable from './components/Songs';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <DataTable></DataTable>
      </Box>
    </Container>
  );
}

export default App;

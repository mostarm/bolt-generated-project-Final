import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navigation from './components/Navigation';
import Agenda from './components/Agenda';
import Speakers from './components/Speakers';
import Sponsors from './components/Sponsors';
import Notifications from './components/Notifications';
import More from './components/More';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ pb: 7 }}>
        <Routes>
          <Route path="/" element={<Agenda />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/more" element={<More />} />
        </Routes>
        <Navigation />
      </Box>
    </BrowserRouter>
  );
}

export default App;

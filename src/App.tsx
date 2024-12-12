import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import HolidaysPage from './pages/holidays';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/holidays" element={<HolidaysPage />} />
        <Route path="/holidays/:type" element={<HolidaysPage />} />
        <Route path="/countries/:type" element={<HolidaysPage />} />
        <Route path="/today" element={<HolidaysPage  type='today'/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App

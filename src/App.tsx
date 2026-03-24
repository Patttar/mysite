import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Case from './pages/Case';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case" element={<Case />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

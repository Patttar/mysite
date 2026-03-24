import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Case from './pages/Case';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case" element={<Case />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

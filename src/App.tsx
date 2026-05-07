import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Case from './pages/Case';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case" element={<Case />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AmiiboList from './components/AmiiboList';
import AmiiboDetail from './components/AmiiboDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AmiiboList />} />
        <Route path="/amiibo/:id" element={<AmiiboDetail />} />
      </Routes>
    </Router>
  );
}

export default App

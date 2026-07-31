import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage.tsx';
import { RecipeDetailPage } from './pages/RecipeDetailPage.tsx';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipe/:id" element={<RecipeDetailPage />} />
    </Routes>
  );
}

export default App;

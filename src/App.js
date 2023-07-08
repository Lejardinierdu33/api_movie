import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import LikePage from './pages/LikePage';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/likepage' element={<LikePage />} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

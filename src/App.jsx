import './index.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Error from './component/Error';
import HomePage from './pages/HomePage';
function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path='/countries-catelog' element={<HomePage/>}></Route>
              <Route path='*' element={<Error/>}></Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App

import './index.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import CountryCatalog from './component/CuntryCatelog'
import Error from './component/Error';
function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<CountryCatalog/>}></Route>
              <Route path='*' element={<Error/>}></Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App

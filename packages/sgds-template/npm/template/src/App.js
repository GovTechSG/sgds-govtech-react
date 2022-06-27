import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavbarTemp } from "./components/NavbarTemp";
import { SinglePageFormTemp } from "./components/SinglePageFormTemp";
import { MultiPageFormTemp } from "./components/MultiPageFormTemp";
import { CollapsibleFormTemp } from "./components/CollapsibleFormTemp";
import "@govtechsg/sgds-govtech/sgds/sgds.css";

function App() {
  return (
    <Router>
      <div className='mb-3'>
        <NavbarTemp />
      </div>
      <div className='mb-3'>
        <Routes>
          <Route path='/' element={<SinglePageFormTemp />} />
          <Route path='/multi' element={<MultiPageFormTemp />} />
          <Route path='/collapsible' element={<CollapsibleFormTemp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

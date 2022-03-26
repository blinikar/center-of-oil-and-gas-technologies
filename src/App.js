import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import { Routes, Route } from "react-router-dom";
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  

import { DataTableBeers } from './components/DataTableDemo/DataTableBeers.js';
import { Header } from './components/Header/Header.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<DataTableBeers />}/>
      </Route>
    </Routes>
  );
}

export default App;

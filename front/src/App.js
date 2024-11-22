import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import ProductPage from './components/ProductPage';
import UploadUpdateProduct from './components/UploadUpdateProduct';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/upload" element={<UploadUpdateProduct />} />
      </Routes>
  </Router>
  );
}

export default App;

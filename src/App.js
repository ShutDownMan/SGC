import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./pages/Home"
import Contratos from "./pages/Contratos"
import ContratoDetails from "./pages/ContratoDetails"
import Pagamentos from './pages/Pagamentos';
import Analises from './pages/Analises';
import PagamentoDetails from './pages/PagamentoDetails';
import Georeferenciamento from "./pages/Georeferenciamento"
import './App.css';

import Navbar from "./components/Navbar";
import Dashboard from './Dashboard';

export default function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="/contratos/:id" element={<ContratoDetails />} />
          <Route path="/financeiro" element={<Pagamentos />} />
          <Route path="/pagamentos/:id" element={<PagamentoDetails />} />
          <Route path="/georeferenciamento" element={<Georeferenciamento />} />
          <Route path="/analises" element={<Analises />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

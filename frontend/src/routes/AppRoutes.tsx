import {
  Routes,
  Route,
} from "react-router-dom";

import { Layout } from "../components/Layout";

import { Home } from "../pages/HomePage";
import { Estoque } from "../pages/Estoque";
import { Usuarios } from "../pages/Usuarios";
import { Vendas } from "../pages/Vendas";
import { Relatorios } from "../pages/Relatorios";

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/estoque"
          element={<Estoque />}
        />

        <Route
          path="/usuarios"
          element={<Usuarios />}
        />

        <Route
          path="/vendas"
          element={<Vendas />}
        />

        <Route
          path="/relatorios"
          element={<Relatorios />}
        />
      </Routes>
    </Layout>
  );
}
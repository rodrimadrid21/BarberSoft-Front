import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import MainLayout from "./components/layout/MainLayout";
import Services from "./components/services/Service"
import Client from "./components/clients/Client"
import ComingSoon from "./components/comingSoon/ComingSoon";

function App() {
  return (
    <Routes> 
      <Route path="/" element={<Navigate to="/login" replace />} /> 

      <Route path="/login" element={<Login />} />

    <Route element={<MainLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/services" element={<Services/>}/>
      <Route path="/clients" element={<Client/>}/>
      <Route path="/agenda" element={<ComingSoon />} />
      <Route path="/cobros" element={<ComingSoon />} />
      <Route path="/reportes" element={<ComingSoon />} />
      <Route path="/configuracion" element={<ComingSoon />} />
    </Route>
    </Routes>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./layout/Layout.jsx";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard.jsx";
import { Form } from "./components/Form.jsx";
import { ProtectedRoute } from "./utils/ProtectedRoute.jsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='/form' element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

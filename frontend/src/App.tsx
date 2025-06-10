// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout.tsx';
import Login from './pages/Login.tsx';
import MemberList from './pages/MemberList';
import Dashboard from './pages/Dashboard.tsx';
import ProtectedRoute from "./components/ProtectRoute.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes> {/* ✅ Routes로 감싸기 */}
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="member" element={<MemberList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default App;

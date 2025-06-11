// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout.tsx';
import Login from './pages/Login.tsx';
import Member from './pages/Member.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ProtectedRoute from "./components/ProtectRoute.tsx";
import Board from "./pages/Board.tsx";

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
                    <Route path="member" element={<Member />} />
                    <Route path="board" element={<Board />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default App;

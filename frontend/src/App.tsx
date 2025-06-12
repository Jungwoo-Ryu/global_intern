// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // CSS 필수!
import Layout from './components/layout/Layout.tsx';
import Login from './pages/Login.tsx';
import Member from './pages/Member.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ProtectedRoute from "./components/ProtectRoute.tsx";
import Board from "./pages/Board.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
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

            {/* ToastContainer 추가 - 앱 전체에서 사용 */}
            <ToastContainer
                position="top-right"
                autoClose={900}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </BrowserRouter>
    );
}

export default App;

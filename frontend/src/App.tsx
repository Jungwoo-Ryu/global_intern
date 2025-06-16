// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from 'react-redux'; // Redux Provider 추가
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'; // CSS 필수!
import Layout from './components/layout/Layout.tsx';
import Login from './pages/Login.tsx';
import Member from './pages/Member.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ProtectedRoute from "./components/ProtectRoute.tsx";
import Board from "./pages/Board.tsx";
import {persistor, store} from "./store.ts";
import {PersistGate} from "redux-persist/integration/react";
function App() {
    return (
        <Provider store={store}>
            <PersistGate
                loading={<div>상태 복원 중...</div>}
                persistor={persistor}
                onBeforeLift={() => {
                    console.log('상태 복원 완료');
                }}
            >
                <AppContent />
            </PersistGate>
        </Provider>
    );
}

function AppContent() {
    const persistState = useSelector((state: any) => state._persist);
    console.log('Persist 상태:', persistState);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout/>
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard/>}/>
                    <Route path="member" element={<Member/>}/>
                    <Route path="board" element={<Board/>}/>
                </Route>
            </Routes>

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

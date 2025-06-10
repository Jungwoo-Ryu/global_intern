// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout.tsx';
import MemberList from './pages/MemberList';
import Dashboard from './pages/Dashboard.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="member" element={<MemberList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

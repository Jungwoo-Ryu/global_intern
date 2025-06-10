// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MemberList from "./pages/MemberList";
import Login from "./pages/Login.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/member" element={<MemberList />} />
                {/* 필요에 따라 다른 라우트 추가 */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;

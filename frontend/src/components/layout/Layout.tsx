// src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom';
import Header from './Header/Header.tsx';
import Sidebar from './Sidebar/Sidebar.tsx';

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <div className="main-container">
                <Sidebar />
                <div className="content">
                    <Outlet /> {/* 페이지별 컨텐츠가 여기에 렌더링 */}
                </div>
            </div>
        </div>
    );
};

export default Layout;

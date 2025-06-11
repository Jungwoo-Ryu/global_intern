// src/components/layout/Layout.tsx
import {Outlet, useLocation} from 'react-router-dom';
import Header from './Header/Header.tsx';
import Sidebar from './Sidebar/Sidebar.tsx';
import "./Layout.scss";
const Layout = () => {
    const location = useLocation();

    // 경로에 따라 다른 헤더 제목 설정
    const getHeaderTitle = () => {
        console.log(location.pathname);
        switch (location.pathname) {
            case '/member':
                return '회원 목록';
            case '/':
                return '대시보드';

            case '/board':
                return '게시판';
            default:
                return '화면';
        }
    };

    return (
        <div className="layout">
            <Header
                title={getHeaderTitle()}
            />
            <div className="main-container">
                <Sidebar />

                <div className="content">
                    <Outlet /> {/* 페이지별 컨텐츠가 여기에 렌더링 */}
                    {/*asd*/}
                </div>
            </div>
        </div>
    );
};

export default Layout;

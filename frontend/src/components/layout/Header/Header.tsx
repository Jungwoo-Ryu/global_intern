import "./Header.scss";

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({
    title= "대시보드"}) => {
    return (
        <div className="header">
            <h1>관리자 시스템 - {title}</h1>
        </div>
    );
};

export default Header;

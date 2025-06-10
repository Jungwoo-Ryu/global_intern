// src/components/layout/Sidebar/Sidebar.tsx
import "./side.scss";
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { text: '대시보드', path: '/' },
        { text: '회원 관리', path: '/member' },
        { text: '설정', path: '/settings' }
    ];

    return (
        <div className="side">
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
        </div>
    );
};

export default Sidebar;

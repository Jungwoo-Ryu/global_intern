// src/components/dashboard/RecentActivity.tsx
import React from 'react';
import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Chip,
    Box
} from '@mui/material';
import {
    PersonAdd,
    Edit,
    Delete,
    Login
} from '@mui/icons-material';

const RecentActivity: React.FC = () => {
    const activities = [
        {
            id: 1,
            action: '새 회원 가입',
            user: '홍길동',
            time: '5분 전',
            icon: <PersonAdd />,
            color: 'success'
        },
        {
            id: 2,
            action: '회원 정보 수정',
            user: '김영희',
            time: '15분 전',
            icon: <Edit />,
            color: 'primary'
        },
        {
            id: 3,
            action: '관리자 로그인',
            user: 'admin',
            time: '30분 전',
            icon: <Login />,
            color: 'info'
        },
        {
            id: 4,
            action: '회원 삭제',
            user: '이철수',
            time: '1시간 전',
            icon: <Delete />,
            color: 'error'
        }
    ];

    return (
        <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
                최근 활동
            </Typography>
            <List>
                {activities.map((activity) => (
                    <ListItem key={activity.id} sx={{ px: 0 }}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: `${activity.color}.main` }}>
                                {activity.icon}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={activity.action}
                            secondary={
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Chip
                                        label={activity.user}
                                        size="small"
                                        sx={{ mr: 1 }}
                                    />
                                    <Typography variant="caption" color="text.secondary">
                                        {activity.time}
                                    </Typography>
                                </Box>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default RecentActivity;

// src/components/dashboard/UserChart.tsx
import React from 'react';
import {
    Paper,
    Typography,
    Box
} from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const UserChart: React.FC = () => {
    const data = [
        { name: '1월', users: 400, newUsers: 240 },
        { name: '2월', users: 300, newUsers: 139 },
        { name: '3월', users: 200, newUsers: 980 },
        { name: '4월', users: 278, newUsers: 390 },
        { name: '5월', users: 189, newUsers: 480 },
        { name: '6월', users: 239, newUsers: 380 },
        { name: '7월', users: 349, newUsers: 430 },
    ];

    return (
        <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
                사용자 활동 추이
            </Typography>
            <Box sx={{ width: '100%', height: '320px' }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="users"
                            stroke="#1976d2"
                            strokeWidth={2}
                            name="전체 사용자"
                        />
                        <Line
                            type="monotone"
                            dataKey="newUsers"
                            stroke="#2e7d32"
                            strokeWidth={2}
                            name="신규 사용자"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};

export default UserChart;

// src/components/dashboard/ChartCard.tsx
import React from 'react';
import {
    Paper,
    Typography,
    Box
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface ChartCardProps {
    title: string;
    data: number[];
    labels: string[];
}

const ChartCard: React.FC<ChartCardProps> = ({ title, data, labels }) => {
    const chartData = data.map((value, index) => ({
        name: labels[index],
        value: value
    }));

    return (
        <Paper sx={{ p: 3, height: '300px' }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Box sx={{ width: '100%', height: '220px' }}>
                <ResponsiveContainer>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#1976d2" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};

export default ChartCard;

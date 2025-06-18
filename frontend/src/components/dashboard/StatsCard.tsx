// src/components/dashboard/StatsCard.tsx
import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, color }) => {
    const isPositive = change.startsWith('+');

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: color, mr: 2 }}>
                        {icon}
                    </Avatar>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                </Box>

                <Typography variant="h4" component="div" gutterBottom>
                    {value}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isPositive ? (
                        <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
                    ) : (
                        <TrendingDown sx={{ color: 'error.main', mr: 1 }} />
                    )}
                    <Typography
                        variant="body2"
                        color={isPositive ? 'success.main' : 'error.main'}
                    >
                        {change} 지난 달 대비
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default StatsCard;

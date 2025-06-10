// src/pages/Dashboard.tsx
import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    Box,
    Avatar,
    LinearProgress
} from '@mui/material';
import {
    People,
    TrendingUp,
    Assignment,
    AttachMoney
} from '@mui/icons-material';
import StatsCard from "../components/dashboard/StatsCard";
import ChartCard from '../components/dashboard/ChartCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import UserChart from '../components/dashboard/UserChart.tsx';

const Dashboard: React.FC = () => {
    // 더미 데이터
    const statsData = [
        {
            title: '전체 회원수',
            value: '2,345',
            change: '+12%',
            icon: <People />,
            color: '#1976d2'
        },
        {
            title: '월간 매출',
            value: '₩15.2M',
            change: '+8.5%',
            icon: <AttachMoney />,
            color: '#2e7d32'
        },
        {
            title: '활성 사용자',
            value: '1,234',
            change: '+5.2%',
            icon: <TrendingUp />,
            color: '#ed6c02'
        },
        {
            title: '완료된 작업',
            value: '89',
            change: '+15%',
            icon: <Assignment />,
            color: '#9c27b0'
        }
    ];

    return (
        <Box sx={{ flexGrow: 1, p: 3 }} className="content">
            {/* 통계 카드 섹션 */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {statsData.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <StatsCard {...stat} />
                    </Grid>
                ))}
            </Grid>

            {/* 차트 및 활동 섹션 */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <UserChart />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RecentActivity />
                </Grid>
            </Grid>

            {/* 추가 정보 섹션 */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <ChartCard
                        title="월별 가입자 현황"
                        data={[65, 59, 80, 81, 56, 55, 40]}
                        labels={['1월', '2월', '3월', '4월', '5월', '6월', '7월']}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: '300px' }}>
                        <Typography variant="h6" gutterBottom>
                            시스템 상태
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" gutterBottom>
                                서버 상태: 정상
                            </Typography>
                            <LinearProgress variant="determinate" value={95} color="success" />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" gutterBottom>
                                데이터베이스: 정상
                            </Typography>
                            <LinearProgress variant="determinate" value={88} color="primary" />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" gutterBottom>
                                메모리 사용률
                            </Typography>
                            <LinearProgress variant="determinate" value={72} color="warning" />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;

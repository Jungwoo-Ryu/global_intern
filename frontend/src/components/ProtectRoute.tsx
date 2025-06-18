// src/components/ProtectedRoute.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type {RootState} from '../store';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, userId } = useSelector((state: RootState) => state.auth);
    console.log('ProtectedRoute 실행:', { isAuthenticated, userId });
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

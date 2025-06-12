// src/components/common/ActionButton.tsx
import React from 'react';
import Button from '@mui/material/Button';

interface ActionButtonProps {
    onClick: () => void;
    label: string;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    className?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
                                                       onClick,
                                                       label,
                                                       variant = 'outlined',
                                                       color = 'primary',
                                                       size = 'small',
                                                       disabled = false,
                                                       className = '',
                                                       startIcon,
                                                       endIcon,
                                                       fullWidth = false
                                                   }) => {
    return (
        <Button
            onClick={onClick}
            variant={variant}
            color={color}
            size={size}
            disabled={disabled}
            className={className}
            startIcon={startIcon}
            endIcon={endIcon}
            fullWidth={fullWidth}
        >
            {label}
        </Button>
    );
};

export default ActionButton;

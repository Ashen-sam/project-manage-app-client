import React from 'react';
import { Clock, AlertTriangle, CheckCircle, Search, CheckCircle2, XCircle, Clock4 } from 'lucide-react';

export type StatusType =
    | 'In progress'
    | 'Pending'
    | 'Submitted'
    | 'In review'
    | 'Success'
    | 'Failed'
    | 'Expired';

interface StatusBadgeProps {
    status: StatusType;
    className?: string;
}

export const ProjectStatusCommon: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
    const statusConfig = {
        'In progress': {
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-700',
            icon: Clock,
            iconColor: 'text-blue-600',
            borderColor: 'border border-blue-200'
        },
        'Pending': {
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-700',
            icon: AlertTriangle,
            iconColor: 'text-orange-600',
            borderColor: 'border border-orange-200'

        },
        'Submitted': {
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-700',
            icon: CheckCircle,
            iconColor: 'text-purple-600',
            borderColor: 'border border-purple-200'

        },
        'In review': {
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-700',
            icon: Search,
            iconColor: 'text-yellow-600',
            borderColor: 'border border-yellow-200'

        },
        'Success': {
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
            icon: CheckCircle2,
            iconColor: 'text-green-600',
            borderColor: 'border border-green-200'

        },
        'Failed': {
            bgColor: 'bg-red-100',
            textColor: 'text-red-700',
            icon: XCircle,
            iconColor: 'text-red-600',
            borderColor: 'border border-red-200'

        },
        'Expired': {
            bgColor: 'bg-gray-100',
            textColor: 'text-gray-700',
            icon: Clock4,
            iconColor: 'text-gray-600',
            borderColor: 'border border-gray-200'

        }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2 rounded-sm py-1 text-[11px] font-medium min-w-22 ${config.bgColor} ${config.borderColor} ${config.textColor} ${className}`}
        >
            <Icon className={`w-3 h-3 text-xs ${config.iconColor}`} />
            {status}
        </span>
    );
};

// Demo Componen
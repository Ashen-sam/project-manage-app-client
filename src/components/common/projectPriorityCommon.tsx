import React from 'react';
import { ArrowDown, Minus, ArrowUp, AlertTriangle } from 'lucide-react';

export type PriorityType = 'Low' | 'Medium' | 'High' | 'Critical';

export interface PriorityBadgeProps {
    priority: PriorityType;
    className?: string;
}

export const ProjectPriorityCommon: React.FC<PriorityBadgeProps> = ({ priority, className = '' }) => {
    const priorityConfig = {
        'Low': {
            bgColor: 'bg-gray-100',
            textColor: 'text-gray-700',
            icon: ArrowDown,
            iconColor: 'text-gray-600',
            borderColor: 'border border-gray-200'
        },
        'Medium': {
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-700',
            icon: Minus,
            iconColor: 'text-blue-600',
            borderColor: 'border border-blue-200'


        },
        'High': {
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-700',
            icon: ArrowUp,
            iconColor: 'text-orange-600',
            borderColor: 'border border-orange-200'

        },
        'Critical': {
            bgColor: 'bg-red-100',
            textColor: 'text-red-700',
            icon: AlertTriangle,
            iconColor: 'text-red-600',
            borderColor: 'border border-red-200'

        }
    };

    const config = priorityConfig[priority];
    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2 rounded-sm py-1 text-[11px] font-medium min-w-20 ${config.bgColor} ${config.borderColor} ${config.textColor} ${className}`}
        >
            <Icon className={`w-3 h-3 ${config.iconColor}`} />
            {priority}
        </span>
    );
};
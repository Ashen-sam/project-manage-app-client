import { AlertTriangle, ArrowDown, ArrowUp, FlagTriangleRight, Minus } from 'lucide-react';
import React from 'react';

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
            borderColor: 'border border-gray-400'
        },
        'Medium': {
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
            icon: Minus,
            iconColor: 'text-green-600',
            borderColor: 'border border-green-300'


        },
        'High': {
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-700',
            icon: ArrowUp,
            iconColor: 'text-orange-600',
            borderColor: 'border border-orange-300'

        },
        'Critical': {
            bgColor: 'bg-red-100',
            textColor: 'text-red-700',
            icon: AlertTriangle,
            iconColor: 'text-red-600',
            borderColor: 'border border-red-300'

        }
    };

    const config = priorityConfig[priority];

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2 rounded-sm py-1 text-[11px] min-w-20 border shadow-xs font-medium   ${className}`}
        >
            <FlagTriangleRight className={`w-3 h-3 ${config.iconColor}`} fill="currentColor" />

            {priority}
        </span>
    );
};
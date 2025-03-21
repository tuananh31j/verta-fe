import React, { ReactNode } from 'react';
import { Card, Statistic, Tooltip } from 'antd';
import { QuestionCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface CardDataStatsProps {
    title: string;
    total: number | string;
    rate?: string;
    icon: ReactNode;
    levelUp?: boolean;
    levelDown?: boolean;
    subtitle?: string;
    tooltip: string;
    rateTooltip?: string;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
    title,
    total,
    rate,
    levelUp,
    levelDown,
    icon,
    subtitle,
    tooltip,
    rateTooltip,
}) => {
    const getRateColor = () => {
        if (levelUp) return 'text-emerald-500';
        if (levelDown) return 'text-rose-500';
        return 'text-gray-500';
    };

    return (
        <Card
            className='h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
            styles={{
                body: {
                    padding: '1.25rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <div className='mb-4 flex h-[72px] items-start justify-between'>
                <div className='flex-grow'>
                    <div className='flex items-center gap-2'>
                        <h3 className='line-clamp-1 text-base font-semibold text-gray-800'>
                            {title}
                            <Tooltip title={tooltip}>
                                <QuestionCircleOutlined className='ml-2 cursor-help text-gray-400 hover:text-gray-600' />
                            </Tooltip>
                        </h3>
                    </div>
                    {subtitle && <p className='mt-1 line-clamp-1 text-sm text-gray-500'>{subtitle}</p>}
                </div>
                <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50'>
                    <span className='text-xl text-blue-500'>{icon}</span>
                </div>
            </div>

            <div className='flex flex-grow flex-col justify-end'>
                <Statistic
                    value={total}
                    valueStyle={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        lineHeight: '1.5',
                    }}
                    suffix={
                        rate && (
                            <Tooltip title={rateTooltip}>
                                <span className={`ml-2 flex items-center text-sm ${getRateColor()}`}>
                                    {rate}
                                    {levelUp && <ArrowUpOutlined className='ml-1' />}
                                    {levelDown && <ArrowDownOutlined className='ml-1' />}
                                </span>
                            </Tooltip>
                        )
                    }
                />

                {(levelUp || levelDown) && (
                    <div className='mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-100'>
                        <div
                            className={`h-full transition-all duration-500 ${
                                levelUp ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                            style={{
                                width: `${rate ? Math.min(parseFloat(rate), 100) : 0}%`,
                            }}
                        />
                    </div>
                )}
            </div>
        </Card>
    );
};

export default CardDataStats;

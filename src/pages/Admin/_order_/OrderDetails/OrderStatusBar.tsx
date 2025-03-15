import React from 'react';
import { motion } from 'framer-motion';
import { ClockCircleOutlined, CheckCircleOutlined, CarOutlined, GiftOutlined, StarOutlined } from '@ant-design/icons';

interface OrderStatusBarProps {
    orderStatus: string;
}

const STATUS_CONFIG: any = {
    pending: {
        step: 0,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
    },
    confirmed: {
        step: 1,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
    },
    shipping: {
        step: 2,
        color: 'text-green-500',
        bgColor: 'bg-green-50',
    },
    delivered: {
        step: 3,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
    },
    done: {
        step: 4,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50',
    },
    cancelled: {
        step: -1,
        color: 'text-red-500',
        bgColor: 'bg-red-50',
    },
};

const OrderStatusBar: React.FC<OrderStatusBarProps> = ({ orderStatus }) => {
    const currentStatus = STATUS_CONFIG[orderStatus] || STATUS_CONFIG.pending;
    const currentStep = currentStatus.step;

    const statusSteps = [
        {
            key: 'pending',
            title: 'Chờ xác nhận',
            icon: <ClockCircleOutlined />,
        },
        {
            key: 'confirmed',
            title: 'Đã xác nhận',
            icon: <CheckCircleOutlined />,
        },
        {
            key: 'shipping',
            title: 'Đang giao',
            icon: <CarOutlined />,
        },
        {
            key: 'delivered',
            title: 'Đã giao hàng',
            icon: <GiftOutlined />,
        },
        {
            key: 'done',
            title: 'Hoàn thành',
            icon: <StarOutlined />,
        },
    ];

    return (
        <div className='w-full py-6'>
            <div className='relative flex items-center justify-between'>
                {statusSteps.map((step, index) => {
                    const isActive = index <= currentStep;
                    const isPending = index > currentStep;

                    return (
                        <motion.div
                            key={step.key}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: isActive ? 1 : 0.4,
                                scale: isActive ? 1 : 0.9,
                            }}
                            transition={{ duration: 0.3 }}
                            className='relative z-10 flex flex-col items-center'
                        >
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-full ${isActive ? currentStatus.color : 'text-gray-300'} ${isActive ? currentStatus.bgColor : 'bg-gray-100'} shadow-md transition-all duration-300 ${isPending ? 'opacity-50' : ''} `}
                            >
                                {step.icon}
                            </div>
                            <p
                                className={`mt-2 text-center text-xs ${isActive ? 'font-semibold' : 'text-gray-400'} transition-all duration-300`}
                            >
                                {step.title}
                            </p>
                        </motion.div>
                    );
                })}

                {/* Progress Line */}
                <div className='absolute top-6 right-0 left-0 h-1 bg-gray-200' style={{ zIndex: 1 }}>
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{
                            width: `${(currentStep / (statusSteps.length - 1)) * 100}%`,
                        }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className={`h-full ${currentStatus.color.replace('text', 'bg')}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderStatusBar;

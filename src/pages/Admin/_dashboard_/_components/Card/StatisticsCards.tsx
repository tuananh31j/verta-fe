import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import React, { useState } from 'react';
import { useTotalStats } from '~/hooks/queries/stats/useTotal';
import { Currency } from '~/utils';
import DatePickerCard from '../DatePickerCard/DatePickerCard';

type DateInput =
    | { type: 'single'; date: string }
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

const StatisticsCards: React.FC = () => {
    const [dateInput, setDateInput] = useState<DateInput>({ type: 'single', date: moment().format('YYYY-MM-DD') });
    const { data, isLoading, error } = useTotalStats(dateInput);

    const handleDateChange = (newDateInput: DateInput) => {
        setDateInput(newDateInput);
    };

    if (isLoading) return <div className='flex h-screen items-center justify-center'>Loading...</div>;
    if (error)
        return <div className='flex h-screen items-center justify-center text-red-500'>Error: {error.message}</div>;

    const statsData: any = data?.data || {};

    const cardData = [
        {
            title: 'Tổng đơn hàng',
            total: statsData.totalOrders || 0,
            rate: `${(statsData.orderSuccessRate || 0).toFixed(2)}%`,
            levelUp: (statsData.orderSuccessRate || 0) > 50,
            levelDown: (statsData.orderSuccessRate || 0) <= 50,
            subtitle: `Thành công: ${statsData.successfulOrders || 0} | Đã hủy: ${statsData.cancelledOrders || 0}`,
            icon: <ShoppingCartOutlined className='text-blue-500' />,
            tooltip: 'Tổng số đơn hàng được đặt trong khoảng thời gian đã chọn',
            rateTooltip: 'Tỷ lệ thành công trong khoảng thời gian đã chọn',
            bgColor: 'bg-gradient-to-br from-blue-50 to-white',
        },
        {
            title: 'Tổng doanh thu',
            total: Currency.format(statsData.totalRevenue || 0),
            rate: Currency.format(statsData.averageDailyRevenue || 0),
            subtitle: 'Doanh thu trung bình',
            icon: <DollarCircleOutlined className='text-green-500' />,
            tooltip: 'Tổng doanh thu trong khoảng thời gian đã chọn',
            rateTooltip: 'Doanh thu trung bình hàng ngày trong khoảng thời gian đã chọn',
            bgColor: 'bg-gradient-to-br from-green-50 to-white',
        },
        {
            title: 'Người dùng mới',
            total: statsData.newUsers || 0,
            rate: `${(statsData.orderCancelRate || 0).toFixed(2)}%`,
            levelUp: (statsData.orderCancelRate || 0) < 30,
            levelDown: (statsData.orderCancelRate || 0) >= 30,
            subtitle: 'Tỷ lệ hủy đơn',
            icon: <UserOutlined className='text-purple-500' />,
            tooltip: 'Số lượng người dùng đăng ký mới trong khoảng thời gian đã chọn',
            rateTooltip: 'Tỷ lệ hủy đơn trong khoảng thời gian đã chọn',
            bgColor: 'bg-gradient-to-br from-purple-50 to-white',
        },
        {
            title: 'Sản phẩm mới',
            total: statsData.newProducts || 0,
            icon: <ShoppingOutlined className='text-orange-500' />,
            tooltip: 'Số lượng sản phẩm mới được thêm vào trong khoảng thời gian đã chọn',
            bgColor: 'bg-gradient-to-br from-orange-50 to-white',
        },
    ];

    return (
        <div className='container mx-auto px-4 py-6'>
            <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-800'>Thống kê bán hàng</h2>
                <DatePickerCard onDateChange={handleDateChange} initialDate={dateInput} />
            </div>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className={`${card.bgColor} transform rounded-xl border border-gray-100 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                    >
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600'>{card.title}</p>
                                <h3 className='mt-1 text-2xl font-semibold text-gray-900'>{card.total}</h3>
                            </div>
                            <div className='rounded-full bg-white p-3 shadow-sm'>{card.icon}</div>
                        </div>
                        {card.subtitle && (
                            <div className='mt-4'>
                                <p className='text-xs text-gray-500'>{card.subtitle}</p>
                                {card.rate && (
                                    <span
                                        className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                            card.levelUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {card.rate}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatisticsCards;

import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import WrapperList from '~/components/_common/WrapperList';
import DateRangePickerComponent from '../RangePicker/DateRangePickerComponent';
import { optionsBarChart } from './_option';
import { UseRangePicker } from '~/hooks/queries/stats/useRangePicker';

const BarChartRangePicker: React.FC = () => {
    const today = dayjs();
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([today, today]);

    const { data: dailyStats }: any = UseRangePicker(dateRange[0], dateRange[1]);

    const revenue = dailyStats?.map((item: any) => item.totalRevenue) || [];
    const orders = dailyStats?.map((item: any) => item.totalOrders) || [];
    const time = dailyStats?.map((item: any) => item.date) || [];

    const series = [
        {
            name: 'Đơn hàng',
            data: orders || [0],
        },
        {
            name: 'Doanh thu',
            data: revenue || [0],
        },
    ];

    const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null) => {
        if (dates && dates[0] && dates[1]) {
            setDateRange(dates);
        } else {
            setDateRange([today, today]);
        }
    };

    useEffect(() => {
        if (!dateRange[0] || !dateRange[1]) {
            setDateRange([today, today]);
        }
    }, []);

    return (
        <WrapperList
            title='Đơn hàng và doanh thu'
            option={<DateRangePickerComponent onDateRangeChange={handleDateRangeChange} value={dateRange} />}
            lineButtonBox
        >
            <div>
                <div id='barChart'>
                    <ReactApexChart
                        options={optionsBarChart(time)}
                        series={series}
                        type='bar'
                        height={350}
                        width='100%'
                    />
                </div>
            </div>
        </WrapperList>
    );
};

export default BarChartRangePicker;

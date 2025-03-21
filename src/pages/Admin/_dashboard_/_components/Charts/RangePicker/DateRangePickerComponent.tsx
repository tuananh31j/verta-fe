import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

const { RangePicker } = DatePicker;

interface DateRangePickerComponentProps {
    onDateRangeChange: (dates: [Dayjs, Dayjs] | null) => void;
    value: [Dayjs, Dayjs];
}

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({ onDateRangeChange, value }) => {
    const disabledDate = (current: Dayjs) => {
        return current && current > dayjs().endOf('day');
    };

    return (
        <RangePicker
            disabledDate={disabledDate}
            format='DD-MM-YYYY'
            onChange={onDateRangeChange as any}
            value={value}
        />
    );
};

export default DateRangePickerComponent;

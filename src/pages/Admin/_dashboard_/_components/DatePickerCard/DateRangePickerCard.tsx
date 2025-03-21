import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { DatePicker, Dropdown, MenuProps, Space, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarOutlined } from '@ant-design/icons';
import DropDownItem from './_modules/DropDownItem';
import { RangePickerProps } from 'antd/es/date-picker';

type DateInput =
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

type DateRangePickerCardProps = {
    onDateChange: (date: DateInput) => void;
    initialDate: DateInput;
};

enum Picker {
    Date = 'date',
    Month = 'month',
    Year = 'year',
}

const DATE_FIELD = 'date-field';

const today = dayjs().format('YYYY-MM-DD');
const dateSevenDayAgo = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
const dateThirtyDayAgo = dayjs().subtract(30, 'day').format('YYYY-MM-DD');

const { RangePicker } = DatePicker;

const DateRangePickerCard: React.FC<DateRangePickerCardProps> = ({ onDateChange, initialDate }) => {
    const [datePickerType, setDatePickerType] = useState<Picker>(Picker.Date);
    const [picked, setPicked] = useState<DateInput>(initialDate);
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const [hoveredDate, setHoveredDate] = useState<string | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const generateUniqueId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

    const dateRangeId = generateUniqueId('date-range-ee');
    const monthId = generateUniqueId('monthhhh');
    const yearId = generateUniqueId('yearhhh');
    const weekId = generateUniqueId('week1hhh');
    const monthLastID = generateUniqueId('monthLasthhhh');

    useEffect(() => {
        setPicked(initialDate);
    }, [initialDate]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(false);
                setOpenCalendar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handlePickerDate = (dates: [Dayjs, Dayjs]) => {
        setOpenCalendar(false);
        setOpenDropdown(false);

        let pickedValue: DateInput;

        switch (datePickerType) {
            case Picker.Year: {
                pickedValue = { type: 'yearly', year: dates[0].year() };
                break;
            }
            case Picker.Month: {
                pickedValue = { type: 'monthly', year: dates[0].year(), month: dates[0].month() + 1 };
                break;
            }
            default: {
                pickedValue = {
                    type: 'range',
                    start: dates[0].format('YYYY-MM-DD'),
                    end: dates[1].format('YYYY-MM-DD'),
                };
                break;
            }
        }

        setPicked(pickedValue);
        onDateChange(pickedValue);
    };

    const onChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
        if (dates) {
            handlePickerDate(dates as [Dayjs, Dayjs]);
        }
    };

    const handlePickerType = (type: Picker) => {
        setDatePickerType(type);
        setOpenCalendar(true);
    };

    const CustomInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
        <input ref={ref} className='fixed cursor-default opacity-0' {...props} id={generateUniqueId(DATE_FIELD)} />
    ));

    CustomInput.displayName = 'CustomInput';

    const renderDateRange = (date: DateInput): string => {
        switch (date.type) {
            case 'range':
                return `${date.start} - ${date.end}`;
            case 'monthly':
                return `${date.year}-${String(date.month).padStart(2, '0')}`;
            case 'yearly':
                return date.year.toString();
            default:
                return 'Invalid date';
        }
    };

    const getDatePickerValue = (): [Dayjs, Dayjs] | null => {
        switch (picked.type) {
            case 'range':
                return [dayjs(picked.start), dayjs(picked.end)];
            case 'monthly': {
                const start = dayjs(`${picked.year}-${picked.month}`, 'YYYY-M').startOf('month');
                return [start, start.endOf('month')];
            }
            case 'yearly': {
                const yearStart = dayjs(picked.year.toString(), 'YYYY').startOf('year');
                return [yearStart, yearStart.endOf('year')];
            }
            default:
                console.error('Invalid date input type');
                return null;
        }
    };

    const items: MenuProps['items'] = [
        {
            label: (
                <Space direction='vertical' className='border-r p-4'>
                    <div>
                        <DropDownItem
                            labelId={weekId}
                            title='7 ngày trước'
                            handleClick={() => {
                                const sevenDaysRange: DateInput = { type: 'range', start: dateSevenDayAgo, end: today };
                                setPicked(sevenDaysRange);
                                onDateChange(sevenDaysRange);
                                setOpenDropdown(false);
                            }}
                            onMouseEnter={() => setHoveredDate(`${dateSevenDayAgo} - ${today}`)}
                            onMouseLeave={() => setHoveredDate(null)}
                        />
                        <DropDownItem
                            labelId={monthLastID}
                            title='30 ngày trước'
                            handleClick={() => {
                                const thirtyDaysRange: DateInput = {
                                    type: 'range',
                                    start: dateThirtyDayAgo,
                                    end: today,
                                };
                                setPicked(thirtyDaysRange);
                                onDateChange(thirtyDaysRange);
                                setOpenDropdown(false);
                            }}
                            onMouseEnter={() => setHoveredDate(`${dateThirtyDayAgo} - ${today}`)}
                            onMouseLeave={() => setHoveredDate(null)}
                        />
                    </div>
                    <hr />
                    <div>
                        <DropDownItem
                            labelId={dateRangeId}
                            title='Khoảng thời gian theo ngày'
                            handleClick={() => {
                                handlePickerType(Picker.Date);
                                setOpenDropdown(false);
                            }}
                        />
                        <DropDownItem
                            labelId={monthId}
                            title='Khoảng thời gian theo tháng'
                            handleClick={() => {
                                handlePickerType(Picker.Month);
                                setOpenDropdown(false);
                            }}
                        />
                        <DropDownItem
                            labelId={yearId}
                            title='Khoảng thời gian theo năm'
                            handleClick={() => {
                                handlePickerType(Picker.Year);
                                setOpenDropdown(false);
                            }}
                        />
                    </div>
                </Space>
            ),
            onClick: (e) => {
                e.domEvent.stopPropagation();
            },
            key: '0',
        },
    ];

    return (
        <Dropdown open={openDropdown} menu={{ items }} trigger={['click']}>
            <div className='inline-block'>
                <span className='font-satoshi flex items-center gap-3 rounded-md border border-transparent bg-white p-3 py-1 text-sm text-black hover:border-blue-500 hover:text-blue-500 dark:bg-black dark:text-white'>
                    <span
                        onClick={() => setOpenDropdown(!openDropdown)}
                        className='text-body cursor-pointer border-e pe-2 capitalize hover:underline'
                    >
                        Khoảng thời gian
                    </span>
                    <span className='text-body cursor-default'>Từ:</span>
                    <Tooltip title={hoveredDate || renderDateRange(picked)}>
                        <span className='text-body w-40 cursor-default truncate'>
                            {hoveredDate || renderDateRange(picked)}
                        </span>
                    </Tooltip>
                    <span>
                        <RangePicker
                            open={openCalendar}
                            disabledDate={(current) => current && current > dayjs().endOf('day')}
                            picker={datePickerType}
                            inputReadOnly
                            allowClear={false}
                            className='cursor-default border border-transparent focus:border-transparent'
                            components={{
                                input: CustomInput,
                            }}
                            suffixIcon={<CalendarOutlined />}
                            placement='bottomLeft'
                            onChange={(dates, dateStrings) => {
                                if (dates) {
                                    onChange(dates, dateStrings);
                                    setOpenCalendar(false);
                                }
                            }}
                            onOpenChange={(open) => {
                                if (!open) {
                                    setOpenCalendar(false);
                                }
                            }}
                            popupClassName='absolute pt-3'
                            value={getDatePickerValue()}
                        />
                    </span>
                </span>
            </div>
        </Dropdown>
    );
};

export default DateRangePickerCard;

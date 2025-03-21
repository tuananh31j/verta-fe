import { CalendarOutlined } from '@ant-design/icons';
import { DatePicker, Dropdown, MenuProps, Space, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import DropDownItem from './_modules/DropDownItem';

const { RangePicker } = DatePicker;
type DateInput =
    | { type: 'single'; date: string }
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

type DatePickerCardProps = {
    onDateChange: (date: DateInput) => void;
    initialDate: DateInput;
};

enum Picker {
    Date = 'date',
    Month = 'month',
    Year = 'year',
}

const DATE_FIELD = 'date-field';

const DATE_FIELDD = 'date-fielddd';
const MONTH_FIELD = 'month-field';
const YEAR_FIELD = 'year-field';
const YTD_FIELD = 'yesterday-field';
const DAY_FIELD = '1day-field';
const WEEK_FIELD = '1week-field';
const DAY30_FIELD = '30d-field';

const today = moment().format('YYYY-MM-DD');
const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
const dateSevenDayAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
const dateThirtyDayAgo = moment().subtract(30, 'day').format('YYYY-MM-DD');

const DatePickerCard: React.FC<DatePickerCardProps> = ({ onDateChange, initialDate }) => {
    const [datePickerType, setDatePickerType] = useState<Picker>(Picker.Date);
    const [picked, setPicked] = useState<DateInput>(initialDate);
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const [hoveredDate, setHoveredDate] = useState<string | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const generateUniqueId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

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

    const handlePickerDate = (dates: [Dayjs, Dayjs] | null) => {
        if (dates && dates[0] && dates[1]) {
            setOpenCalendar(false);
            setOpenDropdown(false);

            let pickedValue: DateInput;

            switch (datePickerType) {
                case Picker.Year:
                    pickedValue = { type: 'yearly', year: dates[0].year() };
                    break;
                case Picker.Month:
                    pickedValue = { type: 'monthly', year: dates[0].year(), month: dates[0].month() + 1 };
                    break;
                default:
                    pickedValue = {
                        type: 'range',
                        start: dates[0].format('YYYY-MM-DD'),
                        end: dates[1].format('YYYY-MM-DD'),
                    };
            }

            setPicked(pickedValue);
            onDateChange(pickedValue);
        }
    };

    const onChange = (dates: [Dayjs, Dayjs] | null, dateStrings: [string, string]) => {
        handlePickerDate(dates);
    };

    const handlePickerType = (type: Picker) => {
        setDatePickerType(type);
        setOpenCalendar(true);
    };

    const CustomInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
        <input ref={ref} className='fixed cursor-default opacity-0' {...props} id={generateUniqueId(DATE_FIELDD)} />
    ));

    CustomInput.displayName = 'CustomInput';

    const renderDateRange = (date: DateInput): string => {
        switch (date.type) {
            case 'single':
                return date.date === today ? 'Hôm nay' : date.date;
            case 'range':
                return `${date.start} - ${date.end}`;
            case 'monthly':
                return `${date.year}-${String(date.month).padStart(2, '0')}`;
            case 'yearly':
                return date.year.toString();
            default:
                return 'Invalid date'; // Add a default case to satisfy the linter
        }
    };

    const getDatePickerValue = (): Dayjs | null => {
        switch (picked.type) {
            case 'single':
                return dayjs(picked.date);
            case 'range':
                return dayjs(picked.start);
            case 'monthly':
                return dayjs(`${picked.year}-${picked.month}`, 'YYYY-M');
            case 'yearly':
                return dayjs(picked.year.toString(), 'YYYY');
            default:
                console.error('Invalid date input type');
                return null; // Return null for invalid types
        }
    };
    const items: MenuProps['items'] = [
        {
            label: (
                <Space direction='vertical' className='border-r p-4'>
                    <div>
                        <DropDownItem
                            labelId={generateUniqueId(DAY_FIELD)}
                            title='Hôm nay'
                            handleClick={() => {
                                const todayDate: DateInput = { type: 'single', date: today };
                                setPicked(todayDate);
                                onDateChange(todayDate);
                                setOpenDropdown(false);
                            }}
                            onMouseEnter={() => setHoveredDate(today)}
                            onMouseLeave={() => setHoveredDate(null)}
                        />
                        <DropDownItem
                            labelId={generateUniqueId(YTD_FIELD)}
                            title='Hôm qua'
                            handleClick={() => {
                                const yesterdayDate: DateInput = { type: 'single', date: yesterday };
                                setPicked(yesterdayDate);
                                onDateChange(yesterdayDate);
                                setOpenDropdown(false);
                            }}
                            onMouseEnter={() => setHoveredDate(yesterday)}
                            onMouseLeave={() => setHoveredDate(null)}
                        />
                        <DropDownItem
                            labelId={generateUniqueId(WEEK_FIELD)}
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
                            labelId={generateUniqueId(DAY30_FIELD)}
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
                            labelId={generateUniqueId(DATE_FIELD)}
                            title='Khoảng thời gian theo ngày'
                            handleClick={() => {
                                handlePickerType(Picker.Date);
                                setOpenDropdown(false);
                            }}
                        />
                        <DropDownItem
                            labelId={generateUniqueId(MONTH_FIELD)}
                            title='Không thời gian theo tháng'
                            handleClick={() => {
                                handlePickerType(Picker.Month);
                                setOpenDropdown(false);
                            }}
                        />
                        <DropDownItem
                            labelId={generateUniqueId(YEAR_FIELD)}
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
                        {datePickerType === Picker.Date ? (
                            <RangePicker
                                open={openCalendar}
                                disabledDate={(current) => current && current > dayjs().endOf('day')}
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
                                        onChange(dates as any, dateStrings);
                                        setOpenCalendar(false);
                                    }
                                }}
                                onOpenChange={(open) => {
                                    if (!open) {
                                        setOpenCalendar(false);
                                    }
                                }}
                                popupClassName='absolute pt-3'
                                value={picked.type === 'range' ? [dayjs(picked.start), dayjs(picked.end)] : null}
                            />
                        ) : (
                            <DatePicker
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
                                onChange={(date) =>
                                    onChange(
                                        [date!, date!],
                                        [date?.format('YYYY-MM-DD') || '', date?.format('YYYY-MM-DD') || '']
                                    )
                                }
                                onOpenChange={(open) => {
                                    if (!open) {
                                        setOpenCalendar(false);
                                    }
                                }}
                                popupClassName='absolute pt-3'
                                value={getDatePickerValue()}
                            />
                        )}
                    </span>
                </span>
            </div>
        </Dropdown>
    );
};

export default DatePickerCard;

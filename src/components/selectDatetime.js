import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function BasicDateRangePicker({ selectedDateRange, setSelectedDateRange }) {
    const get_day_of_time = (d1, d2) => {
        if (d1 && d2) {
            let ms1 = d1.getTime();
            let ms2 = d2.getTime();
            return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
        }
    };
    console.log(get_day_of_time(selectedDateRange[0]?.$d, selectedDateRange[1]?.$d))

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
                <DateRangePicker
                    localeText={{ start: 'Check-in', end: 'Check-out' }}
                    value={selectedDateRange}
                    onChange={(newDateRange) => setSelectedDateRange(newDateRange)}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
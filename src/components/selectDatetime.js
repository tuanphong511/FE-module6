import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';



export default function BasicDateRangePicker() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
                <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
            </DemoContainer>
        </LocalizationProvider>
    );
}
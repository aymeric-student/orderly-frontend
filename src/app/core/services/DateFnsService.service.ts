import { Injectable, InjectionToken } from '@angular/core';
import { addDays, format, isBefore, parse } from 'date-fns';

export interface DateService {
    format(date: Date, formatStr: string): string;
    parse(dateStr: string, formatStr: string): Date;
    addDays(date: Date, amount: number): Date;
    isBefore(date: Date, compareTo: Date): boolean;
}

export const DATE_SERVICE = new InjectionToken<DateService>('DateService');

@Injectable()
export class DateFnsService implements DateService {
    format(date: Date, formatStr: string): string {
        return format(date, formatStr);
    }

    parse(dateStr: string, formatStr: string): Date {
        return parse(dateStr, formatStr, new Date());
    }

    addDays(date: Date, amount: number): Date {
        return addDays(date, amount);
    }

    isBefore(date: Date, compareTo: Date): boolean {
        return isBefore(date, compareTo);
    }
}

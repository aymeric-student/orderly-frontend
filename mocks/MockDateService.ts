import { DateService } from '@/core/services/DateFnsService.service';

export class MockDateService implements DateService {
  format(date: Date, formatStr: string): string {
    return `MOCKED_${formatStr}_${date.toISOString()}`;
  }

  parse(dateStr: string, _formatStr: string): Date {
    return new Date(`${dateStr}T00:00:00`);
  }

  addDays(date: Date, amount: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + amount);
    return result;
  }

  isBefore(date: Date, compareTo: Date): boolean {
    return date.getTime() < compareTo.getTime();
  }
}

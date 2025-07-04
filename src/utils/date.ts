import * as dayjs from 'dayjs';

export function getAnyDay(days: number = 0, format: string = 'YYYY-MM-DD') {
  return dayjs().add(days, 'day').format(format);
}

/** Korea Standard Time (UTC+9, no DST). */
export const KST_TIMEZONE = 'Asia/Seoul'
const KST_OFFSET_MS = 9 * 60 * 60 * 1000

export type KstYmd = { year: number; month: number; day: number }

/** Calendar date parts in Asia/Seoul. */
export function toKstCalendarDate(d: Date = new Date()): KstYmd & { dayOfWeek: number } {
  const kst = new Date(d.getTime() + KST_OFFSET_MS)
  return {
    year: kst.getUTCFullYear(),
    month: kst.getUTCMonth() + 1,
    day: kst.getUTCDate(),
    dayOfWeek: kst.getUTCDay(),
  }
}

export function formatKstYmd(parts: KstYmd): string {
  return `${parts.year}-${String(parts.month).padStart(2, '0')}-${String(parts.day).padStart(2, '0')}`
}

/** Today’s date string in KST (YYYY-MM-DD). */
export function getKstDateString(d: Date = new Date()): string {
  const { year, month, day } = toKstCalendarDate(d)
  return formatKstYmd({ year, month, day })
}

/** Monday 00:00:00 KST of the week containing `d` (week resets after Sunday 24:00). */
export function getKstWeekStartDateString(d: Date = new Date()): string {
  const { year, month, day, dayOfWeek } = toKstCalendarDate(d)
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const monday = new Date(Date.UTC(year, month - 1, day - daysFromMonday))
  return formatKstYmd({
    year: monday.getUTCFullYear(),
    month: monday.getUTCMonth() + 1,
    day: monday.getUTCDate(),
  })
}

/** First day of month in KST (resets after last day 24:00). */
export function getKstMonthStartDateString(d: Date = new Date()): string {
  const { year, month } = toKstCalendarDate(d)
  return formatKstYmd({ year, month, day: 1 })
}

export function kstRangeLabel(startYmd: string, endYmd: string): {
  timezone: string
  start: string
  end: string
} {
  return {
    timezone: KST_TIMEZONE,
    start: `${startYmd}T00:00:00+09:00`,
    end: `${endYmd}T23:59:59.999+09:00`,
  }
}

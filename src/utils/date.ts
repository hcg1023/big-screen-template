import { format } from 'date-fns'
import zh from 'date-fns/locale/zh-CN'

/**
 * @description 格式化时间
 * @param date
 * @param formatter
 */
export function formatDate(date: number | Date, formatter = 'yyyy-MM-dd HH:mm:ss') {
  return format(date, formatter)
}

/**
 * @description 获取当前时间（格式化完成）
 * @param formatter
 */
export function getCurrentFormattedDate(formatter?: string) {
  return formatDate(new Date(), formatter)
}

/**
 * @description 格式化星期
 * @param date
 */
export function getFormattedWeek(date: number | Date) {
  return format(date, 'EEEEEEE', {
    locale: zh,
  })
}

/**
 * @description 获取当前星期（格式化完成）
 */
export function getCurrentFormattedWeek() {
  return getFormattedWeek(new Date())
}

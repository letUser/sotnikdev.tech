import 'element-plus/es/components/notification/style/css'
import { ElNotification } from 'element-plus'

/**
 * Set timeout to show Slow Connection Notification
 * @param {number} timer - miliseconds of timeout
 * @returns - Timeout id
 */
export const handleSlowNetworkAlert = (timer: number = 10000) => {
  const id = setTimeout(() => {
    // show Notification with info about start of export
    ElNotification({
      title: 'Slow network detected',
      message: 'Low data transfer speed. Actions may take longer.',
      type: 'warning',
      duration: 8000
    })
  }, timer)

  return id
}
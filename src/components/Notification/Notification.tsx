import { App } from 'antd'
import type { NotificationInstance } from 'antd/es/notification/interface'
import type { MessageInstance } from 'antd/es/message/interface'

/**
 * Hook-based notification API for React 18+ strict mode compatibility.
 * Must be called from within a GravityProvider (which wraps antd App).
 */
export function useNotification(): NotificationInstance {
  const { notification } = App.useApp()
  return notification
}

/**
 * Hook-based message API for React 18+ strict mode compatibility.
 * Must be called from within a GravityProvider (which wraps antd App).
 */
export function useMessage(): MessageInstance {
  const { message } = App.useApp()
  return message
}

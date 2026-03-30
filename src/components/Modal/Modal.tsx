import { Modal as AntModal } from 'antd'
import type { ModalProps } from './Modal.types'

export function Modal({ centered = true, ...props }: ModalProps) {
  return <AntModal centered={centered} {...props} />
}

Modal.displayName = 'Modal'
Modal.confirm = AntModal.confirm
Modal.info = AntModal.info
Modal.success = AntModal.success
Modal.error = AntModal.error
Modal.warning = AntModal.warning
Modal.useModal = AntModal.useModal

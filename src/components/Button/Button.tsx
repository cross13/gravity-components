import { forwardRef } from 'react'
import { Button as AntButton } from 'antd'
import type { ButtonProps } from './Button.types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = 'primary', size = 'middle', ...props }, ref) => {
    return <AntButton ref={ref} type={type} size={size} {...props} />
  },
)

Button.displayName = 'Button'

import { forwardRef } from 'react'
import { Input as AntInput } from 'antd'
import type { InputProps, TextAreaProps, SearchProps, PasswordProps } from './Input.types'

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <AntInput ref={ref as never} {...props} />
})
Input.displayName = 'Input'

const AntPassword = AntInput.Password
export const Password = forwardRef<HTMLInputElement, PasswordProps>((props, ref) => {
  return <AntPassword ref={ref as never} {...props} />
})
Password.displayName = 'Input.Password'

const AntSearch = AntInput.Search
export const Search = forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
  return <AntSearch ref={ref as never} {...props} />
})
Search.displayName = 'Input.Search'

const AntTextArea = AntInput.TextArea
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  return <AntTextArea ref={ref as never} {...props} />
})
TextArea.displayName = 'Input.TextArea'

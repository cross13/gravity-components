import { Form as AntForm } from 'antd'
import type { FormProps } from './Form.types'

const InternalForm = AntForm as React.FC<FormProps>

export function Form(props: FormProps) {
  return <InternalForm layout="vertical" {...props} />
}

Form.displayName = 'Form'
Form.Item = AntForm.Item
Form.List = AntForm.List
Form.useForm = AntForm.useForm
Form.useWatch = AntForm.useWatch

export const FormItem = AntForm.Item
;(FormItem as { displayName?: string }).displayName = 'Form.Item'

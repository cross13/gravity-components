import styled from 'styled-components'
import { Space } from 'antd'

export const W360 = styled.div`
  width: 360px;

  & .ant-input-affix-wrapper,
  & .ant-input,
  & .ant-input-password,
  & .ant-input-search,
  & textarea.ant-input {
    width: 100%;
  }
`

export const VerticalFieldStack = styled(Space)`
  width: 360px;
`

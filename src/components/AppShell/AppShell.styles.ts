import styled from 'styled-components'
import { Layout } from 'antd'

const { Header, Content } = Layout

export const Root = styled(Layout)`
  min-height: 100vh;
`

export const Inner = styled(Layout)``

export const ShellHeader = styled(Header)`
  background: #ffffff;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8edf2;
  height: 68px;
  line-height: 68px;
  box-shadow: 0 1px 0 rgba(0, 25, 51, 0.04);
`

export const ShellContent = styled(Content)`
  padding: 32px;
  min-height: 280px;
  background: #f0f3f7;
`

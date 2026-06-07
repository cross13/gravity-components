import styled from 'styled-components'
import { Layout } from 'antd'

const { Header, Content } = Layout

export const Root = styled(Layout)`
  min-height: 100vh;
`

export const Inner = styled(Layout)``

export const ShellHeader = styled(Header)`
  background: #003973;
  color: #ffffff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  line-height: 56px;
  box-shadow: 0 1px 0 rgba(0, 25, 51, 0.08);
`

export const ProjectBar = styled.div`
  background: #ffffff;
  color: #3d5068;
  padding: 0 24px;
  display: flex;
  align-items: center;
  min-height: 44px;
  border-bottom: 1px solid #e8edf2;
`

export const ShellContent = styled(Content)`
  padding: 32px;
  min-height: 280px;
  background: #f0f3f7;
`

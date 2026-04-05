import styled from 'styled-components'
import { Typography, Tabs } from 'antd'

const { Title, Text } = Typography

export const Root = styled.div<{ $hasTabs?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: ${({ $hasTabs }) => ($hasTabs ? '0' : '24px')};
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const PageTitle = styled(Title).attrs({ level: 4 })`
  margin: 0 !important;
`

export const PageSubtitle = styled(Text)`
  color: #3D5068;
  font-size: 14px;
`

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #D5DCE5;
  border-radius: 6px;
  background: #FFFFFF;
  cursor: pointer;
  color: #3D5068;
  font-size: 14px;
  flex-shrink: 0;
  transition: background 0.1s, border-color 0.1s, color 0.1s;

  &:hover {
    background: #F0F3F7;
    border-color: #8494A7;
    color: #0D1B2A;
  }

  &:active {
    background: #E8EDF2;
  }
`

export const StyledTabs = styled(Tabs)`
  margin-bottom: -1px;

  .ant-tabs-nav {
    margin-bottom: 0;
  }
`

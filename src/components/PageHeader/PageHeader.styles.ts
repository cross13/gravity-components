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

export const PageTitle = styled(Title).attrs({ level: 3 })`
  margin: 0 !important;
  color: #003973 !important;
`

export const PageSubtitle = styled(Text)`
  color: #3D5068;
  font-size: 12px;
`

export const StyledTabs = styled(Tabs)`
  margin-bottom: -1px;

  .ant-tabs-nav {
    margin-bottom: 0;
  }
`

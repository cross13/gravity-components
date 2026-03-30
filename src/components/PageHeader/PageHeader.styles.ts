import styled from 'styled-components'
import { Typography } from 'antd'

const { Title } = Typography

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PageTitle = styled(Title).attrs({ level: 4 })`
  margin: 0 !important;
`

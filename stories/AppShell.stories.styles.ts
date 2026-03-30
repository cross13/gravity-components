import styled from 'styled-components'
import { Typography, Space, Avatar, Card } from 'antd'
import { BellOutlined } from '@ant-design/icons'

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const HeaderDate = styled(Typography.Text)`
  color: #8494a7;
  font-size: 13px;
`

export const HeaderBell = styled(BellOutlined)`
  font-size: 18px;
  color: #8494a7;
  cursor: pointer;
`

export const UserMenuSpace = styled(Space)`
  cursor: pointer;
`

export const UserAvatar = styled(Avatar).attrs({ size: 34 })`
  && {
    background: linear-gradient(135deg, #003973, #00bbdd);
  }
`

export const UserLines = styled.div`
  line-height: 1.3;
`

export const UserName = styled(Typography.Text).attrs({ strong: true })`
  font-size: 13px;
  display: block;
`

export const UserRole = styled(Typography.Text)`
  font-size: 11px;
  color: #8494a7;
`

export const TxnRef = styled(Typography.Text).attrs({ strong: true })`
  font-size: 13px;
`

export const TxnAmount = styled(Typography.Text).attrs({ strong: true })`
  font-variant-numeric: tabular-nums;
`

export const TransactionsCard = styled(Card)`
  margin-top: 20px;
`

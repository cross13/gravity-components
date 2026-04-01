import styled from 'styled-components'
import { Typography } from 'antd'

const { Text } = Typography

export const ChartWrap = styled.div<{ $height: number }>`
  width: 100%;
  height: ${(p) => p.$height}px;
  margin-top: 4px;
`

export const ScopeText = styled(Text).attrs({ type: 'secondary' })`
  display: block;
  margin-top: 2px;
  font-size: 12px;
  line-height: 1.45;
  max-width: 52ch;
`

export const CardExtra = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

import styled from 'styled-components'
import { Card, Typography } from 'antd'

const { Text, Title } = Typography

export const Root = styled(Card)`
  position: relative;
  overflow: hidden;
`

export const AccentBar = styled.div<{ $background: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${(p) => p.$background};
`

export const LabelText = styled(Text).attrs({ type: 'secondary' })`
  font-size: 11.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`

export const ValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-top: 10px;
`

export const PrefixText = styled(Text).attrs({ type: 'secondary' })`
  font-size: 18px;
  font-weight: 500;
`

export const ValueTitle = styled(Title).attrs({ level: 3 })`
  margin: 0 !important;
  font-weight: 800;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
`

export const SuffixText = styled(Text).attrs({ type: 'secondary' })`
  font-size: 16px;
  font-weight: 500;
`

export const TrendBadge = styled.div<{ $background: string }>`
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px 3px 6px;
  border-radius: 6px;
  background: ${(p) => p.$background};
`

export const TrendIconWrap = styled.span<{ $color: string }>`
  color: ${(p) => p.$color};
  font-size: 12px;
  display: flex;
`

export const TrendValueText = styled(Text)<{ $color: string }>`
  color: ${(p) => p.$color};
  font-size: 12px;
  font-weight: 600;
`

export const SparklineWrap = styled.div`
  margin-top: 16px;
`

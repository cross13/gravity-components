import styled from 'styled-components'
import { Typography } from 'antd'

const { Text } = Typography

const CHART_BORDER = '#E8EDF2'

export const PieSection = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`

export const PieLegendColumn = styled.div`
  flex: 1;
`

export const PieLegendRow = styled.div<{ $showBorder: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: ${(p) => (p.$showBorder ? `1px solid ${CHART_BORDER}` : 'none')};
`

export const PieLegendLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const PieSwatchLg = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: ${(p) => p.$color};
`

export const PieSliceName = styled(Text)`
  font-size: 13px;
`

export const PieSliceValue = styled(Text).attrs({ strong: true })`
  font-variant-numeric: tabular-nums;
`

export const DashboardStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const DonutRow = styled.div`
  display: flex;
  align-items: center;
`

export const DonutLegend = styled.div`
  flex: 1;
`

export const DonutLegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  font-size: 12px;
`

export const DonutSwatch = styled.div<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: ${(p) => p.$color};
`

export const DonutName = styled(Text).attrs({ type: 'secondary' })`
  font-size: 12px;
`

export const DonutPct = styled(Text).attrs({ strong: true })`
  margin-left: auto;
  font-size: 12px;
`

import styled from 'styled-components'

export const SparklineRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 32px;
`

export const SparklineBar = styled.div<{ $heightPct: number; $opacity: number; $color: string }>`
  flex: 1;
  height: ${(p) => p.$heightPct}%;
  border-radius: 2px;
  background: ${(p) => p.$color};
  opacity: ${(p) => p.$opacity};
  min-height: 3px;
`

export const SparklineSvg = styled.svg`
  width: 100%;
  height: 40px;
`

export const StatCardNarrow = styled.div`
  max-width: 320px;
`

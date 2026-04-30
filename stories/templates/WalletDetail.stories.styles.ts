import styled from 'styled-components'

export const PageBackground = styled.div`
  background: #f0f3f7;
  min-height: 100vh;
`

export const HeaderBadgeRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`

export const ProfilePill = styled.span<{ $tone: 'conservative' | 'moderate' | 'aggressive' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  background: ${({ $tone }) =>
    $tone === 'conservative'
      ? 'rgba(0, 119, 255, 0.10)'
      : $tone === 'moderate'
        ? 'rgba(245, 166, 35, 0.12)'
        : 'rgba(230, 38, 38, 0.10)'};
  color: ${({ $tone }) =>
    $tone === 'conservative'
      ? '#0058B8'
      : $tone === 'moderate'
        ? '#A56600'
        : '#A11717'};
`

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const ChartSection = styled.section`
  margin-bottom: 20px;
`

export const TabPanel = styled.section`
  background: #ffffff;
  border: 1px solid #e8edf2;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 25, 51, 0.04);
  padding: 8px 8px 4px;
  overflow: hidden;
`

export const TabHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
`

export const TabHeaderTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #0d1b2a;
  letter-spacing: -0.005em;
`

export const TabHeaderHint = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: #8494a7;
`

export const TableScroll = styled.div`
  padding: 0 8px 8px;
`

export const Amount = styled.span<{ $tone?: 'positive' | 'negative' | 'neutral' }>`
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: ${({ $tone }) =>
    $tone === 'positive' ? '#0A6B47' : $tone === 'negative' ? '#A11717' : '#0d1b2a'};
`

export const Muted = styled.span`
  color: #8494a7;
  font-size: 13px;
`

export const TickerCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const TickerSymbol = styled.span`
  color: #0d1b2a;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.01em;
`

export const TickerName = styled.span`
  color: #8494a7;
  font-size: 12px;
`

export const WeightBarTrack = styled.div`
  position: relative;
  width: 100%;
  height: 6px;
  background: #f0f3f7;
  border-radius: 999px;
  overflow: hidden;
`

export const WeightBarFill = styled.div<{ $pct: number }>`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${({ $pct }) => `${Math.max(2, Math.min(100, $pct))}%`};
  background: linear-gradient(90deg, #003973, #0077ff);
  border-radius: 999px;
`

export const WeightCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 120px;
`

export const WeightValue = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #3d5068;
`

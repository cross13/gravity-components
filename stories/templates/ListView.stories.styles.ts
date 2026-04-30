import styled from 'styled-components'

export const PageBackground = styled.div`
  background: #f0f3f7;
  min-height: 100vh;
`

export const SurfaceWrap = styled.div`
  background: #ffffff;
  border: 1px solid #e8edf2;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 25, 51, 0.04);
  overflow: hidden;
`

export const ClientCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const ClientName = styled.span`
  color: #0d1b2a;
  font-weight: 600;
  font-size: 14px;
`

export const ClientEmail = styled.span`
  color: #8494a7;
  font-size: 12px;
`

export const Amount = styled.span<{ $tone?: 'positive' | 'negative' | 'neutral' }>`
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: ${({ $tone }) =>
    $tone === 'positive' ? '#0A6B47' : $tone === 'negative' ? '#A11717' : '#0d1b2a'};
`

export const MutedText = styled.span`
  color: #8494a7;
  font-size: 13px;
`

export const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`

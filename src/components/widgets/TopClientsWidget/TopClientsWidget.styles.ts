import styled, { css } from 'styled-components'
import { Typography } from 'antd'

const { Text } = Typography

export const ScopeText = styled(Text).attrs({ type: 'secondary' })`
  display: block;
  margin: 0 0 14px;
  font-size: 12px;
  line-height: 1.45;
  max-width: 56ch;
  color: #5c6b7a;
`

const mono = css`
  font-family: ui-monospace, 'SF Mono', 'Cascadia Code', 'Roboto Mono', Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
`

export const SummaryStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 14px;
`

export const SummaryItem = styled.div`
  padding: 14px 16px;
  border-radius: 10px;
  background: linear-gradient(145deg, #f8fafc 0%, #f1f4f8 100%);
  border: 1px solid #e2e8f0;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
`

export const SummaryLabel = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 6px;
`

export const SummaryValue = styled.span<{ $variant?: 'usd' }>`
  display: block;
  ${mono}
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: ${(p) => (p.$variant === 'usd' ? '#0c4a6e' : '#0f172a')};
`

export const TableWrap = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  overflow-x: auto;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`

export const TheadRow = styled.tr`
  background: #f1f5f9;
`

export const Th = styled.th<{ $align?: 'left' | 'right' | 'center' }>`
  padding: 11px 12px;
  font-weight: 600;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #475569;
  text-align: ${(p) => p.$align ?? 'left'};
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
`

export const TbodyRow = styled.tr<{ $hover?: boolean }>`
  background: #ffffff;
  transition: background 0.15s ease;

  ${(p) =>
    p.$hover &&
    css`
      &:hover {
        background: #f5f8fb;
      }
    `}
`

export const Td = styled.td<{ $align?: 'left' | 'right' | 'center' }>`
  padding: 11px 12px;
  vertical-align: middle;
  text-align: ${(p) => p.$align ?? 'left'};
  border-bottom: 1px solid #f1f5f9;
`

export const RankBadge = styled.span<{ $tier: 'gold' | 'silver' | 'bronze' | 'rest' }>`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  border: 1px solid transparent;

  ${(p) => {
    switch (p.$tier) {
      case 'gold':
        return css`
          background: linear-gradient(160deg, #fefce8 0%, #fde68a 100%);
          color: #713f12;
          border-color: rgba(180, 83, 9, 0.22);
        `
      case 'silver':
        return css`
          background: linear-gradient(160deg, #f8fafc 0%, #e2e8f0 100%);
          color: #334155;
          border-color: rgba(100, 116, 139, 0.25);
        `
      case 'bronze':
        return css`
          background: linear-gradient(160deg, #fff7ed 0%, #fed7aa 100%);
          color: #7c2d12;
          border-color: rgba(194, 65, 12, 0.2);
        `
      default:
        return css`
          background: #f8fafc;
          color: #64748b;
          border-color: #e2e8f0;
        `
    }
  }}
`

export const NameBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

export const FullName = styled.span`
  font-weight: 600;
  color: #0f172a;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const EmailText = styled.span`
  font-size: 12px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const WalletTag = styled.span`
  display: inline-flex;
  max-width: 100%;
  padding: 3px 9px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #0c4a6e;
  background: rgba(14, 116, 144, 0.08);
  border: 1px solid rgba(14, 116, 144, 0.14);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ShareCell = styled.span`
  ${mono}
  font-size: 12px;
  font-weight: 600;
  color: #334155;
  letter-spacing: -0.02em;
`

export const NumericCell = styled.span`
  ${mono}
  font-weight: 600;
  color: #0f172a;
  letter-spacing: -0.02em;
`

export const ArsCell = styled(NumericCell)`
  font-size: 13px;
`

export const UsdCell = styled(NumericCell)`
  font-size: 13px;
  color: #0c4a6e;
  font-weight: 600;
`

export const EmptyState = styled.div`
  padding: 28px 16px;
  text-align: center;
  color: #8494a7;
  font-size: 13px;
`

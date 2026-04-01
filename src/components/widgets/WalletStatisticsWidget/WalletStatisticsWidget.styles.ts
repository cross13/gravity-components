import styled, { css } from 'styled-components'
import { Typography } from 'antd'

const { Text } = Typography

export const ScopeText = styled(Text).attrs({ type: 'secondary' })`
  display: block;
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.45;
  max-width: 56ch;
`

export const TableWrap = styled.div`
  border: 1px solid #e8edf2;
  border-radius: 12px;
  overflow: hidden;
  background: #fafbfd;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`

export const TheadRow = styled.tr`
  background: linear-gradient(180deg, #f0f3f7 0%, #e8edf2 100%);
`

export const Th = styled.th<{ $align?: 'left' | 'right' }>`
  padding: 10px 14px;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #3d5068;
  text-align: ${(p) => p.$align ?? 'left'};
  border-bottom: 1px solid #dce3ea;
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

export const Td = styled.td<{ $align?: 'left' | 'right' }>`
  padding: 14px 14px;
  vertical-align: middle;
  text-align: ${(p) => p.$align ?? 'left'};
  border-bottom: 1px solid #eef2f6;
`

export const WalletCell = styled.div`
  display: flex;
  align-items: stretch;
  gap: 12px;
  min-width: 0;
`

const toneColors: Record<string, string> = {
  conservative: '#00b67a',
  moderate: '#f5a623',
  aggressive: '#e62626',
  neutral: '#0077ff',
}

export const ToneBar = styled.span<{ $tone: string }>`
  width: 4px;
  border-radius: 999px;
  flex-shrink: 0;
  background: ${(p) => toneColors[p.$tone] ?? toneColors.neutral};
  opacity: 0.9;
`

export const WalletTextBlock = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const ProfileName = styled.span`
  font-weight: 700;
  color: #0d1b2a;
  letter-spacing: -0.02em;
`

export const DenominationTag = styled.span`
  display: inline-flex;
  align-self: flex-start;
  margin-top: 2px;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #5a6d82;
  background: rgba(0, 57, 115, 0.06);
  border: 1px solid rgba(0, 57, 115, 0.08);
`

export const NumericCell = styled.span`
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: #0d1b2a;
  letter-spacing: -0.02em;
`

export const CurrencyCell = styled(NumericCell)`
  font-weight: 700;
  font-size: 14px;
  color: #003973;
`

export const TfootRow = styled.tr`
  background: linear-gradient(180deg, #f7f9fc 0%, #eef2f7 100%);
`

export const TfootTd = styled.td<{ $align?: 'left' | 'right' }>`
  padding: 12px 14px;
  text-align: ${(p) => p.$align ?? 'left'};
  border-top: 2px solid #dce3ea;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #3d5068;
`

export const EmptyState = styled.div`
  padding: 28px 16px;
  text-align: center;
  color: #8494a7;
  font-size: 13px;
`

export const CardExtra = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

import styled, { css } from 'styled-components'
import { Typography } from 'antd'

const { Text } = Typography

const mono = css`
  font-family: ui-monospace, 'SF Mono', 'Cascadia Code', 'Roboto Mono', Menlo, Consolas, monospace;
  font-variant-numeric: tabular-nums;
`

export const ScopeText = styled(Text).attrs({ type: 'secondary' })`
  display: block;
  margin: 0 0 14px;
  font-size: 12px;
  line-height: 1.45;
  max-width: 56ch;
  color: #5c6b7a;
`

export const KpiStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 14px;
`

export const KpiTile = styled.div`
  padding: 14px 16px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
`

export const KpiLabel = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 6px;
`

export const KpiValue = styled.span`
  display: block;
  ${mono}
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: #0f172a;
  line-height: 1.2;
`

export const KpiHint = styled.span`
  display: block;
  margin-top: 6px;
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.35;
`

export const TableWrap = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`

export const TheadRow = styled.tr`
  background: #f8fafc;
`

export const Th = styled.th<{ $align?: 'left' | 'right' }>`
  padding: 11px 14px;
  font-weight: 600;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
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

export const Td = styled.td<{ $align?: 'left' | 'right' }>`
  padding: 12px 14px;
  vertical-align: middle;
  text-align: ${(p) => p.$align ?? 'left'};
  border-bottom: 1px solid #f1f5f9;
`

export const WalletCell = styled.div`
  display: flex;
  align-items: stretch;
  gap: 12px;
  min-width: 0;
`

const toneColors: Record<string, string> = {
  conservative: '#059669',
  moderate: '#d97706',
  aggressive: '#dc2626',
  neutral: '#0369a1',
}

export const ToneBar = styled.span<{ $tone: string }>`
  width: 3px;
  border-radius: 999px;
  flex-shrink: 0;
  background: ${(p) => toneColors[p.$tone] ?? toneColors.neutral};
`

export const WalletTextBlock = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const ProfileName = styled.span`
  font-weight: 600;
  color: #0f172a;
  letter-spacing: -0.02em;
`

export const DenominationTag = styled.span`
  display: inline-flex;
  align-self: flex-start;
  margin-top: 2px;
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
`

export const AmountStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  min-width: 120px;
`

export const AllocationTrack = styled.div`
  width: 100%;
  max-width: 160px;
  height: 4px;
  border-radius: 999px;
  background: #e2e8f0;
  overflow: hidden;
`

export const AllocationFill = styled.div<{ $tone: string }>`
  height: 100%;
  border-radius: 999px;
  min-width: 0;
  background: ${(p) => toneColors[p.$tone] ?? toneColors.neutral};
  opacity: 0.88;
  transition: width 0.25s ease;
`

export const WeightCell = styled.div`
  min-width: 56px;
`

export const WeightFigure = styled.span`
  ${mono}
  font-size: 12px;
  font-weight: 600;
  color: #475569;
  letter-spacing: -0.02em;
`

export const NumericCell = styled.span`
  ${mono}
  font-weight: 600;
  color: #0f172a;
  letter-spacing: -0.02em;
`

export const CurrencyCell = styled.span`
  ${mono}
  font-weight: 600;
  font-size: 13px;
  color: #0c4a6e;
  letter-spacing: -0.02em;
`

export const FooterAmount = styled.span`
  ${mono}
  font-weight: 700;
  font-size: 14px;
  color: #0f172a;
  letter-spacing: -0.03em;
`

export const TfootRow = styled.tr`
  background: #f8fafc;
`

export const TfootTd = styled.td<{ $align?: 'left' | 'right' }>`
  padding: 13px 14px;
  vertical-align: middle;
  text-align: ${(p) => p.$align ?? 'left'};
  border-top: 1px solid #cbd5e1;
`

export const TfootLabel = styled.span`
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #475569;
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
  gap: 10px;
`

export const CurrencyToggleLabel = styled.span`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
`

export const CurrencyToggle = styled.div`
  padding: 2px;
  border-radius: 8px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
`

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
  overflow-x: auto;
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

export const Th = styled.th<{ $align?: 'left' | 'right' | 'center' }>`
  padding: 10px 12px;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
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

export const Td = styled.td<{ $align?: 'left' | 'right' | 'center' }>`
  padding: 12px 12px;
  vertical-align: middle;
  text-align: ${(p) => p.$align ?? 'left'};
  border-bottom: 1px solid #eef2f6;
`

export const RankBadge = styled.span<{ $tier: 'top3' | 'rest' }>`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;

  ${(p) =>
    p.$tier === 'top3'
      ? css`
          background: linear-gradient(145deg, #003973 0%, #0077ff 100%);
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 57, 115, 0.25);
        `
      : css`
          background: #eef2f7;
          color: #5a6d82;
        `}
`

export const NameBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

export const FullName = styled.span`
  font-weight: 700;
  color: #0d1b2a;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const EmailText = styled.span`
  font-size: 12px;
  color: #5a6d82;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const WalletTag = styled.span`
  display: inline-flex;
  max-width: 100%;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #003973;
  background: rgba(0, 57, 115, 0.07);
  border: 1px solid rgba(0, 57, 115, 0.1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const NumericCell = styled.span`
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: #0d1b2a;
  letter-spacing: -0.02em;
`

export const ArsCell = styled(NumericCell)`
  color: #0d1b2a;
`

export const UsdCell = styled(NumericCell)`
  color: #003973;
  font-weight: 700;
`

export const EmptyState = styled.div`
  padding: 28px 16px;
  text-align: center;
  color: #8494a7;
  font-size: 13px;
`

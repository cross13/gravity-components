import styled from 'styled-components'
import { Typography, Avatar, Button, Card } from 'antd'

const { Text, Title } = Typography

const ROW_BORDER = '#E8EDF2'

export const SparklineBarsRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 32px;
`

export const SparklineBarSeg = styled.div<{ $heightPct: number; $opacity: number; $color: string }>`
  flex: 1;
  height: ${(p) => p.$heightPct}%;
  border-radius: 2px;
  background: ${(p) => p.$color};
  opacity: ${(p) => p.$opacity};
  min-height: 3px;
`

export const GradientRoot = styled.div``

export const GradientLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 4px;
`

export const GradientTrack = styled.div`
  height: 6px;
  border-radius: 3px;
  background: #e8edf2;
  overflow: hidden;
`

export const GradientFill = styled.div<{ $percent: number; $gradient: string }>`
  width: ${(p) => p.$percent}%;
  height: 100%;
  border-radius: 3px;
  background: ${(p) => p.$gradient};
  transition: width 0.6s ease;
`

export const TxnClientRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const TxnClientAvatar = styled(Avatar)<{ $gradient: string }>`
  && {
    background: ${(p) => p.$gradient};
    font-weight: 600;
    font-size: 12px;
  }
`

export const TxnClientName = styled(Text).attrs({ strong: true })`
  display: block;
  line-height: 1.3;
`

export const TxnClientType = styled(Text).attrs({ type: 'secondary' })`
  font-size: 12px;
`

export const TxnAmountCell = styled(Text).attrs({ strong: true })`
  font-variant-numeric: tabular-nums;
`

export const CardExtraActions = styled.div`
  display: flex;
  gap: 8px;
`

export const ActivityRow = styled.div<{ $showBorder: boolean }>`
  display: flex;
  gap: 12px;
  padding: 14px 0;
  border-bottom: ${(p) => (p.$showBorder ? `1px solid ${ROW_BORDER}` : 'none')};
`

export const ActivityIconWrap = styled.div<{ $bg: string; $color: string }>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
  font-size: 14px;
`

export const ActivityBody = styled.div`
  flex: 1;
`

export const ActivityBodyClamp = styled.div`
  flex: 1;
  min-width: 0;
`

export const ActivityText = styled(Text)`
  font-size: 13.5px;
  color: #3d5068;
`

export const ActivityTime = styled.div`
  font-size: 12px;
  color: #8494a7;
  margin-top: 2px;
`

export const MetricsCard = styled(Card)`
  max-width: 460px;
`

export const TagsProgressCard = styled(Card)`
  max-width: 520px;
`

export const AlertsCard = styled(Card)`
  max-width: 560px;
`

export const ActivityCardNarrow = styled(Card)`
  max-width: 420px;
`

export const StackGap16 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const StackGap20 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const StackGap12 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const TagWrap = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

export const ProgressSectionLabel = styled(Text).attrs({ type: 'secondary' })`
  font-size: 12px;
  font-weight: 600;
  display: block;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`

export const ProgressSubheading = styled(Text).attrs({ type: 'secondary' })`
  font-size: 12px;
  font-weight: 600;
  display: block;
  margin-bottom: 12px;
`

export const FullDashboardColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const PageHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const DashPageTitle = styled(Title).attrs({ level: 3 })`
  margin: 0 !important;
  letter-spacing: -0.02em;
`

export const DashPageSubtitle = styled(Text).attrs({ type: 'secondary' })`
  font-size: 14px;
`

export const HeaderButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`

export const CyanPrimaryButton = styled(Button)`
  && {
    background: #00bbdd;
    border-color: #00bbdd;
  }
`

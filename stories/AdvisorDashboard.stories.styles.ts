import styled from 'styled-components'
import { Typography, Segmented } from 'antd'

const { Title, Text } = Typography

export const PageRoot = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #e8eef5;
  background-image:
    radial-gradient(ellipse 120% 80% at 50% -20%, rgba(12, 74, 110, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse 50% 40% at 100% 0%, rgba(14, 116, 144, 0.06) 0%, transparent 42%),
    linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%);
`

export const Content = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: clamp(16px, 3vw, 32px);
  padding-bottom: clamp(28px, 4vw, 48px);
  box-sizing: border-box;
`

export const DashboardShell = styled.div`
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 12px 40px -12px rgba(15, 23, 42, 0.08);
  overflow: hidden;
`

export const ShellBody = styled.div`
  padding: clamp(20px, 3vw, 32px);
  padding-top: 0;
  box-sizing: border-box;
`

export const TopAccent = styled.div`
  height: 4px;
  width: 100%;
  margin: 0 0 clamp(20px, 3vw, 28px);
  border-radius: 0;
  background: linear-gradient(90deg, #0c4a6e 0%, #0369a1 38%, #0d9488 100%);
  opacity: 1;
`

export const Header = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
  gap: clamp(16px, 2.5vw, 24px);
  margin-bottom: clamp(24px, 3vw, 32px);
  padding-bottom: clamp(20px, 2.5vw, 28px);
  border-bottom: 1px solid #e2e8f0;

  @media (min-width: 880px) {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 32px;
    align-items: end;
  }
`

export const HeaderLead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`

export const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
`

export const PageTitle = styled(Title).attrs({ level: 2 })`
  margin: 0 !important;
  letter-spacing: -0.035em;
  font-weight: 700 !important;
  font-size: clamp(22px, 2.4vw, 28px) !important;
  line-height: 1.2 !important;
  color: #0f172a !important;
`

export const AdvisorBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #0c4a6e;
  background: rgba(14, 116, 144, 0.1);
  border: 1px solid rgba(14, 116, 144, 0.18);
  white-space: nowrap;
`

export const PageSubtitle = styled(Text).attrs({ type: 'secondary' })`
  font-size: 14px;
  line-height: 1.55;
  max-width: 62ch;
  color: #64748b !important;
`

export const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  min-width: 0;

  @media (min-width: 880px) {
    align-items: flex-end;
    text-align: right;
  }
`

export const DatePill = styled.span`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #475569;
  background: #f8fafc;
  border: 1px solid #e2e8f0;

  @media (min-width: 880px) {
    align-self: flex-end;
  }
`

export const CurrencyBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  min-width: min(100%, 280px);

  @media (min-width: 880px) {
    align-items: flex-end;
  }
`

export const CurrencyLabel = styled.span`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
`

export const CurrencySegmented = styled(Segmented)`
  && {
    width: 100%;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    padding: 3px;
  }

  @media (min-width: 880px) {
    && {
      width: auto;
      min-width: 260px;
    }
  }
`

export const BodyStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 3vw, 32px);
`

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
  min-height: 20px;
`

export const SectionHint = styled(Text).attrs({ type: 'secondary' })`
  margin: 0 !important;
  flex-shrink: 0;
  font-size: 11px !important;
  font-weight: 700 !important;
  text-transform: uppercase;
  letter-spacing: 0.1em !important;
  color: #64748b !important;
`

export const SectionRule = styled.span`
  flex: 1;
  min-width: 24px;
  height: 1px;
  background: linear-gradient(90deg, #cbd5e1 0%, rgba(203, 213, 225, 0.2) 100%);
  border-radius: 1px;
`

export const TimelineSection = styled.section`
  margin: 0;
  min-width: 0;
`

export const LowerGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(24px, 3vw, 28px);
  align-items: start;

  @media (min-width: 1080px) {
    grid-template-columns: minmax(400px, 0.42fr) minmax(0, 1fr);
    gap: 28px;
  }
`

export const WalletColumn = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
`

export const ClientsColumn = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
`

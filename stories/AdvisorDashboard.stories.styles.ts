import styled from 'styled-components'
import { Typography, Segmented } from 'antd'

const { Title, Text } = Typography

export const PageRoot = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #e4eaf2;
  background-image:
    radial-gradient(ellipse 140% 90% at 50% -25%, rgba(0, 57, 115, 0.11) 0%, transparent 52%),
    radial-gradient(ellipse 60% 50% at 100% 0%, rgba(0, 187, 221, 0.06) 0%, transparent 45%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(228, 234, 242, 0.3) 100%);
`

export const Content = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  padding: 28px 28px 40px;
  box-sizing: border-box;
`

export const TopAccent = styled.div`
  height: 3px;
  width: 100%;
  margin: 0 0 24px;
  border-radius: 3px;
  background: linear-gradient(90deg, #003973 0%, #0077ff 42%, #00bbdd 100%);
  box-shadow: 0 2px 10px rgba(0, 57, 115, 0.12);
  opacity: 0.95;
`

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 28px;
`

export const HeaderLead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`

export const PageTitle = styled(Title).attrs({ level: 2 })`
  margin: 0 !important;
  letter-spacing: -0.03em;
  font-weight: 800 !important;
  color: #0d1b2a !important;
`

export const PageSubtitle = styled(Text).attrs({ type: 'secondary' })`
  font-size: 14px;
  line-height: 1.5;
  max-width: 48ch;
`

export const HeaderRight = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`

export const DatePill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #3d5068;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 57, 115, 0.12);
  box-shadow: 0 1px 3px rgba(0, 25, 51, 0.06);
`

export const CurrencySegmented = styled(Segmented)`
  && {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 57, 115, 0.1);
    padding: 2px;
  }
`

export const SectionHint = styled(Text).attrs({ type: 'secondary' })`
  display: block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 10px 2px;
  color: #5a6d82;
`

export const TimelineSection = styled.section`
  margin-bottom: 4px;
`

export const LowerGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: stretch;
  }
`

export const WalletColumn = styled.div`
  flex: 0 0 100%;

  @media (min-width: 992px) {
    flex: 0 0 380px;
    max-width: 420px;
  }
`

export const ClientsColumn = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`

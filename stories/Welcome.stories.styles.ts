import styled from 'styled-components'
import { Space, Row, Card, Avatar } from 'antd'
import { Alert } from '../src/components/Alert'
import { Title, Paragraph, Text } from '../src/components/Typography'

export const PageWrap = styled.div`
  max-width: 900px;
`

export const HeroBlock = styled.div`
  margin-bottom: 32px;
`

export const HeroTitle = styled(Title).attrs({ level: 2 })`
  margin-bottom: 4px !important;
  letter-spacing: -0.02em;
`

export const HeroLead = styled(Paragraph)`
  color: #8494a7;
  font-size: 15px;
  margin: 0;
`

export const AlertWrap = styled.div`
  margin-bottom: 28px;
`

export const StatRow = styled(Row)`
  margin-bottom: 28px;
`

export const ButtonSectionCard = styled(Card)`
  margin-bottom: 20px;
`

export const TwoColRow = styled(Row)`
  margin-bottom: 20px;
`

export const FullWidthStack = styled(Space).attrs({
  direction: 'vertical',
  size: 'middle',
})`
  width: 100%;
`

export const SwitchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const AvatarMg = styled(Avatar)`
  && {
    background: #003973;
  }
`

export const AvatarSf = styled(Avatar)`
  && {
    background: #00bbdd;
  }
`

export const AvatarRb = styled(Avatar)`
  && {
    background: #00b67a;
  }
`

export const PaletteRow = styled.div`
  display: flex;
`

export const PaletteCell = styled.div`
  flex: 1;
  padding: 16px;
  text-align: center;
  border-right: 1px solid #e8edf2;
`

export const PaletteSwatch = styled.div<{ $hex: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${(p) => p.$hex};
  margin: 0 auto 8px;
  box-shadow: 0 2px 8px -2px ${(p) => `${p.$hex}40`};
`

export const PaletteLabel = styled(Text)`
  font-size: 12px;
  display: block;
`

export const PaletteHex = styled(Text).attrs({ type: 'secondary' })`
  font-size: 11px;
`

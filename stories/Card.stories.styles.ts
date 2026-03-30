import styled from 'styled-components'
import { Typography } from 'antd'

export const DemoCard = styled.div<{ $width?: number }>`
  width: ${(p) => p.$width ?? 360}px;
`

export const BodyParagraph = styled(Typography.Paragraph)`
  margin: 0;
`

export const SuccessHint = styled(Typography.Text).attrs({ type: 'success' })`
  font-size: 12px;
`

export const SecondaryHint = styled(Typography.Text).attrs({ type: 'secondary' })`
  font-size: 12px;
`

export const WarningHint = styled(Typography.Text).attrs({ type: 'warning' })`
  font-size: 12px;
`

export const MetaCard = styled.div`
  width: 320px;
`

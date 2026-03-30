import styled from 'styled-components'

export const EmbedPadding = styled.div<{ $fullscreen: boolean }>`
  box-sizing: border-box;
  min-height: ${(p) => (p.$fullscreen ? '100vh' : 'auto')};
  padding: ${(p) => (p.$fullscreen ? 12 : 24)}px;
  display: flex;
  justify-content: center;
  align-items: ${(p) => (p.$fullscreen ? 'stretch' : 'flex-start')};
`

export const PlainPadding = styled.div<{ $fullscreen: boolean }>`
  padding: ${(p) => (p.$fullscreen ? 0 : 24)}px;
  min-height: ${(p) => (p.$fullscreen ? '100vh' : 'auto')};
`

import styled from 'styled-components'

export const Root = styled.div<{ $maxWidth: number; $padding: number }>`
  max-width: ${(p) => p.$maxWidth}px;
  margin: 0 auto;
  padding: ${(p) => p.$padding}px;
  width: 100%;
`

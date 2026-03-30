import type { PageContainerProps } from './PageContainer.types'
import { Root } from './PageContainer.styles'

export function PageContainer({
  children,
  maxWidth = 1200,
  padding = 24,
  style,
  className,
}: PageContainerProps) {
  return (
    <Root $maxWidth={maxWidth} $padding={padding} className={className} style={style}>
      {children}
    </Root>
  )
}

PageContainer.displayName = 'PageContainer'

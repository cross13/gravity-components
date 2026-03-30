import type { AppShellProps } from './AppShell.types'
import { Inner, Root, ShellContent, ShellHeader } from './AppShell.styles'

export function AppShell({
  sidebar,
  header,
  children,
  contentStyle,
  headerStyle,
  style,
  className,
}: AppShellProps) {
  return (
    <Root style={style} className={className}>
      {sidebar}
      <Inner>
        {header && <ShellHeader style={headerStyle}>{header}</ShellHeader>}
        <ShellContent style={contentStyle}>{children}</ShellContent>
      </Inner>
    </Root>
  )
}

AppShell.displayName = 'AppShell'

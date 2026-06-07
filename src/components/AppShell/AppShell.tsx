import type { AppShellProps } from './AppShell.types'
import {
  Inner,
  ProjectBar,
  Root,
  ShellContent,
  ShellHeader,
} from './AppShell.styles'

export function AppShell({
  sidebar,
  header,
  projectBar,
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
        {projectBar && <ProjectBar>{projectBar}</ProjectBar>}
        <ShellContent style={contentStyle}>{children}</ShellContent>
      </Inner>
    </Root>
  )
}

AppShell.displayName = 'AppShell'

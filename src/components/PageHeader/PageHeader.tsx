import { Breadcrumb, Space } from 'antd'
import type { PageHeaderProps } from './PageHeader.types'
import { PageTitle, Root, TitleRow } from './PageHeader.styles'

export function PageHeader({ title, breadcrumb, actions, style, className }: PageHeaderProps) {
  return (
    <Root className={className} style={style}>
      {breadcrumb && <Breadcrumb items={breadcrumb} />}
      <TitleRow>
        <PageTitle>{title}</PageTitle>
        {actions && <Space>{actions}</Space>}
      </TitleRow>
    </Root>
  )
}

PageHeader.displayName = 'PageHeader'

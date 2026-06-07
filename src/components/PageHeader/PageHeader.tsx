import { Breadcrumb, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '../Button'
import type { PageHeaderProps } from './PageHeader.types'
import {
  Root,
  TitleRow,
  TitleGroup,
  TitleBlock,
  PageTitle,
  PageSubtitle,
  StyledTabs,
} from './PageHeader.styles'

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
  onBack,
  tabs,
  style,
  className,
}: PageHeaderProps) {
  return (
    <Root className={className} style={style} $hasTabs={!!tabs}>
      {breadcrumb && <Breadcrumb items={breadcrumb} />}
      <TitleRow>
        <TitleGroup>
          {onBack && (
            <Button
              type="link"
              onClick={onBack}
              aria-label="Go back"
              icon={<ArrowLeftOutlined />}
            />
          )}
          <TitleBlock>
            <PageTitle>{title}</PageTitle>
            {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
          </TitleBlock>
        </TitleGroup>
        {actions && <Space>{actions}</Space>}
      </TitleRow>
      {tabs && <StyledTabs {...tabs} />}
    </Root>
  )
}

PageHeader.displayName = 'PageHeader'

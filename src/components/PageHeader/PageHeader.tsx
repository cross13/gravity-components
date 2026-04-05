import { Breadcrumb, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import type { PageHeaderProps } from './PageHeader.types'
import {
  Root,
  TitleRow,
  TitleGroup,
  TitleBlock,
  PageTitle,
  PageSubtitle,
  BackButton,
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
            <BackButton onClick={onBack} aria-label="Go back">
              <ArrowLeftOutlined />
            </BackButton>
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

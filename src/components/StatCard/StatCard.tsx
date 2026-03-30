import { Typography } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from '@ant-design/icons'
import type { StatCardProps } from './StatCard.types'
import {
  AccentBar,
  LabelText,
  PrefixText,
  Root,
  SparklineWrap,
  SuffixText,
  TrendBadge,
  TrendIconWrap,
  TrendValueText,
  ValueRow,
  ValueTitle,
} from './StatCard.styles'

const trendConfig = {
  up: { icon: <ArrowUpOutlined />, color: '#00B67A', bg: 'rgba(0, 182, 122, 0.08)' },
  down: { icon: <ArrowDownOutlined />, color: '#E62626', bg: 'rgba(230, 38, 38, 0.08)' },
  neutral: { icon: <MinusOutlined />, color: '#8494A7', bg: 'rgba(132, 148, 167, 0.08)' },
}

export function StatCard({
  label,
  value,
  trend,
  trendValue,
  sparkline,
  prefix,
  suffix,
  accentColor,
  style,
  className,
}: StatCardProps) {
  const trendInfo = trend ? trendConfig[trend] : null

  return (
    <Root variant="borderless" style={style} className={className}>
      {accentColor && <AccentBar $background={accentColor} />}
      <LabelText>{label}</LabelText>
      <ValueRow>
        {prefix && <PrefixText>{prefix}</PrefixText>}
        <ValueTitle>{value}</ValueTitle>
        {suffix && <SuffixText>{suffix}</SuffixText>}
      </ValueRow>
      {(trendInfo || trendValue) && (
        <TrendBadge $background={trendInfo?.bg ?? 'rgba(132, 148, 167, 0.08)'}>
          {trendInfo && <TrendIconWrap $color={trendInfo.color}>{trendInfo.icon}</TrendIconWrap>}
          {trendValue && (
            <TrendValueText $color={trendInfo?.color ?? '#8494A7'}>{trendValue}</TrendValueText>
          )}
        </TrendBadge>
      )}
      {sparkline && <SparklineWrap>{sparkline}</SparklineWrap>}
    </Root>
  )
}

StatCard.displayName = 'StatCard'

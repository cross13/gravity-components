import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Popover, Segmented, Spin, Tooltip } from 'antd'
import {
  BellOutlined,
  CheckCircleFilled,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
  InboxOutlined,
  InfoCircleFilled,
  WarningFilled,
} from '@ant-design/icons'
import type { NotificationCenterProps, NotificationItem, NotificationType } from './NotificationCenter.types'
import {
  ActionButton,
  BellButton,
  BellIconWrap,
  Body,
  Description,
  EmptyIconWrap,
  EmptyText,
  FilterBar,
  Footer,
  FooterButton,
  HeaderTitle,
  HeaderTitleWrap,
  IconBubble,
  List,
  MarkAllButton,
  Panel,
  PanelHeader,
  PulseRing,
  Row,
  RowActions,
  StateWrap,
  Time,
  Title,
  TitleLine,
  UnreadAccent,
  UnreadPill,
} from './NotificationCenter.styles'

const TYPE_ICON: Record<NotificationType, ReactNode> = {
  info: <InfoCircleFilled />,
  success: <CheckCircleFilled />,
  warning: <WarningFilled />,
  error: <ExclamationCircleFilled />,
}

const DEFAULT_LABELS = {
  title: 'Notifications',
  markAllRead: 'Mark all as read',
  all: 'All',
  unread: 'Unread',
  viewAll: 'View all notifications',
  empty: "You're all caught up",
  markRead: 'Mark as read',
  dismiss: 'Dismiss',
}

/** Lightweight relative-time formatter — avoids pulling a dayjs plugin into the bundle. */
function formatRelative(value: Date | number | string): string {
  const then = value instanceof Date ? value.getTime() : typeof value === 'number' ? value : Date.parse(value)
  if (Number.isNaN(then)) return String(value)
  const diff = then - Date.now()
  const abs = Math.abs(diff)
  const sec = Math.round(abs / 1000)
  const min = Math.round(sec / 60)
  const hr = Math.round(min / 60)
  const day = Math.round(hr / 24)
  const suffix = diff <= 0 ? ' ago' : ''
  const prefix = diff > 0 ? 'in ' : ''
  if (sec < 45) return 'just now'
  if (min < 60) return `${prefix}${min}m${suffix}`
  if (hr < 24) return `${prefix}${hr}h${suffix}`
  if (day < 7) return `${prefix}${day}d${suffix}`
  const weeks = Math.round(day / 7)
  if (day < 30) return `${prefix}${weeks}w${suffix}`
  const months = Math.round(day / 30)
  if (day < 365) return `${prefix}${months}mo${suffix}`
  return `${prefix}${Math.round(day / 365)}y${suffix}`
}

function renderTime(time: NotificationItem['time']) {
  if (time == null) return null
  if (time instanceof Date || typeof time === 'number') return formatRelative(time)
  if (typeof time === 'string') {
    // ISO-ish strings get relativized; plain labels render verbatim.
    const parsed = Date.parse(time)
    return Number.isNaN(parsed) ? time : formatRelative(parsed)
  }
  return time
}

export function NotificationCenter({
  items,
  unreadCount,
  maxCount = 99,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  onItemClick,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  onViewAll,
  placement = 'bottomRight',
  width = 380,
  listMaxHeight = 420,
  filterable = true,
  showMarkAllRead = true,
  loading = false,
  animate = true,
  labels,
  emptyContent,
  className,
  style,
}: NotificationCenterProps) {
  const t = { ...DEFAULT_LABELS, ...labels }

  // Local working copy so the panel feels responsive even when the consumer
  // doesn't wire every callback. Re-syncs whenever the `items` prop changes.
  const [localItems, setLocalItems] = useState(items)
  useEffect(() => {
    setLocalItems(items)
  }, [items])

  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpenControlled = controlledOpen !== undefined
  const open = isOpenControlled ? controlledOpen : internalOpen

  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isOpenControlled, onOpenChange],
  )

  const derivedUnread = useMemo(
    () => localItems.reduce((n, it) => (it.read ? n : n + 1), 0),
    [localItems],
  )
  const badgeCount = unreadCount ?? derivedUnread
  const hasUnread = badgeCount > 0

  const visibleItems = useMemo(
    () => (filter === 'unread' ? localItems.filter((it) => !it.read) : localItems),
    [filter, localItems],
  )

  const markRead = useCallback(
    (id: string) => {
      setLocalItems((prev) => prev.map((it) => (it.id === id ? { ...it, read: true } : it)))
      onMarkRead?.(id)
    },
    [onMarkRead],
  )

  const handleItemClick = useCallback(
    (item: NotificationItem) => {
      if (!item.read) markRead(item.id)
      onItemClick?.(item)
    },
    [markRead, onItemClick],
  )

  const handleMarkAll = useCallback(() => {
    setLocalItems((prev) => prev.map((it) => (it.read ? it : { ...it, read: true })))
    onMarkAllRead?.()
  }, [onMarkAllRead])

  const handleDismiss = useCallback(
    (id: string) => {
      setLocalItems((prev) => prev.filter((it) => it.id !== id))
      onDismiss?.(id)
    },
    [onDismiss],
  )

  const handleViewAll = useCallback(() => {
    setOpen(false)
    onViewAll?.()
  }, [onViewAll, setOpen])

  const badgeLabel = badgeCount > maxCount ? `${maxCount}+` : String(badgeCount)

  const content = (
    <Panel $width={width} role="dialog" aria-label={t.title}>
      <PanelHeader>
        <HeaderTitleWrap>
          <HeaderTitle>{t.title}</HeaderTitle>
          {hasUnread && <UnreadPill aria-label={`${badgeCount} unread`}>{badgeLabel}</UnreadPill>}
        </HeaderTitleWrap>
        {showMarkAllRead && (
          <MarkAllButton type="button" onClick={handleMarkAll} disabled={derivedUnread === 0}>
            <CheckOutlined />
            {t.markAllRead}
          </MarkAllButton>
        )}
      </PanelHeader>

      {filterable && (
        <FilterBar>
          <Segmented
            size="small"
            block
            value={filter}
            onChange={(v) => setFilter(v as 'all' | 'unread')}
            options={[
              { label: t.all, value: 'all' },
              {
                label: derivedUnread > 0 ? `${t.unread} (${derivedUnread})` : t.unread,
                value: 'unread',
              },
            ]}
          />
        </FilterBar>
      )}

      {loading ? (
        <StateWrap>
          <Spin />
        </StateWrap>
      ) : visibleItems.length === 0 ? (
        emptyContent ?? (
          <StateWrap>
            <EmptyIconWrap>
              <InboxOutlined />
            </EmptyIconWrap>
            <EmptyText>{t.empty}</EmptyText>
          </StateWrap>
        )
      ) : (
        <List $maxHeight={listMaxHeight}>
          {visibleItems.map((item) => {
            const type = item.type ?? 'info'
            const unread = !item.read
            return (
              <Row
                key={item.id}
                $unread={unread}
                role="button"
                tabIndex={0}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleItemClick(item)
                  }
                }}
              >
                {unread && <UnreadAccent aria-hidden />}
                <IconBubble $type={type} aria-hidden>
                  {item.icon ?? TYPE_ICON[type]}
                </IconBubble>
                <Body>
                  <TitleLine>
                    <Title $unread={unread}>{item.title}</Title>
                    {item.time != null && <Time>{renderTime(item.time)}</Time>}
                  </TitleLine>
                  {item.description != null && <Description>{item.description}</Description>}
                </Body>

                <RowActions onClick={(e) => e.stopPropagation()}>
                  {unread && (
                    <Tooltip title={t.markRead}>
                      <ActionButton
                        type="button"
                        aria-label={t.markRead}
                        onClick={() => markRead(item.id)}
                      >
                        <CheckOutlined />
                      </ActionButton>
                    </Tooltip>
                  )}
                  {onDismiss && (
                    <Tooltip title={t.dismiss}>
                      <ActionButton
                        type="button"
                        aria-label={t.dismiss}
                        onClick={() => handleDismiss(item.id)}
                      >
                        <CloseOutlined />
                      </ActionButton>
                    </Tooltip>
                  )}
                </RowActions>
              </Row>
            )
          })}
        </List>
      )}

      {onViewAll && (
        <Footer>
          <FooterButton type="button" onClick={handleViewAll}>
            {t.viewAll}
          </FooterButton>
        </Footer>
      )}
    </Panel>
  )

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      content={content}
      trigger="click"
      placement={placement}
      arrow={false}
      styles={{ content: { padding: 0 } }}
    >
      <BellButton
        type="button"
        $active={open}
        aria-label={`${t.title}${hasUnread ? `, ${badgeCount} unread` : ''}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={className}
        style={style}
      >
        <BellIconWrap $ring={animate && hasUnread && !open}>
          <BellOutlined />
        </BellIconWrap>
        {hasUnread && <PulseRing $pulse={animate && !open} aria-hidden />}
      </BellButton>
    </Popover>
  )
}

NotificationCenter.displayName = 'NotificationCenter'

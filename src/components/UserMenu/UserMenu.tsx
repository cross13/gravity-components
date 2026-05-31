import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Dropdown } from 'antd'
import { DownOutlined, GlobalOutlined, LogoutOutlined } from '@ant-design/icons'
import type { UserMenuLanguage, UserMenuProps } from './UserMenu.types'
import {
  Avatar,
  Chevron,
  Divider,
  Header,
  HeaderEmail,
  HeaderInfo,
  HeaderName,
  Item,
  ItemExtra,
  ItemIcon,
  ItemLabel,
  LangLabel,
  LangLabelIcon,
  LangOption,
  LangRow,
  LangSwitch,
  Panel,
  RolePill,
  Section,
  Trigger,
  TriggerName,
  TriggerRole,
  TriggerText,
} from './UserMenu.styles'

const DEFAULT_LANGUAGES: UserMenuLanguage[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
]

const DEFAULT_LABELS = {
  language: 'Language',
  logout: 'Sign out',
}

/** Two-letter initials from a display name. */
function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function renderAvatar(
  avatar: ReactNode,
  initials: string,
  size: number,
  background?: string,
  color?: string,
) {
  // String → treat as image URL.
  if (typeof avatar === 'string') {
    return (
      <Avatar $size={size} $image $background={background} $color={color} aria-hidden>
        <img src={avatar} alt="" />
      </Avatar>
    )
  }
  // Any other node → render as-is (consumer-provided <Avatar>, icon, etc.).
  if (avatar != null) {
    return (
      <Avatar $size={size} $image $background={background} $color={color} aria-hidden>
        {avatar}
      </Avatar>
    )
  }
  // Fallback → gradient initials.
  return (
    <Avatar $size={size} $image={false} $background={background} $color={color} aria-hidden>
      {initials}
    </Avatar>
  )
}

export function UserMenu({
  name,
  email,
  role,
  avatar,
  initials,
  avatarBackground,
  avatarColor,
  items = [],
  onSelect,
  showLanguageSwitch = true,
  languages = DEFAULT_LANGUAGES,
  language: controlledLang,
  defaultLanguage,
  onLanguageChange,
  showLogout = true,
  onLogout,
  showText = true,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottomRight',
  width = 280,
  labels,
  className,
  style,
}: UserMenuProps) {
  const t = { ...DEFAULT_LABELS, ...labels }
  const resolvedInitials = initials ?? deriveInitials(name)

  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpenControlled = controlledOpen !== undefined
  const open = isOpenControlled ? controlledOpen : internalOpen

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isOpenControlled, onOpenChange],
  )

  const [internalLang, setInternalLang] = useState(defaultLanguage ?? languages[0]?.code)
  const isLangControlled = controlledLang !== undefined
  const activeLang = isLangControlled ? controlledLang : internalLang

  const selectLang = useCallback(
    (code: string) => {
      if (code === activeLang) return
      if (!isLangControlled) setInternalLang(code)
      onLanguageChange?.(code)
    },
    [activeLang, isLangControlled, onLanguageChange],
  )

  const handleItem = useCallback(
    (key: string, onClick?: () => void) => {
      onClick?.()
      onSelect?.(key)
      setOpen(false)
    },
    [onSelect, setOpen],
  )

  const handleLogout = useCallback(() => {
    onLogout?.()
    setOpen(false)
  }, [onLogout, setOpen])

  const roleLabel = useMemo(() => role ?? null, [role])

  const panel = (
    <Panel $width={width} role="menu" aria-label={name}>
      <Header>
        {renderAvatar(avatar, resolvedInitials, 44, avatarBackground, avatarColor)}
        <HeaderInfo>
          <HeaderName>{name}</HeaderName>
          {email != null && <HeaderEmail>{email}</HeaderEmail>}
          {roleLabel != null && <RolePill>{roleLabel}</RolePill>}
        </HeaderInfo>
      </Header>

      {items.length > 0 && (
        <Section>
          {items.map((item) => (
            <div key={item.key}>
              {item.divider && <Divider />}
              <Item
                type="button"
                role="menuitem"
                $danger={item.danger}
                onClick={() => handleItem(item.key, item.onClick)}
              >
                {item.icon != null && <ItemIcon $danger={item.danger}>{item.icon}</ItemIcon>}
                <ItemLabel>{item.label}</ItemLabel>
                {item.extra != null && <ItemExtra>{item.extra}</ItemExtra>}
              </Item>
            </div>
          ))}
        </Section>
      )}

      {showLanguageSwitch && languages.length > 1 && (
        <>
          {items.length > 0 && <Divider />}
          <LangRow>
            <LangLabel>
              <LangLabelIcon>
                <GlobalOutlined />
              </LangLabelIcon>
              {t.language}
            </LangLabel>
            <LangSwitch role="radiogroup" aria-label={t.language}>
              {languages.map((lng) => (
                <LangOption
                  key={lng.code}
                  type="button"
                  role="radio"
                  aria-checked={lng.code === activeLang}
                  $active={lng.code === activeLang}
                  onClick={() => selectLang(lng.code)}
                >
                  {lng.label}
                </LangOption>
              ))}
            </LangSwitch>
          </LangRow>
        </>
      )}

      {showLogout && (
        <Section>
          <Divider />
          <Item type="button" role="menuitem" $danger onClick={handleLogout}>
            <ItemIcon $danger>
              <LogoutOutlined />
            </ItemIcon>
            <ItemLabel>{t.logout}</ItemLabel>
          </Item>
        </Section>
      )}
    </Panel>
  )

  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      trigger={['click']}
      placement={placement}
      popupRender={() => panel}
    >
      <Trigger
        type="button"
        $open={open}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account menu for ${name}`}
        className={className}
        style={style}
      >
        {renderAvatar(avatar, resolvedInitials, 36, avatarBackground, avatarColor)}
        {showText && (
          <TriggerText>
            <TriggerName>{name}</TriggerName>
            {role != null && <TriggerRole>{role}</TriggerRole>}
          </TriggerText>
        )}
        <Chevron $open={open} aria-hidden>
          <DownOutlined />
        </Chevron>
      </Trigger>
    </Dropdown>
  )
}

UserMenu.displayName = 'UserMenu'

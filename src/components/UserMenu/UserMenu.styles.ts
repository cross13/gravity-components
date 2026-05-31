import styled, { keyframes } from 'styled-components'

/* ------------------------------------------------------------------ *
 * Trigger
 * ------------------------------------------------------------------ */

export const Trigger = styled.button<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  padding: 0 8px 0 6px;
  border: none;
  border-radius: 12px;
  background: ${(p) => (p.$open ? '#eef4fb' : 'transparent')};
  cursor: pointer;
  transition:
    background 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    background: #eef4fb;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 187, 221, 0.25);
  }
`

export const TriggerText = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.25;
  max-width: 160px;
`

export const TriggerName = styled.span`
  font-size: 13px;
  font-weight: 650;
  color: #0d1b2a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`

export const TriggerRole = styled.span`
  font-size: 11px;
  color: #8494a7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`

export const Chevron = styled.span<{ $open: boolean }>`
  display: inline-flex;
  font-size: 11px;
  color: #8494a7;
  transition: transform 0.22s ease;
  transform: rotate(${(p) => (p.$open ? '180deg' : '0deg')});
`

/* ------------------------------------------------------------------ *
 * Avatar
 * ------------------------------------------------------------------ */

export const Avatar = styled.span<{
  $size: number
  $image: boolean
  $background?: string
  $color?: string
}>`
  position: relative;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border-radius: 50%;
  overflow: hidden;
  background: ${(p) =>
    p.$background ?? (p.$image ? '#e8edf2' : 'linear-gradient(135deg, #003973, #00bbdd)')};
  color: ${(p) => p.$color ?? '#fff'};
  font-size: ${(p) => Math.round(p.$size * 0.4)}px;
  font-weight: 700;
  letter-spacing: 0.01em;
  user-select: none;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

/* ------------------------------------------------------------------ *
 * Panel
 * ------------------------------------------------------------------ */

const panelIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

export const Panel = styled.div<{ $width: number }>`
  width: ${(p) => p.$width}px;
  max-width: calc(100vw - 24px);
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #eef1f5;
  box-shadow:
    0 12px 32px -8px rgba(0, 25, 51, 0.18),
    0 0 0 1px rgba(0, 25, 51, 0.03);
  overflow: hidden;
  transform-origin: top right;
  animation: ${panelIn} 0.16s cubic-bezier(0.16, 1, 0.3, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(0, 57, 115, 0.05), rgba(0, 187, 221, 0.06));
  border-bottom: 1px solid #eef1f5;
`

export const HeaderInfo = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`

export const HeaderName = styled.div`
  font-size: 14.5px;
  font-weight: 700;
  color: #0d1b2a;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const HeaderEmail = styled.div`
  font-size: 12px;
  color: #3d5068;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 1px;
`

export const RolePill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 8px;
  padding: 2px 9px 2px 7px;
  border-radius: 999px;
  background: rgba(0, 57, 115, 0.08);
  color: #003973;
  font-size: 11px;
  font-weight: 650;
  line-height: 1.4;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00b67a;
    box-shadow: 0 0 0 2px rgba(0, 182, 122, 0.2);
  }
`

export const Section = styled.div`
  padding: 6px;
`

export const Item = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 9px 10px;
  border: none;
  border-radius: 9px;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-size: 13px;
  font-weight: 500;
  color: ${(p) => (p.$danger ? '#e62626' : '#0d1b2a')};
  transition:
    background 0.14s ease,
    color 0.14s ease,
    padding-left 0.14s ease;

  &:hover {
    background: ${(p) => (p.$danger ? 'rgba(230, 38, 38, 0.08)' : '#f5f8fb')};
    padding-left: 13px;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 187, 221, 0.3);
  }
`

export const ItemIcon = styled.span<{ $danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  font-size: 15px;
  color: ${(p) => (p.$danger ? '#e62626' : '#8494a7')};
`

export const ItemLabel = styled.span`
  flex: 1 1 auto;
`

export const ItemExtra = styled.span`
  flex: 0 0 auto;
  font-size: 11px;
  color: #8494a7;
`

export const Divider = styled.div`
  height: 1px;
  margin: 4px 10px;
  background: #eef1f5;
`

/* ------------------------------------------------------------------ *
 * Language switch
 * ------------------------------------------------------------------ */

export const LangRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 10px 10px;
`

export const LangLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 500;
  color: #0d1b2a;
`

export const LangLabelIcon = styled.span`
  display: inline-flex;
  width: 17px;
  font-size: 15px;
  color: #8494a7;
`

export const LangSwitch = styled.div`
  display: inline-flex;
  padding: 2px;
  border-radius: 9px;
  background: #f0f3f7;
  gap: 2px;
`

export const LangOption = styled.button<{ $active: boolean }>`
  position: relative;
  border: none;
  background: ${(p) => (p.$active ? '#ffffff' : 'transparent')};
  color: ${(p) => (p.$active ? '#003973' : '#8494a7')};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 4px 11px;
  border-radius: 7px;
  cursor: pointer;
  transition:
    color 0.15s ease,
    background 0.15s ease,
    box-shadow 0.15s ease;
  box-shadow: ${(p) => (p.$active ? '0 1px 3px rgba(0, 25, 51, 0.12)' : 'none')};

  &:hover {
    color: #003973;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 187, 221, 0.35);
  }
`

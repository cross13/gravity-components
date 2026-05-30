import styled, { css, keyframes } from 'styled-components'
import type { NotificationType } from './NotificationCenter.types'

const ACCENT = {
  info: '#0077FF',
  success: '#00B67A',
  warning: '#F5A623',
  error: '#E62626',
} as const

const ACCENT_SOFT = {
  info: 'rgba(0, 119, 255, 0.10)',
  success: 'rgba(0, 182, 122, 0.10)',
  warning: 'rgba(245, 166, 35, 0.12)',
  error: 'rgba(230, 38, 38, 0.10)',
} as const

/* ------------------------------------------------------------------ *
 * Bell trigger
 * ------------------------------------------------------------------ */

const swing = keyframes`
  0%, 65%, 100% { transform: rotate(0); }
  68% { transform: rotate(14deg); }
  71% { transform: rotate(-11deg); }
  74% { transform: rotate(9deg); }
  77% { transform: rotate(-7deg); }
  80% { transform: rotate(4deg); }
  83% { transform: rotate(-2deg); }
  86% { transform: rotate(0); }
`

const ping = keyframes`
  0% { transform: scale(1); opacity: 0.55; }
  70%, 100% { transform: scale(2.4); opacity: 0; }
`

export const BellButton = styled.button<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 10px;
  background: ${(p) => (p.$active ? '#eef4fb' : 'transparent')};
  color: ${(p) => (p.$active ? '#003973' : '#8494a7')};
  cursor: pointer;
  transition:
    background 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    background: #eef4fb;
    color: #003973;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 187, 221, 0.25);
  }
`

export const BellIconWrap = styled.span<{ $ring: boolean }>`
  display: inline-flex;
  font-size: 19px;
  line-height: 1;
  transform-origin: 50% 4px;

  ${(p) =>
    p.$ring &&
    css`
      animation: ${swing} 4.5s ease-in-out infinite;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

/** Unread dot behind/above the bell, with an optional pulsing ring. */
export const PulseRing = styled.span<{ $pulse: boolean }>`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #e62626;
  box-shadow: 0 0 0 2px #fff;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #e62626;
    ${(p) =>
      p.$pulse &&
      css`
        animation: ${ping} 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;
      `}
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }
`

/* ------------------------------------------------------------------ *
 * Panel
 * ------------------------------------------------------------------ */

export const Panel = styled.div<{ $width: number }>`
  width: ${(p) => p.$width}px;
  max-width: calc(100vw - 24px);
  display: flex;
  flex-direction: column;
`

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px 12px;
  border-bottom: 1px solid #eef1f5;
`

export const HeaderTitleWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

export const HeaderTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #0d1b2a;
  letter-spacing: -0.01em;
`

export const UnreadPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background: #003973;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1;
`

export const MarkAllButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: transparent;
  padding: 4px 6px;
  margin: -4px -6px;
  border-radius: 6px;
  color: #0077b8;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: #eef4fb;
    color: #003973;
  }

  &:disabled {
    color: #b8c4d0;
    cursor: default;
    background: transparent;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 187, 221, 0.3);
  }
`

export const FilterBar = styled.div`
  padding: 10px 16px 4px;
`

export const List = styled.div<{ $maxHeight: number }>`
  max-height: ${(p) => p.$maxHeight}px;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 6px 8px;

  /* slim scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #d5dce5 transparent;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d5dce5;
    border-radius: 8px;
    border: 2px solid #fff;
  }
`

export const Row = styled.div<{ $unread: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 12px 12px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.14s ease;
  background: ${(p) => (p.$unread ? '#f5f9ff' : 'transparent')};

  &:hover {
    background: ${(p) => (p.$unread ? '#eef4fb' : '#f5f8fb')};
  }

  & + & {
    margin-top: 2px;
  }
`

/** Left accent bar for unread rows. */
export const UnreadAccent = styled.span`
  position: absolute;
  left: 4px;
  top: 14px;
  bottom: 14px;
  width: 3px;
  border-radius: 2px;
  background: linear-gradient(180deg, #003973, #00bbdd);
`

export const IconBubble = styled.span<{ $type: NotificationType }>`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-size: 17px;
  background: ${(p) => ACCENT_SOFT[p.$type]};
  color: ${(p) => ACCENT[p.$type]};

  /* support custom <img>/avatar children */
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`

export const Body = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`

export const TitleLine = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
`

export const Title = styled.div<{ $unread: boolean }>`
  font-size: 13.5px;
  font-weight: ${(p) => (p.$unread ? 650 : 500)};
  color: #0d1b2a;
  line-height: 1.35;
`

export const Time = styled.span`
  flex: 0 0 auto;
  font-size: 11.5px;
  color: #8494a7;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`

export const Description = styled.div`
  margin-top: 2px;
  font-size: 12.5px;
  color: #3d5068;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const RowActions = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: inline-flex;
  gap: 2px;
  opacity: 0;
  transform: translateY(-2px);
  transition:
    opacity 0.14s ease,
    transform 0.14s ease;

  ${Row}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  /* keep actions reachable for keyboard / touch */
  &:focus-within {
    opacity: 1;
    transform: translateY(0);
  }
`

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(2px);
  color: #8494a7;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 25, 51, 0.1);
  transition:
    color 0.14s ease,
    background 0.14s ease;

  &:hover {
    color: #003973;
    background: #fff;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 187, 221, 0.35);
  }
`

/* ------------------------------------------------------------------ *
 * Empty + loading + footer
 * ------------------------------------------------------------------ */

export const StateWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px 24px;
  text-align: center;
`

export const EmptyIconWrap = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #f0f3f7;
  color: #b8c4d0;
  font-size: 24px;
`

export const EmptyText = styled.div`
  font-size: 13px;
  color: #8494a7;
  font-weight: 500;
`

export const Footer = styled.div`
  border-top: 1px solid #eef1f5;
  padding: 8px;
`

export const FooterButton = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  padding: 9px;
  border-radius: 8px;
  color: #0077b8;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: #eef4fb;
    color: #003973;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 187, 221, 0.3);
  }
`

import styled from 'styled-components'
import { Typography } from 'antd'

const { Text, Paragraph } = Typography

const CYAN = '#00bbdd'

export const IconGridRoot = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 4px;
`

export const IconCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 8px;
  border-radius: 8px;
  cursor: default;
  transition: background 0.15s;

  &:hover {
    background: #f0f3f7;
  }
`

export const IconName = styled(Text).attrs({ type: 'secondary' })`
  font-size: 10.5px;
  text-align: center;
  line-height: 1.2;
  word-break: break-all;
`

export const StrokeIntro = styled(Paragraph).attrs({ type: 'secondary' })`
  margin-bottom: 20px;
`

export const StrokeRow = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
`

export const StrokeCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

export const StrokeSwatch = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: #f0f3f7;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StrokeLabel = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: #3d5068;
`

export const SizesRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
`

export const SizeCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

export const SizeCaption = styled(Text).attrs({ type: 'secondary' })`
  font-size: 11px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
`

export const ThemedRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`

export const ThemedCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

export const ThemedSwatch = styled.div<{ $bg: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ThemedLabel = styled(Text)`
  font-size: 12px;
  font-weight: 500;
`

export const ComponentsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const StatTrendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
`

export const StatTrendText = styled(Text)<{ $color: string }>`
  font-size: 12px;
  font-weight: 500;
  color: ${(p) => p.$color};
`

export const SidebarDemo = styled.div`
  width: 240px;
  background: #001224;
  border-radius: 12px;
  padding: 16px 12px;
`

export const NavItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 2px;
  background: ${(p) => (p.$active ? 'rgba(0, 187, 221, 0.12)' : 'transparent')};
  cursor: pointer;
  position: relative;
`

export const NavActiveBar = styled.div`
  position: absolute;
  left: 0;
  top: 20%;
  bottom: 20%;
  width: 3px;
  border-radius: 2px;
  background: ${CYAN};
`

export const NavItemLabel = styled(Text)<{ $active: boolean }>`
  font-size: 13.5px;
  color: ${(p) => (p.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.45)')};
  font-weight: ${(p) => (p.$active ? 600 : 400)};
  flex: 1;
`

export const NavItemBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${CYAN};
  background: rgba(0, 187, 221, 0.15);
  padding: 1px 7px;
  border-radius: 10px;
`

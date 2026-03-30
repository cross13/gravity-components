import styled from 'styled-components'

export const chrome = {
  barBg: '#E8EDF2',
  barBorder: '#D5DCE5',
  dotClose: '#FF5F57',
  dotMin: '#FEBC2E',
  dotMax: '#28C840',
  urlBg: '#FFFFFF',
  urlText: '#3D5068',
  urlMuted: '#8494A7',
  shellShadow: '0 8px 32px -8px rgba(0, 25, 51, 0.14), 0 0 0 1px rgba(0, 25, 51, 0.06)',
  contentBg: '#F0F3F7',
} as const

export const FrameShell = styled.div<{ $fullscreen?: boolean }>`
  width: 100%;
  max-width: ${(p) => (p.$fullscreen ? '100%' : '1180px')};
  min-height: ${(p) => (p.$fullscreen ? 'calc(100vh - 32px)' : '280px')};
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: ${chrome.urlBg};
  box-shadow: ${chrome.shellShadow};
`

export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 40px;
  padding-left: 14px;
  padding-right: 14px;
  background: ${chrome.barBg};
  border-bottom: 1px solid ${chrome.barBorder};
  flex-shrink: 0;
`

export const TrafficLights = styled.div`
  display: flex;
  gap: 6px;
  flex-shrink: 0;
`

export const TrafficDot = styled.span<{ $color: string; $shadow: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  box-shadow: ${(p) => p.$shadow};
`

export const WindowTitle = styled.div`
  flex: 1;
  min-width: 0;
  font-size: 12.5px;
  font-weight: 600;
  color: #0d1b2a;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family:
    'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`

export const AddressBarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: ${chrome.barBg};
  border-bottom: 1px solid ${chrome.barBorder};
  flex-shrink: 0;
`

export const UrlField = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 8px;
  background: ${chrome.urlBg};
  border: 1px solid ${chrome.barBorder};
  box-shadow: inset 0 1px 2px rgba(0, 25, 51, 0.04);
`

export const UrlText = styled.span`
  font-size: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: ${chrome.urlText};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const UrlHost = styled.span`
  color: ${chrome.urlMuted};
`

export const Canvas = styled.div<{ $fullscreen?: boolean }>`
  flex: ${(p) => (p.$fullscreen ? 1 : 'none')};
  min-height: ${(p) => (p.$fullscreen ? 0 : 200)}px;
  background: ${chrome.contentBg};
  overflow: auto;
  padding: 20px;
`

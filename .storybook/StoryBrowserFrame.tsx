import React, { type ReactNode } from 'react'
import {
  AddressBarRow,
  Canvas,
  chrome,
  FrameShell,
  TitleBar,
  TrafficDot,
  TrafficLights,
  UrlField,
  UrlHost,
  UrlText,
  WindowTitle,
} from './StoryBrowserFrame.styles'

export interface StoryBrowserFrameProps {
  /** Window title (story group + name) */
  title: string
  /** Fake path shown in the address bar */
  path: string
  /** Full-viewport height content area (e.g. layout: fullscreen) */
  fullscreen?: boolean
  children: ReactNode
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        stroke={chrome.urlMuted}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Embeds story content in a lightweight “browser window” chrome (similar to doc/code preview frames).
 */
export function StoryBrowserFrame({
  title,
  path,
  fullscreen,
  children,
}: StoryBrowserFrameProps) {
  return (
    <FrameShell $fullscreen={fullscreen}>
      <TitleBar>
        <TrafficLights>
          <TrafficDot
            $color={chrome.dotClose}
            $shadow="inset 0 0 0 0.5px rgba(0,0,0,0.12)"
          />
          <TrafficDot
            $color={chrome.dotMin}
            $shadow="inset 0 0 0 0.5px rgba(0,0,0,0.08)"
          />
          <TrafficDot
            $color={chrome.dotMax}
            $shadow="inset 0 0 0 0.5px rgba(0,0,0,0.08)"
          />
        </TrafficLights>
        <WindowTitle title={title}>{title}</WindowTitle>
      </TitleBar>

      <AddressBarRow>
        <UrlField>
          <LockIcon />
          <UrlText>
            <UrlHost>https://gravity.local</UrlHost>
            {path}
          </UrlText>
        </UrlField>
      </AddressBarRow>

      <Canvas $fullscreen={fullscreen}>{children}</Canvas>
    </FrameShell>
  )
}

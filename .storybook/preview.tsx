import type { Preview } from '@storybook/react'
import React from 'react'
import { GravityProvider } from '../src/theme'
import { StoryBrowserFrame } from './StoryBrowserFrame'
import { EmbedPadding, PlainPadding } from './preview.styles'

function storyPathFromContext(title: string, name: string): string {
  const parts = title
    .split('/')
    .map((s) => s.trim().toLowerCase().replace(/\s+/g, '-'))
    .filter(Boolean)
  const storySlug = (name || 'story').toLowerCase().replace(/\s+/g, '-')
  return `/${[...parts, storySlug].join('/')}`
}

function windowTitleFromContext(title: string, name: string): string {
  const leaf = title.includes('/') ? title.split('/').pop()!.trim() : title.trim()
  return name ? `${leaf} — ${name}` : leaf
}

const preview: Preview = {
  /** Enable autodocs for all stories (Docs tab: description, examples, source, props table). */
  tags: ['autodocs'],
  globalTypes: {
    colorPrimary: {
      description: 'Primary brand color',
      toolbar: {
        title: 'Primary Color',
        items: [
          { value: '#003973', title: 'Navy (default)' },
          { value: '#00BBDD', title: 'Cyan Accent' },
          { value: '#0077FF', title: 'Blue' },
          { value: '#00B67A', title: 'Emerald' },
          { value: '#E62626', title: 'Red' },
          { value: '#F5A623', title: 'Amber' },
        ],
        dynamicTitle: true,
      },
    },
    borderRadius: {
      description: 'Global border radius',
      toolbar: {
        title: 'Border Radius',
        items: [
          { value: '0', title: 'None (0px)' },
          { value: '4', title: 'Small (4px)' },
          { value: '8', title: 'Medium (8px)' },
          { value: '12', title: 'Large (12px)' },
          { value: '16', title: 'XL (16px)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorPrimary: '#003973',
    borderRadius: '8',
  },
  decorators: [
    (Story, context) => {
      const colorPrimary = context.globals.colorPrimary || '#003973'
      const borderRadius = parseInt(context.globals.borderRadius || '8', 10)

      const title = String(context.title || 'Story')
      const name = String(context.name || '')
      const fullscreen = context.parameters.layout === 'fullscreen'
      const skipFrame = context.parameters.embedBrowserFrame === false

      const inner = <Story />

      return (
        <GravityProvider
          tokens={{
            colorPrimary,
            borderRadius,
          }}
        >
          {skipFrame ? (
            <PlainPadding $fullscreen={fullscreen}>{inner}</PlainPadding>
          ) : (
            <EmbedPadding $fullscreen={fullscreen}>
              <StoryBrowserFrame
                title={windowTitleFromContext(title, name)}
                path={storyPathFromContext(title, name)}
                fullscreen={fullscreen}
              >
                {inner}
              </StoryBrowserFrame>
            </EmbedPadding>
          )}
        </GravityProvider>
      )
    },
  ],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#D8DEE6' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'dark', value: '#001224' },
      ],
    },
  },
}

export default preview

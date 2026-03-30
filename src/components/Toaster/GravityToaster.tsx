import { theme } from 'antd'
import { forwardRef, useId, useMemo } from 'react'
import type { CSSProperties } from 'react'
import { Toaster } from 'sonner'
import type { ToasterProps } from 'sonner'

export interface GravityToasterProps extends Omit<ToasterProps, 'theme'> {
  /** Passed to Sonner (`light` / `dark` / `system`). */
  theme?: 'light' | 'dark' | 'system'
}

function sonnerVarsFromToken(
  token: ReturnType<typeof theme.useToken>['token'],
): CSSProperties {
  return {
    '--width': '380px',
    '--border-radius': `${token.borderRadiusLG}px`,
    '--normal-bg': token.colorBgElevated,
    '--normal-border': token.colorBorderSecondary,
    '--normal-text': token.colorText,
    '--success-bg': token.colorSuccessBg,
    '--success-border': token.colorSuccessBorder,
    '--success-text': token.colorSuccess,
    '--info-bg': token.colorInfoBg,
    '--info-border': token.colorInfoBorder,
    '--info-text': token.colorInfo,
    '--warning-bg': token.colorWarningBg,
    '--warning-border': token.colorWarningBorder,
    '--warning-text': token.colorWarning,
    '--error-bg': token.colorErrorBg,
    '--error-border': token.colorErrorBorder,
    '--error-text': token.colorError,
    fontFamily: token.fontFamily,
  } as CSSProperties
}

/**
 * Sonner {@link Toaster} styled with the active Ant Design / Gravity design tokens.
 * Must render under {@link GravityProvider} (inside `ConfigProvider`) so `theme.useToken()` resolves.
 */
export const GravityToaster = forwardRef<HTMLElement, GravityToasterProps>(
  function GravityToaster(
    {
      theme: sonnerTheme = 'light',
      position = 'top-right',
      richColors = true,
      className,
      toastOptions,
      style,
      ...rest
    },
    ref,
  ) {
    const { token } = theme.useToken()
    const scopeClass = `gravity-sonner-${useId().replace(/:/g, '')}`

    const cssVars = useMemo(() => sonnerVarsFromToken(token), [token])

    const mergedStyle = useMemo(
      () => ({ ...cssVars, ...style }),
      [cssVars, style],
    )

    const mergedToastOptions = useMemo(
      () => ({
        ...toastOptions,
        style: {
          fontSize: token.fontSize,
          ...toastOptions?.style,
        },
      }),
      [token.fontSize, toastOptions],
    )

    const mergedClassName = [scopeClass, className].filter(Boolean).join(' ')

    const extraCss = useMemo(
      () => `
.${scopeClass} [data-sonner-toast][data-styled="true"] [data-description] {
  color: ${token.colorTextSecondary} !important;
}
.${scopeClass} [data-sonner-toast][data-styled="true"] [data-button]:not([data-cancel]) {
  background: ${token.colorPrimary} !important;
  color: ${token.colorTextLightSolid} !important;
}
.${scopeClass} [data-sonner-toast][data-styled="true"] [data-cancel] {
  background: ${token.colorFillSecondary} !important;
  color: ${token.colorText} !important;
}
`,
      [
        scopeClass,
        token.colorFillSecondary,
        token.colorPrimary,
        token.colorText,
        token.colorTextLightSolid,
        token.colorTextSecondary,
      ],
    )

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: extraCss }} />
        <Toaster
          ref={ref}
          theme={sonnerTheme}
          position={position}
          richColors={richColors}
          className={mergedClassName}
          toastOptions={mergedToastOptions}
          style={mergedStyle}
          {...rest}
        />
      </>
    )
  },
)

GravityToaster.displayName = 'GravityToaster'

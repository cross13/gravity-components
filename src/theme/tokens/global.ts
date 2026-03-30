export interface GravityTokens {
  colorPrimary: string
  colorSuccess: string
  colorWarning: string
  colorError: string
  colorInfo: string
  borderRadius: number
  fontFamily: string
  fontSize: number
  colorBgContainer: string
  colorBgLayout: string
  colorTextBase: string
  colorBorder: string
  boxShadow: string
  boxShadowSecondary: string
  controlHeight: number
  lineWidth: number
}

export const defaultTokens: GravityTokens = {
  colorPrimary: '#003973',
  colorSuccess: '#00B67A',
  colorWarning: '#F5A623',
  colorError: '#E62626',
  colorInfo: '#0077FF',
  borderRadius: 8,
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', sans-serif",
  fontSize: 14,
  colorBgContainer: '#FFFFFF',
  colorBgLayout: '#F0F3F7',
  colorTextBase: '#0D1B2A',
  colorBorder: '#D5DCE5',
  boxShadow:
    '0 1px 3px rgba(0, 25, 51, 0.05), 0 0 0 1px rgba(0, 25, 51, 0.03)',
  boxShadowSecondary:
    '0 8px 24px -4px rgba(0, 25, 51, 0.12), 0 0 0 1px rgba(0, 25, 51, 0.03)',
  controlHeight: 40,
  lineWidth: 1,
}

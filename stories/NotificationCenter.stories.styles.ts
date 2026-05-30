import styled from 'styled-components'
import { Typography } from 'antd'

/** A realistic top bar so the bell can be evaluated in context. */
export const DemoBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px;
  background: #ffffff;
  border-bottom: 1px solid #e8edf2;
  box-shadow: 0 1px 0 rgba(0, 25, 51, 0.04);
`

export const DemoBrand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 16px;
  color: #0d1b2a;
  letter-spacing: -0.01em;
`

export const DemoLogoMark = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: linear-gradient(135deg, #003973, #00bbdd);
  color: #fff;
  font-weight: 800;
`

export const DemoActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 14px;
`

export const DemoAvatar = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #003973, #00bbdd);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
`

export const DemoPage = styled.div`
  min-height: 360px;
  padding: 40px;
  background: #f0f3f7;
`

export const DemoHint = styled(Typography.Paragraph)`
  && {
    max-width: 460px;
    color: #8494a7;
  }
`

/** Centering wrapper for the standalone (isolated) bell story. */
export const IsolatedStage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  background: #ffffff;
  border: 1px solid #e8edf2;
  border-radius: 12px;
`

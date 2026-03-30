import styled from 'styled-components'
import { Card as AntCard } from 'antd'

export const SpinContentCard = styled(AntCard)`
  width: 400px;
  min-height: 120px;
`

export const SkeletonStack = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

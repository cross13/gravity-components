import styled from 'styled-components'
import { Space } from 'antd'

export const W240 = styled.div`
  width: 240px;
  .ant-picker {
    width: 100%;
  }
`

export const W360 = styled.div`
  width: 360px;
  .ant-picker {
    width: 100%;
  }
`

export const DatePickerStack = styled(Space)`
  /* children use W240 / W360 wrappers */
`

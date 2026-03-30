import styled from 'styled-components'
import { Form } from '../src/components/Form'

export const NarrowForm = styled(Form)`
  max-width: 480px;
`

export const StatusSelect = styled.div`
  width: 140px;
  .ant-select {
    width: 100%;
  }
`

export const FullWidthPicker = styled.div`
  width: 100%;
  .ant-picker {
    width: 100%;
  }
`

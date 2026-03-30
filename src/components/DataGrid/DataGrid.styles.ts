import styled from 'styled-components'
import { Input } from 'antd'

const { Search } = Input

export const Root = styled.div``

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const StyledSearch = styled(Search)`
  max-width: 320px;
`

export const RefreshIconButton = styled.button`
  cursor: pointer;
  font-size: 16px;
  color: #64748b;
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  line-height: 0;

  &:focus-visible {
    outline: 2px solid #003973;
    outline-offset: 2px;
    border-radius: 4px;
  }
`

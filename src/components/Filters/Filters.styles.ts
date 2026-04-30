import styled, { css } from 'styled-components'

export const Root = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`

export const ChipRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1 1 auto;
  min-width: 0;
`

export const Trailing = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
  flex-shrink: 0;
`

export const Summary = styled.span`
  color: #8494a7;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
`

const chipBase = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 4px 0 12px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  transition:
    border-color 120ms ease,
    background 120ms ease,
    box-shadow 120ms ease,
    color 120ms ease;
  user-select: none;
`

export const ChipRoot = styled.button<{ $hasValue: boolean; $open: boolean }>`
  ${chipBase};
  background: ${({ $hasValue }) => ($hasValue ? '#ffffff' : '#f5f8fb')};
  border: 1px solid ${({ $hasValue }) => ($hasValue ? '#d5dce5' : '#e8edf2')};
  color: #0d1b2a;
  box-shadow: ${({ $open }) =>
    $open ? '0 0 0 3px rgba(0, 187, 221, 0.18)' : 'none'};
  border-color: ${({ $open, $hasValue }) =>
    $open ? '#00bbdd' : $hasValue ? '#d5dce5' : '#e8edf2'};

  &:hover {
    border-color: ${({ $open }) => ($open ? '#00bbdd' : '#b8c4d0')};
    background: #ffffff;
  }

  &:focus-visible {
    outline: none;
    border-color: #00bbdd;
    box-shadow: 0 0 0 3px rgba(0, 187, 221, 0.18);
  }
`

export const ChipIcon = styled.span`
  display: inline-flex;
  align-items: center;
  color: #8494a7;
  font-size: 14px;
`

export const ChipLabel = styled.span`
  color: #3d5068;
  font-weight: 500;
`

export const ChipDivider = styled.span`
  color: #b8c4d0;
  margin: 0 -2px;
`

export const ChipValue = styled.span`
  color: #0d1b2a;
  font-weight: 600;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ChipPlaceholder = styled.span`
  color: #8494a7;
  font-style: italic;
  font-weight: 500;
`

export const ChipRemoveButton = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  color: #8494a7;
  background: transparent;
  transition:
    background 120ms ease,
    color 120ms ease;

  &:hover {
    background: #f0f3f7;
    color: #e62626;
  }
`

export const AddButton = styled.button<{ $disabled?: boolean }>`
  ${chipBase};
  background: transparent;
  border: 1px dashed #c2cdd9;
  color: #3d5068;
  font-weight: 500;
  padding: 0 12px;
  ${({ $disabled }) =>
    $disabled
      ? css`
          opacity: 0.5;
          cursor: not-allowed;
        `
      : css`
          &:hover {
            border-color: #003973;
            border-style: solid;
            color: #003973;
            background: rgba(0, 57, 115, 0.03);
          }

          &:focus-visible {
            outline: none;
            border-color: #00bbdd;
            box-shadow: 0 0 0 3px rgba(0, 187, 221, 0.18);
          }
        `}
`

export const AddIcon = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
`

export const ClearAllButton = styled.button`
  background: transparent;
  border: none;
  color: #3d5068;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  transition:
    color 120ms ease,
    background 120ms ease;

  &:hover {
    color: #003973;
    background: #f0f3f7;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 187, 221, 0.18);
  }
`

export const PopoverBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 240px;
  padding: 4px;
`

export const PopoverFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-top: 1px solid #f0f3f7;
  padding-top: 12px;
  margin-top: 4px;
`

export const PopoverFooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 220px;
  max-height: 300px;
  overflow-y: auto;
  padding: 4px;
  gap: 2px;
`

export const SelectListItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  border: none;
  background: ${({ $active }) => ($active ? '#e8f0fa' : 'transparent')};
  color: ${({ $active }) => ($active ? '#003973' : '#0d1b2a')};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  border-radius: 6px;
  padding: 8px 10px;
  cursor: pointer;
  transition: background 100ms ease;

  &:hover {
    background: ${({ $active }) => ($active ? '#dde9f7' : '#f5f8fb')};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 187, 221, 0.4);
  }
`

export const CheckIcon = styled.span`
  color: #003973;
  font-size: 12px;
`

export const AddMenuPanel = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  padding: 4px;
  gap: 2px;
`

export const AddMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: #0d1b2a;
  border-radius: 6px;
  padding: 8px 10px;
  cursor: pointer;
  transition: background 100ms ease;

  &:hover {
    background: #f5f8fb;
  }

  &:focus-visible {
    outline: none;
    background: #f5f8fb;
    box-shadow: 0 0 0 2px rgba(0, 187, 221, 0.35);
  }
`

export const AddMenuItemIcon = styled.span`
  display: inline-flex;
  align-items: center;
  color: #8494a7;
  font-size: 14px;
`

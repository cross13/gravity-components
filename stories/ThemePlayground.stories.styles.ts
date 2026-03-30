import styled from 'styled-components'
import { Typography, Divider } from 'antd'

const { Text, Title } = Typography

export const ColorSwatchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const ColorPickerInput = styled.input`
  width: 28px;
  height: 28px;
  border: 2px solid #e8edf2;
  border-radius: 6px;
  padding: 0;
  cursor: pointer;
  background: none;
`

export const ColorSwatchMeta = styled.div`
  flex: 1;
  min-width: 0;
`

export const ColorSwatchLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #3d5068;
  line-height: 1.3;
`

export const ColorSwatchHex = styled.div`
  font-size: 11px;
  color: #8494a7;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
`

export const SliderRowRoot = styled.div``

export const SliderRowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`

export const SliderRowLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #3d5068;
`

export const SliderRowValue = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #0d1b2a;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
`

export const SliderRangeInput = styled.input`
  width: 100%;
  accent-color: #003973;
`

export const ShowcaseColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const ButtonSizeBlock = styled.div`
  margin-top: 16px;
`

export const FormStack12 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .ant-select,
  .ant-picker {
    width: 100%;
  }
`

export const FormStack16 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const SwitchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const TagsBadgeStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const AlertsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const TypoTitle2 = styled(Title).attrs({ level: 2 })`
  margin: 0 !important;
`

export const TypoTitle4 = styled(Title).attrs({ level: 4 })`
  margin-top: 8px !important;
  margin-bottom: 8px !important;
`

export const PlaygroundRoot = styled.div`
  display: flex;
  gap: 24px;
  min-height: 100vh;
`

export const EditorSidebar = styled.div`
  width: 280px;
  flex-shrink: 0;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e8edf2;
  padding: 20px;
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
  box-shadow: 0 1px 3px rgba(0, 25, 51, 0.05), 0 0 0 1px rgba(0, 25, 51, 0.03);
`

export const EditorHeader = styled.div`
  margin-bottom: 20px;
`

export const EditorTitle = styled(Title).attrs({ level: 5 })`
  margin: 0 !important;
`

export const EditorSubtitle = styled(Text).attrs({ type: 'secondary' })`
  font-size: 12px;
`

export const EditorSection = styled.div`
  margin-bottom: 20px;
`

export const EditorSectionHeading = styled(Text).attrs({ strong: true })`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #8494a7;
  display: block;
  margin-bottom: 8px;
`

export const EditorSectionHeadingLoose = styled(Text).attrs({ strong: true })`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #8494a7;
  display: block;
  margin-bottom: 10px;
`

export const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`

export const PresetButton = styled.button<{ $active: boolean; $accent: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
  font-family: inherit;
  transition: all 0.15s;
  border: ${(p) => (p.$active ? `2px solid ${p.$accent}` : '1px solid #e8edf2')};
  background: ${(p) => (p.$active ? `${p.$accent}08` : '#fafbfc')};
  font-weight: ${(p) => (p.$active ? 600 : 400)};
  color: ${(p) => (p.$active ? p.$accent : '#3d5068')};
`

export const PresetDot = styled.div<{ $accent: string }>`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: ${(p) => p.$accent};
  flex-shrink: 0;
`

export const EditorDivider = styled(Divider)`
  margin: 16px 0;
`

export const SwatchList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const SliderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const PreviewCanvas = styled.div<{ $bg: string }>`
  flex: 1;
  min-width: 0;
  background: ${(p) => p.$bg};
  border-radius: 12px;
  padding: 24px;
  transition: background 0.3s;
`

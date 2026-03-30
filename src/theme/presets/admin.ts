import type { ThemeConfig } from 'antd'
import { defaultTokens } from '../tokens/global'
import { aliasTokens } from '../tokens/alias'
import { componentTokens } from '../tokens/components'

export const adminTheme: ThemeConfig = {
  token: {
    ...defaultTokens,
    ...aliasTokens,
  },
  components: componentTokens,
}

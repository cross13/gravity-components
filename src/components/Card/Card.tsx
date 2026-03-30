import { Card as AntCard } from 'antd'
import type { CardProps } from './Card.types'

export function Card(props: CardProps) {
  return <AntCard {...props} />
}

Card.displayName = 'Card'
Card.Meta = AntCard.Meta
Card.Grid = AntCard.Grid

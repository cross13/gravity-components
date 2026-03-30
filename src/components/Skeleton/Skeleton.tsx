import { Skeleton as AntSkeleton } from 'antd'
import type { SkeletonProps } from './Skeleton.types'

export function Skeleton(props: SkeletonProps) {
  return <AntSkeleton {...props} />
}

Skeleton.displayName = 'Skeleton'
Skeleton.Button = AntSkeleton.Button
Skeleton.Avatar = AntSkeleton.Avatar
Skeleton.Input = AntSkeleton.Input
Skeleton.Image = AntSkeleton.Image
Skeleton.Node = AntSkeleton.Node

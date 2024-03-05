import { FC } from 'react'
import { RelationshipD3 } from '@/domain/entities/Relationship'
import DetailsDrawer, {
  DetailsDrawerProps,
} from '@/features/details-drawer/View'
import Badge from '@/ui/Badge'

interface Props extends Pick<DetailsDrawerProps, 'onClose'> {
  relationship?: RelationshipD3
}

const View: FC<Props> = ({ relationship, onClose }) => {
  if (!relationship) return null

  return (
    <DetailsDrawer
      title="RELATIONSHIP DETAILS"
      elementId={relationship.elementId}
      properties={relationship.properties}
      className="h-[250px]"
      onClose={onClose}
    >
      <Badge style={{ backgroundColor: '#bdbdbd' }}>{relationship.type}</Badge>
    </DetailsDrawer>
  )
}

export default View

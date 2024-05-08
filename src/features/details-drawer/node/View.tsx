import { FC } from 'react'
import { NodeD3 } from '@/domain/entities/Node'
import DetailsDrawer, {
  DetailsDrawerProps,
} from '@/features/details-drawer/View'
import { labelManager } from '@/features/labels/LabelManager'
import Badge from '@/ui/Badge'

interface Props extends Pick<DetailsDrawerProps, 'onClose'> {
  node?: NodeD3
}

const View: FC<Props> = ({ node, onClose }) => {
  if (!node) return null

  return (
    <DetailsDrawer
      title="NODE DETAILS"
      elementId={node.elementId}
      properties={node.properties}
      className="h-[230px]"
      onClose={onClose}
    >
      {node &&
        node.labels.map((label) => (
          <Badge
            style={{
              backgroundColor: labelManager.getColor(label),
              outline: `1px solid ${
                node.settings.labelToDisplay === label
                  ? labelManager.getColor(label)
                  : ''
              }`,
              border: '2px solid',
            }}
            key={label}
          >
            {label}
          </Badge>
        ))}
    </DetailsDrawer>
  )
}

export default View

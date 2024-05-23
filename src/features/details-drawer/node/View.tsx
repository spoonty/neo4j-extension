import { FC } from 'react'
import { NodeD3 } from '@/domain/entities/Node'
import DetailsDrawer, {
  DetailsDrawerProps,
} from '@/features/details-drawer/View'
import { useGraphContext } from '@/features/graph/context'
import { labelManager } from '@/features/labels/LabelManager'
import { useSessionContext } from '@/features/session/context'
import { Connection } from '@/features/session/static/const'
import Badge from '@/ui/Badge'

interface Props extends Pick<DetailsDrawerProps, 'onClose'> {
  node?: NodeD3
}

const View: FC<Props> = ({ node, onClose }) => {
  const { changeLabel, changeActiveProperty } = useGraphContext()
  const { connection } = useSessionContext()

  if (!node) return null

  const propertiesValue = Object.keys(node.properties).map(
    (k) => node.properties[k],
  )

  const activeProperty =
    propertiesValue.indexOf(node.settings.propertyToDisplay || '') + 1

  const labelClickHandler = (label: string) => {
    if (connection === Connection.READ_ONLY) {
      changeLabel(node.elementId, label)
    }
  }

  const propertyClickHandler = (property: number) => {
    if (connection === Connection.READ_ONLY) {
      changeActiveProperty(node.elementId, propertiesValue.at(property - 1))
    }
  }

  return (
    <DetailsDrawer
      title="NODE DETAILS"
      elementId={node.elementId}
      properties={node.properties}
      className="h-[230px]"
      activeProperty={activeProperty || 1}
      setActiveProperty={propertyClickHandler}
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
            onClick={() => labelClickHandler(label)}
            key={label}
          >
            {label}
          </Badge>
        ))}
    </DetailsDrawer>
  )
}

export default View

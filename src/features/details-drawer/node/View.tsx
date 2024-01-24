import {FC} from "react";
import {DetailsDrawerProps} from "@/features/details-drawer/View";
import {NodeD3} from "@/domain/graph/models/Node";
import DetailsDrawer from '@/features/details-drawer/View'
import {useGraphContext} from "@/features/graph/context";
import Badge from "@/ui/Badge";
import {defineLabelColor} from "@/features/graph/helpers/labels";

interface Props extends Pick<DetailsDrawerProps, 'onClose'> {
  node?: NodeD3
}

const View: FC<Props> = ({ node, onClose }) => {
  const { labels } = useGraphContext()

  if (!node) return null

  return <DetailsDrawer
    title='NODE DETAILS'
    elementId={node.elementId}
    properties={node.properties}
    className='h-[230px]'
    onClose={onClose}
  >
    {node.labels.map((label) => (
      <Badge
        style={{ backgroundColor: defineLabelColor(labels, label) }}
      >
        {label}
      </Badge>
    ))}
  </DetailsDrawer>
}

export default View
import {FC} from "react";
import DetailsDrawer, {DetailsDrawerProps} from "@/features/details-drawer/View";
import {NodeD3} from "@/domain/entities/Node";
import Badge from "@/ui/Badge";
import {labelManager} from "@/features/labels/LabelManager";

interface Props extends Pick<DetailsDrawerProps, 'onClose'> {
    node?: NodeD3
}

const View: FC<Props> = ({node, onClose}) => {
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
                style={{backgroundColor: labelManager.getColor(label)}}
            >
                {label}
            </Badge>
        ))}
    </DetailsDrawer>
}

export default View
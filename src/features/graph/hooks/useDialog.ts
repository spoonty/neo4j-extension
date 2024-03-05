import { FunctionComponent, useEffect, useState } from 'react'
import DeleteAlert from '@/features/delete-alert/View'
import DetailsNode from '@/features/details-drawer/node/View'
import RelationshipDetails from '@/features/details-drawer/relationship/View'
import ModifyNodeDialog from '@/features/modify-drawer/node/View'
import ModifyRelationshipDialog from '@/features/modify-drawer/relationship/View'
import { usePrevious } from '@reactuses/core'

export enum DialogType {
  NONE,
  CREATE_NODE,
  UPDATE_NODE,
  CREATE_RELATIONSHIP,
  DELETE_NODE,
  NODE_DETAILS,
  RELATIONSHIP_DETAILS,
  UPDATE_RELATIONSHIP,
}

export type DialogData = {
  component: FunctionComponent<any>
  props: KeyValue
}

export const useDialog = () => {
  const [dialog, setDialog] = useState<DialogData | null>(null)
  const [type, setType] = useState(DialogType.NONE)
  const [props, setProps] = useState<KeyValue>({})

  const prevType = usePrevious(type)

  useEffect(() => {
    const component = getComponent()
    setDialog(
      component
        ? {
            component,
            props: { onClose: () => setType(DialogType.NONE), ...props },
          }
        : null,
    )
  }, [type, props])

  const getComponent = () => {
    switch (type) {
      case DialogType.UPDATE_NODE:
      case DialogType.CREATE_NODE:
        return ModifyNodeDialog
      case DialogType.UPDATE_RELATIONSHIP:
      case DialogType.CREATE_RELATIONSHIP:
        return ModifyRelationshipDialog
      case DialogType.DELETE_NODE:
        return DeleteAlert
      case DialogType.NODE_DETAILS:
        return DetailsNode
      case DialogType.RELATIONSHIP_DETAILS:
        return RelationshipDetails
      default:
        return null
    }
  }

  return {
    dialog,
    dialogType: type,
    prevType,
    setDialogType: setType,
    setProps,
  }
}

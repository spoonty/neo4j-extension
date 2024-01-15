import {FunctionComponent, useEffect, useState} from "react";
import CreateNodeDialog from '@/features/create-node/View'
import CreateRelationship from '@/features/create-relation/View'
import DeleteAlert from '@/features/delete-alert/View'
import DetailsNode from '@/features/details-node/View'

export enum DialogType {
  NONE,
  CREATE_NODE,
  CREATE_RELATIONSHIP,
  DELETE_NODE,
  NODE_DETAILS
}

export type DialogData = {
  component: FunctionComponent<any>,
  props: KeyValue
}

export const useDialog = () => {
  const [dialog, setDialog] = useState<DialogData | null>(null)
  const [type, setType] = useState(DialogType.NONE)
  const [props, setProps] = useState<KeyValue>({})

  useEffect(() => {
    const component = getComponent()
    setDialog(component ? { component, props: { onClose: () => setType(DialogType.NONE), ...props } } : null)
  }, [type, props]);

  const getComponent = () => {
    switch (type) {
      case DialogType.CREATE_NODE:
        return CreateNodeDialog
      case DialogType.CREATE_RELATIONSHIP:
        return CreateRelationship
      case DialogType.DELETE_NODE:
        return DeleteAlert
      case DialogType.NODE_DETAILS:
        return DetailsNode
      default:
        return null
    }
  }

  return {
    dialog,
    dialogType: type,
    setDialogType: setType,
    setProps,
  }
}
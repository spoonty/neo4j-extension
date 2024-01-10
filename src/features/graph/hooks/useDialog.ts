import {FunctionComponent, useEffect, useState} from "react";
import CreateNodeDialog from '@/features/create-node/View'
import CreateRelationship from '@/features/create-relation/View'
import DeleteAlert from '@/features/delete-alert/View'

export enum DialogType {
  NONE,
  CREATE_NODE,
  CREATE_RELATIONSHIP,
  DELETE_NODE
}

export type DialogData = {
  component: FunctionComponent<any>,
  props: KeyValue
}

export const useDialog = () => {
  const [dialog, setDialog] = useState<DialogData | null>(null)
  const [type, setType] = useState(DialogType.NONE)

  useEffect(() => {
    const component = getComponent()
    setDialog(component ? { component, props: { onClose: () => setType(DialogType.NONE) } } : null)
  }, [type]);

  const getComponent = () => {
    switch (type) {
      case DialogType.CREATE_NODE:
        return CreateNodeDialog
      case DialogType.CREATE_RELATIONSHIP:
        return CreateRelationship
      case DialogType.DELETE_NODE:
        return DeleteAlert
      default:
        return null
    }
  }

  return {
    dialog,
    setType
  }
}
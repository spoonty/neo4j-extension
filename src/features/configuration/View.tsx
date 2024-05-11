import { FC, useState } from 'react'
import { storageImpl } from '@/data/services/Storage.impl'
import {
  Configuration,
  DEFAULT_CONFIGURATION,
} from '@/features/configuration/static/static'
import { useSessionContext } from '@/features/session/context'
import { localStorageKeys } from '@/features/session/static/keys'
import { Alert, Content, Footer } from '@/ui/Alert'
import Button from '@/ui/Button/Button'
import Clue from '@/ui/Clue'
import Input from '@/ui/Input/Input'
import Toggle from '@/ui/Toggle'

interface Props {
  onClose: () => void
}

const View: FC<Props> = ({ onClose }) => {
  const { refresh } = useSessionContext()

  const configuration: Configuration = storageImpl.get(
    localStorageKeys.configuration,
  )

  const [maxSize, setMaxSize] = useState(`${configuration.maxSize}`)
  const [checkAccessRights, setCheckAccessRights] = useState(
    configuration.checkAccessRights,
  )
  const [nodeFocus, setNodeFocus] = useState(configuration.nodeFocus)
  const [animations, setAnimations] = useState(configuration.animations)

  const defaultHandler = () => {
    setMaxSize(`${DEFAULT_CONFIGURATION.maxSize}`)
    setCheckAccessRights(DEFAULT_CONFIGURATION.checkAccessRights)
    setNodeFocus(DEFAULT_CONFIGURATION.nodeFocus)
    setAnimations(DEFAULT_CONFIGURATION.animations)
  }

  const saveHandler = () => {
    storageImpl.set(localStorageKeys.configuration, {
      maxSize,
      checkAccessRights,
      nodeFocus,
      animations,
    })

    refresh()

    onClose()
  }

  return (
    <Alert open>
      <Content>
        <h2 className="px-2 text-2xl font-bold leading-6 text-main-gray">
          SETTINGS
        </h2>
        <div className="flex h-[calc(100%-72px)] w-full flex-col gap-4 p-2">
          <div className="flex w-full flex-col gap-2">
            <Input
              placeholder="Max Nodes"
              value={maxSize}
              className="w-[30%]"
              onValueChange={setMaxSize}
            />
            <Clue className="text-[11px]">
              The maximum number of nodes in the graph after which the
              application will switch to filtered graph mode after connecting
            </Clue>
          </div>

          <Toggle
            label="Checking access rights"
            value={checkAccessRights}
            onChange={(val: boolean) => setCheckAccessRights(val)}
          />

          <Toggle
            label="Focus when hovering over a node"
            value={nodeFocus}
            onChange={(val: boolean) => setNodeFocus(val)}
          />

          <Toggle
            label="Animations when interacting with the graph"
            value={animations}
            onChange={(val: boolean) => setAnimations(val)}
          />
        </div>
        <Footer className="flex justify-between">
          <Button onClick={defaultHandler}>Default</Button>
          <Button variant="confirm" onClick={saveHandler}>
            Save
          </Button>
        </Footer>
      </Content>
    </Alert>
  )
}

export default View

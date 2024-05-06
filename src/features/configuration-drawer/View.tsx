import { Content, Drawer, Header } from '@/ui/Drawer'
import { FC } from 'react'

interface Props {
    onClose: () => void
}

const View: FC<Props> = ({ onClose }) => {
  return (
    <Drawer open modal>
      <Content className="left-[20%] translate-x-[-20%]">
        <Header onClose={onClose}>Settings</Header>
      </Content>
    </Drawer>
  )
}

export default View

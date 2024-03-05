import { FC, useEffect, useState } from 'react'
import { useSessionContext } from '@/features/session/context'
import Button from '@/ui/Button/Button'
import Clue from '@/ui/Clue'
import { Content, Drawer, Footer, Header } from '@/ui/Drawer'
import Input from '@/ui/Input/Input'
import PopoverInput from '@/ui/Input/PopoverInput'

const schemes = ['neo4j://', 'bolt://']

const View: FC = () => {
  const { connect } = useSessionContext()

  const [host, setHost] = useState('localhost')
  const [port, setPort] = useState('7687')
  const [username, setUsername] = useState('neo4j')
  const [password, setPassword] = useState('')
  const [scheme, setScheme] = useState(schemes[1])
  const [url, setUrl] = useState(host.concat(':').concat(port))

  useEffect(() => {
    setUrl(`${host}${port ? `:${port}` : ''}`)
  }, [host, port])

  const urlHandler = (value: string) => {
    if (value.includes(':')) {
      const [urlHost, urlPort] = value.split(':')
      setHost(urlHost)
      setPort(urlPort)
    }

    setUrl(value)
  }

  const confirm = () => {
    connect(scheme.concat(url), username, password)
  }

  return (
    <Drawer open modal>
      <Content className="right-[50%] translate-x-[50%]">
        <Header>Connect to Data Base</Header>
        <div className="flex h-[calc(100%-72px)] flex-col gap-5 px-2 py-4">
          <div className="grid grid-cols-[80%_20%] items-center gap-2.5">
            <Input placeholder="Host" value={host} onValueChange={setHost} />
            <Input placeholder="Port" value={port} onValueChange={setPort} />
          </div>
          <div className="flex w-[80%] flex-col gap-2.5">
            <Input
              placeholder="Username"
              value={username}
              onValueChange={setUsername}
            />
            <Input
              placeholder="Password"
              value={password}
              onValueChange={setPassword}
              type="password"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="grid grid-cols-[15%_85%] items-center">
              <PopoverInput
                value={scheme}
                popoverItems={schemes}
                onValueSelected={setScheme}
                onValueChange={setScheme}
                popoverWidth="min-w-[92px]"
              />
              <Input value={url} onValueChange={urlHandler} />
            </div>
            <Clue className="text-[11px]">Overrides settings above</Clue>
          </div>
        </div>
        <Footer className="flex justify-end">
          <Button variant="confirm" onClick={confirm}>
            Connect
          </Button>
        </Footer>
      </Content>
    </Drawer>
  )
}

export default View

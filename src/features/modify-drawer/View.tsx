import {FC, ReactNode, useMemo, useState} from "react";
import {Content, Drawer, Footer, Header} from "@/ui/Drawer";
import {cn} from "@/utils/dom";
import Stepper from "@/ui/Stepper/Stepper";
import Button from "@/ui/Button/Button";

export interface ModifyDrawerProps {
    title: string
    confirmText: string
    steps: string[]
    properties: KeyValue<'key' | 'value', any>
    nextStepDisabled?: (step: number) => boolean
    renderStep: (step: number) => ReactNode
    modifyHandler: () => Promise<void>
    onClose: () => void
    clearData: () => void
}

const View: FC<ModifyDrawerProps> = ({
                                         title,
                                         confirmText,
                                         steps,
                                         nextStepDisabled,
                                         properties,
                                         renderStep,
                                         modifyHandler,
                                         clearData,
                                         onClose
                                     }) => {
    const [step, setStep] = useState(0)

    const onNextStep = () => {
        setStep(step + 1)
    }

    const onPrevStep = () => {
        setStep(step - 1)
    }

    const closeHandler = () => {
        onClose()

        setTimeout(() => {
            setStep(0)
            clearData()
        }, 100)
    }

    const confirmHandler = async () => {
        await modifyHandler()
        closeHandler()
    }

    const disabled = useMemo(() => {
        return nextStepDisabled?.(step) || false
    }, [step, nextStepDisabled])

    return (
        <Drawer open modal>
            <Content
                className={cn(
                    step === 1 &&
                    properties['key'].length > 2 &&
                    'h-[482px]',
                )}
            >
                <Header onClose={closeHandler}>
                    {title}
                </Header>
                <div className="mt-4 flex h-[calc(100%-88px)] flex-col gap-5">
                    <Stepper steps={steps} current={steps[step]}/>
                    {renderStep(step)}
                </div>
                <Footer>
                    <div>
                        {step > 0 && (
                            <Button onClick={onPrevStep}>Back</Button>
                        )}
                    </div>
                    <Button
                        variant="confirm"
                        onClick={step === steps.length - 1 ? confirmHandler : onNextStep}
                        disabled={disabled}
                    >
                        {step === steps.length - 1 ? confirmText : 'Next'}
                    </Button>
                </Footer>
            </Content>
        </Drawer>
    )
}

export default View
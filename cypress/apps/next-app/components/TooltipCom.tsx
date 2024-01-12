import { Button, Tooltip } from "@govtechsg/sgds-react"

const TooltipCom = () => {
    return (
        <Tooltip content="This is a sample Tooltip">
            <Button>
                Hover me!
            </Button>
        </Tooltip>
    )
}

export default TooltipCom;

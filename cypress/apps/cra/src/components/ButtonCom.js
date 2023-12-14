import { Button } from "@govtechsg/sgds-react"

const ButtonCom = () => {
    return (
        <>
            {
                ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
                    .map((variant, idx) =>
                        <Button className="m-1" key={idx} variant={variant}>
                            {variant}
                        </Button>)
            }
        </>
    )
}

export default ButtonCom;

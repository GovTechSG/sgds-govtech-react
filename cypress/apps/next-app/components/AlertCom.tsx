import { Alert, AlertLink } from "@govtechsg/sgds-react"

const AlertCom = () => {
    return (
        <>
            {
                ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light']
                    .map((variant, idx) =>
                        <Alert key={idx} variant={variant} className="d-flex align-items-center">
                            <i className="bi bi-exclamation-circle me-4"></i>
                            <div>
                                This is a {variant} alert with{' '}
                                <AlertLink href="#">an example link</AlertLink>.
                                Give it a click if you like.
                            </div>
                        </Alert>)
            }
        </>
    )
}

export default AlertCom;

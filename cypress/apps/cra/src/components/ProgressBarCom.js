import { ProgressBar } from "@govtechsg/sgds-react";

const ProgressBarCom = () => {
    const now = 60;
    return <ProgressBar now={now} label={`${now}%`} />;
}

export default ProgressBarCom;

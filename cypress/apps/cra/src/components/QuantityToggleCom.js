import { QuantityToggle } from "@govtechsg/sgds-react";
import { useState } from "react";

const QuantityToggleCom = () => {
    const [count, setCount] = useState(0);
    return <QuantityToggle count={count} setCount={setCount} />
}

export default QuantityToggleCom;

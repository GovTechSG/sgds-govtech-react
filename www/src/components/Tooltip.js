import { Tooltip} from "@govtechsg/sgds-govtech-react/Tooltip";
import { Button } from "@govtechsg/sgds-govtech-react/Button";

 const TooltipCom = () => {
    return (
      <Tooltip content="tooltip" type="click">
        <Button>test</Button>
      </Tooltip>
    );
  };

export default TooltipCom
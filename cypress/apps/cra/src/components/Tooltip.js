import { Tooltip} from "@govtechsg/sgds-react/Tooltip";
import { Button } from "@govtechsg/sgds-react/Button";

 const TooltipCom = () => {
    return (
      <Tooltip content="tooltip" type="click">
        <Button>test</Button>
      </Tooltip>
    );
  };

export default TooltipCom
import React, { useState } from "react";
import { Alert, Button } from "../../src/components/index";


export default {
  title: "components/Alert",
  component: Alert,
  subcomponents: { Button },
  argTypes: {
    variant: {
      description: "The Alert visual variant",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: `'danger'` },
      },

      control: {
        type: "select",
        options: [
          "primary",
          "secondary",
          "success",
          "danger",
          "warning",
          "info",
          "light",
          "dark",
        ],
      },
    },
    dismissible: {
      description:
        "Renders a properly aligned dismiss button, as well as adding extra horizontal padding to the Alert.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: `'true'` },
      },
    },
    show: {
      description:
        "controlled by: onClose, initial prop: defaultShow\nControls the visual state of the Alert.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: `'true'` },
      },
    },
    transition: {
      description:
        "Animate the alert dismissal. Defaults to using <Fade> animation or use false to disable. A custom react-transition-group Transition can also be provided.",
      table: {
        type: { summary: "boolean | elementType" },
        defaultValue: { summary: `'Fade'` },
      },
    },
    bsPrefix: {
      description:
        "Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: `'alert'` },
      },
    },
  },
};

const Template = (args) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert {...args} onClose={() => setShow(false)}>
        <Alert.Heading className="mt-2">
          A sample danger alert
        </Alert.Heading>
      </Alert>
    );
  }
  return <Button variant='secondary' onClick={() => setShow(true)}>Show Alert</Button>;
};

export const BasicAlert = Template.bind({});
BasicAlert.args = {
  variant: "danger",
  dismissible: true,
  // closeLabel: '',
  // closeVariant: '',
  show: true,
  bsPrefix: "",
};


import { storiesOf } from "@storybook/react";
import React from "react";

import Welcome from "./pages/welcome.stories";
import ButtonStories from "./components/Buttons.stories";
import AccordionStories from "./components/Accordion.stories";

import buttonNotes from "./notes/components/buttons.md";
import welcomeNotes from "./notes/welcome.md";

storiesOf("Welcome", module).add("Introduction", () => <Welcome></Welcome>, {
  notes: { markdown: welcomeNotes }
});

storiesOf("Components", module)
  .add("Accordions", () => <AccordionStories />, {})
  .add("Buttons", () => <ButtonStories />, {
    notes: { markdown: buttonNotes }
  });

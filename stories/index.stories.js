import { storiesOf } from "@storybook/react";
import React from "react";

import Welcome from "./pages/welcome.stories";
import {
  Button,
  Accordion,
  Dropdown,
  Breadcrumb,
  Masthead,
  MainNav,
  Footer,
  Tab,
  SideNav
} from "./components"

import buttonNotes from "./notes/components/buttons.md";
import welcomeNotes from "./notes/welcome.md";
import accordionNotes from "./notes/components/accordions.md";
import breadcrumbNotes from "./notes/components/breadcrumb.md";
import mainNavNotes from "./notes/components/mainnav.md";
import footerNotes from "./notes/components/footer.md";
import sideNavNotes from "./notes/components/sidenav.md";
import mastheadNotes from "./notes/components/masthead.md";

storiesOf("Welcome", module).add("Introduction", () => <Welcome></Welcome>, {
  notes: { markdown: welcomeNotes }
});

storiesOf("Required Components", module)
.add("Masthead",()=><Masthead/>,{
  notes:{markdown:mastheadNotes}
})
.add("MainNav",()=><MainNav/>,{
  notes:{markdown: mainNavNotes}
})
.add("Footer",()=><Footer/>,{
  notes:{markdown: footerNotes}
})
.add("Sidenav",()=><SideNav/>,{
  notes:{markdown: sideNavNotes}
})



storiesOf("Components", module)
  .add("Accordions", () => <Accordion />, {
    notes: { markdown: accordionNotes }
  })
  .add("Buttons", () => <Button />, {
    notes: { markdown: buttonNotes }
  })
  .add("Dropdowns", () => <Dropdown />)
  .add("Breadcrumbs",()=><Breadcrumb/>,{
    notes: {markdown: breadcrumbNotes }
  })
  .add("Tabs",()=><Tab/>)

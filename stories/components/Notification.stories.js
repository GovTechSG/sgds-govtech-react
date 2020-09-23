import React from "react";
import { Notification } from "../../src/components";
import SyntaxHighlighter from "../lib/SyntaxHighlighter";
import { formatCode } from "../lib/utils";
import { Divider, Page, Title } from "../shared-styles";

const defaultNotification = `
import { Notification } from "sgds-govtech-react";

<Notification title="Updates" 
content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
Accusamus adipisci aut dicta, ea facere fugit incidunt laborum officia quod unde."/>`;
const iconNotification = `
import { Notification } from "sgds-govtech-react";

<Notification
icon="sgds-icon-callout"
title="Updates"
content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
Accusamus adipisci aut dicta, ea facere fugit incidunt laborum officia quod unde."
/>`;

const toastNotification = `
import { Notification } from "sgds-govtech-react";

<Notification
isToast
icon="sgds-icon-callout"
title="Updates"
content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
  Accusamus adipisci aut dicta, ea facere fugit incidunt laborum officia quod unde."
/>
`;
const onCloseNotification = 
` 
import { Notification } from "sgds-govtech-react";

<Notification
isToast
closable
onClose={() => alert("onClose")}
icon="sgds-icon-callout"
title="Updates"
content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
  Accusamus adipisci aut dicta, ea facere fugit incidunt laborum officia quod unde."
/>`;

const colourNotification = 
`
import { Notification } from "sgds-govtech-react";

<Notification
closable
colour="success"
onClose={() => alert("onClose")}
icon="sgds-icon-callout"
title="Updates"
content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
  Accusamus adipisci aut dicta, ea facere fugit incidunt laborum officia quod unde."
/>
`;

const NotificationStories = (props) => {
  return (
    <Page>
      <Title>
        <h2>Notifications</h2>
      </Title>
      <section className="sgds-section">
        <h3>
          Notifications provide short, timely, and relevant information for your
          users.
        </h3>
        <p>
          Notifications provide short, timely, and relevant information for your
          users. For more information checkout the{" "}
          <a href="https://www.designsystem.tech.gov.sg/docs/notification/">
            SGDS Notification Docs
          </a>
          .
        </p>
        <h4>Default Notification</h4>
        <Notification
          title="Updates"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aut dicta, ea facere fugit incidunt laborum officia quod unde."
        />
        <SyntaxHighlighter>{formatCode(defaultNotification)}</SyntaxHighlighter>
        <Divider />
        <h4>With Icon</h4>
        <Notification
          icon="sgds-icon-callout"
          title="Updates"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aut dicta, ea facere fugit incidunt laborum officia quod unde."
        />
        <SyntaxHighlighter>{formatCode(iconNotification)}</SyntaxHighlighter>
        <Divider />
        <h4>Toast Notification</h4>
        <p>Toast notifications have coloured borders</p>
        <Notification
          isToast
          icon="sgds-icon-callout"
          title="Updates"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aut dicta, ea facere fugit incidunt laborum officia quod unde."
        />
        <SyntaxHighlighter>{formatCode(toastNotification)}</SyntaxHighlighter>
        <Divider />
        <h4>Close Button</h4>
        <p>Close button is optional. Fires a callback when onClick.</p>
        <Notification
          isToast
          closable
          onClose={() => alert("onClose")}
          icon="sgds-icon-callout"
          title="Updates"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aut dicta, ea facere fugit incidunt laborum officia quod unde."
        />
        <SyntaxHighlighter>{formatCode(onCloseNotification)}</SyntaxHighlighter>
        <Divider />
        <h4>Colours</h4>
        <p>Replace colorState with contextual text color classes (is-danger, is-warning, is-success etc.) for various background color. Can be use with toast notification sgds-notification is-toast is-danger</p>
        <Notification
          closable
          colour="success"
          onClose={() => alert("onClose")}
          icon="sgds-icon-callout"
          title="Updates"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci aut dicta, ea facere fugit incidunt laborum officia quod unde."
        />
        <SyntaxHighlighter>{formatCode(colourNotification)}</SyntaxHighlighter>
        <Divider />
      </section>
    </Page>
  );
};

export default NotificationStories;

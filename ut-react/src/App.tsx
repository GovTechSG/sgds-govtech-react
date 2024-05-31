import './App.css';
import { Button } from '@govtechsg/sgds-react/Button';
import { SgdsMasthead } from '@govtechsg/sgds-web-component/react';

function App() {
  return (
    <>
      <SgdsMasthead fluid />
      <div className="d-flex justify-content-center gap-2 m-3">
        <Button
          as="a"
          href="https://ut.react.designsystem.tech.gov.sg/"
          target="_blank"
          variant="primary"
        >
          SGDS React
        </Button>
        <Button
          as="a"
          href="https://ut.webcomponent.designsystem.tech.gov.sg/"
          target="_blank"
          variant="outline-secondary"
        >
          SGDS Web Component
        </Button>
      </div>
    </>
  );
}

export default App;

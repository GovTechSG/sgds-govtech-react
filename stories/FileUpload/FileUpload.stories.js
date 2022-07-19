import React, { useState } from 'react';
import { FileUpload } from '../../src/FileUpload/FileUpload';
import { Form } from '../../src/Form/index';


const Template = (args) => {
  const [selectedFile, setSelectedFile] = useState({});
  const onChangeFile = (data) => {
    setSelectedFile(data);
  };
  console.log(selectedFile);
  return (
    <>
      <Form>
        <FileUpload
          {...args}
          controlId="fileupload1"
          onChangeFile={onChangeFile}
          selectedFile={selectedFile}
        >
          <i className="bi bi-upload me-2"></i>Choose a file
        </FileUpload>
      </Form>
    </>
  );
};

export const Default = Template.bind({});
export const Custom_Icons = Template.bind({});

Custom_Icons.args = {
  cancelIcon: <i className="bi bi-x-octagon"></i>,
  checkedIcon: <i className="bi bi-check2-circle"></i>,
};

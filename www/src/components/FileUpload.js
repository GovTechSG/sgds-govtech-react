import { useState } from "react";
import { FileUpload } from "@govtechsg/sgds-govtech-react/FileUpload";
import { Form } from "@govtechsg/sgds-govtech-react/Form";

                                                                                                                                                                                            
const FileUploadCom = () => {
    const [selectedFile, setSelectedFile] = useState({});
    const onChangeFile = (data) => {
      setSelectedFile(data);
    };
    return (
      <Form>
        <FileUpload                  
          controlId="fileupload1"
          onChangeFile={onChangeFile}
          selectedFile={selectedFile}
        >
          <i className="bi bi-upload me-2"></i>Choose a file
        </FileUpload>
      </Form>
    );
  };

  export default FileUploadCom
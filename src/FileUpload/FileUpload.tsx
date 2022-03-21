import * as React from 'react';
import { default as Form, FormProps } from '../Form/Form';
import { Button, ButtonProps } from '../Button/Button';
import { useState, useRef } from 'react';
import { ButtonVariant } from '../utils/types';

type FileUpload = ButtonProps & FormProps;
export interface FileUploadProps extends FileUpload {
  variant?: ButtonVariant;
  size?: 'sm' | 'lg';
  controlId: string;
  fileObj: any;
  disabled?: boolean;
}

const defaultProps = {
  variant: 'primary',
  active: false,
  disabled: false,
};

export const FileUpload: React.FC<FileUploadProps> = ({
  variant,
  size,
  controlId,
  fileObj,
  disabled,
  children,
}) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [uploadedFile, setUploadedFile] = useState<string[]>([]);
  let data: string[] = [];
  const handleDisplayFileDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileList = e.target.files as FileList;
    //instead if using event object, instantiate a new dataTransfer obj to standardize with removeFile() data obj
    var dt = new DataTransfer();
    for (let i = 0; i < fileList.length; i++) {
      data.push(fileList[i].name);
      dt.items.add(fileList[i]);
    }
    setUploadedFile(data);
    fileObj(dt.files);
  };
  const handleUpload = () => {
    inputRef?.current?.click();
  };

  const removeFile = (index: number) => {
    var attachments = (document.getElementById(controlId!) as HTMLInputElement)!
      .files as FileList; // <-- reference your file input here
    var fileBuffer = new DataTransfer();
    // append the file list to an array iteratively
    for (let i = 0; i < attachments.length; i++) {
      // Exclude file in specified index
      if (index !== i) fileBuffer.items.add(attachments[i]);
    }
    // Assign buffer to file input
    (document.getElementById(controlId!) as HTMLInputElement)!.files =
      fileBuffer.files; // <-- according to your file input reference

    let newFileList = (document.getElementById(controlId!) as HTMLInputElement)!
      .files;
    //re-populate array into data variable for display
    for (let i = 0; i < newFileList!.length; i++) {
      data.push(newFileList![i].name);
    }
    setUploadedFile(data);
    fileObj(fileBuffer.files);
  };

  const listItems = uploadedFile.map((item, index) => {
    return (
      <li key={index}>
        <i
          className="bi bi-check me-2"
          style={{ color: 'green', fontSize: '24px' }}
        ></i>
        <span
          style={{
            color: 'blue',
            textDecoration: 'underline',
            fontWeight: '500',
          }}
        >
          {item}
        </span>
        <i
          className="bi bi-x-circle ms-2"
          style={{ color: 'red', fontSize: '24px' }}
          onClick={() => removeFile(index)}
        ></i>
      </li>
    );
  });

  return (
    <>
      <Form.Group controlId={controlId} className="mb-3">
        <Form.Control
          onChange={handleDisplayFileDetails}
          ref={inputRef}
          type="file"
          multiple
          className="d-none"
        />
        <Button
          onClick={handleUpload}
          size={size}
          variant={variant}
          disabled={disabled}
        >
          {children}
        </Button>
      </Form.Group>
      <ul style={{ listStyle: 'none', paddingLeft: '0' }}>{listItems}</ul>
    </>
  );
};

FileUpload.displayName = 'FileUpload';
FileUpload.defaultProps = defaultProps;

import * as React from 'react';
import { default as Form } from '../Form/Form';
import { FormGroupProps } from '../Form/FormGroup';
import { Button, ButtonProps, ButtonSize } from '../Button/Button';
import { useRef } from 'react';
import { ButtonVariant } from '../utils/types';
import { SGDSWrapper } from '../ThemeProvider/ThemeProvider';
import PropTypes from 'prop-types';

type FileUpload = ButtonProps & FormGroupProps;
type SelectedFileType = FileList | {};
export interface FileUploadProps extends FileUpload {
  variant?: ButtonVariant;
  size?: ButtonSize;
  controlId: string;
  onChangeFile: (data: FileList) => void;
  selectedFile: SelectedFileType;
  disabled?: boolean;
}

const propTypes = {
  /**
   * One or more button variant combinations
   *
   * buttons may be one of a variety of visual variants such as:
   *
   * `'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'link'`
   *
   * as well as "outline" versions (prefixed by 'outline-*')
   *
   * `'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-dark', 'outline-light'`
   */
  variant: PropTypes.string,

  /**
   * Specifies a large or small button.
   *
   * @type ('sm'|'lg')
   */
  size: PropTypes.oneOf<ButtonSize>(['sm', 'lg']),

  /**
   * Disables the Button, preventing mouse events,
   * even if the underlying component is an `<a>` element
   */
  disabled: PropTypes.bool,

  controlId: PropTypes.string.isRequired,

  onChangeFile: PropTypes.func.isRequired,

  selectedFile: PropTypes.oneOfType([
    PropTypes.instanceOf(FileList),
    PropTypes.object,
  ]).isRequired,
};

const defaultProps = {
  variant: 'primary',
  disabled: false,
};

export const FileUpload: React.FC<FileUploadProps> = ({
  controlId,
  variant,
  onChangeFile,
  selectedFile,
  disabled,
  size,
  children,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileNames = Object.entries(selectedFile).map((e) => e[1].name);

  let data: string[] = [];
  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileList = e.target.files as FileList;
    //instead if using event object, instantiate a new dataTransfer obj to standardize with removeFile() data obj
    var dt = new DataTransfer();
    for (let i = 0; i < fileList.length; i++) {
      data.push(fileList[i].name);
      dt.items.add(fileList[i]);
    }
    onChangeFile(dt.files);
  };
  const handleUpload = () => {
    inputRef?.current?.click();
  };
  // console.log(selectedFile);
  // console.log(fileNames);
  const removeFileHandler = (index: number) => {
    const attachments = (document.getElementById(
      controlId!
    ) as HTMLInputElement)!.files as FileList; // <-- reference your file input here
    let fileBuffer = new DataTransfer();
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
    onChangeFile(fileBuffer.files);
  };

  const listItems = fileNames.map((item, index) => {
    return (
      <li key={index} className="fileupload-list-item">
        <i className="bi bi-check me-2 check-icon"></i>
        <span className="filename">{item}</span>
        <i
          className="bi bi-x-circle ms-2 x-circle-icon"
          onClick={() => removeFileHandler(index)}
        ></i>
      </li>
    );
  });

  return (
    <>
      <Form.Group controlId={controlId}>
        <Form.Control
          onChange={inputOnChangeHandler}
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
      <SGDSWrapper as="ul" className="fileupload-list">
        {listItems}
      </SGDSWrapper>
    </>
  );
};

FileUpload.displayName = 'FileUpload';
FileUpload.propTypes = propTypes;
FileUpload.defaultProps = defaultProps;

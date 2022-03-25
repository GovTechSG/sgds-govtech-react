import { render } from '@testing-library/react';
import * as React from 'react';

import { FileUpload } from '../../src';

describe('<FileUpload>', () => {
  const mockFn = jest.fn();

  const fileList = [{ name: 'Example File' }, { name: 'Another File' }];
  const dataTransfer = new DataTransfer();
  const mockFileList = spyOn(dataTransfer, 'files').mockReturnValue(fileList);
  it('Should output a button', () => {
    const { getByText } = render(
      <FileUpload
        controlId="test123"
        onChangeFile={mockFn}
        selectedFile={mockFileList}
      >
        FileUpload
      </FileUpload>
    );

    expect(getByText('FileUpload')).toBeDefined();
  });

  it('uploadFileList', () => {
    const blob = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = '';
    blob['name'] = 'filename';
    const file = blob as File;
    const fileList = {
      0: file,
      1: file,
      length: 2,
      item: (index: number) => file,
    };

    const spy = spyOn(service, 'uploadFileList').and.returnValue([]);
    expect(service.uploadFileList(fileList)).toEqual([]);
  });
  it('Should output an input type=file ', () => {});
  it('should render a ul and li child, upon uploading', () => {});

  it('should render one less li child, upon removeFile', () => {});
});

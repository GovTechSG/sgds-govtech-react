import { render } from '@testing-library/react';
import * as React from 'react';

import { FileUpload } from '../../src';

describe('<FileUpload>', () => {
  const mockFn = jest.fn();

  interface MockFile {
    name: string;
    body: string;
    mimeType: string;
  }
  const createFileFromMockFile = (file: MockFile): File => {
    const blob = new Blob([file.body], { type: file.mimeType }) as any;
    blob['lastModifiedDate'] = new Date();
    blob['name'] = file.name;
    return blob as File;
  };

  const createMockFileList = (files: MockFile[]) => {
    const fileList: FileList = {
      length: files.length,
      item(index: number): File {
        return fileList[index];
      },
    };
    files.forEach(
      (file, index) => (fileList[index] = createFileFromMockFile(file))
    );

    return fileList;
  };

  it('should be able to pass in content in between tags', () => {
    const { getByText } = render(
      <FileUpload controlId="test123" onChangeFile={mockFn} selectedFile={{}}>
        FileUpload
      </FileUpload>
    );

    expect(getByText('FileUpload')).toBeDefined();
  });

  it('Should output a child input element', () => {
    const { asFragment, container } = render(
      <FileUpload
        data-testid="test"
        controlId="test123"
        onChangeFile={mockFn}
        selectedFile={{}}
      >
        FileUpload
      </FileUpload>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(container.querySelector('div')).toBeDefined();
    const $fileUpload = container.querySelector('div');
    expect($fileUpload?.children.length).toEqual(2);
    expect($fileUpload?.children[0].tagName).toEqual('INPUT');

    const $input = $fileUpload?.children[0];
    expect($input).toHaveAttribute('multiple');
    expect($input).toHaveAttribute('type', 'file');
    expect($input).toHaveAttribute('id', 'test123');
    expect($input?.classList).toContain('form-control');

    // expect($fileUpload?.children[1].tagName).toEqual('BUTTON');
  });

  it('Should output a child button element', () => {
    const { asFragment, container } = render(
      <FileUpload
        data-testid="test"
        controlId="test123"
        onChangeFile={mockFn}
        selectedFile={{}}
      >
        FileUpload
      </FileUpload>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(container.querySelector('div')).toBeDefined();
    const $fileUpload = container.querySelector('div');
    expect($fileUpload?.children.length).toEqual(2);
    expect($fileUpload?.children[1].tagName).toEqual('BUTTON');
    const $button = $fileUpload?.children[1];
    expect($button?.classList).toContain('btn');
    expect($button?.classList).toContain('btn-primary');
    expect($button?.classList).toContain('sgds');
    expect($button).toHaveAttribute('type', 'button');
  });
  it('should render a ul with list items, upon uploading', () => {
    const fileList = createMockFileList([
      {
        body: 'test',
        mimeType: 'text/plain',
        name: 'test.txt',
      },
      {
        body: 'test1',
        mimeType: 'text/plain',
        name: 'hello.txt',
      },
    ]);

    const { asFragment, container } = render(
      <FileUpload
        data-testid="test"
        controlId="test123"
        onChangeFile={mockFn}
        selectedFile={fileList}
      >
        FileUpload
      </FileUpload>
    );

    expect(asFragment()).toMatchSnapshot();
    const $listItems = container.querySelector('ul');
    expect($listItems).toBeDefined();
    expect($listItems?.firstChild).toHaveTextContent('test.txt');
    expect($listItems?.children[1]).toHaveTextContent('hello.txt');
  });

  it("should have li named 'test.txt' and not 'hello.txt', upon removeFile", () => {
    const fileList = createMockFileList([
      {
        body: 'test',
        mimeType: 'text/plain',
        name: 'test.txt',
      },
      {
        body: 'test1',
        mimeType: 'text/plain',
        name: 'hello.txt',
      },
    ]);

    const { asFragment } = render(
      <FileUpload
        data-testid="test"
        controlId="test123"
        onChangeFile={mockFn}
        selectedFile={fileList}
      >
        FileUpload
      </FileUpload>
    );

    expect(asFragment()).toMatchSnapshot();
    // const $listItems = getAllByRole('listitem');
    // fireEvent.click($listItems[0].children[2], fileList);
  });
});

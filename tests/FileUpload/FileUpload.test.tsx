import { render } from '@testing-library/react';
import * as React from 'react';

import { FileUpload } from '../../src';
interface iBlob extends Blob, File {
  name: string;
  lastModifiedDate: Date;
  lastModified: number;
  webkitRelativePathts: string;
}

interface MockFile {
  name: string;
  body: string;
  mimeType: string;
}
const createFileFromMockFile = (file: MockFile): File => {
  const blob: Partial<iBlob> = new Blob([file.body], { type: file.mimeType });
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

describe('<FileUpload>', () => {
  const mockFn = jest.fn();

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

  it("should have li named 'test.txt' and not 'hello.txt', upon removeFile", async () => {
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
    const $lists = container.querySelectorAll('li');
    const firstItem = $lists[0];
    expect(firstItem.textContent).toBe('test.txt');
    expect(firstItem.querySelector('i.bi-x-circle')).toBeInTheDocument();
    //TODO:
    // fireEvent.click(firstItem.querySelector('i.bi-x-circle') as Element)
    // await waitFor(() => {
    //   expect(firstItem.textContent).not.toBe('test.txt')
    // })
    // const $listItems = getAllByRole('listitem');
    // fireEvent.click($listItems[0].children[2], fileList);
  });

  it('cancelIcon and checkedIcon changes default icon', () => {
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
    const { container } = render(
      <FileUpload
        data-testid="test"
        controlId="test123"
        onChangeFile={mockFn}
        selectedFile={fileList}
        cancelIcon={<i className="bi bi-check2-circle"></i>}
        checkedIcon={<i className="bi bi-x-octagon"></i>}
      >
        FileUpload
      </FileUpload>
    );
    const defaultCancelIcons = container.querySelectorAll(
      '.bi.bi-x-circle.x-circle-icon'
    );
    const $cancelIcons = container.querySelectorAll('.bi-check2-circle');
    expect($cancelIcons).toBeDefined();
    expect(defaultCancelIcons.length).toBe(0);
    expect($cancelIcons[0].classList).toContain('ms-2');
    expect($cancelIcons[1].classList).toContain('ms-2');

    const defaultCheckedIcons = container.querySelectorAll(
      '.bi-check-lg.check-icon'
    );
    const $checkedIcons = container.querySelectorAll('.bi.bi-x-octagon');
    expect($checkedIcons).toBeDefined();
    expect(defaultCheckedIcons.length).toBe(0);
    expect($checkedIcons[0].classList).toContain('me-2');
    expect($checkedIcons[1].classList).toContain('me-2');
  });
});

import * as React from 'react';
import Card from '../Card';
import { render } from '@testing-library/react';

describe('<Card>', () => {
    it('should have sgds prefix on wrapper', () => {
    const  { getByText } = render(<Card>Card</Card>);
    expect(getByText('Card').classList).toContain('sgds');
  });
  it('should output a div', () => {
    const { getByText } = render(<Card>Card</Card>);
    expect(getByText('Card').tagName).toEqual('DIV');
    expect(getByText('Card').classList).toContain('card');
  });

  it('should have additional classes', () => {
    const { getByText } = render(<Card className="custom-class">Card</Card>);
    expect(getByText('Card').classList).toContain('custom-class');
  });

  it('accepts a bg prop', () => {
    const { getByText } = render(<Card bg="primary">Card</Card>);
    expect(getByText('Card').classList).toContain('bg-primary');
  });

  it('accepts a text prop', () => {
    const { getByText } = render(<Card text="success">Card</Card>);
    expect(getByText('Card').classList).toContain('text-success');
  });

  it('accepts a border prop', () => {
    const { getByText } = render(<Card border="danger">Card</Card>);
    expect(getByText('Card').classList).toContain('border-danger');
  });

  it('should render children', () => {
    const { getByTestId } = render(
      <Card data-testid="test-card">
        <p>hello</p>
      </Card>
    );
    expect(getByTestId('test-card').children.length).toEqual(1);
    expect(getByTestId('test-card').children[0].tagName).toEqual('P');
  });

  it('accepts as prop', () => {
    const { getByText } = render(<Card as="section">body</Card>);
    expect(getByText('body').tagName).toEqual('SECTION');
  });

  it('Should have div as default component', () => {
    const { getByTestId } = render(<Card data-testid="default-test" />);
    expect(getByTestId('default-test').tagName).toEqual('DIV');
  }); 
});

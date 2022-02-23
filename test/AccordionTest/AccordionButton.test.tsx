import { fireEvent, render } from '@testing-library/react';
import AccordionButton from '../../src/components/Accordion/AccordionButton';
import * as React from 'react';

describe('<AccordionButton>', () => {
  it('Should have button as default component', () => {
    const { getByTestId } = render(
      <AccordionButton data-testid="test-accordion-button" />,
    );
    expect(getByTestId('test-accordion-button')
      .tagName.toLowerCase())
      .toEqual('button');
    expect(getByTestId('test-accordion-button')).toHaveAttribute('type', 'button')
  });

  it('Should allow rendering as different component', () => {
    const { getByTestId } = render(
      <AccordionButton data-testid="test-accordion-button" as="div" />,
    );
    expect(getByTestId('test-accordion-button')
      .tagName.toLowerCase())
      .toEqual('div');
  });

  it('Should call onClick', () => {
    const onClickSpy = jest.fn()
    const { getByTestId } = render(
      <AccordionButton data-testid="btn" onClick={onClickSpy} />,
    );
    fireEvent.click(getByTestId('btn'));

    expect(onClickSpy).toHaveBeenCalledTimes(1)
  });
});

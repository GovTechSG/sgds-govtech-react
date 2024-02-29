import { fireEvent, render, waitFor, act } from '@testing-library/react';
import * as React from 'react';
import DateInput from '../../src/DatePicker/DateInput';

describe('DateInput', () => {
  const isInvalid = false;
  const validateInput = jest.fn();
  const enterDateRange = jest.fn();
  const enterDateSingle = jest.fn();

  it('should have the default html', () => {
    const { container } = render(
      <DateInput
        isRange={false}
        dateFormat="DD/MM/YYYY"
        isInvalid={isInvalid}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );
    expect(container.querySelector('input')).toBeInTheDocument();
  });

  it('the value is updated when enter numeric value, for date format DD/MM/YYYY', () => {
    const { container } = render(
      <DateInput
        isRange={false}
        dateFormat="DD/MM/YYYY"
        isInvalid={isInvalid}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '01' } });
    expect(input.value).toEqual('01/mm/yyyy');
  });

  it('the value is updated when enter numeric value, for date format MM/DD/YYYY', () => {
    const { container } = render(
      <DateInput
        isRange={false}
        dateFormat="MM/DD/YYYY"
        isInvalid={isInvalid}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '01102024' } });
    expect(input.value).toEqual('01/10/2024');
  });

  it('the value is updated when enter numeric value, for date format YYYY/MM/DD', () => {
    const { container } = render(
      <DateInput
        isRange={false}
        dateFormat="YYYY/MM/DD"
        isInvalid={isInvalid}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '20240110' } });
    expect(input.value).toEqual('2024/01/10');
  });

  it('the value is not updated when enter non-numeric value', () => {
    const { container } = render(
      <DateInput
        isRange={false}
        dateFormat="DD/MM/YYYY"
        isInvalid={isInvalid}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '01Jan' } });
    expect(input.value).toEqual('01/mm/yyyy');
  });

  it('no error is shown when the prop invalid equal to false is passed', () => {
    const { container } = render(
      <DateInput
        isRange={false}
        dateFormat="DD/MM/YYYY"
        isInvalid={false}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    expect(container.querySelector('input')?.classList).not.toContain(
      'is-invalid'
    );
  });

  it('error is shown when the prop invalid equal to true is passed', () => {
    const { container } = render(
      <DateInput
        isRange={false}
        dateFormat="DD/MM/YYYY"
        isInvalid={true}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    expect(container.querySelector('input')?.classList).toContain('is-invalid');
  });

  it('enterDateSingle fn fires multiple time when user enter date on the input', async () => {
    const { container } = render(
      <DateInput
        isRange={false}
        dateFormat="DD/MM/YYYY"
        isInvalid={isInvalid}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    const input = container.querySelector('input')!;

    await act(async () => {
      fireEvent.change(input, { target: { value: '01012024' } });
    });

    await waitFor(() => {
      expect(input.value).toEqual('01/01/2024');
      expect(enterDateSingle).toBeCalled();
    });
  });
});

describe('DateInput Range Mode', () => {
  const isInvalid = false;
  const validateInput = jest.fn();
  const enterDateRange = jest.fn();
  const enterDateSingle = jest.fn();

  it('the value is updated when enter numeric value, for date format DD/MM/YYYY', () => {
    const { container } = render(
      <DateInput
        isRange={true}
        dateFormat="DD/MM/YYYY"
        isInvalid={isInvalid}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '01' } });
    expect(input.value).toEqual('01/mm/yyyy - dd/mm/yyyy');
  });

  it('the value is updated when enter numeric value, for date format MM/DD/YYYY', () => {
    const { container } = render(
      <DateInput
        isRange={true}
        dateFormat="MM/DD/YYYY"
        isInvalid={isInvalid}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '0110202401152024' } });
    expect(input.value).toEqual('01/10/2024 - 01/15/2024');
  });

  it('the value is updated when enter numeric value, for date format YYYY/MM/DD', () => {
    const { container } = render(
      <DateInput
        isRange={true}
        dateFormat="YYYY/MM/DD"
        isInvalid={isInvalid}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '2024010120240110' } });
    expect(input.value).toEqual('2024/01/01 - 2024/01/10');
  });

  it('the value is not updated when enter non-numeric value', () => {
    const { container } = render(
      <DateInput
        isRange={true}
        dateFormat="DD/MM/YYYY"
        isInvalid={isInvalid}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '01Jan' } });
    expect(input.value).toEqual('01/mm/yyyy - dd/mm/yyyy');
  });

  it('no error is shown when the prop invalid equal to false is passed', () => {
    const { container } = render(
      <DateInput
        isRange={true}
        dateFormat="DD/MM/YYYY"
        isInvalid={false}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    expect(container.querySelector('input')?.classList).not.toContain(
      'is-invalid'
    );
  });

  it('error is shown when the prop invalid equal to true is passed', () => {
    const { container } = render(
      <DateInput
        isRange={true}
        dateFormat="DD/MM/YYYY"
        isInvalid={true}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    expect(container.querySelector('input')?.classList).toContain('is-invalid');
  });

  it('enterDateRange fn fires when user enter date on the input', async () => {
    const { container } = render(
      <DateInput
        isRange={true}
        dateFormat="DD/MM/YYYY"
        isInvalid={isInvalid}
        validateDateInput={validateInput}
        enterDateRange={enterDateRange}
        enterDateSingle={enterDateSingle}
      />
    );

    const input = container.querySelector('input')!;

    fireEvent.change(input, { target: { value: '01012024' } });

    await waitFor(() => {
      expect(input.value).toEqual('01/01/2024 - dd/mm/yyyy');
      expect(enterDateRange).toBeCalled();
    });
  });
});

import { DatePicker } from 'clk-bs/DatePicker';

const DatePickerCom = () => {
  return (
    <DatePicker
      initialValue={new Date('2020-01-01')}
      displayDate={new Date('2020-01-01')}
    />
  );
};

export default DatePickerCom;

export const argTypes = {
  initialValue: {
    table: {
      type: {
        summary: 'Date | RangeSelectionValue => {start: Date, end: Date}',
      },
    },
  },
  onChangeDate: {
    table: {
      type: {
        summary: '(value: Date | RangeSelectionValue | undefined) => void',
      },
    },
  },
  placeholder: {
    table: {
      defaultValue: { summary: 'dd/mm/yyyy | dd/mm/yyyy - dd/mm/yyyy' },
    },
  },
};

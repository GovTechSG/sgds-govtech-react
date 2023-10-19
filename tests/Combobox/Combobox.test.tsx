import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { Combobox } from '../../src';
const menuList = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antigua &amp; Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia &amp; Herzegovina',
  'Botswana',
  'Brazil',
  'British Virgin Islands',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Cape Verde',
  'Cayman Islands',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Cote D Ivoire',
  'Croatia',
  'Cruise Ship',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Polynesia',
  'French West Indies',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kuwait',
  'Kyrgyz Republic',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macau',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Nepal',
  'Netherlands',
  'Netherlands Antilles',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Norway',
  'Oman',
  'Pakistan',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Pierre &amp; Miquelon',
  'Samoa',
  'San Marino',
  'Satellite',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'South Africa',
  'South Korea',
  'Spain',
  'Sri Lanka',
  'St Kitts &amp; Nevis',
  'St Lucia',
  'St Vincent',
  'St. Lucia',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  "Timor L'Este",
  'Togo',
  'Tonga',
  'Trinidad &amp; Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks &amp; Caicos',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'Uruguay',
  'Uzbekistan',
  'Venezuela',
  'Vietnam',
  'Virgin Islands (US)',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

describe('Combobox a11y', () => {
  it('has role="combobox"', async () => {
    const { container } = render(<Combobox menuList={menuList} />);
    expect(container.querySelector('div.form-control')).toHaveAttribute(
      'role',
      'combobox'
    );
  });
  it('input element has aria-autocomplete="list"', async () => {
    const { container } = render(<Combobox menuList={menuList} />);
    expect(container.querySelector('input.form-control')).toHaveAttribute(
      'aria-autocomplete',
      'list'
    );
  });
  it('dropdown menu has role="listbox" on ul element', async () => {
    const { container } = render(<Combobox menuList={menuList} />);
    fireEvent.click(container
      .querySelector('div.form-control')!)
    expect(container.querySelector('ul.dropdown-menu')).toHaveAttribute(
      'role',
      'listbox'
    );
  });
  it('aria-controls id points to ul (dropdown menu) id', async () => {
    const { container } = render(<Combobox menuList={menuList} />);
    fireEvent.click(container
      .querySelector('div.form-control')!)
    const menuUlId = container.querySelector('ul')?.getAttribute('id');
    const inputAriaControlValue = container
      .querySelector('div.form-control')
      ?.getAttribute('aria-controls');

    expect(inputAriaControlValue).toEqual(menuUlId);
  });
});

describe('Single & multi-select Combobox shared behavior', () => {
  it('renders default HTML of dropdown', async () => {
    const { container, getByText } = render(<Combobox menuList={menuList} />);
    expect(container.firstElementChild?.classList).toContain('dropdown');
    expect(container.firstElementChild?.classList).toContain('dropdown');
    expect(container.firstElementChild?.tagName).toContain('DIV');
    expect(container.querySelector('input')).toBeInTheDocument();
    expect(container.querySelector('ul.dropdown-menu')).not.toBeInTheDocument();

    fireEvent.click(container.querySelector('div.form-control')!);

    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu')).toBeInTheDocument();
      expect(getByText('Afghanistan')).toBeInTheDocument();
      expect(getByText('Afghanistan').tagName).toEqual('BUTTON');
    });
  });

  it('reflects initialValue prop', async () => {
    const { container } = render(
      <Combobox menuList={menuList} initialValue="test" />
    );
    expect(container.querySelector('input')?.value).toEqual('test');
    fireEvent.click(container.querySelector('div.form-control')!);

    //menu shouldnt appear if initialValue doesnt match any in menuList
    await waitFor(() => {
      expect(
        container.querySelector('ul.dropdown-menu')
      ).not.toBeInTheDocument();
    });
  });

  it('when initialValue=Afghanistan matches one of menuList, onClick should show menu', async () => {
    const { container, getByText } = render(
      <Combobox menuList={menuList} initialValue="Afghanistan" />
    );
    expect(container.querySelector('input')?.value).toEqual('Afghanistan');

    fireEvent.click(container.querySelector('div.form-control')!);

    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu')).toBeInTheDocument();
      expect(getByText('Afghanistan')).toBeInTheDocument();
    });
  });
  it('when initialValue=afghanistan matches one of menuList, onClick should show menu', async () => {
    const { container, getByText } = render(
      <Combobox menuList={menuList} initialValue="afghanistan" />
    );
    expect(container.querySelector('input')?.value).toEqual('afghanistan');

    fireEvent.click(container.querySelector('div.form-control')!);

    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu')).toBeInTheDocument();
      expect(getByText('Afghanistan')).toBeInTheDocument();
    });
  });
  it('when initialValue=a matches one of menuList, onClick should show menu', async () => {
    const { container, getByText, queryByText } = render(
      <Combobox menuList={menuList} initialValue="a" />
    );
    expect(container.querySelector('input')?.value).toEqual('a');

    fireEvent.click(container.querySelector('div.form-control')!);

    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu')).toBeInTheDocument();
      expect(getByText('Afghanistan')).toBeInTheDocument();
      expect(getByText('Albania')).toBeInTheDocument();
      expect(getByText('Azerbaijan')).toBeInTheDocument();
      expect(queryByText('Singapore')).toBeNull();
    });
  });

  it('onclick of menuitem , populates value of input', async () => {
    const { container, getByText } = render(
      <Combobox menuList={menuList} initialValue="a" />
    );
    expect(container.querySelector('input')?.value).toEqual('a');

    fireEvent.click(container.querySelector('div.form-control')!);

    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu')).toBeInTheDocument();
      expect(getByText('Afghanistan')).toBeInTheDocument();
    });

    fireEvent.click(getByText('Afghanistan'));
    await waitFor(() => {
      expect(container.querySelector('input')?.value).toEqual('Afghanistan');
    });
  });

  it('onchange of input, menu filters', async () => {
    const { container, getByText, queryByText } = render(
      <Combobox menuList={menuList} />
    );
    fireEvent.click(container.querySelector('div.form-control')!);
    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu')).toBeInTheDocument();
      expect(getByText('Afghanistan')).toBeInTheDocument();
    });

    fireEvent.change(container.querySelector('input')!, { target: { value: 's' } });

    await waitFor(() => {
      expect(getByText('Samoa')).toBeInTheDocument();
      expect(queryByText('Afghanistan')).toBeNull();
    });
    fireEvent.change(container.querySelector('input')!, { target: { value: 'si' } });
    await waitFor(() => {
      expect(queryByText('Samoa')).toBeNull();
      expect(getByText('Singapore')).toBeInTheDocument();
      expect(getByText('Sierra Leone')).toBeInTheDocument();
    });
  });

  it('key press arrowDown scrolls menu and changes input', async () => {
    const { container, getByText } = render(<Combobox menuList={menuList} />);
    fireEvent.click(container.querySelector('div.form-control')!);
    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu')).toBeInTheDocument();
      expect(getByText('Afghanistan')).toBeInTheDocument();
    });

    fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown', code: 'ArrowDown' });

    await waitFor(() => {
      expect(container.querySelector('input')?.value).toEqual('Afghanistan');
    });
    fireEvent.keyDown(container.querySelectorAll('li>button.dropdown-item')[0], {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    await waitFor(() => {
      expect(container.querySelector('input')?.value).toEqual('Albania');
    });
    fireEvent.keyDown(container.querySelectorAll('li>button.dropdown-item')[1], {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    await waitFor(() => {
      expect(container.querySelector('input')?.value).toEqual('Algeria');
    });
  });

  it('pass in menuPlacement changes data-popper-placement attri', async () => {
    const { container } = render(
      <Combobox menuList={menuList} menuPlacement="up" />
    );
    fireEvent.click(container.querySelector('div.form-control')!);
    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu')).toHaveAttribute(
        'x-placement',
        'top-start'
      );
    });
  });

  it('when label prop defined, firstElementchild is FormLabel', () => {
    const { container, getByText } = render(
      <Combobox menuList={menuList} label="test" />
    );
    expect(container.firstElementChild?.tagName).toEqual('LABEL');
    expect(container.firstElementChild?.classList).toContain('form-label');
    expect(getByText('test')).toBeInTheDocument();
  });

  it('when icon not defined, there is no icon ', () => {
    const { container } = render(<Combobox menuList={menuList} />);
    expect(
      container.querySelector('.dropdown.combobox> i.form-control-icon')
    ).not.toBeInTheDocument();
  });
  it('when icon defined, icon in container', () => {
    const { container } = render(
      <Combobox menuList={menuList} icon={<i className="bi bi-search"></i>} />
    );

    expect(
      container.querySelector(
        'i.form-control-icon.bi.bi-search'
      )
    ).toBeInTheDocument();
  });
});

describe('Multi-select Combobox dropdown menu', () => {
  it('dropdown menu remains open when an item is selected', async () => {
    const { container } = render(<Combobox menuList={menuList} mode='multi' />);

    fireEvent.click(container.querySelector('div.form-control')!);
    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu')).toBeInTheDocument();
    });

    // Selecting an item
    fireEvent.click(screen.getByRole('button', { name: 'Afghanistan' }))
    await waitFor(() => {
      expect(
        screen.queryByLabelText('Remove Afghanistan', { selector: 'button' })
      ).toBeInTheDocument();
    });

    // dropdown menu should remain open
    expect(container.querySelector('ul.dropdown-menu.show')).toBeInTheDocument();
  });

  it('dropdown menu remains open when an item is unselected', async () => {
    const { container } = render(<Combobox menuList={menuList} mode='multi' />);

    fireEvent.click(container.querySelector('div.form-control')!);
    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu.show')).toBeInTheDocument();
    });

    // Selecting an item
    fireEvent.click(screen.getByRole('button', { name: 'Afghanistan' }))
    await waitFor(() => {
      expect(
        screen.queryByLabelText('Remove Afghanistan', { selector: 'button' })
      ).toBeInTheDocument();
    });

    // Close the dropdown menu
    fireEvent.click(container.querySelector('div.form-control')!);
    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu.show')).not.toBeInTheDocument();
    });

    // Unselecting the item
    fireEvent.click(screen.getByLabelText('Remove Afghanistan', { selector: 'button' }))

    // dropdown menu should open
    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu.show')).toBeInTheDocument();
    });
  });

  it('selected item is removed temporarily from dropdown menu and added back when unselected', async () => {
    const { container } = render(<Combobox menuList={menuList} mode='multi' />);

    fireEvent.click(container.querySelector('div.form-control')!);
    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu')).toBeInTheDocument();
    });

    // Selecting an item
    fireEvent.click(screen.getByRole('button', { name: 'Afghanistan' }))
    await waitFor(() => {
      expect(
        screen.queryByLabelText('Remove Afghanistan', { selector: 'button' })
      ).toBeInTheDocument();
    });

    // Expect selected item to be removed from dropdown menu
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Afghanistan' })).not.toBeInTheDocument();
    });

    // Unselecting the item
    fireEvent.click(screen.getByLabelText('Remove Afghanistan', { selector: 'button' }))

    // Expect selected item to be added back to the dropdown menu
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Afghanistan' })).toBeInTheDocument();
    });
  });
});

describe('Multi-select Combobox keyboard behavior', () => {
  it('previously-selected item is removed when input is empty and "backspace" key is pressed', async () => {
    const { container } = render(<Combobox menuList={menuList} mode='multi' />);

    fireEvent.click(container.querySelector('div.form-control')!);
    await waitFor(() => {
      expect(container.querySelector('ul.dropdown-menu')).toBeInTheDocument();
    });

    // Selecting an item
    fireEvent.click(screen.getByRole('button', { name: 'Afghanistan' }))
    await waitFor(() => {
      expect(
        screen.queryByLabelText('Remove Afghanistan', { selector: 'button' })
      ).toBeInTheDocument();
    });

    // Expect previously-selected item to be removed
    await waitFor(() => expect(container.querySelector('input')?.value).toBe(''));
    fireEvent.keyDown(container.querySelector('input')!, { key: 'Backspace', code: 'Backspace' });
    await waitFor(() => {
      expect(
        screen.queryByLabelText('Remove Afghanistan', { selector: 'button' })
      ).not.toBeInTheDocument();
    });
  });
});

describe('Combobox event handlers', () => {
  it('onChangeInput fires when input changes', async () => {
    const mockFn = jest.fn();
    const { container } = render(
      <Combobox menuList={menuList} onChangeInput={mockFn} />
    );
    fireEvent.change(container.querySelector('input')!, { target: { value: 's' } });
    await waitFor(() => expect(mockFn).toBeCalledTimes(1));
    fireEvent.change(container.querySelector('input')!, { target: { value: 'si' } });
    await waitFor(() => expect(mockFn).toBeCalledTimes(2));
  });

  it('onChangeInput returns the correct "val" when input value changes', async () => {
    const mockFn = jest.fn((val, _) => val);
    const { container } = render(<Combobox menuList={menuList} onChangeInput={mockFn} />);
    fireEvent.change(container.querySelector('input')!, { target: { value: 'a' } });
    await waitFor(() => expect(mockFn.mock.calls[0][0]).toBe('a'));
  });

  it('onChangeSelect fires when an item is selected and unselected',
    async () => {
      const mockFn = jest.fn();
      const { container } = render(<Combobox menuList={menuList} mode='multi' onChangeSelect={mockFn} />);

      fireEvent.click(container.querySelector('div.form-control')!);
      await waitFor(() => {
        expect(container.querySelector('ul.dropdown-menu')).toBeInTheDocument();
      });

      // Selecting an item
      fireEvent.click(screen.getByRole('button', { name: 'Afghanistan' }))
      await waitFor(() => expect(mockFn).toBeCalledTimes(1));

      // Unselecting an item
      await waitFor(() => {
        expect(
          screen.queryByLabelText('Remove Afghanistan', { selector: 'button' })
        ).toBeInTheDocument();
      });
      fireEvent.click(screen.getByLabelText('Remove Afghanistan', { selector: 'button' }))

      await waitFor(() => {
        expect(
          screen.queryByLabelText('Remove Afghanistan', { selector: 'button' })
        ).not.toBeInTheDocument();
      });
      await waitFor(() => expect(mockFn).toBeCalledTimes(2));
    });

  it('onChangeSelect called on single-select combobox and returns the correct selected "item" and "items"',
    async () => {
      const mockFn = jest.fn((item, items, _) => { item; items; });
      const { container } = render(<Combobox menuList={menuList} onChangeSelect={mockFn} />);

      fireEvent.click(container.querySelector('div.form-control')!);
      await waitFor(() => {
        expect(container.querySelector('ul.dropdown-menu')).toBeInTheDocument();
      });

      // First item selected
      fireEvent.click(screen.getByRole('button', { name: 'Afghanistan' }))
      await waitFor(() => expect(mockFn.mock.calls[0][0]).toBe('Afghanistan'));
      await waitFor(() => expect(mockFn.mock.calls[0][1]).toEqual(['Afghanistan']));

      // Another item selected
      fireEvent.change(container.querySelector('input')!, { target: { value: '' } });
      await waitFor(() => expect(container.querySelector('input')?.value).toBe(''));
      fireEvent.click(screen.getByRole('button', { name: 'Albania' }))
      await waitFor(() => expect(mockFn.mock.calls[1][0]).toBe('Albania'));
      await waitFor(() => expect(mockFn.mock.calls[1][1]).toEqual(['Albania']));
    });

  it('onChangeSelect called on multi-select combobox and returns the correct selected/unselected "item" and selected "items"',
    async () => {
      const mockFn = jest.fn((item, items, _) => { item; items; });
      const { container } = render(<Combobox menuList={menuList} mode='multi' onChangeSelect={mockFn} />);

      fireEvent.click(container.querySelector('div.form-control')!);
      await waitFor(() => {
        expect(container.querySelector('ul.dropdown-menu')).toBeInTheDocument();
      });

      // First item selected
      fireEvent.click(screen.getByRole('button', { name: 'Afghanistan' }))
      await waitFor(() => expect(mockFn.mock.calls[0][0]).toBe('Afghanistan'));
      await waitFor(() => expect(mockFn.mock.calls[0][1]).toEqual(['Afghanistan']));

      // Another item selected
      fireEvent.click(screen.getByRole('button', { name: 'Albania' }))
      await waitFor(() => expect(mockFn.mock.calls[1][0]).toBe('Albania'));
      await waitFor(() => expect(mockFn.mock.calls[1][1]).toEqual(['Afghanistan', 'Albania']));

      // Unselect an item
      fireEvent.click(screen.getByLabelText('Remove Afghanistan', { selector: 'button' }))
      await waitFor(() => {
        expect(
          screen.queryByLabelText('Remove Afghanistan', { selector: 'button' })
        ).not.toBeInTheDocument();
      });
      await waitFor(() => expect(mockFn.mock.calls[2][0]).toBe('Afghanistan'));
      await waitFor(() => expect(mockFn.mock.calls[2][1]).toEqual(['Albania']));
    });
});

import * as React from 'react';
import { render } from '@testing-library/react';
import { FooterTopItem } from '../../src/Footer';
import FooterTopItemGrpContext from '../../src/Footer/FooterTopItemsContext'

describe('<FooterTopItem/>', () => {
  it('should render default html', () => {
    const { container } = render(<FooterTopItem />);
    expect(container.firstElementChild?.tagName).toBe('DIV');
    expect(container.firstElementChild?.classList).toContain(
      'col-lg-3'
    );
    expect(container.querySelector('div.col-lg-3>div.title')).toBeInTheDocument();
    expect(container.querySelector('div.col-lg-3>ul.links')).toBeInTheDocument();
  });

  it('className gets forwarded ', () => {
    const { container } = render(<FooterTopItem className="test" />);
    expect(container.firstElementChild?.classList).toContain(
      'col-lg-3'
    );
    expect(container.firstElementChild?.classList).toContain('test');
  });
  it('linksClass is passed to .links and overrides default', () => {
    const { container } = render(
      <FooterTopItem linksClass="test"/>
    );
    expect(container.querySelector('ul.links.test')).toBeInTheDocument();
  });
  it('titleClass is passed to .title', () => {
    const { container } = render(
      <FooterTopItem titleClass='test'/>
    );
    expect(container.querySelector('div.title.test')).toBeInTheDocument();
  });
  it('when noOfItem 5 or more, col class changes to col-lg-2', () => {
    const { container } = render(
      <FooterTopItemGrpContext.Provider value={{noOfItem: 5}}>
      <FooterTopItem/>
      </FooterTopItemGrpContext.Provider>
    );
    expect(container.querySelector('div.col-lg-2')).toBeInTheDocument();
    expect(container.querySelector('div.col-lg-3')).not.toBeInTheDocument();
  });
});

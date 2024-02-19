import * as React from 'react';
import PaginationBase, { PaginationBaseProps } from './PaginationBase';

export interface PaginationProps extends PaginationBaseProps {
  /** Inserts the length value from a given sets of data objects. Value can be set using useState hook */
  dataLength: number;
  /** Sets the starting active page upon render. Value can be set using useState hook */
  currentPage: number;
  /** Sets the amount of data objects to be displayed per page. Value can be set using useState hook */
  itemsPerPage?: number;
  /** Sets the page limit to be displayed at any given render. e.g 3, 5, 7, 9 */
  limit?: number;
  /**  Updates the current page in parent  */
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  /** Sets the page direction button to contain text and/or icon */
  directionVariant?: 'icon' | 'icon-text' | 'text';
  /** Sets the size of all page items. */
  size: 'sm' | 'md' | 'lg';
  /** Toggles ellipsis buttons to be able to increment/decrement pages based on the ellipsisJump value set. By default, it will be false */
  ellipsisOn: boolean;
  /** When ellipsisOn is true, length of decrementing/incrementing of pages can be set with a number value*/
  ellipsisJump: number;
  /** Enables rendering of the first-page button on the pagination, allowing users to jump to the initial page. By default, it will be false */
  showFirstPage?: boolean;
  /** Enables rendering of the last-page button on the pagination, allowing users to jump to the last page. By default, it will be false */
  showLastPage?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  dataLength = 0,
  currentPage = 1,
  itemsPerPage = 5,
  limit = 3,
  setCurrentPage,
  directionVariant = 'icon-text',
  size = 'sm',
  ellipsisOn = false,
  ellipsisJump = 3,
  showFirstPage = false,
  showLastPage = false,
}) => {
  // set the id of page item clicked to currentPage
  const handlePageClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const liTarget = event.target as HTMLLIElement;
    setCurrentPage(Number(liTarget.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(dataLength / itemsPerPage); i++) {
    pages.push(i);
  }
  const sanitizeLimit = limit >= pages.length ? pages.length : limit;

  const renderPgNumbers = () => {
    const pagesToShow = [];
    let sanitizeStartPage = 1;
    let endPage;

    if (limit < pages.length)
      sanitizeStartPage = currentPage - Math.floor(sanitizeLimit / 2);

    if (pages.length - sanitizeStartPage < limit)
      sanitizeStartPage = pages.length + 1 - limit;

    if (sanitizeStartPage <= 0) sanitizeStartPage = 1;

    endPage = sanitizeStartPage + sanitizeLimit - 1;

    if (endPage > pages.length) endPage = pages.length;

    if (currentPage === pages.length)
      sanitizeStartPage = pages.length - sanitizeLimit + 1;

    for (let i = sanitizeStartPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }
    return pagesToShow.map((number) => (
      <PaginationBase.Item
        key={number}
        id={number.toString()}
        onClick={handlePageClick}
        className={currentPage == number ? 'active' : undefined}
      >
        {number}
      </PaginationBase.Item>
    ));
  };

  const handleNextButton = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevButton = () => {
    setCurrentPage(currentPage - 1);
  };

  // handleclick for ellipsisOn

  const handleNextEllipsisButton = () => {
    setCurrentPage(currentPage + ellipsisJump);
    if (currentPage + ellipsisJump > pages.length) setCurrentPage(pages.length);
  };
  const handlePrevEllipsisButton = () => {
    setCurrentPage(currentPage - ellipsisJump);
    if (currentPage - ellipsisJump < 1) setCurrentPage(1);
  };

  const renderFirstPage = () => {
    const sanitizeStartPage = currentPage - Math.floor(sanitizeLimit / 2);

    if (sanitizeStartPage > 1) {
      return (
        <>
          <PaginationBase.Item key={1} id="1" onClick={handlePageClick}>
            {1}
          </PaginationBase.Item>
          <PaginationBase.Ellipsis
            onClick={handlePrevEllipsisButton}
            disabled={!ellipsisOn}
          />
        </>
      );
    }

    return null;
  };

  const renderLastEllipsis = () => {
    const isEvenLimit = sanitizeLimit % 2 === 0;
    const differentialLimitCondition = isEvenLimit
      ? currentPage + Math.floor(sanitizeLimit / 2) <= pages.length
      : currentPage + Math.floor(sanitizeLimit / 2) < pages.length;

    if (pages.length !== sanitizeLimit && differentialLimitCondition)
      return (
        <PaginationBase.Ellipsis
          onClick={handleNextEllipsisButton}
          disabled={!ellipsisOn}
        />
      );
    return null;
  };

  const renderLastPage = () => {
    const isEvenLimit = sanitizeLimit % 2 === 0;
    const differentialLimitCondition = isEvenLimit
      ? currentPage + Math.floor(sanitizeLimit / 2) <= pages.length
      : currentPage + Math.floor(sanitizeLimit / 2) < pages.length;

    if (pages.length !== sanitizeLimit && differentialLimitCondition)
      return (
        <PaginationBase.Item
          key={pages.length}
          id={pages.length.toString()}
          onClick={handlePageClick}
        >
          {pages.length}
        </PaginationBase.Item>
      );
    return null;
  };

  const renderFirstEllipsis = () => {
    if (
      pages.length !== sanitizeLimit &&
      currentPage - Math.floor(sanitizeLimit / 2) > 1
    )
      return <PaginationBase.Ellipsis onClick={handlePrevEllipsisButton} />;
    else return null;
  };

  const directionBtnContent = (
    directionLabel: 'Previous' | 'Next',
    iconClass: string
  ) => {
    return (
      <>
        {directionVariant !== 'icon' &&
          directionLabel === 'Next' &&
          directionLabel}
        {directionVariant === 'text' ? null : <i className={iconClass} />}
        {directionVariant !== 'icon' &&
          directionLabel === 'Previous' &&
          directionLabel}
      </>
    );
  };

  return (
    <PaginationBase size={size}>
      <PaginationBase.Prev
        onClick={handlePrevButton}
        disabled={currentPage <= 1}
      >
        {directionBtnContent('Previous', 'bi bi-chevron-left')}
      </PaginationBase.Prev>
      {showFirstPage && renderFirstPage()}
      {!showFirstPage && ellipsisOn ? renderFirstEllipsis() : null}
      {renderPgNumbers()}
      {renderLastEllipsis()}
      {showLastPage && renderLastPage()}

      <PaginationBase.Next
        onClick={handleNextButton}
        disabled={currentPage >= pages.length}
      >
        {directionBtnContent('Next', 'bi bi-chevron-right')}
      </PaginationBase.Next>
    </PaginationBase>
  );
};

Pagination.displayName = 'Pagination';

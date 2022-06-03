import * as React from 'react';
import PaginationBase, { PaginationBaseProps } from './PaginationBase';

export interface PaginationProps extends PaginationBaseProps {
  dataLength: number;
  currentPage: number;
  itemsPerPage?: number;
  limit?: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  directionVariant?: 'icon' | 'icon-text' | 'text';
  size: 'sm' | 'md' | 'lg';
  ellipsisOn: boolean;
  ellipsisJump: number;
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
    else return null;
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
        {directionVariant === 'text' ? null : (
          <>
            <span className="visually-hidden">{directionLabel}</span>
            <i className={iconClass} />
          </>
        )}
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
      {ellipsisOn ? renderFirstEllipsis() : null}
      {renderPgNumbers()}
      {renderLastEllipsis()}

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

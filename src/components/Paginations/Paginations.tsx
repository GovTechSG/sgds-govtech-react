import * as React from 'react';
import PaginationBase, {
  PaginationBaseProps,
} from '../PaginationBase/PaginationBase';

export interface PaginationsProps extends PaginationBaseProps {
  dataLength: number;
  currentPage: number;
  itemsPerPage?: number;
  limit?: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  directionVariant?: 'icon' | 'icon-text' | 'text';
  size: 'sm' | 'md' | 'lg';
  ellipsisOn: boolean;
}

export const Paginations: React.FC<PaginationsProps> = ({
  dataLength = 0,
  currentPage = 1,
  itemsPerPage = 5,
  limit = 3,
  setCurrentPage,
  directionVariant = 'icon-text',
  size = 'sm',
  ellipsisOn = false,
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

  const renderPgNumbers = () => {
    const pagesToShow = [];
    let startPage;
    let endPage;

    startPage = currentPage - Math.floor(limit / 2);
    if (startPage <= 0) startPage = 1;
    
    endPage = startPage + limit - 1;

    if (endPage > pages.length) endPage = pages.length;

    if (currentPage === pages.length) startPage = pages.length - limit + 1;

    for (let i = startPage; i <= endPage; i++) {
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
    setCurrentPage(currentPage + limit);
    if(currentPage + limit > pages.length ) setCurrentPage(pages.length)
  };
  const handlePrevEllipsisButton = () => {
    setCurrentPage(currentPage - limit);
    if(currentPage - limit < 1) setCurrentPage(1)
 
  };

  const renderLastEllipsis = () => {
    if(pages.length !== limit && currentPage + Math.floor(limit / 2) < pages.length)
    return(
      <PaginationBase.Ellipsis onClick={handleNextEllipsisButton} disabled={!ellipsisOn} />
    )
    else return null
  }

  const renderFirstEllipsis = () => {
    if (pages.length !== limit && currentPage - Math.floor(limit / 2 ) > 1)
    return(
      <PaginationBase.Ellipsis onClick={handlePrevEllipsisButton} />
    ) 
    else return null
  }


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

Paginations.displayName = 'Paginations';

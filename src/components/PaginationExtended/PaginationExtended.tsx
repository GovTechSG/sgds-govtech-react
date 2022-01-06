import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import Pagination, { PaginationProps } from '../Pagination/Pagination';

export interface PaginationExtendedProps extends PaginationProps {
  dataLength: number;
  currentPage: number;
  itemsPerPage: number;
  limit?: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  [other: string]: any;
  //directionVariant: 'icon' | 'icon-text' |'text'
}

const propTypes = {
  /**
   * @default 'paginationExtended'
   * */
  dataLength: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  limit: PropTypes.number,
  setCurrentPage: PropTypes.func.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
};

const defaultProps = {
    dataLength : 0, 
    currentPage: 1, 
    itemsPerPage: 5,
    limit: 3,
    setCurrentPage: (): void => {},
    setItemsPerPage: ():void  => {}
}

const PaginationExtended: React.FC<PaginationExtendedProps> = ({
  dataLength = 0,
  currentPage = 1,
  itemsPerPage = 5,
  limit = 3,
  setCurrentPage,
}) => {
//   const [pageNumberLimit, setPageNumberLimit] = useState(limit);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(limit);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

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
    if (startPage <= 0) startPage = 1
    if (startPage === 1) endPage = startPage + limit -1 
        else endPage = currentPage + Math.floor(limit / 2);
    if(endPage > pages.length) endPage = pages.length

    if(currentPage === pages.length) startPage = pages.length - limit + 1


    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }
    return pagesToShow.map((number) => (
      <Pagination.Item
        key={number}
        id={number.toString()}
        onClick={handlePageClick}
        className={currentPage == number ? 'active' : undefined}
      >
        {number}
      </Pagination.Item>
    ));
  };

  const handleNextButton = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + limit);
      setMinPageNumberLimit(minPageNumberLimit + limit);
    }
  };
  const handlePrevButton = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % minPageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - limit);
      setMinPageNumberLimit(minPageNumberLimit - limit);
    }
  };
  // ellipsis increment logic
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <Pagination.Ellipsis onClick={handleNextButton} disabled />
    );
  }
  return (
    <Pagination size="sm" style={{ listStyle: 'none', display: 'flex' }}>
      <Pagination.Prev
        onClick={handlePrevButton}
        disabled={currentPage == pages[0] ? true : false}
      />
      {renderPgNumbers()}
    
      {pageIncrementBtn}
      <Pagination.Next
        onClick={handleNextButton}
        disabled={currentPage == pages[pages.length - 1] ? true : false}
      />
    </Pagination>
  );
};

PaginationExtended.propTypes = propTypes;
PaginationExtended.displayName = 'PaginationExtended';
// PaginationExtended.defaultProps = defaultProps;

export default PaginationExtended;

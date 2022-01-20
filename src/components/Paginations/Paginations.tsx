// import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import Pagination, { PaginationProps } from '../Pagination/Pagination';

export interface PaginationsProps extends PaginationProps {
  dataLength: number;
  currentPage: number;
  itemsPerPage?: number;
  limit?: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  // setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  // [other: string]: any;
  directionVariant?: 'icon' | 'icon-text' | 'text';
  size: 'sm' | 'md' | 'lg';
  ellipsisOn: boolean;
}

// const propTypes = {
//   /**
//    * @default 'paginations'
//    * */
//   dataLength: PropTypes.number.isRequired,
//   currentPage: PropTypes.number.isRequired,
//   itemsPerPage: PropTypes.number.isRequired,
//   limit: PropTypes.number,
//   directionVariant: PropTypes.oneOf(['icon', 'icon-text', 'text'] as const),
// setCurrentPage: PropTypes.func.isRequired,
// setItemsPerPage: PropTypes.func.isRequired,
// };

// const defaultProps = {
//   dataLength: 0,
//   currentPage: 1,
//   itemsPerPage: 5,
//   limit: 3,
//   directionVariant: 'icon-text',
//   size: 'sm',
// setCurrentPage: (): void => {},
// setItemsPerPage: ():void  => {}
// };

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
    if (startPage <= 0) startPage = 1;
    if (startPage === 1) endPage = startPage + limit - 1;
    else endPage = currentPage + Math.floor(limit / 2);
    if (endPage > pages.length) endPage = pages.length;

    if (currentPage === pages.length) startPage = pages.length - limit + 1;

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

  // handleclick for ellipsisOn

  const handleNextEllipsisButton = () => {
    setCurrentPage(currentPage + 3);
    if (currentPage + 3 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + limit);
      setMinPageNumberLimit(minPageNumberLimit + limit);
    }
  };
  const handlePrevEllipsisButton = () => {
    setCurrentPage(currentPage - 3);
    if ((currentPage - 3) % minPageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - limit);
      setMinPageNumberLimit(minPageNumberLimit - limit);
    }
  };
  // ellipsis increment logic
  let pageIncrementBtn = null;
  let pageDecrementBtn = null;
  if (ellipsisOn === false) {
    if (pages.length > maxPageNumberLimit) {
      pageIncrementBtn = (
        <Pagination.Ellipsis onClick={handleNextButton} disabled />
      );
    }
  } else {
    pageDecrementBtn = (
      <Pagination.Ellipsis
        onClick={handlePrevEllipsisButton}
        style={
          currentPage - limit + 2 <= pages[0]
            ? { display: 'none' }
            : { display: 'block' }
        }
      />
    );
    pageIncrementBtn = (
      <Pagination.Ellipsis
        onClick={handleNextEllipsisButton}
        style={
          currentPage + limit - 2 >= pages.length
            ? { display: 'none' }
            : { display: 'block' }
        }
      />
    );
  }

  // if (ellipsisOn) {
  //   if (pages.length > maxPageNumberLimit) {
  //     pageIncrementBtn = (
  //       <Pagination.Ellipsis onClick={handleNextEllipsisButton}/>
  //     );
  //     pageDecrementBtn = (
  //       <Pagination.Ellipsis onClick={handlePrevEllipsisButton}/>
  //     );
  //   } else if (pages.length == maxPageNumberLimit){
  //     pageIncrementBtn = (
  //       <Pagination.Ellipsis onClick={handleNextEllipsisButton}/>
  //     );
  //     pageDecrementBtn = (
  //       <Pagination.Ellipsis onClick={handlePrevEllipsisButton} disabled={currentPage == pages[0] ? true : false}/>
  //     );
  //   }
  // }

  let renderDirectionVariantLeft;
  let renderDirectionVariantRight;

  if (directionVariant == 'text') {
    renderDirectionVariantLeft = (
      <Pagination.Prev
        onClick={handlePrevButton}
        disabled={currentPage == pages[0] ? true : false}
      >
        Previous
      </Pagination.Prev>
    );

    renderDirectionVariantRight = (
      <Pagination.Next
        onClick={handleNextButton}
        disabled={currentPage == pages[pages.length - 1] ? true : false}
      >
        Next
      </Pagination.Next>
    );
  } else if (directionVariant == 'icon') {
    renderDirectionVariantLeft = (
      <Pagination.Prev
        onClick={handlePrevButton}
        disabled={currentPage == pages[0] ? true : false}
      >
        <i className="bi bi-chevron-left"></i>
      </Pagination.Prev>
    );

    renderDirectionVariantRight = (
      <Pagination.Next
        onClick={handleNextButton}
        disabled={currentPage == pages[pages.length - 1] ? true : false}
      >
        <i className="bi bi-chevron-right"></i>
      </Pagination.Next>
    );
  } else if (directionVariant == 'icon-text') {
    renderDirectionVariantLeft = (
      <Pagination.Prev
        onClick={handlePrevButton}
        disabled={currentPage == pages[0] ? true : false}
      >
        <i className="bi bi-chevron-left"></i> Previous
      </Pagination.Prev>
    );

    renderDirectionVariantRight = (
      <Pagination.Next
        onClick={handleNextButton}
        disabled={currentPage == pages[pages.length - 1] ? true : false}
      >
        Next <i className="bi bi-chevron-right"></i>
      </Pagination.Next>
    );
  }

  return (
    <Pagination size={size}>
      {renderDirectionVariantLeft}
      {pageDecrementBtn}
      {renderPgNumbers()}
      {pageIncrementBtn}
      {renderDirectionVariantRight}
    </Pagination>
  );
};

// PaginationExtended.propTypes = propTypes;
Paginations.displayName = 'Paginations';
// PaginationExtended.defaultProps = defaultProps;

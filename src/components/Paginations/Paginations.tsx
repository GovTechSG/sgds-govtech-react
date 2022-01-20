// import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import PaginationBase, { PaginationBaseProps } from '../PaginationBase/PaginationBase';

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
        <PaginationBase.Ellipsis onClick={handleNextButton} disabled />
      );
    }
  } else {
    pageDecrementBtn = (
      <PaginationBase.Ellipsis
        onClick={handlePrevEllipsisButton}
        style={
          currentPage - limit + 2 <= pages[0]
            ? { display: 'none' }
            : { display: 'block' }
        }
      />
    );
    pageIncrementBtn = (
      <PaginationBase.Ellipsis
        onClick={handleNextEllipsisButton}
        style={
          currentPage + limit - 2 >= pages.length
            ? { display: 'none' }
            : { display: 'block' }
        }
      />
    );
  }

  let renderDirectionVariantLeft;
  let renderDirectionVariantRight;

  if (directionVariant == 'text') {
    renderDirectionVariantLeft = (
      <PaginationBase.Prev
        onClick={handlePrevButton}
        disabled={currentPage == pages[0] ? true : false}
      >
        Previous
      </PaginationBase.Prev>
    );

    renderDirectionVariantRight = (
      <PaginationBase.Next
        onClick={handleNextButton}
        disabled={currentPage == pages[pages.length - 1] ? true : false}
      >
        Next
      </PaginationBase.Next>
    );
  } else if (directionVariant == 'icon') {
    renderDirectionVariantLeft = (
      <PaginationBase.Prev
        onClick={handlePrevButton}
        disabled={currentPage == pages[0] ? true : false}
      >
        <i className="bi bi-chevron-left"></i>
      </PaginationBase.Prev>
    );

    renderDirectionVariantRight = (
      <PaginationBase.Next
        onClick={handleNextButton}
        disabled={currentPage == pages[pages.length - 1] ? true : false}
      >
        <i className="bi bi-chevron-right"></i>
      </PaginationBase.Next>
    );
  } else if (directionVariant == 'icon-text') {
    renderDirectionVariantLeft = (
      <PaginationBase.Prev
        onClick={handlePrevButton}
        disabled={currentPage == pages[0] ? true : false}
      >
        <i className="bi bi-chevron-left"></i> Previous
      </PaginationBase.Prev>
    );

    renderDirectionVariantRight = (
      <PaginationBase.Next
        onClick={handleNextButton}
        disabled={currentPage == pages[pages.length - 1] ? true : false}
      >
        Next <i className="bi bi-chevron-right"></i>
      </PaginationBase.Next>
    );
  }

  return (
    <PaginationBase size={size}>
      {renderDirectionVariantLeft}
      {pageDecrementBtn}
      {renderPgNumbers()}
      {pageIncrementBtn}
      {renderDirectionVariantRight}
    </PaginationBase>
  );
};

Paginations.displayName = 'Paginations';


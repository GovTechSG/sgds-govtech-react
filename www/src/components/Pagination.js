import { Pagination } from 'clk-bs/Pagination';
import { Table } from '@govtechsg/sgds-govtech-react/Table';
import React, { useState, useEffect } from 'react';

 const PaginationCom = () => {
  const renderData = (data) => {
    return (
      <>
        {data.map((post, index) => {
          return (
            <tr key={index}>
              <td>{post.id}</td>
              <td key={index}>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          );
        })}
      </>
    );
  };
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexofFirstItem, indexOfLastItem);

  // fetch api sample
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setData(json));
    return () => {
      setData([]);
    };
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>{renderData(currentItems)}</tbody>
      </Table>
      <Pagination
        dataLength={data.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default PaginationCom
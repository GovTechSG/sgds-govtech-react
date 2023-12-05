import { Pagination, Table } from '@govtechsg/sgds-react';
import React, { useState, useEffect } from 'react';

const PaginationCom = () => {
    const renderData = (data: any) => {
        return (
            <>
                {data.map((post: any, index: number) => {
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
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Body</th>
                    </tr>
                </thead>
                <tbody>{renderData(currentItems)}</tbody>
            </Table>
            <Pagination
                size="sm"
                ellipsisOn
                ellipsisJump={1}
                dataLength={data.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
};

export default PaginationCom;

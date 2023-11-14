import { Table } from '@govtechsg/sgds-react/Table';

const TableCom = () => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>#</Table.HeaderCell>
        <Table.HeaderCell>First Name</Table.HeaderCell>
        <Table.HeaderCell>Last Name</Table.HeaderCell>
        <Table.HeaderCell>Username</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.DataCell>1</Table.DataCell>
        <Table.DataCell>Mark</Table.DataCell>
        <Table.DataCell>Otto</Table.DataCell>
        <Table.DataCell>@mdo</Table.DataCell>
      </Table.Row>
      <Table.Row>
        <Table.DataCell>2</Table.DataCell>
        <Table.DataCell>Jacob</Table.DataCell>
        <Table.DataCell>Thornton</Table.DataCell>
        <Table.DataCell>@fat</Table.DataCell>
      </Table.Row>
      <Table.Row>
        <Table.DataCell>3</Table.DataCell>
        <Table.DataCell colSpan={2}>Larry the Bird</Table.DataCell>
        <Table.DataCell>@twitter</Table.DataCell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default TableCom;

import { mount } from 'enzyme';
import * as React from 'react';
import Table from '../../components/Table/Table';

describe('Table', () => {
  it('Should be a table', () => {
    const $table = mount(<Table />).find('table.table');
    expect($table).toBeDefined();
    expect($table.exists()).toBe(true);
  });

  it('Should have correct class when striped', () => {
    const $table = mount(<Table striped />).find('table.table-striped');
    expect($table.exists()).toBe(true);
  });

  it('Should have correct class when hover', () => {
    const $table = mount(<Table hover />).find('table.table-hover');
    expect($table.exists()).toBe(true);
  });

  it('Should have correct class when bordered', () => {
    const $table = mount(<Table bordered />).find('table.table-bordered');
    expect($table.exists()).toBe(true);
  });

  it('Should have correct class when borderless', () => {
    const $table = mount(<Table borderless />).find('table.table-borderless');
    expect($table.exists()).toBe(true);
  });

  it('Should have correct class when small', () => {
    const $table =  mount(<Table size="sm" />).find('table.table-sm');
    expect($table.exists()).toBe(true);
  });

  it('Should have correct class when dark', () => {
    const $table = mount(<Table variant="dark" />).find('table.table-dark');
    expect($table.exists()).toBe(true);
  });

  it('Should have responsive wrapper', () => {
    const $table = mount(<Table responsive />).find('div.table-responsive > .table');
    expect($table.exists()).toBe(true);
  });

  it('Should have responsive breakpoints', () => {
    const $table = mount(<Table responsive="sm" />).find(
      'div.table-responsive-sm > .table',
    );
    expect($table.exists()).toBe(true);
  });
});
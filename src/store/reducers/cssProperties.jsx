import {
  UPDATE_TABLE_HEAD_COLOR,
  UPDATE_TABLE_NARROW,
  UPDATE_TABLE_HOVERABLE,
  UPDATE_TABLE_FULLWIDTH,
  UPDATE_THEME_PRIMARY_COLOR
} from "../actions/actionTypes";

import cssPresets from "../../cssPresets/cssPresets";

const initialState = {
  tableHeadColor: cssPresets.tablePresets.tableHeadColorDefault,
  tableIsNarrow: cssPresets.tablePresets.tableIsNarrow,
  themePrimaryColor: cssPresets.themePresets.primaryColor
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Tables
    case UPDATE_TABLE_HEAD_COLOR:
      return {
        ...state,
        tableHeadColor: action.tableHeadColor
      };
    case UPDATE_TABLE_NARROW:
      return {
        ...state,
        tableIsNarrow: action.tableIsNarrow
      };
    case UPDATE_TABLE_HOVERABLE:
      return {
        ...state,
        tableIsHoverable: action.tableIsHoverable
      };
    case UPDATE_TABLE_FULLWIDTH:
      return {
        ...state,
        tableIsFullwidth: action.tableIsFullwidth
      };
    // Global Primary Color
    case UPDATE_THEME_PRIMARY_COLOR:
      return {
        ...state,
        themePrimaryColor: action.themePrimaryColor
      };
    default:
      return state;
  }
};

export default reducer;

import {
  UPDATE_TABLE_HEAD_COLOR,
  UPDATE_TABLE_NARROW,
  UPDATE_TABLE_HOVERABLE,
  UPDATE_TABLE_FULLWIDTH,
  UPDATE_THEME_PRIMARY_COLOR,
  UPDATE_THEME_SECONDARY_COLOR,
  UPDATE_INFO_COLOR,
  UPDATE_SUCCESS_COLOR,
  UPDATE_DANGER_COLOR,
  UPDATE_WARNING_COLOR
} from "../actions/actionTypes";

import cssPresets from "../../cssPresets/cssPresets";

const initialState = {
  tableHeadColor: cssPresets.tablePresets.tableHeadColorDefault,
  tableIsNarrow: cssPresets.tablePresets.tableIsNarrow,
  themePrimaryColor: cssPresets.themePresets.primaryColor,
  themeSecondaryColor: cssPresets.themePresets.secondaryColor,
  infoColor: cssPresets.themePresets.infoColor,
  successColor: cssPresets.themePresets.successColor,
  dangerColor: cssPresets.themePresets.dangerColor,
  warningColor: cssPresets.themePresets.warningColor
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
    // Global Colors
    case UPDATE_THEME_PRIMARY_COLOR:
      return {
        ...state,
        themePrimaryColor: action.themePrimaryColor
      };
    case UPDATE_THEME_SECONDARY_COLOR:
      return {
        ...state,
        themeSecondaryColor: action.themeSecondaryColor
      };
    case UPDATE_INFO_COLOR:
      return {
        ...state,
        infoColor: action.infoColor
      };
    case UPDATE_SUCCESS_COLOR:
      return {
        ...state,
        successColor: action.successColor
      };
    case UPDATE_DANGER_COLOR:
      return {
        ...state,
        dangerColor: action.dangerColor
      };
    case UPDATE_WARNING_COLOR:
      return {
        ...state,
        warningColor: action.warningColor
      };
    default:
      return state;
  }
};

export default reducer;

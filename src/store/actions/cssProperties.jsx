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
} from "./actionTypes";

// Global Colors
export const updateThemePrimaryColor = themePrimaryColor => {
  return {
    type: UPDATE_THEME_PRIMARY_COLOR,
    themePrimaryColor: themePrimaryColor
  };
};

export const updateThemeSecondaryColor = themeSecondaryColor => {
  return {
    type: UPDATE_THEME_SECONDARY_COLOR,
    themeSecondaryColor: themeSecondaryColor
  };
};

export const updateThemeInfoColor = infoColor => {
  return {
    type: UPDATE_INFO_COLOR,
    infoColor: infoColor
  };
};

export const updateThemeSuccessColor = successColor => {
  return {
    type: UPDATE_SUCCESS_COLOR,
    successColor: successColor
  };
};

export const updateThemeDangerColor = dangerColor => {
  return {
    type: UPDATE_DANGER_COLOR,
    dangerColor: dangerColor
  };
};

export const updateThemeWarningColor = warningColor => {
  return {
    type: UPDATE_WARNING_COLOR,
    warningColor: warningColor
  };
};

// Tables
export const updateTableHeadColor = tableHeadColor => {
  return {
    type: UPDATE_TABLE_HEAD_COLOR,
    tableHeadColor: tableHeadColor
  };
};

export const updateTableNarrow = tableIsNarrow => {
  return {
    type: UPDATE_TABLE_NARROW,
    tableIsNarrow: tableIsNarrow
  };
};

export const updateTableHoverable = tableIsHoverable => {
  return {
    type: UPDATE_TABLE_HOVERABLE,
    tableIsHoverable: tableIsHoverable
  };
};

export const updateTableFullwidth = tableIsFullwidth => {
  return {
    type: UPDATE_TABLE_FULLWIDTH,
    tableIsFullwidth: tableIsFullwidth
  };
};

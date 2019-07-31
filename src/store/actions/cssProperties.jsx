import {
  UPDATE_S_BTN_HORIZONTALPADDING,
  UPDATE_S_BTN_VERTICALPADDING,
  UPDATE_M_BTN_HORIZONTALPADDING,
  UPDATE_M_BTN_VERTICALPADDING,
  UPDATE_L_BTN_HORIZONTALPADDING,
  UPDATE_L_BTN_VERTICALPADDING,
  UPDATE_DISPLAY_FONTSIZE,
  UPDATE_H1_FONTSIZE,
  UPDATE_H2_FONTSIZE,
  UPDATE_H3_FONTSIZE,
  UPDATE_H4_FONTSIZE,
  UPDATE_H5_FONTSIZE,
  UPDATE_H6_FONTSIZE,
  UPDATE_SMALL_FONTSIZE,
  UPDATE_TABLE_HEAD_COLOR,
  UPDATE_TABLE_NARROW,
  UPDATE_TABLE_HOVERABLE,
  UPDATE_TABLE_FULLWIDTH,
  UPDATE_THEME_PRIMARY_COLOR
} from "./actionTypes";

// Buttons
export const updateSmallButtonHorizontalPadding = buttonSmallHorizontalPadding => {
  return {
    type: UPDATE_S_BTN_HORIZONTALPADDING,
    buttonSmallHorizontalPadding: buttonSmallHorizontalPadding
  };
};

export const updateSmallButtonVerticalPadding = buttonSmallVerticalPadding => {
  return {
    type: UPDATE_S_BTN_VERTICALPADDING,
    buttonSmallVerticalPadding: buttonSmallVerticalPadding
  };
};

export const updateMediumButtonHorizontalPadding = buttonMediumHorizontalPadding => {
  return {
    type: UPDATE_M_BTN_HORIZONTALPADDING,
    buttonMediumHorizontalPadding: buttonMediumHorizontalPadding
  };
};

export const updateMediumButtonVerticalPadding = buttonMediumVerticalPadding => {
  return {
    type: UPDATE_M_BTN_VERTICALPADDING,
    buttonMediumVerticalPadding: buttonMediumVerticalPadding
  };
};

export const updateLargeButtonHorizontalPadding = buttonLargeHorizontalPadding => {
  return {
    type: UPDATE_L_BTN_HORIZONTALPADDING,
    buttonLargeHorizontalPadding: buttonLargeHorizontalPadding
  };
};

export const updateLargeButtonVerticalPadding = buttonLargeVerticalPadding => {
  return {
    type: UPDATE_L_BTN_VERTICALPADDING,
    buttonLargeVerticalPadding: buttonLargeVerticalPadding
  };
};

// Typography
export const updateDisplayFontsize = displayFontsize => {
  return {
    type: UPDATE_DISPLAY_FONTSIZE,
    displayFontsize: displayFontsize
  };
};

export const updateH1Fontsize = h1Fontsize => {
  return {
    type: UPDATE_H1_FONTSIZE,
    h1Fontsize: h1Fontsize
  };
};

export const updateH2Fontsize = h2Fontsize => {
  return {
    type: UPDATE_H2_FONTSIZE,
    h2Fontsize: h2Fontsize
  };
};

export const updateH3Fontsize = h3Fontsize => {
  return {
    type: UPDATE_H3_FONTSIZE,
    h3Fontsize: h3Fontsize
  };
};

export const updateH4Fontsize = h4Fontsize => {
  return {
    type: UPDATE_H4_FONTSIZE,
    h4Fontsize: h4Fontsize
  };
};

export const updateH5Fontsize = h5Fontsize => {
  return {
    type: UPDATE_H5_FONTSIZE,
    h5Fontsize: h5Fontsize
  };
};

export const updateH6Fontsize = h6Fontsize => {
  return {
    type: UPDATE_H6_FONTSIZE,
    h6Fontsize: h6Fontsize
  };
};

export const updateSmallFontsize = smallFontsize => {
  return {
    type: UPDATE_SMALL_FONTSIZE,
    smallFontsize: smallFontsize
  };
};

// Global Primary Color
export const updateThemePrimaryColor = themePrimaryColor => {
  return {
    type: UPDATE_THEME_PRIMARY_COLOR,
    themePrimaryColor: themePrimaryColor
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

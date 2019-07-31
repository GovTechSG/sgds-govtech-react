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
} from "../actions/actionTypes";

import cssPresets from "../../cssPresets/cssPresets";

const initialState = {
  buttonSmallHorizontalPadding:
    cssPresets.buttonPresets.smPaddingHorizontalDefault,
  buttonSmallVerticalPadding: cssPresets.buttonPresets.smPaddingVerticalDefault,
  buttonMediumHorizontalPadding:
    cssPresets.buttonPresets.mePaddingHorizontalDefault,
  buttonMediumVerticalPadding:
    cssPresets.buttonPresets.mePaddingVerticalDefault,
  buttonLargeHorizontalPadding:
    cssPresets.buttonPresets.laPaddingHorizontalDefault,
  buttonLargeVerticalPadding: cssPresets.buttonPresets.laPaddingVerticalDefault,
  displayFontsize: cssPresets.typographyPresets.displayFontsizeDefault,
  h1Fontsize: cssPresets.typographyPresets.h1FontsizeDefault,
  h2Fontsize: cssPresets.typographyPresets.h2FontsizeDefault,
  h3Fontsize: cssPresets.typographyPresets.h3FontsizeDefault,
  h4Fontsize: cssPresets.typographyPresets.h4FontsizeDefault,
  h5Fontsize: cssPresets.typographyPresets.h5FontsizeDefault,
  h6Fontsize: cssPresets.typographyPresets.h6FontsizeDefault,
  smallFontsize: cssPresets.typographyPresets.smallFontsizeDefault,
  tableHeadColor: cssPresets.tablePresets.tableHeadColorDefault,
  tableIsNarrow: cssPresets.tablePresets.tableIsNarrow,
  themePrimaryColor: cssPresets.themePresets.primaryColor
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Buttons
    case UPDATE_S_BTN_HORIZONTALPADDING:
      return {
        ...state,
        buttonSmallHorizontalPadding: action.buttonSmallHorizontalPadding
      };
    case UPDATE_S_BTN_VERTICALPADDING:
      return {
        ...state,
        buttonSmallVerticalPadding: action.buttonSmallVerticalPadding
      };
    case UPDATE_M_BTN_HORIZONTALPADDING:
      return {
        ...state,
        buttonMediumHorizontalPadding: action.buttonMediumHorizontalPadding
      };
    case UPDATE_M_BTN_VERTICALPADDING:
      return {
        ...state,
        buttonMediumVerticalPadding: action.buttonMediumVerticalPadding
      };
    case UPDATE_L_BTN_HORIZONTALPADDING:
      return {
        ...state,
        buttonLargeHorizontalPadding: action.buttonLargeHorizontalPadding
      };
    case UPDATE_L_BTN_VERTICALPADDING:
      return {
        ...state,
        buttonLargeVerticalPadding: action.buttonLargeVerticalPadding
      };
    // Typography
    case UPDATE_DISPLAY_FONTSIZE:
      return {
        ...state,
        displayFontsize: action.displayFontsize
      };
    case UPDATE_H1_FONTSIZE:
      return {
        ...state,
        h1Fontsize: action.h1Fontsize
      };
    case UPDATE_H2_FONTSIZE:
      return {
        ...state,
        h2Fontsize: action.h2Fontsize
      };
    case UPDATE_H3_FONTSIZE:
      return {
        ...state,
        h3Fontsize: action.h3Fontsize
      };
    case UPDATE_H4_FONTSIZE:
      return {
        ...state,
        h4Fontsize: action.h4Fontsize
      };
    case UPDATE_H5_FONTSIZE:
      return {
        ...state,
        h5Fontsize: action.h5Fontsize
      };
    case UPDATE_H6_FONTSIZE:
      return {
        ...state,
        h6Fontsize: action.h6Fontsize
      };
    case UPDATE_SMALL_FONTSIZE:
      return {
        ...state,
        smallFontsize: action.smallFontsize
      };
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

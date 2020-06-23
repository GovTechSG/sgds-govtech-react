
import React, { Component, useState } from "react";
import styled from "styled-components";
import SideNavItem from "./SideNavItem";

export function SideNavMenuItem(props) {
    return (
      <SideNavItem
        {...props}
        className={`is-sub ${props.className || ""}`}
      ></SideNavItem>
    );
  }
  
  export default SideNavMenuItem;
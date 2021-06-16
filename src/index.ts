import React from "react";

export * from "./components";

declare module "." {
    type AccordionProps = {
        header?: string;
        initiallyOpen?: boolean;
        isActive?: boolean;
        onHeaderClick?: () => void;
    };
    export class Accordion extends React.Component<
        AccordionProps,
        { isActive: boolean }
    > {}

    export class AccordionSet extends React.Component<
        {},
        { activeAccordion: boolean }
    > {}

    type BrandProps = {
        name: string;
        link: string;
        img?: string;
    };
    export const Brand: React.FunctionComponent<BrandProps>;

    type BreadcrumbProps = {
        items: Array<typeof BreadcrumbItem>;
        hasWhiteText?: boolean;
        hasBackgroundDark?: boolean;
        infoColor?: string;
    };
    export class Breadcrumb extends React.Component<
        BreadcrumbProps,
        { hovered: false }
    > {}

    type BreadcrumbItemProps = {
        hasTextWhite: boolean;
        onClick: () => void;
        href: string;
    };
    export const BreadcrumbItem: React.FunctionComponent<BreadcrumbItemProps>;

    type ButtonProps = {
        className: string;
        style: any;
        isPrimary: boolean;
        isLoading: boolean;
        isSecondary: boolean;
        isOutlined: boolean;
        isRounded: boolean;
        buttonSize: string;
        isDisabled: boolean;
        paddingHorizontal: number;
        paddingVertical: number;
        primaryColor: string;
        onClick: () => void;
        colorType: string;
    };
    export class Button extends React.Component<
        ButtonProps,
        { hovered: boolean; focused: boolean }
    > {}

    type CalloutProps = {
        callout: {
            title: string;
            excerpt: Array<any>;
        };
    };
    export class Callout extends React.Component<
        CalloutProps,
        { hovered: false }
    > {}

    type CardProps = {
        card: {
            cardTitle: string;
            cardSubTitle: string;
            button1: {
                link: string;
                text: string;
            };
            button2: {
                link: string;
                text: string;
            };
        };
        infoColor?: string;
    };
    export class Card extends React.Component<CardProps, { hovered: false }> {}

    type ColProps = {
        is?: number;
        isOffset?: number;
        isNested?: boolean | string;
        isNarrow?: boolean | string;
        isMobile?: number;
        isTablet?: number;
        isDesktop?: number;
        isWidescreen?: number;
        isFullHd?: number;
        style: any;
        className?: string;
    };
    export const Col: React.FunctionComponent<ColProps>;

    type ContainerProps = {
        isFluid?: boolean | string;
        style?: any;
        className?: string;
    };
    export const Container: React.FunctionComponent<ContainerProps>;

    type DropdownProps = {
        title?: boolean;
        isHoverable?: boolean;
    };
    export class Dropdown extends React.Component<
        DropdownProps,
        { showDropdown: boolean }
    > {}

    type DropdownItemProps = {
        href?: string;
        onClick?: () => void;
    };
    export const DropdownItem: React.FunctionComponent<DropdownItemProps>;

    type FooterProps = {
        title?: string;
        date?: string;
        links: {
            privacy?: string;
            termsOfUse?: string;
            contact?: string;
            feedback?: string;
        };
        isFluid?: boolean;
    };
    export const Footer: React.FunctionComponent<FooterProps>;

    type HeroProps = {
        color?: string;
        title?: string | any;
        showSearch?: boolean;
    };
    export class Hero extends React.Component<
        HeroProps,
        { selected: null | any; show: boolean; searchQuery: "" }
    > {}

    type MainNavProps = {
        links: Array<{ name: string; img?: string }>;
    };
    export class MainNav extends React.Component<
        MainNavProps,
        {
            selectedTab: number;
            selectedSub: number;
            selectedSubItem: number;
            hoverTabName: null | string;
            hoverTab: null | number;
            hoverSub: null | number;
            hoverSunItem: null | number;
            showSearch: boolean;
            expandMenu: boolean;
        }
    > {}

    type MastheadProps = {
        hashLanguageSelector?: boolean;
        onClick: () => void;
    };
    export class Masthead extends React.Component<
        MastheadProps,
        { selectedLangage: string; isActive: boolean }
    > {}

    type NotificationProps = {
        isToast?: boolean | string;
        title?: string;
        content?: string;
        icon?: string;
        closable?: boolean;
        onClose?: () => void;
        color?: string;
        style?: any;
        className?: string;
    };
    export const Notification: React.FunctionComponent<NotificationProps>;

    type RowProps = {
        isMultiline?: boolean | string;
        isDesktop?: boolean | string;
        isMobile?: boolean | string;
        style?: any;
        className?: string;
    };
    export const Row: React.FunctionComponent<RowProps>;

    type SectionProps = {
        isSmall?: boolean | string;
        isMedium?: boolean | string;
        isLarge?: boolean | string;
        style?: any;
        className?: string;
    };
    export const Section: React.FunctionComponent<SectionProps>;

    type SideNavProps = {
        menuItems?: any;
    };
    export class SideNav extends React.Component<SideNavProps, {}> {}

    type SideNavItemProps = {
        component?: any;
        href?: string;
        onClick?: () => void;
        className?: string;
        isActive?: boolean;
    };
    export const SideNavItem: React.FunctionComponent<SideNavItemProps>;

    type SideNavMenuProps = {
        initiallyOpen?: boolean;
        isActive?: boolean;
        text?: string;
    };
    export const SideNavMenu: React.FunctionComponent<SideNavMenuProps>;

    type SideNavMenuItemProps = {
        className?: string;
    };
    export const SideNavMenuItem: React.FunctionComponent<SideNavMenuItemProps>;

    type TabProps = {
        className?: string;
        tabItems?: any;
    };
    export class Tab extends React.Component<
        TabProps,
        { selectedTab: string }
    > {}
}

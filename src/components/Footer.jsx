import React from "react";
import PropTypes from "prop-types";

// TODO : Improve error handling of inputs into components
function Footer(props) {
    const getDateYear = date => {
        let dateRegex = /^([0-9]|[0-2][0-9]|[3][0-1]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})$/i;
        let matches = dateRegex.exec(date);
        if (matches) {
            return [matches[0], matches[3]];
        } else {
            throw new Error(
                "Invalid date format for Footer: Only dd MMM yyyy date formats accepted"
            );
        }
    };

    // TODO : Refine code in renderBottomButtons() and renderBottomRightTopSectionLinks()
    const renderBottomButtons = () => {
        let links = [];
        links.push(
            <li key="vuln">
                <a
                    href="https://tech.gov.sg/report_vulnerability"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Report Vulnerability
                </a>
            </li>
        );
        if (!props.links) {
            return;
        }
        if (props.links.privacy) {
            links.push(
                <li key="privacy">
                    <a href={props.links.privacy}>Privacy</a>
                </li>
            );
        }
        if (props.links.termsOfUse) {
            links.push(
                <li key="termsOfUse">
                    <a href={props.links.termsOfUse}>Terms of Use</a>
                </li>
            );
        }
        return links;
    };

    const renderBottomRightTopSectionLinks = () => {
        let links = [];
        if (!props.links) {
            return;
        }
        if (props.links.contact) {
            links.push(
                <li key="contact" className="is-inline-block-desktop-only">
                    <p>
                        <a
                            href={props.links.contact}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contact
                        </a>
                    </p>
                </li>
            );
        }
        if (props.links.feedback) {
            links.push(
                <li key="feedback" className="is-inline-block-desktop-only">
                    <p>
                        <a
                            href={props.links.feedback}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Feedback
                        </a>
                    </p>
                </li>
            );
        }
        return links;
    };

    const renderBottomFooterText = () => {
        if (!props.date) {
            return;
        }
        let [date, year] = getDateYear(props.date);
        return (
            <div className="col is-12 has-text-right-desktop has-text-right-tablet has-text-left-mobile">
                <p className="is-hidden-touch">
                    {" "}
                    © {year} Government of Singapore. Last Updated {date}
                </p>
                <p className="is-hidden-desktop">
                    © {year} Government of Singapore
                </p>
                <p className="is-hidden-desktop last-updated">
                    Last Updated {date}
                </p>
            </div>
        );
    };

    return (
        <footer className="sgds-footer">
            <div className="top-section">
                <div
                    className={`sgds-container ${
                        props.isFluid ? "is-fluid" : ""
                    }`}
                >
                    <div className="row">
                        <div className="col">
                            <h5 className="has-text-white">
                                <b>{props.title}</b>
                            </h5>
                        </div>
                    </div>
                    <div className="row">{props.children}</div>
                    <div className="row">
                        <div className="col is-right-desktop-only">
                            <ul>{renderBottomRightTopSectionLinks()}</ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom-section">
                <div
                    className={`sgds-container ${
                        props.isFluid ? "is-fluid" : ""
                    }`}
                >
                    <div className="row is-multiline">
                        <div className="col is-12">
                            <ul>{renderBottomButtons()}</ul>
                        </div>
                        {renderBottomFooterText()}
                    </div>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    links: PropTypes.shape({
        privacy: PropTypes.string,
        termsOfUse: PropTypes.string,
        contact: PropTypes.string,
        feedback: PropTypes.string
    }),
    isFluid: PropTypes.bool
};

export default Footer;

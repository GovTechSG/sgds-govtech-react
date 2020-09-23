import React from "react";
import PropTypes from "prop-types";

function Notification(props) {
  const getSelfClassName = () => {
    return props.className ?? false;
  };

  const getClassName = () => {
    let className = "";
    if (props.isToast) {
      className = "sgds-notification is-toast";
    } else {
      className = "sgds-notification";
    }
    if (props.colour) {
      className = `${className} is-${props.colour}`;
    }
    if (getSelfClassName()) {
      return `${className} ${getSelfClassName()}`;
    } else {
      return className;
    }
  };

  const getIcon = () => {
    return `sgds-icon ${props.icon} is-size-4`;
  };

  return (
    <div className={getClassName()}>
      <div className="sgds-notification-detail">
        {props.icon ? <span className={getIcon()}></span> : null}
        <div className="sgds-notification-content">
          <p className="has-text-weight-bold">{props.title}</p>
          <p>{props.content}</p>
        </div>
        {props.closable ? (
          <span
            className="delete"
            onClick={() => {
              props.onClose();
            }}
          ></span>
        ) : null}
      </div>
    </div>
  );
}

Notification.propTypes = {
  isToast: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  title: PropTypes.string,
  content: PropTypes.string,
  icon: PropTypes.string,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  colour: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Notification;

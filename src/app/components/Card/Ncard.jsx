import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Ncard.css";

export default function Ncard({
  imgSrc = "",
  imgAlt = "",
  cardBodyHeading = "",
  cardBodyDesc = "",
  cardFooter = "",
  cardContainerClass = [],
  cardHeaderClass = [],
  cardImageClass = [],
  cardBodyHeaderClass = [],
  cardBodyDescClass = [],
  cardFooterClass = [],
	cardContainerStyle = {},
	cardHeaderStyle = {},
	cardImageStyle = {},
	cardBodyHeaderStyle = {},
	cardBodyDescStyle = {},
	cardFooterStyle = {},
	cardContainerId = "",
}) {
  return (
    <div id={cardContainerId} style={cardContainerStyle} className={classNames("cardParent", cardContainerClass)}>
      {imgSrc && (
        <div style={cardHeaderStyle} className={classNames("cardHeader", cardHeaderClass)}>
          <img
            className={classNames("cardHeaderImg", cardImageClass)}
            style={cardImageStyle}
						src={imgSrc}
            alt={imgAlt}
          />
        </div>
      )}
      {cardBodyHeading && (
        <div style={cardBodyHeaderStyle} className={classNames("cardBodyHeader", cardBodyHeaderClass)}>{cardBodyHeading}</div>
      )}
      {cardBodyDesc && (
        <div style={cardBodyDescStyle} className={classNames("cardBodyDesc", cardBodyDescClass)}>{cardBodyDesc}</div>
      )}
      {cardFooter && (
        <div style={cardFooterStyle} className={classNames("cardFooter", cardFooterClass)}>{cardFooter}</div>
      )}
    </div>
  );
}

Ncard.propTypes = {
  cardContainerWidth: PropTypes.string,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  cardBodyHeading: PropTypes.string,
  cardBodyDesc: PropTypes.string,
  cardFooter: PropTypes.node || PropTypes.string,
  cardContainerClass: PropTypes.arrayOf(PropTypes.string),
  cardHeaderClass: PropTypes.arrayOf(PropTypes.string),
  cardImageClass: PropTypes.arrayOf(PropTypes.string),
  cardBodyHeaderClass: PropTypes.arrayOf(PropTypes.string),
  cardBodyDescClass: PropTypes.arrayOf(PropTypes.string),
  cardFooterClass: PropTypes.arrayOf(PropTypes.string),
	cardContainerStyle: PropTypes.object,
	cardHeaderStyle: PropTypes.object,
	cardImageStyle: PropTypes.object,
	cardBodyHeaderStyle: PropTypes.object,
	cardBodyDescStyle: PropTypes.object,
	cardFooterStyle: PropTypes.object,
};

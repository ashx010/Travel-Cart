import "./Cards.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function Cards({
  cardContainerWidth = "25rem",
  cardLayout = "horizontal",
  cardHeaderImgSrc = "",
  cardBodyHeading = "Title",
  cardHeaderStyle = {},
  cardBodyStyle = {},
  cardBodyHeight = "",
  cardBodyBody = "",
  cardFooter = "",
  cardColor = "white",
  cardTextColor = "black",
  cardHeaderImg = { width: "100%" },
  cardFooterBtnBackColor = "black",
  cardFooterBtnTextColor = "white",
  cardFooterBtnPadding = "2% 4%",
  cardStyle = {},
  cardFooterBtnHover = "",
  cardTitleStyle = {},
  cardContainerId = "",
  cardContentWidthResponsive = true,
}) {
  const [newCardContentWidth, setCardContentWidth] =
    useState(cardContainerWidth);

  useEffect(() => {
    if (cardContentWidthResponsive) {
      const changeCardContentWidth = () => {
        let newWidth = cardContainerWidth;
        if (window.innerWidth < 800) {
          newWidth = `calc(${cardContainerWidth} * 0.8)`;
        }
        if (window.innerWidth < 500) {
          newWidth = `calc(${cardContainerWidth} * 0.7)`;
        }
        setCardContentWidth(newWidth);
      };

      //change cardContainerWidth Depending on responsiveness initially
      changeCardContentWidth();

      //change cardContainerWidth Depending on responsiveness
      window.addEventListener("resize", changeCardContentWidth);

      return () => window.removeEventListener("resize", changeCardContentWidth);
    }
  }, [cardContainerWidth]);

  //header and body
  //header style if img or not
  const cardHeader = cardHeaderImgSrc !== "";

  const [newCardHeaderStyle, setCardHeaderStyle] = useState(cardHeaderStyle);
  const [newCardBodyStyle, setCardBodyStyle] = useState(cardBodyStyle);

  if (!newCardHeaderStyle.width) {
    let new_header_width = cardHeader
      ? `calc(${newCardContentWidth} * 0.45)`
      : `calc(${newCardContentWidth} * 0.9)`;
    setCardHeaderStyle({ ...cardHeaderStyle, width: new_header_width });
  }

  //body style if header or not
  if (!newCardBodyStyle.width) {
    let new_body_width = cardHeader
      ? `calc(${newCardContentWidth} * 0.55)`
      : `calc(${newCardContentWidth} * 0.9)`;
    setCardBodyStyle({ ...cardBodyStyle, width: new_body_width });
  }

  //layout style ,either horizontal or vertical
  const cardLayoutCondition = cardLayout !== "horizontal";
  if (cardLayoutCondition) {
    cardHeaderStyle.width =
      cardHeaderStyle && `calc(${newCardContentWidth} * 0.9)`;
    cardBodyStyle.width = cardBodyStyle && `calc(${newCardContentWidth} * 0.9)`;
  }

  //footer
  //check footer style ,either text or buttons
  var footerStyle;
  const typeFooter = typeof cardFooter === "string";
  if (typeFooter) {
    footerStyle = {
      display: "inline-flex",
      width: "100%",
      padding: "1%",
      margin: "0 1%",
      fontSize: "0.9em",
    };
  } else {
    footerStyle = {
      padding: cardFooterBtnPadding,
      margin: "1%",
      borderStyle: "none",
      borderRadius: "0.5em",
      backgroundColor: cardFooterBtnBackColor,
      color: cardFooterBtnTextColor,
      fontSize: "0.9em",
      cursor: "pointer",
      transition: "0.3s",
    };
  }

  // use effect for hover buttons styling
  useEffect(() => {
    if (
      cardFooterBtnHover !== "" &&
      cardFooterBtnHover.shadow &&
      cardFooterBtnHover.btnId.length > 0
    ) {
      const hoverBtn = (e) => {
        e.target.style.filter = cardFooterBtnHover.shadow;
      };
      const unhoverBtn = (e) => {
        e.target.style.filter = "none";
      };
      if (!typeFooter) {
        const btns = cardFooterBtnHover.btnId.map((id) =>
          document.getElementById(id)
        );
        btns.forEach((btn) => {
          btn.addEventListener("mouseover", hoverBtn);
          btn.addEventListener("mouseout", unhoverBtn);
        });
        return () => {
          btns.forEach((btn) => {
            btn.removeEventListener("mouseover", hoverBtn);
            btn.removeEventListener("mouseout", unhoverBtn);
          });
        };
      }
    }
  }, [cardFooterBtnHover, typeFooter]);

  return (
    <div
      className="cards-container-c"
      id={cardContainerId}
      style={{
        width: newCardContentWidth,
        backgroundColor: cardColor,
        color: cardTextColor,
        flexDirection: cardLayout !== "horizontal" ? "column" : "row",
        ...cardStyle,
      }}
    >
      {/* Header */}
      {cardHeader && (
        <div className="card-header-c" style={newCardHeaderStyle}>
          <img
            className="cardHeaderImg"
            style={{
              aspectRatio: cardLayoutCondition ? 1.5 : 1,
              ...cardHeaderImg,
            }}
            src={cardHeaderImgSrc}
            alt="Card Header Img"
          />
        </div>
      )}
      {/* Body */}
      <div className="card-body-c" style={newCardBodyStyle}>
        {/* Card Body Heading */}
        <h3 className="card-body-heading-c" style={{ ...cardTitleStyle }}>
          {cardBodyHeading}
        </h3>
        {/* Body Description */}
        {cardBodyBody && (
          <p
            className="card-body-body-c"
            style={{
              height: cardBodyHeight || "auto",
              overflow: cardBodyHeight ? "auto" : "visible",
            }}
          >
            {cardBodyBody}
          </p>
        )}
        {/* Footer with condtion to render text or array of buttons */}
        {cardFooter !== "" && (
          <div className="card-footer-c">
            {typeFooter ? (
              <div className="card-footer-text" style={footerStyle}>
                {cardFooter}
              </div>
            ) : (
              cardFooter.map((btn, index) => (
                <button
                  id={btn.un_id}
                  key={index}
                  className="card-footer-btn"
                  style={footerStyle}
                  onClick={() => {
                    btn.eventBtn();
                  }}
                >
                  {btn.text}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

Cards.propTypes = {
  cardContainerWidth: PropTypes.string,
  cardLayout: PropTypes.oneOf(["horizontal", "vertical"]),
  cardHeaderImgSrc: PropTypes.string,
  cardBodyHeading: PropTypes.string,
  cardBodyHeight: PropTypes.string,
  cardBodyBody: PropTypes.string,
  cardFooter: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        un_id: PropTypes.string.isRequired,
        eventName: PropTypes.string.isRequired,
        eventBtn: PropTypes.func.isRequired,
      })
    ),
  ]),
  cardColor: PropTypes.string,
  cardTextColor: PropTypes.string,
  cardHeaderImg: PropTypes.object,
  cardFooterBtnHover: PropTypes.shape({
    shadow: PropTypes.string,
    btnId: PropTypes.arrayOf(PropTypes.string),
  }),
};

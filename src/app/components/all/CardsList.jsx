import "./CardsList.css";
import PropTypes from "prop-types";
import Cards from "./Cards.jsx";
import { useState, useEffect } from "react";

export default function CardsList({
  cardListHeadingStyle = {
    textAlign: "start",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  cardListHeading = "",
  cards = [],
  cardListContainerStyle = {},
  cardListContainerParentStyle = { backgroundColor: "inherit" },
  defaultResposiveContParent = true,
  cardListContainerId = {}
}) {
  const [cardListContainer, setCardListContainer] = useState(
    cardListContainerParentStyle
  );

  //change cardContainerWidth Depending on responsiveness
  useEffect(() => {
    const updateContainerStyle = () => {
      let newStyle = { ...cardListContainerParentStyle };
      if (window.innerWidth < 800) {
        newStyle.width = defaultResposiveContParent && "width" in cardListContainer ? `calc(${cardListContainer.width} * 0.9)`: "90%";
        newStyle.marginLeft = defaultResposiveContParent && "width" in cardListContainer ? `calc(${cardListContainer.width} * 0.05)`:"5%";
        newStyle.marginRight = defaultResposiveContParent && "width" in cardListContainer ? `calc(${cardListContainer.width} * 0.05)`:"5%";
      } else if (window.innerWidth < 500) {
        newStyle.width = defaultResposiveContParent && "width" in cardListContainer ? `calc(${cardListContainer.width} * 0.96)`: "96%";
        newStyle.marginLeft = defaultResposiveContParent && "width" in cardListContainer ? `calc(${cardListContainer.width} * 0.02)`:"2%";
        newStyle.marginRight = defaultResposiveContParent && "width" in cardListContainer ? `calc(${cardListContainer.width} * 0.02)`:"2%";
      }
      setCardListContainer(newStyle);
    };

    updateContainerStyle();
    window.addEventListener("resize", updateContainerStyle);
    return () => window.removeEventListener("resize", updateContainerStyle);
  }, [cardListContainerParentStyle]);

  return (
    <div className="cards-list-container-parent" id={cardListContainerId} style={cardListContainer}>
      {cardListHeading && (
        <h3 style={cardListHeadingStyle}>{cardListHeading}</h3>
      )}
      <div className="cards-list-container" style={cardListContainerStyle}>
        {cards &&
          cards.map((card, index) => {
            return (
              <div key={index}>
                <Cards {...card} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

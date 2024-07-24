import React from "react";
import style from "./ServicesOffered.module.css";
import Ncard from "../Card/Ncard.jsx";
import { font2 } from "../../fonts.js";
import classNames from "classnames";

export default function ServicesOffered({
  Services = [
    {
      imgSrc: "/services_offered_images/travel_ticket.jpeg",
      name: "Ticket Center",
      before: "/services_offered_images/ticket-preview.png",
      after: "/services_offered_images/ticket-preview2.png",
    },
    {
      imgSrc: "/services_offered_images/travel_pack.jpg",
      name: "Travel Packages",
      before: "/services_offered_images/travel-pack-preview2.png",
      after: "/services_offered_images/travel-pack-preview.png",
    },
    {
      imgSrc: "/services_offered_images/hotel_book.jpeg",
      name: "Hotel Booking",
      before: "/services_offered_images/hotel-preview.png",
      after: "",
    },
    {
      imgSrc: "/services_offered_images/travel_blog.jpeg",
      name: "Travel Blogs",
      before: "",
      after: "/services_offered_images/blog-preview.png",
    },
  ],
}) {
  return (
    <>
      <h2
        className={classNames(style["title-servicesOffered"], font2.className)}
      >
        Services
      </h2>
      <div className={style["services-offered-list"]}>
        {Services.map((service, index) => (
          <Ncard
            key={index}
            imgSrc={service.imgSrc}
            imgAlt={service.name}
            cardBodyHeading={service.name}
            cardContainerClass={style["card-container-servicesOffered"]}
            cardHeaderClass={style["card-header-servicesOffered"]}
            cardBodyHeaderClass={style["card-body-heading-servicesOffered"]}
            applyImgHover1Class={
              service.before ? [style[`hover-card-${index + 1}-first`]] : ""
            }
            applyImgHover1ImgSrc={service.before}
            applyImgHover2Class={
              service.after ? [style[`hover-card-${index + 1}-sec`]] : ""
            }
            applyImgHover2ImgSrc={service.after}
          />
        ))}
      </div>
    </>
  );
}

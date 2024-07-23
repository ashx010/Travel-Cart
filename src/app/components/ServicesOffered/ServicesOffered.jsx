"use client";
import React from "react";
import style from "./ServicesOffered.module.css";
import Ncard from "../Card/Ncard.jsx";
import { useEffect } from "react";
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
    },
    {
      imgSrc: "/services_offered_images/travel_blog.jpeg",
      name: "Travel Blogs",
      after: "/services_offered_images/blog-preview.png",
    },
  ],
}) {
  useEffect(() => {
    Services.map((service, index) => {
      if (service.before) {
        const new_style = document.createElement("style");
        new_style.innerHTML = `
          .${style["card-header-servicesOffered"]}.${
          style[`card-${index + 1}`]
        }:hover::before {
            background: url(${service.before});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 1;
          }
        `;
        document.head.appendChild(new_style);
      }
      if (service.after) {
        const new_style = document.createElement("style");
        new_style.innerHTML = `
          .${style["card-header-servicesOffered"]}.${
          style[`card-${index + 1}`]
        }:hover::after {
            background: url(${service.after});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 1;
          }
        `;
        document.head.appendChild(new_style);
      }
    });
  }, [Services]);

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
            cardHeaderClass={classNames(
              style["card-header-servicesOffered"],
              style[`card-${index + 1}`]
            )}
            cardImageClass={style["card-image-servicesOffered"]}
            cardBodyHeaderClass={style["card-body-heading-servicesOffered"]}
          />
        ))}
      </div>
    </>
  );
}

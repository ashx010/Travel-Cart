import React from "react";
import "./ServicesOffered.css";
import Ncard from "../Card/Ncard.jsx";
import { useState, useEffect } from "react";

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
        const style = document.createElement("style");
        style.innerHTML = `
          .card-header-servicesOffered.card-${index + 1}:hover::before {
            background: url(${service.before});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 1;
          }
        `;
        document.head.appendChild(style);
      }
      if (service.after) {
        const style = document.createElement("style");
        style.innerHTML = `
          .card-header-servicesOffered.card-${index + 1}:hover::after {
            background: url(${service.after});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 1;
          }
        `;
        document.head.appendChild(style);
      }
    });
  }, [Services]);

  return (
    <>
      <h2 className="title-servicesOffered">Services</h2>
      <div className="services-offered-list">
        {Services.map((service, index) => (
          <Ncard
            key={index}
            imgSrc={service.imgSrc}
            imgAlt={service.name}
            cardBodyHeading={service.name}
            cardContainerClass={["card-container-servicesOffered"]}
            cardHeaderClass={[
              "card-header-servicesOffered card-" + (index + 1),
            ]}
            cardImageClass={["card-image-servicesOffered"]}
            cardBodyHeaderClass={["card-body-heading-servicesOffered"]}
          />
        ))}
      </div>
    </>
  );
}

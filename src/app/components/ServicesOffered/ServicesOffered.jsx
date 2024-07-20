"use client";
import React from "react";
import "./ServicesOffered.css";
import { useEffect, useState } from "react";
import Ncard from "../Card/Ncard.jsx";

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

  return (
    <>
      <h2 className="title-servicesOffered">Services</h2>
      <div className="services-offered-list">
        {Services.map((service, index) => (
          <div key={index}>
            <style>
              {service.before &&
                `
                .card-header-servicesOffered.card-${index + 1}:hover::before {
                  background: url(${service.before});
                  background-size: cover;
                  background-position: center;
                  background-repeat: no-repeat;
                }
              `}
              {service.after &&
                `
                .card-header-servicesOffered.card-${index + 1}:hover::after {
                  background: url(${service.after});
                  background-size: cover;
                  background-position: center;
                  background-repeat: no-repeat;
                }
              `}
            </style>
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
          </div>
        ))}
      </div>
    </>
  );
}

import React from "react";

export default function About() {
  return (
    <div className="text-center pt-10 px-10 pb-14">
      <h1 className="text-2xl text-[var(--clr-product)] font-bold mb-2 ">About Us</h1>
      <p className="mb-2 opacity-75">
        Welcome to the Legal Communication System, where we combine expertise
        and passion to achieve excellence. We are a distinguished team striving
        to provide innovative solutions in the field of information technology,
        committed to delivering the highest levels of quality and service to our
        clients.
      </p>
      <p className="opacity-75">
        We work diligently to meet our clients' needs and achieve their complete
        satisfaction. We believe that innovation and continuous development are
        the keys to success in today's world, and we strive to adopt the latest
        technologies and best practices in delivering our services.
      </p>
      <hr className=" border-t-1 border-t-[var(--clr-product)] my-6" />
      <h2 className="text-2xl text-[var(--clr-product)] font-bold mb-2 ">Our Vision</h2>
      <p className="opacity-75">
        To become leaders in the field of web development, relying on excellence
        and quality in everything we deliver.
      </p>
      <hr className=" border-t-1 border-t-[var(--clr-product)] my-6" />

      <h2 className="text-2xl text-[var(--clr-product)] font-bold mb-2 ">Our Mission</h2>
      <p className="opacity-75">
        To provide outstanding and reliable services that meet our clients'
        aspirations, focusing on innovation and continuous development.
      </p>
      <hr className=" border-t-1 border-t-[var(--clr-product)] my-6" />

      <h2 className="text-2xl text-[var(--clr-product)] font-bold mb-2 ">Our Values</h2>
      <ul>
        <li>
          <span className="font-bold text-[var(--clr-product)]">Quality:</span>{" "}
          We offer the best products and services to ensure customer
          satisfaction.
        </li>
        <li>
          <span className="font-bold text-[var(--clr-product)]">
            Innovation:
          </span>{" "}
          We adopt the latest technologies and solutions to add value for our
          clients.
        </li>
        <li>
          <span className="font-bold text-[var(--clr-product)]">
            Integrity:
          </span>{" "}
          We believe in the importance of honesty and transparency in all our
          dealings.
        </li>
        <li>
          <span className="font-bold text-[var(--clr-product)]">Teamwork:</span>{" "}
          We work together as a team to achieve our common goals.
        </li>
      </ul>
      <hr className=" border-t-1 border-t-[var(--clr-product)] my-6" />

      <h2 className="text-2xl text-[var(--clr-product)] font-bold mb-2 ">What We Offer</h2>
      <p className="opacity-75">
        We offer a variety of services designed specifically to meet the needs
        of our clients and help them make decisions to choose the most suitable
        lawyer to solve their problems. We always strive to understand market
        demands and respond to challenges in the best possible ways.
      </p>
    </div>
  );
}

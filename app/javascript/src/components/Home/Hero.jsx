import React from "react";
import { Button } from "neetoui";

export default function Hero() {
  const features = [
    "Uses Rails, React, Tailwind CSS and Webpacker.",
    "Uses Devise, Honeybadger, Sidekiq, PostgreSQL, ActiveAdmin.",
    "Heroku ready. Push to Heroku and it will work.",
    "Uses slim for cleaner syntax over erb and better performance over haml.",
    "Intercepts all outgoing emails in non production environment using gem mail_interceptor.",
    "Uses SemaphoreCI for continuous testing.",
    "Content compression via Rack::Deflater.",
    "Auto-formats Ruby code with rubocop.",
    "Auto-formats JavaScript and CSS code with prettier.",
    "Performs background job processing 'inline' for heroku env. It means heroku can deliver emails.",
    "Letter opener gem for development.",
  ];

  return (
    <div className="flex flex-col items-center max-w-screen-xl px-4 pt-8 mx-auto mt-10">
      <div className="text-center">
        <p className="mt-1 text-4xl font-medium">PMS</p>
        <p className="max-w-xl mx-auto mt-5 text-xl leading-7 text-gray-800">
          Dont reinvent the PMS. Use sane defaults to bootstrap your react-rails
          project!
        </p>
      </div>
      <Features features={features} />
      <div className="flex items-center justify-center mt-6">
        <Button type="primary" to="/login" label="Login" />
      </div>
    </div>
  );
}

const Features = ({ features }) => {
  return (
    <ul className="mt-6 ml-12 leading-relaxed tracking-wide text-gray-600 list-disc">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  );
};

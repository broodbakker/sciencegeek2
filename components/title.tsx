import React from "react";

type Props = {
  color: string;
  title: string;
  subtitle?: string;
};

export const Title: React.FunctionComponent<Props> = ({
  color,
  title,
  subtitle,
}) => (
  <div
    color={color}
    className={`text-center mb-8 my-auto pt-48 z-10 text-${color} `}
  >
    <h1 className="text-3xl tracking-wider m-0 leading-normal md:text-4xl mb-1 ">
      {title}
    </h1>
    <div className={`border-solid border border-color1 text-${color}`}></div>
    <h3 className="m-0 text-2xl leading-normal  mt-1">{subtitle}</h3>
  </div>
);

import React, { Component } from "react";
import useTitle from "../hooks/use-title";

const withTitle = Comp => {
  const Wrapper = ({ title, ...rest }) => {
    useTitle(title);
    return <Comp {...rest} />;
  };

  Wrapper.displayName = `withTitle(${Component.name || Component.displayName})`;

  return Wrapper;
};

export default withTitle;

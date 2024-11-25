import React from "react";
import { Navigate } from "react-router-dom";

class ConditionalRoute extends React.Component {
  render() {
    const { isAuthenticated, Component } = this.props;

    if (!isAuthenticated) {
      return <Component />;
    }

    return <Navigate to="/dashboard" />;
  }
}

export  {ConditionalRoute} ;

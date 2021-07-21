import React, { Component } from "react";
import { Route } from "react-router-dom";

import Photo from "./Photo";
import NotFound from "./NotFound";

class PhotoContainer extends Component {

  componentDidUpdate() {
    if (this.props.searchInput !== this.props.query) {
      this.props.fetchData(this.props.query);
    }
  }

  render() {
    const results = this.props.data;

    let images = results.map((image) => (
      <Photo 
        key={image.id}
        id={image.id}
        server={image.server}
        secret={image.secret}
        title={image.title}
      />
    ));

    if (results.length !== 0) {
      return (
        <div className="photo-container">
          <h2>
            {
              (this.props.resultsTag !== "")
              ? `Results: ${this.props.resultsTag}`
              : `Results: ${this.props.query}`
            }
          </h2>
          <ul>
            { images }
          </ul>
        </div>
      );
    } else {
      return (
        <Route component={NotFound} />
      );
    }
  }
}

export default PhotoContainer;
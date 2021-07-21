/**
 *    PhotoContainer component -
 *    handles state update for query and
 *    passes props to each Photo component
 *    to display
 */

import React, { Component } from "react";
import { Route } from "react-router-dom";

import Photo from "./Photo";
import NotFound from "./NotFound";

export default class PhotoContainer extends Component {

  //  used to toggle back and forward buttons in 
  //  browser...
  componentDidUpdate() {
    if (this.props.searchInput !== this.props.query) {
      this.props.fetchData(this.props.query);
    }
  }

  render() {
    const results = this.props.data;

    //  used map to build an array of images 
    //  to display in the Photo component based
    //  on the data prop passed to PhotoContainer
    let images = results.map((image) => (
      
      //  passing props to Photo component
      <Photo 
        key={image.id}
        id={image.id}
        server={image.server}
        secret={image.secret}
        title={image.title}
      />
    ));

    //  conditional rendering used to distinguish
    //  between data to display or not
    if (results.length !== 0) {
      return (
        <div className="photo-container">
          <h2>

            {/* dynamically displays Results: */}
            {
              (this.props.resultsTag !== "")
              ? `Results: ${this.props.resultsTag}`
              : `Results: ${this.props.query}`
            }
          </h2>
          <ul>
            {/* displays the array of images by
            passing the Photo component mapped data */}
            { images }
          </ul>
        </div>
      );
    } else {
      return (

        //  used route to handle no results by user
        //  query
        <Route component={NotFound} />
      );
    }
  }
}
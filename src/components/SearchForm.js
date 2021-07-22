/**
 *    SearchForm component -
 *    handles state change and syncs url with 
 *    users query
 */

//  used withRouter to handle browser back and 
//  forward buttons
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class SearchForm extends Component {
  
  //  varialbe to store user query from input
  //  so that state in App component will match
  state = {
    searchTerm: ""
  };

  //  allows state to change based on user
  //  query
  handleValueChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    });
  }

  //  updates state up submit and checks if
  //  query is a nav button or not
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(
      this.state.searchTerm,
      false
    )
    //  clears input upon submit
    e.currentTarget.reset();
    //  manages history for toggle back and 
    //  forward browser buttons
    let path = `/search/${this.state.searchTerm}`;
    this.props.history.push(path);
  }

  render() {
    return (
      <form 
        className="search-form" 
        // passes user query
        onSubmit={this.handleSubmit}
      >
        <input 
          type="search" 
          name="search" 
          placeholder="Search..."
          //  passes func to manage state when query 
          //  changes
          onChange={this.handleValueChange}
          required
        />
        <button type="submit" className="search-button">
          <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </form>
    );
  }
}

export default withRouter(SearchForm);
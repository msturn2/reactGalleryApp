/**
 *    App Component -
 *    top level component that controls the app
 */

import React, { Component } from "react";
import axios from "axios";

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import PhotoContainer from "./PhotoContainer";
import SearchForm from "./SearchForm";
import Navigation from "./Navigation";
import PageNotFound from "./PageNotFound";

//  imported and declared API Key as a variable
//  to use in fetchData
import apiKey from "../config";

export default class App extends Component {

  //  state variables
  state = {
    beaches: [],
    waves: [],
    sunrises: [],
    query: [],
    searchInput: "",
    loading: true
  };

  //  calls fetchData for nav buttons when page loads
  componentDidMount() {
    const navs = [
      "beaches",
      "waves",
      "sunrises"
    ];

    //  used map to create a new array of each nav
    //  button
    navs.map( nav => this.fetchData(nav, true));
  }

  //  gets data from flickr.photos.search API using
  //  axios
  fetchData = (query, isNav = false) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&text=${query}&safe_search=1&per_page=24&format=json&nojsoncallback=1`)
      .then( res => {
        
        //  ternary sets state for nav buttons or
        //  query in searchInput
        if (isNav) {
          this.setState({
            [query]: res.data.photos.photo 
          });
        } else {
          this.setState({ 
            searchInput: query,
            query: res.data.photos.photo
          });
        }

        this.setState({ loading: false })
      })
      .catch( err => {
        console.error("An error happened when fetching the data.", err);
      });
    
    this.setState({ loading: true });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          
          {/* passes the fetchData func to the searchForm */}
          {/* kept both SearchForm and Navigation out of Routes
          so that they always are dislayed */}
          <SearchForm onSearch={this.fetchData} />
          <Navigation />

          {/* ternary will display loading message while waiting
          for data to populate the page and then once loaded 
          will populate the appropriate route*/}
          {
            (this.state.loading
            || this.state.beaches.length
            * this.state.waves.length
            * this.state.sunrises.length === 0)
            ? <h1>Loading...</h1>
            : <Switch>

                {/* auto populates "beaches" nav on pageload */}
                <Route 
                  exact path="/" 
                  component={ () => 
                    <Redirect to="/beaches" />
                  } 
                />

                {/* routes for each nav button and pushes props
                for data and resultsTag to dynamically populate
                PhotoContainer with corresponding category */}
                <Route 
                  path="/beaches" 
                  component={ () => 
                    <PhotoContainer 
                      data={this.state.beaches}
                      resultsTag="Beaches"
                    />
                  } 
                />
                <Route 
                  path="/waves" 
                  component={ () => 
                    <PhotoContainer 
                      data={this.state.waves}
                      resultsTag="Waves"
                    />
                  } 
                />
                <Route 
                  path="/sunrises" 
                  component={ () => 
                    <PhotoContainer 
                      data={this.state.sunrises}
                      resultsTag="Sunrises"
                    />
                  } 
                />

                {/* route for search with query as the variable to hold
                the users input and dynamically display PhotoContainer 
                depending on the query */}
                <Route
                  path="/search/:query"
                  children={ ({ match }) => 
                    <PhotoContainer 
                      data={this.state.query}
                      query={match.params.query}
                      resultsTag=""
                      fetchData={this.fetchData}
                      searchInput={this.state.searchInput}
                    />
                  }
                />

                {/* 404 route */}
                <Route component={PageNotFound} />
              </Switch> 
          }
        </div>
      </BrowserRouter>
    );
  }
}
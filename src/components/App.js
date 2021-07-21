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

import apiKey from "../config";

export default class App extends Component {

  state = {
    beaches: [],
    waves: [],
    sunrises: [],
    query: [],
    searchInput: "",
    loading: true
  };

  componentDidMount() {
    const navs = [
      "beaches",
      "waves",
      "sunrises"
    ];

    navs.map( nav => this.fetchData(nav, true));
  }

  fetchData = (query, isNav = false) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&text=${query}&safe_search=1&per_page=24&format=json&nojsoncallback=1`)
      .then( res => {
        if (isNav) {
          this.setState({
            [query]: res.data.photos.photo 
          });
        } else {
          this.setState({ 
            query: res.data.photos.photo, 
            searchInput: query
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
          <SearchForm onSearch={this.fetchData} />
          <Navigation />
          {
            (this.state.beaches.length 
            * this.state.waves.length 
            * this.state.sunrises.length === 0 
            || this.state.loading)
            ? <h1>Loading...</h1>
            : <Switch>
                <Route 
                  exact path="/" 
                  component={ () => 
                    <Redirect to="/beaches" />
                  } 
                />
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
                <Route component={PageNotFound} />
              </Switch> 
          }
        </div>
      </BrowserRouter>
    );
  }
}
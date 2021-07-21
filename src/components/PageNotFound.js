import React from "react";
import vader from "../images/vader.gif";
import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div>
    <ul>
      <li className="not-found">
        <h1>(404): Page Not Found</h1>
        <h3>Oh no...You've gone to the Dark Side! Click Vader to return to the Light.</h3>
        <Link to="/beaches">
          {/* image provided by https://www.reddit.com/r/gifs/comments/262hun/was_trying_to_convince_my_friend_that_the_best/ */}
          <img src={vader} alt={"Vader"} />
        </Link>
      </li>
  </ul>
  </div>
);

export default PageNotFound;
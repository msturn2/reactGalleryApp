/**
 *    Photo component -
 *    displays each image as an li
 */

import React from "react";

//  used destructuring for params
const Photo = ({ server, id, secret, title }) => {
  let url = `https://live.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
  return(
    <li>
      {/* dynamically built and passed url to src */}
      <img src={url} alt={title} />
    </li>
  );
}

export default Photo;
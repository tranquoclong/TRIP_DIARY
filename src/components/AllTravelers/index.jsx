import React, { useEffect, useState } from "react";
// import ReactDOM from 'react-dom';
import ReactPaginate from "react-paginate";
import Traveler from "../Traveller/traveler";
import styles from "./alltravelers.module.css";

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <Traveler
              coverPhoto="https://wrld-wa-ec1-prod.b-cdn.net/accounts/b3ddf1b8e4375675283ffa7170dbdc2b/profile/262862abc6edfb6.00558336.jpg"
              profilePhoto="https://wrld-wa-ec1-prod.b-cdn.net/accounts/b3ddf1b8e4375675283ffa7170dbdc2b/profile/562862a7ad5f452.50968303.jpg?width=640&height=640"
              username={item}
              country="Denmark"
              numOfCountries="4"
              numOfTrips="0"
              numOfPhotos="0"
            />
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className={styles["container"]}>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<div previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

// Add a <div id="container"> to your HTML to see the componend rendered.
export default PaginatedItems;

import React, { useEffect, useState } from "react";
// import ReactDOM from 'react-dom';
import ReactPaginate from "react-paginate";
import styles from "./alltrips.module.css";
import TripItem from "./TripItem";

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <TripItem
              thumbnail="https://wrld-wa-ec1-prod.b-cdn.net/accounts/26b82d3a4f4fca22b1ef4a3e1aaac37a/trips/2022-05-18/348410/ino5yeehlhpf-0aamiat.jpg?width=640&amp;height=640"
              flag="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1280px-Flag_of_Vietnam.svg.png"
              tripName={item}
              profilePhoto="https://wrld-wa-ec1-prod.b-cdn.net/accounts/26b82d3a4f4fca22b1ef4a3e1aaac37a/profile/56284ea742762a1.77627864.jpg?width=640&amp;height=640"
              place="Ha Noi, Viet Nam"
              numOfDates="8"
              numOfPlaces="16"
              numOfPhotos="83"
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
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

// Add a <div id="container"> to your HTML to see the componend rendered.
export default PaginatedItems;

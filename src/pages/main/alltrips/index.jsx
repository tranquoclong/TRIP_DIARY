import React from 'react'
import PaginatedItems from '../../../components/AllTrips'
import Header from "../../../components/search/header";

const AllTrips = () => {
    return (
        <>
            <Header />
            <PaginatedItems itemsPerPage={6} />
        </>
    )
}

export default AllTrips

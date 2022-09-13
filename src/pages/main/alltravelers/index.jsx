import React from 'react'
import PaginatedItems from '../../../components/AllTravelers'
import Header from '../../../components/search/header'

const AllTravelers = () => {
    return (
        <>
            <Header/>
            <PaginatedItems itemsPerPage={6} />
        </>
    )
}

export default AllTravelers
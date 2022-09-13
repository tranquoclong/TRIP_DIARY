import React from 'react'
import { useSelector } from "react-redux";
import { TRIP_MODE } from '../../../../store/constants/trip.const';
import OverviewOwner from './OverviewOwner';
import OverviewViewer from './OverviewViewer';

const Overview = () => {
    const {  mode } = useSelector(state => state.trip);
    return (
        <>
            {mode === TRIP_MODE.VIEW ?
                <OverviewViewer /> : <OverviewOwner />
            }
        </>
    )
}

export default Overview
import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./SearchBoxMap.css";

import { v4 as uuid } from "uuid";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_LOCATION } from "../../store/constants/map.const";
const LocationSearchInput = ({ destination, onChangeDestination }) => {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setAddress(destination?.address || "");
  }, [destination]);

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const newDestination = {
      address: address,
      latitude: results[0].geometry.location.lat(),
      longitude: results[0].geometry.location.lng(),
    };

    onChangeDestination(newDestination);
    setAddress(address);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="location-container">
          <input
            {...getInputProps({
              placeholder: "Enter a place",
              className: "location-search-input",
            })}
            className="location-input"
          />
          <div
            className={`autocomplete-dropdown-container suggestion-dropdown`}
          >
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  key={uuid()}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;

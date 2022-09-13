import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { SET_LOCATION } from "../../store/constants/map.const";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  min-width: 100%;

  font-size: 1rem;
  padding: 5px 15px;
  transition: all 0.2s;

  &:focus,
  &:hover,
  &:active {
    outline: none;
    border: 1px solid #3bc9db;
  }

  border-radius: 4px;
  border: 1px solid #d0d8e6;
  margin-bottom: 10px;
`;
const Autocomplete = styled.div`
  overflow: auto;
  overflow-x: hidden;
  width: 100%;
  transition: all 0.2s;
  height: max-content;
  max-height: 500px;
  position: absolute;
  top: 35px;
  left: 0;
  background: #dee2e6;
  z-index: 1;
`;

const LocationItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 15px;
  gap: 10px;
  padding: 8px 10px;
  transition: all 0.2s;
  cursor: pointer;
  border-bottom: 0.5px solid #868e96;
  text-align: start;
  &:hover {
    background: #d0ebff;
  }
`;
const LocationIcon = styled.div`
  color: #e03131;
  font-family: "Poppins", sans-serif;
`;
const LocationAddress = styled.div``;
const OSM_API_URL = "https://nominatim.openstreetmap.org/search";
const SearchBox = ({ style, destination, onChangeDestination }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [listAddress, setListAddress] = useState([]);
  const handleSearch = async (keyword) => {
    const params = {
      q: keyword,
      format: "json",
      addressdetails: 1,
    };

    const paramsString = new URLSearchParams(params).toString();
    console.log(paramsString);
    const options = {
      method: "GET",
      redirect: "follow",
    };

    const url = `${OSM_API_URL}?${paramsString}`;
    fetch(url, options)
      .then((res) => res.text())
      .then((result) => {
        console.log(JSON.parse(result));
        setListAddress(JSON.parse(result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSelectAddress = (obj) => {
    const address = {
      address: obj.display_name,
      longitude: obj.lon,
      latitude: obj.lat,
    };
    onChangeDestination(address);
    dispatch({
      type: SET_LOCATION,
      payload: address,
    });
    setSearchText("");
    setListAddress([]);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchText);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchText]);
  return (
    <Wrapper style={{ ...style }}>
      <Input
        placeholder="Enter your trip's destination"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Autocomplete isActive={true}>
        {listAddress.map((item) => (
          <LocationItem
            key={item?.osm_id}
            onClick={() => onSelectAddress(item)}
          >
            <LocationIcon>
              <ion-icon name="location"></ion-icon>
            </LocationIcon>
            <LocationAddress>{item?.display_name}</LocationAddress>
          </LocationItem>
        ))}
      </Autocomplete>
    </Wrapper>
  );
};

export default SearchBox;

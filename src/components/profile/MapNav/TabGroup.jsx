import React, { useState } from "react";
import styled from "styled-components";
import CountrySelector from "./CountrySelector";
import MapComponent from '../../map'


const theme = {
    blue: {
        default: "#3f51b5",
        hover: "#283593"
    },
    pink: {
        default: "#e91e63",
        hover: "#ad1457"
    }
};

const Button = styled.button`
    background-color: ${(props) => theme[props.theme].default};
    color: white;
    padding: 5px 15px;
    border-radius: 0;
    outline: 0;
    text-transform: uppercase;
    margin: 10px 0px;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
    background-color: ${(props) => theme[props.theme].hover};
    }
    &:disabled {
    cursor: default;
    opacity: 0.7;
    }
`;

Button.defaultProps = {
    theme: "blue"
};

const Tab = styled.button`
    font-size: 1.125rem;
    width: 25%;
    padding: 10px 30px;
    cursor: pointer;
    opacity: 0.6;
    background: white;
    border: 0;
    outline: 0;
    border-radius: 0;
    border-bottom: 3px solid transparent;
    transition: ease border-bottom 250ms;
    border-radius: 0;
    ${({ active }) =>
        active &&
        `
        border-bottom: 3px solid rgb(42, 213, 197);
        opacity: 1;
    `}
    @media (max-width: 740px) {
        width: 100%;
        justify-content: start;
    }
`;

const Wrapper = styled.section`
    position: relative;
    padding: 0 5.5rem;
    box-sizing: border-box;
    float: none!important;
    margin: 0 auto;
    margin-top: 180px;
    max-width: calc(100% - 3rem);
    z-index: 0;
    overflow: visible;
    @media (max-width: 1024px) {
        margin-top: 400px;
        width: 100%;
        max-width: 100%;
        padding: 0;
    }
    @media (max-width: 740px) {
        text-align: left;
    }
`;

const ButtonIcon = styled.img`
    align-items: center;
    display: inline-flex;
    margin: 0 0 4px 8px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
`;

const Selector = styled.div`
    position: relative;
    z-index: 100;
    max-height: 100px;
`;

const MapBox = styled.div`
    position: relative;
    align-items: center;
    display: block;
    flex-flow: row;
    height: 415px;
    overflow: hidden;
    padding: 0 5.5rem;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 5rem;
    z-index: -100;
    max-width: calc(100% - 3rem);
    @media (max-width: 768px) {
        max-width: 90%;
        padding: 0;    
`;

const MapTitle = styled.div`
    text-align: left;
    font-size: 1.5rem;
    max-width: cal(100%-3rem);
    padding: 0 5.5rem;
    font-weight: 700;
    line-height: 1.5;
    text-decoration: none;
    vertical-align: middle;
    margin: 0 auto;
    margin-top: 5rem;
    margin-right: 1.5rem;
    margin-left: 1.5rem;
    @media (max-width: 768px) { 
        display: none;       
    }
`;

// var types = [{
//     icon: "",
//     title: ""
// }]

// types[0].icon = "https://countryflagsapi.com/png/vietnam";
// types[0].title = "All Trips";

const types = ["Trips", "Photos"];
// const types = ["FirstTab", "SecondTab"]

function TabGroup() {
    const [active, setActive] = useState(types[0]);
    return (
        <>
            <Wrapper>
                {types.map((type) => {
                    if (type === types[2]) {
                        return (
                            <Tab
                                key={type}
                                active={active === type}
                                onClick={() => setActive(type)}
                            >
                                <div> {type} <ButtonIcon src="https://countryflagsapi.com/png/vietnam" /> </div>
                            </Tab>
                        )
                    }
                    else if (type === types[3]) {
                        return (
                            <Tab
                                key={type}
                                active={active === type}
                            >
                                <Selector> <CountrySelector/> </Selector>
                            </Tab>
                        )
                    }
                    else {
                        return (
                            <Tab
                                key={type}
                                active={active === type}
                                onClick={() => setActive(type)}
                            >
                                {type}
                            </Tab>
                        )
                    }
                    
                })}
            </Wrapper>
            <MapTitle>Travel Map</MapTitle>
            <MapBox> <MapComponent/> </MapBox>
        </>
    );
}

export default TabGroup
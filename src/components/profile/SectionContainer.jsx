import React from "react";
import styled from "styled-components";
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  margin-bottom: 100px; 
`
const SectionContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SectionContainer;

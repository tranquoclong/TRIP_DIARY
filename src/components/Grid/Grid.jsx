import styled from "styled-components";

export const Grid = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 576px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

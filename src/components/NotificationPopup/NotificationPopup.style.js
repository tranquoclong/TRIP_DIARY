import styled from "styled-components";

export const PopupContainer = styled.div`
    position: fixed;
    right: 70px;
    bottom: 70px;
    z-index: 9;

    @media (max-width: 992px) {
        right: 40px;
        bottom: 40px;
    }
`

export const PopupIcon = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #66d9e8;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    z-index: 1;

        
    @media (max-width: 992px) {
        width: 50px;
        height: 50px;

        & .icon {
            width: 20px;
            height: 20px;
        }
    }

    &:after {
        content: ""; 
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150%;
        height: 150%;
        background: #99e9f2;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;    
        animation: zoomout 1s ease-out infinite;

    }

    & .icon {
        width: 40px;
        height: 40px;
        animation: wiggle 2s linear infinite;
    }



    @keyframes wiggle {
        0%, 7% {
          transform: rotateZ(0);
        }
        15% {
          transform: rotateZ(-15deg);
        }
        20% {
          transform: rotateZ(10deg);
        }
        25% {
          transform: rotateZ(-10deg);
        }
        30% {
          transform: rotateZ(6deg);
        }
        35% {
          transform: rotateZ(-4deg);
        }
        40%, 100% {
          transform: rotateZ(0);
        }
    }
    @keyframes zoomout {
        0% {
            width: 100%;
            height: 100%;
            opacity: 1;
        }
        100% {
            width: 160%;
            height: 160%;
            opacity: 0;
        }
    }
`

export const PopupContent = styled.div`
    width: 300px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    transition: all 0.4s;
    border-radius: 8px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    overflow: hidden;
    background:#fff;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    &.active {
        height: 500px;
        max-height: 80vh;
        opacity: 1;
    }

    &.inactive {
        height: 0px;
        width: 0px;
        opacity: 0;
    }
`

export const PopupHeader = styled.div`
    text-align: center;
    padding: 10px 0;
    background: #f1f3f5;

    & .trip_name {
        display: inline-block;
        margin-top: 10px;
        font-weight: 600;
        cursor: pointer;
        max-width: 80%;
        overflow: hidden;

        & > span {
            width: 100%;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            
            :hover {
                text-decoration: underline;
            }

        }
    }
`;
export const PopupMap = styled.div`
    height: 200px;
    width: 100%;
    margin-bottom: 10px;
    flex: 1;
`;
export const TripInfo = styled.div`
    text-align: start;
    padding: 20px;

    & > div {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;

        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    & .icon_wrapper {
        border-radius: 50%;
        background: #c5f6fa;
        min-width: 30px;
        min-height: 30px;
        display: flex;
        align-items: center !important;
        justify-content: center;
        
        & .icon{
            max-width: 15px;
            max-height: 15px;
            display: inline-block;
        }
    }
`;
export const TripDestination = styled.div`
    overflow: hidden;
    cursor: pointer;

    & > span {
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;
export const TripDate = styled.div`

`;
export const TripMates = styled.div`
    align-items: start !important;

    & .trip_mates {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
    }

    & .user_tag {
        cursor: pointer;
        border-radius: 50px;
        padding: 2px 10px;
        background: #ffe066;
        transition: all 0.2s;

        :hover {
            text-decoration: underline;
        }
    }
`;
export const TripTransportation = styled.div`

`;



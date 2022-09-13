// import axios from 'axios';
import React from 'react'
import { useRef } from 'react';
import styled from 'styled-components'
import { useIsLogin } from '../../hooks/useIsLogin';
import useOutsideClick from '../../hooks/useOutsideClick';
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { GoMailRead } from 'react-icons/go'
import { Link, useHistory } from 'react-router-dom';
import { AiOutlineWarning } from 'react-icons/ai'

const API_URL = process.env.REACT_APP_API_URL;

const Wrapper = styled.div`
    position: absolute;
    right: 10px;
    top: 65px;

    &:after {
        content: ""; 
        position: absolute;
        right: 45px;
        top: -15px;
        border-left: 10px solid transparent; 
        border-right: 10px solid transparent; 
        border-bottom: 15px solid #ffff; 
        color: rgb(0,0,0); //make it invisible
        display: inline-block; //so width & height can be set
    }
`;

const Popup = styled.div`
    max-width: 400px;
    width: 90vw;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    text-align: start;
    overflow: hidden;
    z-index: 9;
    background: #fff;
    transition: all 0.5s ease;


 

    &.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    &.inactive {
        opacity: 0;
        visibility: hidden;
        transform: translateY(-20px);
    }
`

const NotificationWrapper = styled.div`
    max-height: 500px;
    overflow: hidden;
`

const NotificationList = styled.ul`
    height: 100%;
    overflow-y: auto;

`

const NotificationItem = styled.div`
    width: 100%;
    padding: 15px 20px;
    cursor: pointer;
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    flex-direction: row;
    transition: all 0.2s;

    background: ${({ isRead }) => !isRead ? "#f1f3f5" : "transparent"};

    &:hover {
        background: #f1f3f5;
    }
    & > p {
        line-height: 25px;
    }

    & .inviter,
    & .trip-name{
        font-weight: 600;
        margin-right: 5px !important;
        padding: 5px !important;
        transition: all 0.2s;
        display: inline;
        min-width: max-content !important;
        word-break: break-word;

        &:hover {
            text-decoration: underline;
        }

    }

   


`
const Button = styled.button`
    background: #3bc9db;
    border-radius: 0;
    font-size: 20px;
    font-weight: 600;
    transition: all 0.2s;
    display: ${({ isHidden }) => isHidden ? "none" : "block"};
    border-radius: 0 0 10px 10px;


    &:hover {
        background: #15aabf;
    }
`

const NotificationIcon = styled.div`
    width: 30px;
    height: 30px;
    background: #c5f6fa;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    margin-right: 10px;
`

const NoIem = styled.div`
    text-align: center;
    padding: 20px 0;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;

`

const NotificationBox = ({
    isActive,
    setIsActive,
    notifications,
    setNotifications,
    setPage,
    loading,
    isReachingEnd
}) => {
    const { user } = useIsLogin();
    const ref = useRef();
    const history = useHistory();
    useOutsideClick(ref, setIsActive);

    const onClickNotification = async (item) => {
        await fetch(`${API_URL}/api/notifications/${item.id}/read`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
            .then(res => {
                setNotifications(prev => prev.map(n => n.id === item.id ? ({ ...n, read: true }) : n))
                history.push(`/trip/${item.trip.id}`)
            }).catch(err => {
                console.log(err);
            })
    };

    return (
        <Wrapper>
            <Popup ref={ref} className={isActive ? "active" : "inactive"}>
                <NotificationWrapper style={{ overflow: "hidden" }}>
                    <NotificationList>
                        {
                            notifications ? (
                                notifications.length !== 0 ? (
                                    notifications.map(item => (
                                        <li style={{ width: "100%" }} key={item.id}>
                                            <NotificationItem
                                                isRead={item.read}
                                                key={item.id}
                                                onClick={() => onClickNotification(item)}
                                            >
                                                {
                                                    item.type === "comming_trip" && (
                                                        <>
                                                            <NotificationIcon>
                                                                <MdOutlineNotificationsActive />
                                                            </NotificationIcon>
                                                            <p>You are going on a trip <span className='trip-name'>{item.trip.name}</span>
                                                            </p>
                                                        </>
                                                    )
                                                }
                                                {
                                                    item.type === "invitation" && (

                                                        <>
                                                            <NotificationIcon>
                                                                <GoMailRead />
                                                            </NotificationIcon>
                                                            <p>
                                                                <Link
                                                                    to={`/profile/${item.trip.owner}`}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setIsActive(false);
                                                                    }}
                                                                    className='inviter'>{item.trip.owner}
                                                                </Link>
                                                                invited you to join a trip diary <span className='trip-name'>{item.trip.name}</span>
                                                            </p>
                                                        </>
                                                    )
                                                }

                                            </NotificationItem>

                                        </li>
                                    ))
                                ) : (
                                    <NoIem>
                                        <AiOutlineWarning />
                                        <p> No notification</p>
                                    </NoIem>)
                            ) : (<p>Loading...</p>)
                        }
                    </NotificationList>
                </NotificationWrapper>
                {
                    !isReachingEnd && notifications && notifications.length !== 0 && (
                        <Button
                            onClick={() => setPage(prev => prev + 1)}>
                            {!loading ? "Load More" : "Loading..."}
                        </Button>
                    )
                }
            </Popup >
        </Wrapper>
    )
}

export default NotificationBox
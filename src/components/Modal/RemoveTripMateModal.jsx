import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { removeTripMates } from "../../services/trip/useTrip";
import { CLOSE_MODAL } from "../../store/constants/modal.const";
import { REMOVE_TRIPMATE } from "../../store/constants/trip.const";

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px solid #343a40;
`;

export const ConfirmButton = styled.div`
  margin: 10px;
  color: #fff;
  height: 40px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: #3bc9db;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #1098ad;
  }
`;
export const CloseButton = styled.div`
  margin: 10px;
  color: #fff;
  height: 40px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: #e03131;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s;

  &:hover {
    background-color: #c92a2a;
  }
`;

const Message = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 1.15rem;
`;

const RemoveTripMateModal = ({ tripId, username }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(history);

  const onRemoveTripMate = async () => {
    setIsLoading(true);

    const removeTripMate = async () => {
      if (username && username.length !== 0) {
        try {
          const res = await removeTripMates(tripId, username);
          console.log("🚀", res);
          setIsLoading((prev) => ({
            ...prev,
            isRemoving: false,
          }));
          dispatch({ type: REMOVE_TRIPMATE, payload: username });
          NotificationManager.success("Remove your tripmate successfully!");
          closeModal();
          setIsLoading(false);
        } catch (err) {
          NotificationManager.error(
            err.response?.data?.message || "Fail to remove your tripmate"
          );
          closeModal();
          setIsLoading(false);
        }
      }
    };
    removeTripMate();
  };

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  return (
    <div>
      <Message>Are you sure to remove this tripmate?</Message>
      <ModalFooter>
        <ConfirmButton onClick={onRemoveTripMate} disabled={isLoading}>
          {isLoading ? "Removing..." : "Submit"}
        </ConfirmButton>
        <CloseButton onClick={closeModal}> Cancel </CloseButton>
      </ModalFooter>
    </div>
  );
};

export default RemoveTripMateModal;

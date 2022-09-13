import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { deleteTrip } from "../../services/trip/useTrip";
import { CLOSE_MODAL } from "../../store/constants/modal.const";

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

const DeleteTripModal = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(history);

  const onDeleteTrip = async () => {
    setIsLoading(true);
    const response = await deleteTrip(id);
    console.log(response);
    closeModal();
    setIsLoading(false);
    history.push("/");
  };

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  return (
    <div>
      <Message>Are you sure to delete this trip?</Message>
      <ModalFooter>
        <ConfirmButton onClick={onDeleteTrip} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Submit"}
        </ConfirmButton>
        <CloseButton onClick={closeModal}> Cancel </CloseButton>
      </ModalFooter>
    </div>
  );
};

export default DeleteTripModal;

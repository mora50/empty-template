import styled from "styled-components";

export const PortionButton = styled.button`
  padding: 10px 15px;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 7px;
  background: #fff;
  box-shadow: 2px 0px 10px 2px rgba(0, 0, 0, 0.02);
  transition: 0.4s;
  text-align: left;
  font-size: 14px;
  position: relative;
  display: flex;
  align-items: center;

  svg {
    width: 30px;
    position: absolute;
    right: 0.5rem;
    font-weight: bold;
    color: var(--primary);
  }
`;

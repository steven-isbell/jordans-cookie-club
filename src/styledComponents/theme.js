import styled from 'styled-components';

export const Button = styled.button`
  font-size: 16px;
  font-family: georgia, serif;
  text-align: center;
  color: #fff;
  outline: none;
  padding: 12px 60px;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: rgb(255, 178, 56);
  border-radius: 6px;
  letter-spacing: 1.5px;
  &:focus,
  &:hover {
    filter: hue-rotate(45deg);
  }
`;

export const Input = styled.input``;

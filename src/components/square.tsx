import React, { FC, MouseEvent } from 'react';
import styled from 'styled-components';

export type mark = 'O' | 'X' | null;

type Props = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  value: mark;
  name: string;
  accent: boolean;
  testId?: number;
};

type SquareBtnProps = {
  accent: boolean;
};

const SquareBtn = styled.button<SquareBtnProps>`
  background-color: ${({ accent }) => (accent ? 'red' : '#fff')};
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
`;

const Square: FC<Props> = (props) => {
  const { onClick, name, value, accent = true, testId } = props;

  return (
    <SquareBtn accent={accent} name={name} data-testid={`btn-${testId}`} onClick={onClick}>
      {value}
    </SquareBtn>
  );
};

export default Square;

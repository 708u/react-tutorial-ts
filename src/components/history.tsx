import React, { FC } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Board } from 'components/board';
import { mark } from 'components/square';
import styled from 'styled-components';

type Position = {
  col: number;
  row: number;
};

type Result = {
  winner: mark;
  positions?: [number, number, number];
};

type Squares = {
  squares: Board;
  result: Result;
  position?: Position;
};

type History = Squares[];

type Props = {
  history: History;
  current: number;
  onClick: (move: number) => () => void;
  isAscending?: boolean;
};

const HistoryList = styled.ol`
  padding-left: 30px;
`;

const History: FC<Props> = (props) => {
  const { history, current, onClick, isAscending = true } = props;

  type MapTo<T, U> = (func: (arr: T, i: number) => U) => U[];

  const mapWithOrder: MapTo<Squares, JSX.Element> = (func) => {
    return isAscending ? history.map(func) : history.map(func).reverse();
  };

  return (
    <HistoryList>
      {mapWithOrder((sq, move) => (
        <li key={`history-list-${uuidV4()}`}>
          <button type="button" onClick={onClick(move)} className={current === move ? 'btn-bold' : ''}>
            {move ? `Go to move #${move}. [row: ${sq.position?.row}, col: ${sq.position?.col}]` : 'Go to game start'}
          </button>
        </li>
      ))}
    </HistoryList>
  );
};

export type { Position, Result, History, Squares };

export default History;

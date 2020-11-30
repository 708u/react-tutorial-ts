import React, { FC } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Board } from 'components/board';
import styled from 'styled-components';

type Position = {
  col: number;
  row: number;
};
type Squares = {
  squares: Board;
  position?: Position;
};
type History = Squares[];

type Props = {
  history: History;
  current: number;
  onClick: (move: number) => () => void;
  isAscending?: boolean;
};

const History: FC<Props> = (props) => {
  const HistoryList = styled.ol`
    padding-left: 30px;
  `;

  const { history, current, onClick, isAscending = true } = props;

  const mapWithOrder = (func: (sq: Squares, move: number) => JSX.Element) => {
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

export type { Position, History, Squares };

export default History;

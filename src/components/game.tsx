import React, { useState, MouseEvent, FC } from 'react';
import Board, { Board as BoardType, LocationMap, LocationIndex } from 'components/board';
import History, { History as HistoryType, Result } from 'components/history';
import HistoryOrder from 'components/historyOrder';
import styled from 'styled-components';
import 'index.css';

const View = styled.div`
  flex-direction: row;
  display: flex;
  font: 14px 'Century Gothic', Futura, sans-serif;
  margin: 20px;
`;

const GameInfo = styled.div`
  margin-left: 20px;
`;

const Game: FC = () => {
  const [history, setHistory] = useState<HistoryType>([
    {
      squares: Array(9).fill(null),
      result: { winner: null },
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isAscending, toggleAscending] = useState(true);
  const [xIsNext, setXIsNext] = useState(true);

  const gameIsOverPatterns: [number, number, number][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // FIXME: refactoring arg name;
  const calcBoardStatus = (bd: BoardType): Result => {
    const gameIsOverPosition = gameIsOverPatterns.find((v, idx) => {
      const [a, b, c] = gameIsOverPatterns[idx];
      return bd[a] && bd[a] === bd[b] && bd[a] === bd[c];
    });

    return gameIsOverPosition
      ? {
          winner: bd[gameIsOverPosition[0]],
          positions: gameIsOverPosition,
        }
      : { winner: null };
  };

  const handleClick = (i: number) => (e: MouseEvent<HTMLButtonElement>) => {
    // すべての盤面履歴取得
    // history = [{hist1}, {hist2}]
    const newHistory = history.slice(0, stepNumber + 1);
    // 盤面全体を保持するobject取得
    // { squares: Array(9)}
    const newSquare = newHistory[newHistory.length - 1];
    // 現在の盤面を取得しつつ、インスタンスを新規に作成
    // ['', 'X', ...];
    const copiedSquares = newSquare.squares.slice();

    // クリックする前の盤面の時点で勝利した人がいれば処理しない
    if (calcBoardStatus(copiedSquares).winner || copiedSquares[i]) {
      return;
    }

    // 盤面に次のマークをセット
    copiedSquares[i] = xIsNext ? 'X' : 'O';

    // 次の盤面のstatusを取得
    const result = calcBoardStatus(copiedSquares);
    const position = e.currentTarget.name as LocationIndex;

    setHistory(
      newHistory.concat([
        {
          squares: copiedSquares,
          position: LocationMap.get(position),
          result,
        },
      ])
    );
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number) => () => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const currentBoard = history[stepNumber];

  const getBoardStatus = () => {
    const r = calcBoardStatus(currentBoard.squares);
    return r.winner ? `Winner: ${r.winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
  };

  return (
    <View>
      <Board result={currentBoard.result} board={currentBoard.squares} onClick={handleClick} />
      <GameInfo>
        <GameInfo>{getBoardStatus()}</GameInfo>
        <HistoryOrder isAscending={isAscending} onClick={() => toggleAscending(!isAscending)} />
        <History history={history} current={stepNumber} isAscending={isAscending} onClick={jumpTo} />
      </GameInfo>
    </View>
  );
};

export default Game;

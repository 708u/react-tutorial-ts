import renderer from 'react-test-renderer';
import React, { MouseEvent } from 'react';
import Board, { Board as BoardType } from 'components/board';
import { Result } from 'components/history';

describe('testing board components', () => {
  it('should be same as a previous snapshot.', () => {
    const board: BoardType = ['O', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];
    const result: Result = { winner: null };

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const onClick = (i: number) => (e: MouseEvent<HTMLButtonElement>) => true;
    const component = renderer.create(<Board board={board} result={result} onClick={onClick} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

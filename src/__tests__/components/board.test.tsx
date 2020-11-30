import renderer from 'react-test-renderer';
import React, { MouseEvent } from 'react';
import Board, { Board as BoardType } from 'components/board';

describe('testing board components', () => {
  it('should be same as a previous snapshot.', () => {
    const board: BoardType = ['O', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const onClick = (i: number) => (e: MouseEvent<HTMLButtonElement>) => true;
    const component = renderer.create(<Board board={board} onClick={onClick} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

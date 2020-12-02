import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Game from 'components/game';

afterEach(cleanup);

describe('game component test', () => {
  it('should be same as a previous snapshot.', () => {
    const component = renderer.create(<Game />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should progress normal scenario', () => {
    render(<Game />);

    const playerXMsg = 'Next player: X';
    const playerOMsg = 'Next player: O';
    // first requirements.
    screen.getByText('Go to game start');
    screen.getByText(playerXMsg);
    expect(screen.queryByText(playerOMsg)).toBeNull();

    // progress first turn.
    user.click(screen.getByTestId('btn-0'));
    // reverse next player
    screen.getByText(playerOMsg);
    expect(screen.queryByText(playerXMsg)).toBeNull();
    // Go to this turn button was appeared.
    const expectedFirstHistoryStr = 'Go to move #1. [row: 1, col: 1]';
    screen.getByText(expectedFirstHistoryStr);

    // progress second turn.
    user.click(screen.getByTestId('btn-1'));
    // reverse next player
    screen.getByText(playerXMsg);
    expect(screen.queryByText(playerOMsg)).toBeNull();
    // Go to this turn button was appeared.
    const expectedSecondHistoryStr = 'Go to move #2. [row: 1, col: 2]';
    screen.getByText(expectedSecondHistoryStr);

    // time travel to first turn
    user.click(screen.getByText(expectedFirstHistoryStr));
    screen.getByText(playerOMsg);
    expect(screen.queryByText(playerXMsg)).toBeNull();
    // can go to current turn
    screen.getByText(expectedSecondHistoryStr);
    // button 1 value is gone.
    expect(screen.getByTestId('btn-1')).toBeEmptyDOMElement();
  });

  it('should win the X player', () => {
    render(<Game />);
    const clicks = ['btn-0', 'btn-7', 'btn-1', 'btn-8', 'btn-2'];
    // progress first turn.
    clicks.forEach((click) => user.click(screen.getByTestId(click)));

    // Winner comment was appeared.
    expect(screen.getByText('Winner: X')).toBeTruthy();
    // Winner's Square is highlighted.
    const accentColor = 'skyblue';
    expect(screen.getByTestId('btn-0')).toHaveStyleRule('background-color', accentColor);
    expect(screen.getByTestId('btn-1')).toHaveStyleRule('background-color', accentColor);
    expect(screen.getByTestId('btn-2')).toHaveStyleRule('background-color', accentColor);

    // Loser's Square is not highlighted.
    const normalColor = '#fff';
    expect(screen.getByTestId('btn-7')).toHaveStyleRule('background-color', normalColor);
    expect(screen.getByTestId('btn-8')).toHaveStyleRule('background-color', normalColor);
  });

  it('should display a draw message if both of players did not win.', () => {
    render(<Game />);
    const clicks = ['btn-0', 'btn-2', 'btn-1', 'btn-3', 'btn-5', 'btn-4', 'btn-6', 'btn-7', 'btn-8'];

    clicks.forEach((click) => user.click(screen.getByTestId(click)));
    expect(screen.getByText('Draw')).toBeTruthy();
  });
});

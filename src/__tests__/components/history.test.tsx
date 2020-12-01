import React from 'react';
import renderer from 'react-test-renderer';
import History, { History as HistoryType } from 'components/history';

describe('history component test', () => {
  it('should be same as a previous snapshot.', () => {
    const history: HistoryType = [
      {
        squares: [null, null, null, null, null, null, null, null, null],
        result: { winner: null },
      },
      {
        squares: ['O', null, null, null, null, null, null, null, null],
        position: { row: 1, col: 1 },
        result: { winner: null },
      },
      {
        squares: ['O', 'X', null, null, null, null, null, null, null],
        position: { row: 1, col: 2 },
        result: { winner: null },
      },
    ];
    const component = renderer.create(<History isAscending history={history} current={0} onClick={() => () => true} />);
    expect(component.toJSON()).toMatchSnapshot();

    // determine if current has applied.
    const secondComponent = renderer.create(
      <History isAscending history={history} current={2} onClick={() => () => true} />
    );

    expect(secondComponent.toJSON()).toMatchSnapshot();

    // determine if Desc order is enabled.
    const thirdComponent = renderer.create(
      <History isAscending={false} history={history} current={2} onClick={() => () => true} />
    );

    expect(thirdComponent.toJSON()).toMatchSnapshot();
  });
});

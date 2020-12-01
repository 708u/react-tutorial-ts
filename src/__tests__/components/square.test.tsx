import React from 'react';
import renderer from 'react-test-renderer';
import Square from 'components/square';

describe('square test', () => {
  it('should render as expected components', () => {
    const component = renderer.create(<Square name="btn" value="X" accent={false} onClick={() => true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

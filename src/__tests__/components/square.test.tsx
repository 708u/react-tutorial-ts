import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Square, { SquareBtn } from 'components/square';

describe('square test', () => {
  it('should render as expected components', () => {
    const component = renderer.create(<Square value="X" onClick={() => true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has button', () => {
    const buttonWrapper = shallow(<Square value="X" onClick={() => true} />).find(SquareBtn);
    expect(buttonWrapper).toHaveLength(1);
  });
});

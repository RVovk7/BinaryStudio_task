import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render header correctly', () => {
    const wrapper = shallow(<Header getRecipe={() => {}} />);
    expect(wrapper).toMatchSnapshot();
});

test('should call getRecipe on button click', () => {
    const getRecipe = jest.fn();
    const wrapper = shallow(<Header getRecipe={getRecipe} />);
    wrapper.find('IconButton').simulate('click');
    expect(getRecipe).toHaveBeenCalled();
});
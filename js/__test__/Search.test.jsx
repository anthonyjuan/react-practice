import React from 'react';
import { shallow } from 'enzyme';
import preload from '../../data.json'
import ShowCard from '../ShowCard';
import Search from '../Search';

test('Search render correctly', () => {
    const component = shallow(<Search />)
    expect(component).toMatchSnapshot();
})


test('Search should render correct amount of shows', () => {
    const component = shallow(<Search />)
    expect(component.find(ShowCard).length).toEqual(preload.shows.length)
})

test('search should render correct amount of shows based on search term', () => {
    const component = shallow(<Search />)
    const searchWord = 'black';
    component.find('input').simulate('change', {target: {value: searchWord}})

    const showCount = preload
                        .shows
                        .filter( data => (
                                `${data.title} ${data.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0
                            )
                        )
    
    expect(component.find(ShowCard).length).toEqual(showCount.length)
});
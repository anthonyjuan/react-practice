// @flow

import { setSearchTerm, addApiData, getApiData } from '../actionCreators';
import moxios from 'moxios';

const strangerThings = {
    title: 'Stranger Things',
    year: '2016–',
    description: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying forces in order to get him back.',
    poster: 'st.jpg',
    imdbID: 'tt4574334',
    trailer: '9Egf5U8xLo8',
    rating: '9.2'
};
test('setSearchTerm', () => {
    expect(setSearchTerm('Atlanta')).toMatchSnapshot();
});

test('addApiData', () => {
    expect(addApiData(strangerThings)).toMatchSnapshot();
});

test('getApiData', (done: Function) => {
    const dispatchMock = jest.fn();
    moxios.withMock(() => {
        getApiData(strangerThings.imdbID)(dispatchMock);
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: strangerThings
                })
                .then(() => {
                    expect(request.url).toEqual(`http://localhost:3000/${strangerThings.imdbID}`);
                    expect(dispatchMock).toBeCalledWith(addApiData(strangerThings));
                    done();
                });
        });
    });
});

import React from 'react';
import { mount, render, shallow } from 'enzyme';
import * as hooks from '../../src/services/productsApi';
import Products from '../../src/components/pages/Products';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import ListViewContextProvider from '../../src/contexts/ListViewContext';
import ListView from '../../src/components/common/ListView';

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);
const store = mockStore({}); // define your initial state as needed

describe('Products', () => {
    it('should render products component', async () => {
        jest.spyOn(hooks, 'useGetProductsQuery').mockReturnValue({
            data: [],
            isError: false,
            isLoading: false,
        } as any);
        const wrapper = shallow(
            <Provider store={store}>
                <Products />
            </Provider>
        );
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    it('should render `Loading...`', async () => {
        jest.spyOn(hooks, 'useGetProductsQuery').mockReturnValue({
            data: null,
            isError: false,
            isLoading: true,
        } as any);
        const wrapper = mount(
            <Provider store={store}>
                <Products />
            </Provider>
        );

        expect(wrapper.getElements()).toMatchSnapshot();
        expect(wrapper.html()).toEqual('<h2>Loading ...</h2>');
    });
    it('should render `Something went wrong ...`', async () => {
        jest.spyOn(hooks, 'useGetProductsQuery').mockReturnValue({
            data: null,
            error: true,
            isLoading: false,
        } as any);
        const wrapper = mount(
            <Provider store={store}>
                <Products />
            </Provider>
        );

        expect(wrapper.getElements()).toMatchSnapshot();
        expect(wrapper.html()).toEqual('<h2>Something went wrong ...</h2>');
    });
    it('should render ListView', async () => {
        jest.spyOn(hooks, 'useGetProductsQuery').mockReturnValue({
            data: [],
            error: false,
            isLoading: false,
            isSuccess: true,
        } as any);
        const wrapper = mount(
            <Provider store={store}>
                <Products />
            </Provider>
        );

        expect(wrapper.getElements()).toMatchSnapshot();
        expect(wrapper.find(ListViewContextProvider)).toBeTruthy();
        expect(wrapper.find('h2').text()).toBeDefined();
        expect(wrapper.find(ListView)).toBeTruthy();
    });
});

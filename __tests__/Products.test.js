import Products from "../components/Products";
import {fakeItem} from "../lib/testUtils";
import {MockedProvider} from "@apollo/react-testing";
import React from 'react';
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';

const product = fakeItem;

 describe('<Products/>' , () => {
    it('renders out the price and title' , () => {
        const {container} = render(
        <MockedProvider>
            <Products product = {product} />
        </MockedProvider>
        );
         screen.debug();
    });
}); 
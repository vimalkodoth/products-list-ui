import ListViewContextProvider from '../../contexts/ListViewContext';
/** @jsxImportSource @emotion/react */

import { useGetProductsQuery } from '../../services/productsApi';
import LabelsView from '../common/LabelsView';
import ListView from '../common/ListView';
import { ListLabelsCSS } from '../common/ListView.styles';
import { ProductsWrapperCSS } from './Products.styles';

const Products = (): JSX.Element => {
    const {
        data: products,
        error,
        isLoading,
        isSuccess,
    } = useGetProductsQuery();

    return (
        <>
            {isLoading && <h2>Loading ...</h2>}
            {error && <h2>Something went wrong ...</h2>}
            {isSuccess && (
                <ListViewContextProvider>
                    <div css={ProductsWrapperCSS}>
                        <h2>Category List</h2>
                        <ListView products={products} />
                        <LabelsView>
                            {(labelsViewList) => (
                                <div css={ListLabelsCSS}>
                                    {
                                        <ul>
                                            {labelsViewList.current.map(
                                                (label, i) => (
                                                    <li key={`${label}_${i}`}>
                                                        {label}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    }
                                </div>
                            )}
                        </LabelsView>
                    </div>
                </ListViewContextProvider>
            )}
        </>
    );
};

export default Products;

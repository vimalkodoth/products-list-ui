/** @jsxImportSource @emotion/react */
import { groupWith, eqBy, prop, filter, propEq } from 'ramda';
import { PRODUCT_LEVELS } from '../../constants';
import useListView from '../../hooks/useListView';
import CheckboxItem from './CheckboxItem';
import { ListLabelsCSS, ListViewCSS, ListWrapperCSS } from './ListView.styles';

const ListView = ({ products = [], level = 0, path = '' }): JSX.Element => {
    const { onCheckboxClicked, onLabelClicked, listViewMap, setListViewMap } =
        useListView();
    const filterLevel = PRODUCT_LEVELS[level++];
    const segmentByType = groupWith(eqBy(prop(filterLevel)))(products);

    if (!filterLevel) return <></>;

    return (
        <>
            <div css={ListWrapperCSS}>
                {segmentByType.map((segment) => {
                    const productKey = segment[0][filterLevel];
                    const route = !path
                        ? `${productKey}`
                        : `${path}-${productKey}`;
                    const filteredProducts = filter(
                        propEq(filterLevel, productKey)
                    )(products);
                    setListViewMap(route);
                    return (
                        <div key={route} css={ListViewCSS}>
                            <CheckboxItem
                                onChange={(isChecked, isOpened) =>
                                    onCheckboxClicked(
                                        isChecked,
                                        isOpened,
                                        route,
                                        filterLevel
                                    )
                                }
                                onLabelClicked={(isChecked, isOpened) =>
                                    onLabelClicked(
                                        isChecked,
                                        isOpened,
                                        route,
                                        filterLevel
                                    )
                                }
                                label={productKey}
                                isChecked={
                                    listViewMap.current[route]['checked']
                                }
                                isOpened={listViewMap.current[route]['opened']}
                            />
                            <ul>
                                {
                                    <ListView
                                        products={filteredProducts}
                                        level={level}
                                        path={route}
                                    />
                                }
                            </ul>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

ListView.defaultProps = {
    products: [],
    level: 0,
    path: '',
};

export default ListView;

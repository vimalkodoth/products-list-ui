import { useContext } from 'react';
import { ListViewContext } from '../contexts/ListViewContext';

export default function useListView() {
    const {
        state,
        onCheckboxClicked,
        onLabelClicked,
        listViewMap,
        labelsViewList,
        setListViewMap,
    } = useContext(ListViewContext);
    const { trace } = state || {};
    return {
        trace,
        onCheckboxClicked,
        onLabelClicked,
        listViewMap,
        labelsViewList,
        setListViewMap,
    };
}

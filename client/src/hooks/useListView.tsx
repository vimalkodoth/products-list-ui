import { useContext } from 'react';
import { ListViewContext } from '../contexts/ListViewContext';

export default function useListView() {
    const { state, onCheckboxClicked } = useContext(ListViewContext);
    const isUnChecked = (route, state) => {
        const { trace = '', checked } = state || {};
        if (!trace || !route) return false;
        if (trace.split('-').length >= route.split('-').length) return false;
        return route.startsWith(trace);
    };

    return {
        isUnChecked,
        state,
        onCheckboxClicked,
    };
}

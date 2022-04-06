import React, { useRef, useState } from 'react';
import { isAllKeysChecked, isChild, isSomeKeysUnChecked } from '../utils/utils';

const ListViewContext = React.createContext({});

export default function ListViewContextProvider({ children }) {
    const [state, setState] = useState(null);
    const listViewMap = useRef({});
    const onCheckboxClicked = (isChecked, isOpened, trace, filter) => {
        listViewMap.current[trace]['checked'] =
            !listViewMap.current[trace]['checked'];
        setState({ trace, filter, isChecked, isOpened });
        listViewMap.current = toggleAllChildCheckboxes(
            listViewMap.current,
            trace,
            isChecked,
            'checked'
        );
        listViewMap.current = toggleAllParentCheckboxes(
            listViewMap.current,
            trace,
            isChecked
        );
    };

    const toggleAllParentCheckboxes = (listViewMap, trace, isChecked) => {
        const parent = trace.slice(
            0,
            trace.lastIndexOf('-') > 0 ? trace.lastIndexOf('-') : 0
        );
        if (!parent) {
            return listViewMap;
        }
        const keys = Object.keys(listViewMap);
        const keysStartsWithParent = keys.filter((key) =>
            key.startsWith(`${parent}-`)
        );
        if (
            keysStartsWithParent.length === 1 ||
            (isChecked
                ? isAllKeysChecked(keysStartsWithParent, listViewMap)
                : isSomeKeysUnChecked(keysStartsWithParent, listViewMap))
        ) {
            listViewMap[parent]['checked'] = isChecked;
        }
        listViewMap = toggleAllParentCheckboxes(listViewMap, parent, isChecked);
        return listViewMap;
    };

    const toggleAllChildCheckboxes = (listViewMap, trace, value, param) => {
        for (let key in listViewMap) {
            if (isChild(key, trace)) {
                listViewMap[key][param] = value;
            }
        }
        return listViewMap;
    };

    const onLabelClicked = (isChecked, isOpened, trace, filter) => {
        setState({ trace, filter, isChecked, isOpened });
        listViewMap.current[trace]['opened'] = isOpened;
        if (!isOpened) {
            listViewMap.current = toggleAllChildCheckboxes(
                listViewMap.current,
                trace,
                false,
                'opened'
            );
        }
    };

    const values = {
        state,
        onCheckboxClicked,
        onLabelClicked,
        listViewMap: listViewMap,
    };

    return (
        <ListViewContext.Provider value={values}>
            {children}
        </ListViewContext.Provider>
    );
}

export { ListViewContext };

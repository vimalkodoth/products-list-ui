import React, { useRef, useState } from 'react';
import {
    getMatchIndices,
    isAllKeysChecked,
    isChild,
    isSomeKeysUnChecked,
} from '../utils/utils';

const ListViewContext = React.createContext({});

export default function ListViewContextProvider({ children }) {
    const [state, setState] = useState(null);
    const listViewMap = useRef({});
    const labelsViewList = useRef([]);

    const generateViewList = (listViewMap, trace = '') => {
        let keys = Object.keys(listViewMap).filter((key) => {
            return listViewMap[key]['checked'];
        });
        labelsViewList.current = [];
        keys.sort((a, b) => a.length - b.length);

        if (keys.length) {
            for (let i = keys.length; i >= 0; i--) {
                let l = keys.shift();
                if (!l) break;
                keys = keys.filter((label) => !label.startsWith(l));
                labelsViewList.current = [...labelsViewList.current, l];
            }
        }
        labelsViewList.current = labelsViewList.current.map((label) => {
            const splits = label.split('-');
            if (splits.length < 4) {
                return `all ${splits[splits.length - 1]}`;
            }
            return `${splits[splits.length - 2]} ${splits[splits.length - 1]}`;
        });
        return labelsViewList.current;
    };

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
        labelsViewList.current = generateViewList(listViewMap.current, trace);
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

    const setListViewMap = (route) => {
        listViewMap.current[route] = listViewMap.current[route] || {};
        listViewMap.current[route]['checked'] =
            listViewMap.current[route]['checked'] || false;
        listViewMap.current[route]['opened'] =
            listViewMap.current[route]['opened'] || false;
    };

    const values = {
        state,
        onCheckboxClicked,
        onLabelClicked,
        listViewMap: listViewMap,
        labelsViewList,
        setListViewMap,
    };

    return (
        <ListViewContext.Provider value={values}>
            {children}
        </ListViewContext.Provider>
    );
}

export { ListViewContext };

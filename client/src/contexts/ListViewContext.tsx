import React, { useRef, useState } from 'react';
import { isChild } from '../utils/utils';

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
        console.log(listViewMap.current);
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

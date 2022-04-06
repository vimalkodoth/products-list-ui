import React, { useRef, useState } from 'react';
import { isChild } from '../utils/utils';

const ListViewContext = React.createContext({});

export default function ListViewContextProvider({ children }) {
    const [state, setState] = useState(null);
    const listViewMap = useRef({});
    const onCheckboxClicked = (isChecked, isOpened, trace, filter) => {
        listViewMap.current[trace] = !listViewMap.current[trace];
        setState({ trace, filter, isChecked, isOpened });
        listViewMap.current = toggleAllChildCheckboxes(
            listViewMap.current,
            trace,
            isChecked
        );
    };

    const toggleAllChildCheckboxes = (listViewMap, trace, isChecked) => {
        for (let key in listViewMap) {
            if (isChild(key, trace)) {
                listViewMap[key] = isChecked;
            }
        }
        return listViewMap;
    };

    const onLabelClicked = (isChecked, isOpened, trace, filter) => {
        setState({ trace, filter, isChecked, isOpened });
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

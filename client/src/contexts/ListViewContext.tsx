import React, { useRef, useState } from 'react';
import { isChild } from '../utils/utils';

const ListViewContext = React.createContext({});

export default function ListViewContextProvider({ children }) {
    const [state, setState] = useState(null);
    const listViewMap = useRef({});
    const onCheckboxClicked = (isChecked, isOpened, trace, filter) => {
        listViewMap.current[trace] = !listViewMap.current[trace];
        setState({ trace, filter, isChecked, isOpened });
        console.log(listViewMap.current);

        for (let key in listViewMap.current) {
            if (isChild(key, trace)) {
                listViewMap.current[key] = isChecked;
            }
        }
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

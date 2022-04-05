import React, { useState } from 'react';

const ListViewContext = React.createContext({});

export default function ListViewContextProvider({ children }) {
    const [state, setState] = useState(null);
    const onCheckboxClicked = (checked, trace, filter) => {
        setState({ trace, filter, checked });
    };

    const values = { state, onCheckboxClicked };

    return (
        <ListViewContext.Provider value={values}>
            {children}
        </ListViewContext.Provider>
    );
}

export { ListViewContext };

import { useEffect, useState } from 'react';

export default function useCheckboxItem(onChange, isUnChecked) {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        if (isUnChecked) {
            setChecked(false);
        }
    }, [isUnChecked]);

    useEffect(() => {
        onChange(checked);
    }, [checked]);

    const handleOnChange = () => {
        setChecked((state) => {
            return !state;
        });
    };

    return { handleOnChange, checked };
}

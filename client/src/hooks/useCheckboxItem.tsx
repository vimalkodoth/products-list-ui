import { useEffect, useState } from 'react';

export default function useCheckboxItem(
    onChange,
    onLabelClicked,
    isChecked,
    isOpened
) {
    const [isItemChecked, setItemChecked] = useState(false);
    const [isItemOpened, setIsItemOpened] = useState(false);

    useEffect(() => {
        setItemChecked(isChecked);
    }, [isChecked]);

    useEffect(() => {
        setIsItemOpened(isOpened);
    }, [isOpened]);

    const handleOnChange = () => {
        setItemChecked((state) => !state);
        onChange(!isItemChecked, isItemOpened);
    };

    const handleOnToggle = () => {
        setIsItemOpened((state) => !state);
        onLabelClicked(isItemChecked, !isItemOpened);
    };

    return { handleOnToggle, handleOnChange, isItemChecked, isItemOpened };
}

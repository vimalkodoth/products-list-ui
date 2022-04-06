import { useEffect, seState } from 'react';

export default function useCheckboxItem(onChange, onLabelClicked, isChecked) {
    const [isItemChecked, setItemChecked] = useState(false);
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        setItemChecked(isChecked);
    }, [isChecked]);

    const handleOnChange = () => {
        setItemChecked((state) => !state);
        onChange(!isItemChecked, !isOpened);
    };

    const handleOnToggle = () => {
        setIsOpened((state) => !state);
        onLabelClicked(!isItemChecked, !isOpened);
    };

    return { handleOnToggle, handleOnChange, isItemChecked, isOpened };
}

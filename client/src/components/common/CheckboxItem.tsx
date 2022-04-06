/** @jsxImportSource @emotion/react */
import useCheckboxItem from '../../hooks/useCheckboxItem';
import { itemCSS } from './CheckboxItem.styles';

const CheckboxItem = ({
    onChange,
    onLabelClicked,
    label,
    isChecked = false,
    isOpened = false,
}): JSX.Element => {
    const { handleOnToggle, handleOnChange, isItemChecked, isItemOpened } =
        useCheckboxItem(onChange, onLabelClicked, isChecked, isOpened);
    return (
        <div
            css={itemCSS}
            className={`${isItemChecked ? 'checked' : ''} ${
                isItemOpened ? 'opened' : ''
            }`}
        >
            <input
                type="checkbox"
                id={label}
                checked={isItemChecked}
                onChange={handleOnChange}
            />
            <label onClick={handleOnToggle}>{label}</label>
        </div>
    );
};

CheckboxItem.defaultProps = {
    onChange: () => {},
    label: '',
    isChild: false,
};

export default CheckboxItem;

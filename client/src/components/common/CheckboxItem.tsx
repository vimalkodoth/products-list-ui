/** @jsxImportSource @emotion/react */
import useCheckboxItem from '../../hooks/useCheckboxItem';
import { itemCSS } from './CheckboxItem.styles';

const CheckboxItem = ({
    onChange,
    onLabelClicked,
    label,
    isChecked = false,
}): JSX.Element => {
    const { handleOnToggle, handleOnChange, isItemChecked, isOpened } =
        useCheckboxItem(onChange, onLabelClicked, isChecked);
    return (
        <div
            css={itemCSS}
            className={`${isItemChecked ? 'checked' : ''} ${
                isOpened ? 'opened' : ''
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

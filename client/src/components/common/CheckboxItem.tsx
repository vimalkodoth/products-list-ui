/** @jsxImportSource @emotion/react */
import useCheckboxItem from '../../hooks/useCheckboxItem';
import { itemCSS } from './CheckboxItem.styles';

const CheckboxItem = ({
    onChange,
    label,
    isUnChecked = false,
}): JSX.Element => {
    const { handleOnChange, checked } = useCheckboxItem(onChange, isUnChecked);
    return (
        <div css={itemCSS} className={`${checked ? 'checked' : ''}`}>
            <input
                type="checkbox"
                id={label}
                checked={checked}
                onChange={handleOnChange}
            />
            <label htmlFor={label}>{label}</label>
        </div>
    );
};

CheckboxItem.defaultProps = {
    onChange: () => {},
    label: '',
    isUnChecked: false,
};

export default CheckboxItem;

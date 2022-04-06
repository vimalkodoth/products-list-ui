import React from 'react';
import { mount } from 'enzyme';
import CheckboxItem from '../../src/components/common/CheckboxItem';

describe('CheckboxItem', () => {
    it('should render checkbox component', async () => {
        const onChange = jest.fn();
        const wrapper = mount(
            <CheckboxItem onChange={onChange} label={'ProductText'} />
        );
        expect(wrapper.getElements()).toMatchSnapshot();
        expect(wrapper.find('[type="checkbox"]').props().checked).toBeFalsy();
    });
    it('should render checkbox as selected', async () => {
        const onChange = jest.fn();
        const wrapper = mount(
            <CheckboxItem
                onChange={onChange}
                label={'ProductText'}
                isChild={false}
            />
        );
        const checkbox = wrapper.find('[type="checkbox"]');
        expect(wrapper.getElements()).toMatchSnapshot();
        expect(checkbox.props().checked).toBeFalsy();
        checkbox.simulate('change', { target: { checked: true } });
        wrapper.setProps({ isChild: true });
        expect(checkbox.props().checked).toBeFalsy();
    });
});

/** @jsxImportSource @emotion/react */
import useListView from '../../hooks/useListView';

const LabelsView = ({ children }): JSX.Element => {
    const { labelsViewList } = useListView();
    return children(labelsViewList);
};

LabelsView.defaultProps = {
    children: () => {},
};

export default LabelsView;

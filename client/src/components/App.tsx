/** @jsxImportSource @emotion/react */
import { AppCSS } from './App.styles';
import Products from './pages/Products';

export type TRows = string | number | boolean;

const App = (): JSX.Element => {
    return (
        <div css={AppCSS}>
            <Products />
        </div>
    );
};

export default App;

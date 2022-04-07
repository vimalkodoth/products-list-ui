/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const ProductsWrapperCSS = css`
    margin-left: 1em;
    margin-right: 1em;
    margin-bottom: 1em;
    display: flex;
    flex: 1;
    flex-direction: column;

    & > div:nth-child(2) {
        border: 1px solid #eee;
        padding: 5px;
    }
`;

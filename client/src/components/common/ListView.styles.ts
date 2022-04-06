/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const ListWrapperCSS = css`
    display: flex;
    flex-direction: column;
    max-height: 100%;
    overflow: scroll;
`;
export const ListViewCSS = css`
    ul {
        display: none;
        margin: 0;
    }
    .opened + ul {
        display: block;
    }
`;

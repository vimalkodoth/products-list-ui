/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const ListWrapperCSS = css`
    display: flex;
    flex-basis: 40%;
    margin-bottom: 1em;
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
export const ListLabelsCSS = css`
    ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        list-style: none;
    }
    ul li {
        background: #eee;
        padding: 7px;
        margin: 2px;
    }
`;

import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';


const OverlayTitleInner = styled.div`
   grid-row: 1;
   grid-column: 1 / 3 ;
   background-color: red;
`;


export default function OverlayTitle() {
    return (
        <OverlayTitleInner>

        </OverlayTitleInner>
    )

}
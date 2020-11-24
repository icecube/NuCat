import React from "react"
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0.25em 1em;
    margin: 1em;
    border-radius: 10px;
    border: 2px solid ${props => props.theme.main};
`

function Skymap() {

    return (
        <Wrapper>
            <h2>This area is for the skymap.</h2>
        </Wrapper>
    )
}

export default Skymap
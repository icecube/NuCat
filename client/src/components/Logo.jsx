import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../ice-cube-logo.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="https://icecube.wisc.edu">
                <img src={logo} width="250" height="64" alt="icecube.wisc.edu" />
            </Wrapper>
        )
    }
}

export default Logo
import React, { Component } from 'react'
import styled from 'styled-components'

import Appbar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import Logo from './Logo'
import Links from './Links'

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark',
})`
    margin-bottom: 20 px;
`

class NavBar extends Component {
    render() {
        return (
            <Appbar position = "static" style = {{
                backgroundColor: "gray"
            }}>
                <Toolbar >
                    <Logo/>
                    <Nav><Links/></Nav>
                    
                </Toolbar>
            </Appbar>
        )
    }
}

export default NavBar
/*
<Container>
                <Nav>
                    <Logo />
                    <Links />
                </Nav>
            </Container>
*/
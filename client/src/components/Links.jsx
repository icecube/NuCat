import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto mt-2 mt-lg-0',
})``

const Item = styled.div.attrs({
    className: 'nav-item',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/app" className="navbar-brand">
                    NuCat
                </Link>
                <Collapse>
                    <List>
                        <Item className="active">
                            <Link to="/app" className="nav-link">
                                List Events
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/app/infos/create" className="nav-link">
                                Create Event
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/app/infos/update" className="nav-link">
                                Update Event
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/app/about" className="nav-link">
                                About
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
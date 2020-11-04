import React, { Component } from 'react'
import MaterialTable, { MTableToolbar, MTableBodyRow } from "material-table";
import api from "../api"

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div`
    padding: 0.25em 1em;
    margin: 1em;
    border-radius: 3px;
    border: 2px solid ${props => props.theme.main};
`


class EventInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            event: {},
            isLoading: false,
        }
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await api.getEventById(this.state.id).then(event => {
            this.setState({
                event: event.data.data,
                isLoading: false,
            })
            console.log(event.data.data)
        })
    }
    render() {
        const { event, isLoading } = this.state
        console.log('TCL: EventInfo -> render -> event', event)

        return (
            <Wrapper>
                <Title>Event Info</Title>
                <Title>eventType</Title>
                <Title>{event.Type}</Title>
                <Title>TBC</Title>
            </Wrapper>
        )
    }
}

export default EventInfo
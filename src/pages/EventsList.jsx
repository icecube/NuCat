import React, { Component } from 'react'
import MaterialTable from "material-table";
import api from "../api"

import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0.25em 1em;
    margin: 1em;
    border-radius: 3px;
    border: 2px solid ${props => props.theme.main};
`

class EventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllEvents().then(events => {
            this.setState({
                events: events.data.data,
                isLoading: false,
            })
            console.log(events.data.data)
        })
    }

    render() {
        const { events, isLoading } = this.state
        console.log('TCL: EventsList -> render -> events', events)
        const columns = [
            {
                title: "Name",
                field: "Name",
            },
            {
                title: "Time",
                field: "Position PD",
            },
        ];

        let showTable = true
        if (!events.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <MaterialTable
                        columns={columns}
                        data={events}
                        isLoading={isLoading}
                        title="All Events"
                        options={{
                            pageSize: 20,
                            pageSizeOptions: [20, 50, 100],
                            exportButton: true
                        }}
                    />
                )}
            </Wrapper>
        )
    }
}

export default EventsList
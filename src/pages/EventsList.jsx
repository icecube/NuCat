import React, { Component } from 'react'
import { useHistory } from 'react-router-dom';
import MaterialTable, { MTableToolbar, MTableBodyRow } from "material-table";
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
            // {
            //     title: "id",
            //     field: "_id",
            // },
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
                        title="IceCube Astrophysical Neutrino Events"
                        options={{
                            pageSize: 20,
                            pageSizeOptions: [20, 50, 100],
                            exportButton: true
                        }}
                        actions={[
                            {
                                icon: 'info',
                                tooltip: 'Detail Info',
                                onClick: (event, rowData) => alert("Do something with _id: " + rowData._id),
                                // onClick: (event, rowData) => window.location.href=`/event/{rowData._id}`),
                            }
                        ]}
                    />
                )}
            </Wrapper>
        )
    }
}

export default EventsList
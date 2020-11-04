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
function getRecommendEvents(events, requestedInfo) {
    // Copy and modify on /neutrino-catalog/Public/Functions.js
    const eventDict = {
        'RA': 'Position PD',
        'Dec': 'Position PD',
        'RA 90%': 'Position PD',
        'Dec 90%': 'Position PD',
        'Time UTC': 'Time PD',
        'Time MJD': 'Time PD',
        'Type': 'Type PD',
        'Energy': 'Energy PD'
    }
    events.map((event) => {
        requestedInfo.forEach((fieldName) => {
            // Temporary variables
            var nameDate, fieldDate, fieldIndex, i;
            // First figure out which publication date should be
            // used for this requested field
            nameDate = eventDict[fieldName];
            // Get the publication date value
            fieldDate = event[nameDate];
            // Set the index to -1, so we get an error if not found
            fieldIndex = -1;
            // Loop through all publication dates to figure out
            // the index of the publication date we are currently
            // looking for
            for (i = 0; i < event['Pub Date'].length; i++) {
                if (event['Pub Date'][i] == fieldDate) {
                    fieldIndex = i;
                    break;
                }
            }
            event[fieldName] = event[fieldName][i]
        })
    })
    return events
}

class EventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
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
                title: "RA (deg)",
                field: "RA",
            },
            {
                title: "Dec (deg)",
                field: "Dec",
            },
            {
                title: "RA 90%",
                field: "RA 90%",
            },
            {
                title: "Dec 90%",
                field: "Dec",
            },
            {
                title: "Time (UTC)",
                field: "Time UTC",
            },
            {
                title: "Type",
                field: "Type",
            },
        ];
        getRecommendEvents(events, ['RA', 'Dec', 'RA 90%', 'Dec 90%', 'Time UTC', 'Type'])
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
                        title="IceCube Catalogue of Astrophysical Neutrino Candidates"
                        options={{
                            pageSize: 20,
                            pageSizeOptions: [20, 50, 100],
                            exportButton: true
                        }}
                        actions={[
                            {
                                icon: 'info',
                                tooltip: 'Details',
                                onClick: (event, rowData) => {
                                    window.location.href = "/event/" + rowData._id
                                }
                            }
                        ]}
                    />
                )}
            </Wrapper>
        )
    }
}

export default EventsList
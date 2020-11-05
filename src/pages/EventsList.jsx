import React, { Component } from 'react'
import { useHistory } from 'react-router-dom';
import MaterialTable, { MTableToolbar, MTableBodyRow } from "material-table";
import { Skymap } from '../components'
import api from "../api"

import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0.25em 1em;
    margin: 1em;
    border-radius: 10px;
    border: 2px solid ${props => props.theme.main};
`
function getRecommendEvents(events, requestedInfo) {
    // Copy and modify on /neutrino-catalog/Public/Functions.js
    console.log("running get recommend")
    const eventDict = {
        'RA': 'Position PD',
        'Dec': 'Position PD',
        "RA 50%": 'Position PD',
        "Dec 50%": 'Position PD',
        'RA 90%': 'Position PD',
        'Dec 90%': 'Position PD',
        'Time UTC': 'Time PD',
        'Time MJD': 'Time PD',
        'Energy': 'Energy PD',
        'Type': 'Type PD',
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
            fieldIndex = event['Pub Date'].findIndex((element) => element === fieldDate);
            if (fieldIndex === -1) event[fieldName] = event[fieldName][0]
            else event[fieldName] = event[fieldName][fieldIndex]
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
            this.setState({
                events: getRecommendEvents(this.state.events, ['RA', 'Dec', 'RA 50%', 'Dec 50%', 'RA 90%', 'Dec 90%', 'Time UTC', 'Energy', 'Type']),
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
                defaultSort: "desc",
            },
            {
                title: "RA (deg)",
                field: "RA",
                type: 'numeric',
                // customSort: (a, b) => parseFloat(a.RA) - parseFloat(b.RA)
            },
            {
                title: "Dec (deg)",
                field: "Dec",
                type: 'numeric',
                // customSort: (a, b) => parseFloat(a.Dec) - parseFloat(b.Dec)
            },
            {
                title: "RA 50%",
                field: "RA 50%",
                sorting: false,
            },
            {
                title: "Dec 50%",
                field: "Dec 50%",
                sorting: false,
            },
            {
                title: "RA 90%",
                field: "RA 90%",
                sorting: false,
            },
            {
                title: "Dec 90%",
                field: "Dec 90%",
                sorting: false,
            },
            {
                title: "Time (UTC)",
                field: "Time UTC",
            },
            {
                title: "Energy (TeV)",
                field: "Energy",
                sorting: false,
                // type: 'numeric',
                // customSort: (a, b) => {
                //     if (isNaN(a.Energy) && isNaN(a.Energy)) return 0;
                //     else if (isNaN(a.Energy)) return 0;
                //     else if (isNaN(b.Energy)) return 0;
                //     return parseFloat(a.Energy) - parseFloat(b.Energy)
                // }
            },
            {
                title: "Type",
                field: "Type",
            },
        ];
        //TODO: this pre-process should be inside setState of React
        // getRecommendEvents(events, ['RA', 'Dec', 'RA 50%', 'Dec 50%', 'RA 90%', 'Dec 90%', 'Time UTC', 'Energy', 'Type'])
        let showTable = true
        if (!events || !events.length) {
            showTable = false
        }

        return (
            <Wrapper>
                <Skymap />
                {showTable && (
                    <MaterialTable
                        columns={columns}
                        data={events}
                        isLoading={isLoading}
                        title="IceCube Catalogue of Astrophysical Neutrino Candidates"
                        options={{
                            pageSize: 20,
                            pageSizeOptions: [20, 50, 100],
                            exportButton: true,
                            sorting: true,
                            thirdSortClick: false,
                            fixedColumns: {
                                left: 1,
                                right: 1,
                            }
                        }}
                        actions={[
                            {
                                icon: 'info',
                                tooltip: 'Details',
                                onClick: (event, rowData) => {
                                    window.location.href = "/event/" + rowData._id
                                }
                            },
                            {
                                icon: 'update',
                                tooltip: 'Update',
                                onClick: (event, rowData) => {
                                    alert("For admins: You can update this entry directly in the future.")
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
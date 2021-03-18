import React, { Component } from 'react'
import { useHistory } from 'react-router-dom';
import MaterialTable, { MTableToolbar, MTableBodyRow } from "material-table";
import { Skymap } from '../components'
import api from "../api"

import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0.25em 1em;
    margin: 1em;
    width: 100%;
    border-radius: 10px;
    border: 2px solid ${props => props.theme.main};
`

class EventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            candidates: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllCandidates().then(candidates => {
            this.setState({
                candidates: candidates.data.data,
                isLoading: false,
            })
            console.log(candidates.data.data)
        })
    }

    render() {
        const { candidates, isLoading } = this.state
        console.log('TCL: CandidatesList -> render -> candidates', candidates)
        const columns = [
            {
                title: "Name",
                field: "name",
            },
            {
                title: "Time (UTC)",
                field: "time",
                defaultSort: "desc",
            },
            {
                title: "RA (deg)",
                field: "ra",
                type: 'numeric',
            },
            {
                title: "Dec (deg)",
                field: "dec",
                type: 'numeric',
            },
            {
                title: "Energy (TeV)",
                field: "energy",
                type: 'numeric',
                sorting: false,
            },
            {
                title: "Type",
                field: "type",
            },
        ];

        let showTable = true
        if (!candidates || !candidates.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {
                    showTable &&
                    <Skymap data={candidates} showCircle={true} showPoly={false} />
                }

                {showTable && (
                    <MaterialTable
                        columns={columns}
                        data={candidates}
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
                                right: 0,
                            }
                        }}
                        actions={[
                            {
                                icon: 'info',
                                tooltip: 'Details',
                                onClick: (candidate, rowData) => {
                                    window.location.href = "/app/candidate/" + rowData._id
                                }
                            },
                            {
                                icon: 'update',
                                tooltip: 'Update',
                                onClick: (candidate, rowData) => {
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
import React, { Component } from 'react'
import MaterialTable, { MTableToolbar, MTableBodyRow } from "material-table";
import api from "../api"
import { DetailCard } from '../components'
import Divider from '@material-ui/core/Divider';

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


class CandidateInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            candidate: {},
            isLoading: false,
        }
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await api.getCandidateById(this.state.id).then(cand => {
            this.setState({
                candidate: JSON.parse(JSON.stringify(cand.data.data)),
                isLoading: false,
            })
        })
    }
    render() {
        const { candidate, isLoading } = this.state
        console.log('TCL: CandidateInfo -> render -> candidate', candidate)

        let showInfos = true
        if (!candidate.infos || !candidate.infos.length) {
            showInfos = false
        }
        return (
            <Wrapper>
                <Title>{candidate.name}</Title>
                <div>
                    <Divider variant="middle" />
                    <DetailCard info={candidate} />
                </div>
                {
                    showInfos && (
                        <div>
                            {candidate.infos.map((info, index) =>
                                <div>
                                    <Divider variant="middle" />
                                    <DetailCard info={info} />
                                </div>
                            )}
                        </div>
                    )
                }
            </Wrapper>
        )
    }
}

export default CandidateInfo
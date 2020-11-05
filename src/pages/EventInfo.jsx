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


class EventInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            event: {},
            infos: [],
            isLoading: false,
        }
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await api.getEventById(this.state.id).then(event => {
            const infos = [];
            const evt = event.data.data;
            for (let idx = 0; idx < evt.Reference.length; ++idx) {
                const info = {
                    _id: evt._id,
                    Name: evt.Name,
                    "Time PD": evt["Time PD"],
                    "Position PD": evt["Position PD"],
                    "Energy PD": evt["Energy PD"],
                    "Type PD": evt["Type PD"],
                    "Track PD": evt["Track PD"],

                    "Time MJD": evt["Time MJD"][idx],
                    "Time UTC": evt["Time UTC"][idx],
                    RA: evt.RA[idx],
                    Dec: evt.Dec[idx],
                    "RA 50%": evt["RA 50%"][idx],
                    "Dec 50%": evt["Dec 50%"][idx],
                    "RA 90%": evt["RA 90%"][idx],
                    "Dec 90%": evt["Dec 90%"][idx],
                    Energy: evt.Energy[idx],
                    Type: evt.Type[idx],
                    Reference: evt.Reference[idx],
                    Link: evt.Link[idx],
                    "Pub Type": evt["Pub Type"][idx],
                    "Pub Date": evt["Pub Date"][idx],
                    Comment: evt.Comment[idx],
                    img: evt.img,
                }
                infos.push(info)
            }

            this.setState({
                event: evt,
                infos: infos,
                isLoading: false,
            })
            // console.log(event.data.data)
        })
    }
    render() {
        const { event, infos, isLoading } = this.state
        console.log('TCL: EventInfo -> render -> event', event)
        let showInfo = true
        if (!infos.length) {
            showInfo = false
        }
        return (
            <Wrapper>
                <Title>{event.Name}</Title>
                <div>
                    {infos.map((info, index) =>
                        <div>
                            <Divider variant="middle" />
                            <DetailCard info={info} />
                        </div>
                    )}
                </div>
            </Wrapper>
        )
    }
}

export default EventInfo
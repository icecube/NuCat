import React, { useState } from "react";
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

const initialState = {
    username: "",
    password: "",
    run_id: '',
    event_id: '',
    rev: '',
    name: '',
    time: '',
    ra: '',
    dec: '',
    ra50plus: '',
    ra50minus: '',
    dec50plus: '',
    dec50minus: '',
    ra90plus: '',
    ra90minus: '',
    dec90plus: '',
    dec90minus: '',
    energy: '',
    type: '',
    track: '',
    reference: '',
    link: '',
    comment: '',
    json: ''
};

function InfoInsert() {
    const [info, setInfo] = useState(initialState);

    function handleChange(event) {
        const { name, value } = event.target;
        setInfo((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleIncludeInfo() {
        const { username, password, ...payload
        } = info
        console.log(payload)
        console.log("handleIncludeInfo")
        api.insertInfo(payload, {
            auth: {
                username: username,
                password: password
            }
        }).then(res => {
            window.alert(`Info inserted successfully`)
            this.setState(initialState)
            console.log("successfully")
            console.log(res)
        }).catch(error => {
            window.alert(`Rejected: ` + error)
            console.log("Rejected")
            console.log(error)
        })
    }

    return (
        <Wrapper>
            <h1>
                Create Info
            </h1>
            <form>
                <InputText
                    onChange={handleChange}
                    value={info.username}
                    name="username"
                    placeholder="username"
                />
                <InputText
                    onChange={handleChange}
                    value={info.password}
                    type="password"
                    name="password"
                    placeholder="password"
                />
                <InputText
                    onChange={handleChange}
                    value={info.run_id}
                    type="number"
                    name="run_id"
                    placeholder="run_id"
                />
                <InputText
                    onChange={handleChange}
                    value={info.event_id}
                    type="number"
                    name="event_id"
                    placeholder="event_id"
                />
                <InputText
                    onChange={handleChange}
                    value={info.rev}
                    type="number"
                    name="rev"
                    placeholder="rev"
                />
                <InputText
                    onChange={handleChange}
                    value={info.name}
                    name="name"
                    placeholder="name"
                />
                <InputText
                    onChange={handleChange}
                    value={info.time}
                    name="time"
                    placeholder="time"
                />
                <InputText
                    onChange={handleChange}
                    value={info.ra}
                    type="number"
                    name="ra"
                    placeholder="ra"
                />
                <InputText
                    onChange={handleChange}
                    value={info.dec}
                    type="number"
                    name="dec"
                    placeholder="dec"
                />
                <InputText
                    onChange={handleChange}
                    value={info.ra50plus}
                    type="number"
                    name="ra50plus"
                    placeholder="ra50plus"
                />
                <InputText
                    onChange={handleChange}
                    value={info.ra50minus}
                    type="number"
                    name="ra50minus"
                    placeholder="ra50minus"
                />
                <InputText
                    onChange={handleChange}
                    value={info.dec50plus}
                    type="number"
                    name="dec50plus"
                    placeholder="dec50plus"
                />
                <InputText
                    onChange={handleChange}
                    value={info.dec50minus}
                    type="number"
                    name="dec50minus"
                    placeholder="dec50minus"
                />
                <InputText
                    onChange={handleChange}
                    value={info.ra90plus}
                    type="number"
                    name="ra90plus"
                    placeholder="ra90plus"
                />
                <InputText
                    onChange={handleChange}
                    value={info.ra90minus}
                    type="number"
                    name="ra90minus"
                    placeholder="ra90minus"
                />
                <InputText
                    onChange={handleChange}
                    value={info.dec90plus}
                    type="number"
                    name="dec90plus"
                    placeholder="dec90plus"
                />
                <InputText
                    onChange={handleChange}
                    value={info.dec90minus}
                    type="number"
                    name="dec90minus"
                    placeholder="dec90minus"
                />
                <InputText
                    onChange={handleChange}
                    value={info.energy}
                    type="number"
                    name="energy"
                    placeholder="energy"
                />
                <InputText
                    onChange={handleChange}
                    value={info.type}
                    type="text"
                    name="type"
                    placeholder="type"
                />
                <InputText
                    onChange={handleChange}
                    value={info.track}
                    type="text"
                    name="track"
                    placeholder="track"
                />
                <InputText
                    onChange={handleChange}
                    value={info.reference}
                    type="text"
                    name="reference"
                    placeholder="reference"
                />
                <InputText
                    onChange={handleChange}
                    value={info.link}
                    type="text"
                    name="link"
                    placeholder="link"
                />
                <InputText
                    onChange={handleChange}
                    value={info.comment}
                    type="text"
                    name="comment"
                    placeholder="comment"
                />
                <InputText
                    onChange={handleChange}
                    value={info.json}
                    name="json"
                    placeholder="json"
                />
                <Button type="button" onClick={handleIncludeInfo}>Add Info</Button>
                <CancelButton href={'/app'}>Cancel</CancelButton>
            </form>
        </Wrapper>
    )
}

export default InfoInsert
import React from "react"
import MaterialTable, { MTableToolbar, MTableBodyRow } from "material-table";
import styled from 'styled-components'

const Div = styled.div`
    padding: 0.25em 1em;
    margin: 2em;
    border-radius: 1em;
    border: 2px solid ${props => props.theme.main};
`

function DetailCard(props) {
    const columns = [
        {
            title: "Name",
            field: "Name",
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
        },
        {
            title: "Type",
            field: "Type",
        },
    ];
    console.log(props.info)
    return (
        <Div>
            <MaterialTable
                columns={columns}
                data={[props.info]}
                title={props.info.Reference}
                options={{
                    sorting: false,
                    pageSize: 1,
                    pageSizeOptions: [1, 2, 5],
                    exportButton: true,
                    fixedColumns: {
                        left: 1,
                        right: 1,
                    }
                }}
            />
            <p>{props.info.Comment}</p>
            <p>{props.info.Link}</p>
        </Div>
    )
}

export default DetailCard
import React from "react"
import MaterialTable, { MTableToolbar, MTableBodyRow } from "material-table";
import styled from 'styled-components'

const Div = styled.div`
    padding: 0.25em 1em;
    margin: 2em;
    border-radius: 1em;
    border: 2px solid ${props => props.theme.main};
`
// TODO handle default values and info values distinctively
// can use a separate prop to flag the difference

function DetailCard(props) {
    const columns = [
        {
            title: "Name",
            field: "name",
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
            title: "RA 50% +",
            field: "ra50plus",
            sorting: false,
        },
        {
            title: "RA 50% -",
            field: "ra50minus",
            sorting: false,
        },
        {
            title: "Dec 50% +",
            field: "dec50plus",
            sorting: false,
        },
        {
            title: "Dec 50% -",
            field: "dec50minus",
            sorting: false,
        },
        {
            title: "RA 90% +",
            field: "ra90plus",
            sorting: false,
        },
        {
            title: "RA 90% -",
            field: "ra90minus",
            sorting: false,
        },
        {
            title: "Dec 90% +",
            field: "dec90plus",
            sorting: false,
        },
        {
            title: "Dec 90% -",
            field: "dec90minus",
            sorting: false,
        },
        {
            title: "Time (UTC)",
            field: "time",
        },
        {
            title: "Energy (TeV)",
            field: "energy",
            sorting: false,
        },
        {
            title: "Type",
            field: "type",
        },
        {
            title: "Track",
            field: "track",
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
                        right: 0,
                    }
                }}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (info, rowData) => {
                            alert("For admins: You can delete this entry directly in the future.")
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
            <p>{props.info.Comment}</p>
            <p>{props.info.Link}</p>
        </Div>
    )
}

export default DetailCard
import React from 'react';
import MaterialTable from "material-table";
import db from '../testdb';

const data = db;

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

function MainDataTable() {
    const { useState } = React;
    const [selectedRow, setSelectedRow] = useState(null);
    return (
        <div style={{ maxWidth: '95%', margin: "auto" }}>
            <MaterialTable columns={columns}
                data={data}
                title="All Events"
                onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                options={{
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                    }),
                    exportButton: true
                }}
                localization={{
                    pagination: {
                        labelDisplayedRows: '20-10 of 5'
                    }
                }}
            />
        </div>
    );
}
export default MainDataTable;



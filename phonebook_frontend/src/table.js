import React from 'react';
const Table = (props) => {
    const { data, editTableRecord, deleteTableRecord } = props; // {data: [], editTableRecord:{}, deleteTableRecord:{}}
    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mobile No.</th>
                    <th colSpan="2" className="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {(data && data.length > 0) ? data.map((data, index) => {
                    return (
                        <tr key={index}>
                            <td>{data.name}</td>
                            <td>{data.mobile}</td>
                            <td><button className="btn btn-sm btn-warning" onClick={() => editTableRecord(data._id, data)}>Edit </button></td>
                            <td><button className="btn btn-sm btn-danger" onClick={() => deleteTableRecord(data._id)}>Delete </button></td>
                        </tr>
                    )
                }) : <tr><td colSpan="5">Loading...</td></tr>}
            </tbody>
        </table>
    );
}
export default Table
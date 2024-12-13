/* eslint-disable react/prop-types */
import * as React from 'react';
import { DataContext, RowContext } from './DataContext';
import axios from 'axios';

export const DataProvider = ({ children }) => {
    // const [residents, setResidents] = React.useState([]);
    // const [apartments, setApartments] = React.useState([]);
    // const [residentApartments, setResidentApartments] = React.useState([]);
    const [data, setData] = React.useState({
        residents: [],
        apartments: [],
        residentApartments: []
    });
 
    const [rows, setRows] = React.useState({
        residentRows: [],
        apartmentRows: [],
        residentApartmentRows: []
    });

    const updateData = (type, newData) => {
        setData(prevData => ({
            ...prevData,
            [type]: newData
        }));
    };

    const updateRows = (type, newRows) => {
        setRows(prevRows => ({
            ...prevRows,
            [type]: newRows
        }));
    };

    const valueGetter = (dateString) => {
        return new Date(dateString);
    };

    React.useEffect(() => {
        axios.get('http://localhost:5100/api/Resident')
            .then((response) => {
                const transformedData = response.data.$values.map((resident) => ({
                    ...resident,
                    status: 'Default',
                }));
                updateData('residents', transformedData);

                const transformedRows = transformedData.map((resident) => ({
                    id: resident.residentId,
                    name: resident.name,
                    dateOfBirth: valueGetter(resident.dateOfBirth),
                    address: resident.address,
                    phoneNumber: resident.phoneNumber,
                    email: resident.email,
                    status: resident.status,
                    isNew: false,
                }));
                updateRows('residentRows', transformedRows);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    React.useEffect(() => {
        axios.get('http://localhost:5100/api/Apartment')
            .then((response) => {
                const transformedData = response.data.$values.map((apartment) => ({
                    ...apartment,
                    status: 'Default',
                }));
                updateData('apartments', transformedData);

                const transformedRows = transformedData.map((apartment) => ({
                    id: apartment.apartmentId,
                    roomNumber: apartment.roomNumber,
                    address: apartment.address,
                    status: apartment.status,
                }));
                updateRows('apartmentRows', transformedRows);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    React.useEffect(() => {
        axios.get('http://localhost:5100/api/ResidentApartment')
            .then((response) => {
                const transformedData = response.data.$values.map((residentApartment) => ({
                    ...residentApartment,
                    status: 'Default',
                }));
                updateData('residentApartments', transformedData);

                const transformedRows = transformedData.map((residentApartment) => ({
                    id: residentApartment.residentApartmentId,
                    residentId: residentApartment.residentId,
                    apartmentId: residentApartment.apartmentId,
                    status: residentApartment.status,
                }));
                updateRows('residentApartmentRows', transformedRows);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    
    return (
        <DataContext.Provider value={{
            data,
            updateData,
            rows,
            updateRows
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const RowProvider = ({ children }) => {
    const { rows, updateRows } = React.useContext(DataContext);

    const getNextId = (type) => {
        const specificRows = rows[type];
        const maxId = specificRows.length > 0 ? Math.max(...specificRows.map(row => row.id)) : 0;
        return maxId + 1;
    };

    const addRow = (type, newRow, newId) => {        
        const specificRows = rows[type];
        const updatedRows = [...specificRows, { id: newId, ...newRow, status: 'Created', isNew: true }];
        updateRows(type, updatedRows);
    };

    const editRow = (type, newRow) => {
        const specificRows = rows[type];
        const id = newRow.id;
        const editedRow = specificRows.find((row) => row.id === id);
        if (editedRow.isNew) {
            const updatedRows = specificRows.map((row) => (row.id === id ? { ...newRow, status: 'Created' } : row));
            updateRows(type, updatedRows);
        } else {
            const updatedRows = specificRows.map((row) => (row.id === id ? { ...newRow, status: 'Updated' } : row));
            updateRows(type, updatedRows);
        }
    };

    return (
        <RowContext.Provider value={{ rows, updateRows, addRow, editRow, getNextId }}>
            {children}
        </RowContext.Provider>
    );
};


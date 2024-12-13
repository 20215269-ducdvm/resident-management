/* eslint-disable react/prop-types */
import * as React from 'react';
import Header from "../../../components/Header";
import * as yup from 'yup';
import { DataContext, RowContext } from '../../../context/DataContext';
import { Formik } from 'formik';
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

// const getInitialValues = (mode, id) => {
//     if (mode === 'edit') {
//         axios.get(`http://localhost:5100/api/apartment/${id}?includeApartment=true`)
//             .then((response) => {
//                 const ApartmentData = response.data;                
//                 const values = {
//                     name: ApartmentData.name,
//                     address: ApartmentData.address,
//                     address: ApartmentData.address,
//                     phoneNumber: ApartmentData.phoneNumber,
//                     email: ApartmentData.email,
//                 };
//                 console.log(values);
//                 return values;
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }

//     return {
//         name: '',
//         address: '',
//         address: '',
//         phoneNumber: '',
//         email: '',
//     }
// };



const userSchema = yup.object().shape({
    roomNumber: yup.string().required('Vui lòng nhập số phòng'),
    address: yup.string().required('Vui lòng nhập địa chỉ'),
});

const ApartmentForm = ({ mode }) => {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data, updateData } = React.useContext(DataContext);
    const { rows, addRow, getNextId, editRow } = React.useContext(RowContext);

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [initialValues, setInitialValues] = React.useState({
        roomNumber: '',
        address: '',
        residentApartments: [],
    });

    if (mode === 'edit' && id && data.apartments.length > 0) {
        // console.log(mode, id, Apartments);
        // const apartment = Apartments.find((r) => r.apartmentId === id);
        // console.log(apartment);
        // if (apartment) {
        //     const ApartmentData = {
        //         name: apartment.name || '',
        //         address: apartment.address || '',
        //         address: apartment.address || '',
        //         phoneNumber: apartment.phoneNumber || '',
        //         email: apartment.email || '',
        //     };
        //     setInitialValues(ApartmentData);
        // }
        axios.get(`http://localhost:5100/api/apartment/${id}?includeResident=true`)
            .then((response) => {
                const apartmentData = response.data;
                setInitialValues(apartmentData);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const saveCreateApartment = (apartment) => {
        axios.post('http://localhost:5100/api/apartment', apartment)
            .then((response) => {
                console.log('Create response:', response.data);
            })
            .catch((error) => {
                console.error('Create error:', error.response ? error.response.data : error.message);
            });
    }

    const saveEditApartment = (apartment) => {
        axios.put(`http://localhost:5100/api/apartment/${apartment.apartmentId}`, apartment)
            .then((response) => {
                console.log('Update response:', response.data);
            })
            .catch((error) => {
                console.error('Update error:', error.response ? error.response.data : error.message);
            });
    }

    const addApartment = (newApartment) => {
        const newId = getNextId('apartmentRows');
        addRow('apartmentRows', newApartment, newId);
        newApartment = { ...newApartment, apartmentId: newId, residentApartments: [] };
        updateData('apartments', [...data.apartments, newApartment]);
        saveCreateApartment(newApartment);
    };


    const editApartment = (apartment) => {
        updateData('apartments', data.apartments.map((r) => r.apartmentId === apartment.apartmentId ? apartment : r));
        apartment = { "$id": "1", ...apartment, residentApartments: initialValues.residentApartments };

        saveEditApartment(apartment);

        const row = rows.apartmentRows.find((r) => r.id === apartment.apartmentId);
        const editedRow = {
            id: apartment.apartmentId,
            roomNumber: apartment.roomNumber,
            address: apartment.address,
            status: 'Updated',
            isNew: row.isNew,
        }
        editRow('apartmentRows', editedRow);
    }

    const handleFormSubmit = (values) => {
        const isUserConfirmed = mode === 'create'
            ? window.confirm('Bạn có chắc chắn muốn thêm căn hộ này không?')
            : window.confirm('Bạn có chắc chắn muốn chỉnh sửa thông tin căn hộ này không?');
        if (!isUserConfirmed) {
            return;
        }
        if (mode === 'create') { addApartment(values); }

        if (mode === 'edit') { editApartment(values); }
    };

    const returnSubtitle = (mode) => {
        if (mode === 'edit') {
            return 'Chỉnh sửa thông tin căn hộ';
        }
        if (mode === 'create') {
            return 'Thêm căn hộ mới';
        }
        return;
    }
    return (
        <Box m="20px">
            <Header title="FORM CĂN HỘ" subtitle={returnSubtitle(mode)} />
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={userSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Số phòng"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.roomNumber}
                                name="roomNumber"
                                error={!!touched.roomNumber && !!errors.roomNumber}
                                helperText={touched.roomNumber && errors.roomNumber}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Địa chỉ"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address}
                                name="address"
                                error={!!touched.address && !!errors.address}
                                helperText={touched.address && errors.address}
                                sx={{ gridColumn: "span 2" }}                                
                            />
                        </Box>
                        <Box display="flex" justifyContent="start" mt="20px">
                            <Button size="large" type="submit" variant="contained"
                                sx={{
                                    borderRadius: "20px",
                                    backgroundColor: colors.greenAccent[600],
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>

        </Box>
    )

}

export default ApartmentForm;
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
//         axios.get(`http://localhost:5100/api/residentApartment/${id}?includeResidentApartment=true`)
//             .then((response) => {
//                 const ResidentApartmentData = response.data;                
//                 const values = {
//                     name: ResidentApartmentData.name,
//                     address: ResidentApartmentData.address,
//                     address: ResidentApartmentData.address,
//                     phoneNumber: ResidentApartmentData.phoneNumber,
//                     email: ResidentApartmentData.email,
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
    residentId: yup.string()
        .min(1, 'ID không hợp lệ')
        .required('Vui lòng nhập ID'),
    apartmentId: yup.string()
        .min(1, 'ID không hợp lệ')
        .required('Vui lòng nhập ID'),
});

const ResidentApartmentForm = ({ mode }) => {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data, updateData } = React.useContext(DataContext);
    const { rows, addRow, getNextId, editRow } = React.useContext(RowContext);

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [initialValues, setInitialValues] = React.useState({
        residentApartmentId: '',
        residentId: '',
        apartmentId: '',
    });

    if (mode === 'edit' && id && data.apartments.length > 0) {        
        axios.get(`http://localhost:5100/api/residentApartment/${id}`)
            .then((response) => {
                const apartmentData = response.data;
                setInitialValues(apartmentData);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const saveCreateResidentApartment = (residentApartment) => {
        axios.post('http://localhost:5100/api/residentApartment', residentApartment)
            .then((response) => {
                console.log('Create response:', response.data);
            })
            .catch((error) => {
                console.error('Create error:', error.response ? error.response.data : error.message);
            });
    }

    const saveEditResidentApartment = (residentApartment) => {
        axios.put(`http://localhost:5100/api/residentApartment/${residentApartment.residentApartmentId}`, residentApartment)
            .then((response) => {
                console.log('Update response:', response.data);
            })
            .catch((error) => {
                console.error('Update error:', error.response ? error.response.data : error.message);
            });
    }

    const addResidentApartment = (newResidentApartment) => {
        const newId = getNextId('residentApartmentRows');
        addRow('residentApartmentRows', newResidentApartment, newId);
        newResidentApartment.residentApartmentId = newId;
        updateData('residentApartments', [...data.apartments, newResidentApartment]);
        saveCreateResidentApartment(newResidentApartment);
    };


    const editResidentApartment = (residentApartment) => {
        updateData('residentApartments', data.residentApartments.map((r) => r.residentApartmentId === residentApartment.apartmentId ? residentApartment : r));
        
        saveEditResidentApartment(residentApartment);

        const row = rows.residentApartmentRows.find((r) => r.id === residentApartment.apartmentId);
        const editedRow = {
            id: residentApartment.residentApartmentId,
            residentId: residentApartment.residentId,
            apartmentId: residentApartment.apartmentId,
            status: 'Updated',
            isNew: row.isNew,
        }
        editRow('residentApartmentRows', editedRow);
    }

    const handleFormSubmit = (values) => {
        const isUserConfirmed = mode === 'create'
            ? window.confirm('Bạn có chắc chắn muốn thêm căn hộ này không?')
            : window.confirm('Bạn có chắc chắn muốn chỉnh sửa thông tin căn hộ này không?');
        if (!isUserConfirmed) {
            return;
        }
        if (mode === 'create') { addResidentApartment(values); }

        if (mode === 'edit') { editResidentApartment(values); }
    };

    const returnSubtitle = (mode) => {
        if (mode === 'edit') {
            return 'Chỉnh sửa thông tin căn hộ cho người ở';
        }
        if (mode === 'create') {
            return 'Thêm người vào căn hộ';
        }
        return;
    }
    return (
        <Box m="20px">
            <Header title="QUẢN LÝ CĂN HỘ" subtitle={returnSubtitle(mode)} />
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
                                label="ID người ở"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.residentId}
                                name="residentId"
                                error={!!touched.residentId && !!errors.residentId}
                                helperText={touched.residentId && errors.residentId}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="ID phòng"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.apartmentId}
                                name="apartmentId"
                                error={!!touched.apartmentId && !!errors.apartmentId}
                                helperText={touched.apartmentId && errors.apartmentId}
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

export default ResidentApartmentForm;

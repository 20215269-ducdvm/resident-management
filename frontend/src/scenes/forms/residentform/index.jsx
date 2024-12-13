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
//         axios.get(`http://localhost:5100/api/Resident/${id}?includeApartment=true`)
//             .then((response) => {
//                 const residentData = response.data;                
//                 const values = {
//                     name: residentData.name,
//                     dateOfBirth: residentData.dateOfBirth,
//                     address: residentData.address,
//                     phoneNumber: residentData.phoneNumber,
//                     email: residentData.email,
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
//         dateOfBirth: '',
//         address: '',
//         phoneNumber: '',
//         email: '',
//     }
// };

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;


const userSchema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên cư dân'),
    dateOfBirth: yup.string().required('Vui lòng nhập ngày sinh'),
    address: yup.string().required('Vui lòng nhập địa chỉ'),
    phoneNumber: yup.string()
        .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
        .required('Vui lòng nhập số điện thoại'),
    email: yup.string()
        .email('Email không hợp lệ')
        .required('Vui lòng nhập email'),
});

const ResidentForm = ({ mode }) => {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data, updateData } = React.useContext(DataContext);
    const { rows, addRow, getNextId, editRow } = React.useContext(RowContext);

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [initialValues, setInitialValues] = React.useState({
        name: '',
        dateOfBirth: '',
        address: '',
        phoneNumber: '',
        email: '',
        residentApartments: [],
    });

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    if (mode === 'edit' && id && data.residents.length > 0) {
        // console.log(mode, id, residents);
        // const resident = residents.find((r) => r.residentId === id);
        // console.log(resident);
        // if (resident) {
        //     const residentData = {
        //         name: resident.name || '',
        //         dateOfBirth: resident.dateOfBirth || '',
        //         address: resident.address || '',
        //         phoneNumber: resident.phoneNumber || '',
        //         email: resident.email || '',
        //     };
        //     setInitialValues(residentData);
        // }
        axios.get(`http://localhost:5100/api/Resident/${id}?includeApartment=true`)
            .then((response) => {
                const residentData = response.data;  
                residentData.dateOfBirth = formatDate(new Date(residentData.dateOfBirth));     
                setInitialValues(residentData);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const saveCreateResident = (resident) => {
        axios.post('http://localhost:5100/api/Resident', resident)
            .then((response) => {
                console.log('Create response:', response.data);
            })
            .catch((error) => {
                console.error('Create error:', error.response ? error.response.data : error.message);
            });
    }

    const saveEditResident = (resident) => {
        axios.put(`http://localhost:5100/api/Resident/${resident.residentId}`, resident)
            .then((response) => {
                console.log('Update response:', response.data);
            })
            .catch((error) => {
                console.error('Update error:', error.response ? error.response.data : error.message);
            });
    }

    const addResident = (newResident) => {
        const newId = getNextId('residentRows');

        if (newResident.dateOfBirth) {
            newResident.dateOfBirth = new Date(newResident.dateOfBirth);
        }
        addRow('residentRows', newResident, newId);
        newResident = { ...newResident, residentId: newId, residentApartments: [] };
        updateData('residents', [...data.residents, newResident]);
        saveCreateResident(newResident);
    };


    const editResident = (resident) => {        
        updateData('residents', data.residents.map((r) => {
            if (r.residentId === resident.residentId) {
                return resident;
            }
            return r;
        }));        
        resident = { "$id": "1", ...resident, residentApartments: initialValues.residentApartments };
        resident.dateOfBirth = new Date(resident.dateOfBirth);                
        saveEditResident(resident);
        
        const row = rows.residentRows.find((r) => r.id === resident.residentId);
        const editedRow = {
            id: resident.residentId,
            name: resident.name,
            dateOfBirth: new Date(resident.dateOfBirth),
            address: resident.address,
            phoneNumber: resident.phoneNumber,
            email: resident.email,
            status: 'Updated',
            isNew: row.isNew,
        }
        editRow('residentRows', editedRow);
    }

    const handleFormSubmit = (values) => {
        const isUserConfirmed = mode === 'create'
            ? window.confirm('Bạn có chắc chắn muốn thêm cư dân này không?')
            : window.confirm('Bạn có chắc chắn muốn chỉnh sửa thông tin cư dân này không?');
        if (!isUserConfirmed) {
            return;
        }
        if (mode === 'create') { addResident(values); }

        if (mode === 'edit') { editResident(values); }
    };

    const returnSubtitle = (mode) => {
        if (mode === 'edit') {
            return 'Chỉnh sửa thông tin cư dân';
        }
        if (mode === 'create') {
            return 'Thêm cư dân mới';
        }
        return;
    }
    return (
        <Box m="20px">
            <Header title="FORM CƯ DÂN" subtitle={returnSubtitle(mode)} />
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
                                type="text"
                                label="Tên"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Ngày sinh"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.dateOfBirth}
                                name="dateOfBirth"
                                error={!!touched.dateOfBirth && !!errors.dateOfBirth}
                                helperText={touched.dateOfBirth && errors.dateOfBirth}
                                sx={{ gridColumn: "span 2" }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Số điện thoại"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phoneNumber}
                                name="phoneNumber"
                                error={!!touched.phoneNumber && !!errors.phoneNumber}
                                helperText={touched.phoneNumber && errors.phoneNumber}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
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

export default ResidentForm;
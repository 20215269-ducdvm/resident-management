/* eslint-disable react/prop-types */
import * as React from 'react';
import { Formik } from 'formik';
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../theme";
import useMediaQuery from '@mui/material/useMediaQuery';

const CustomForm = ({ handleFormSubmit, initialValues, userSchema }) => {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
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
        </Formik>)
}

export default CustomForm;
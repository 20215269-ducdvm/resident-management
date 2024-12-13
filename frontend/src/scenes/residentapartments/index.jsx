import * as React from 'react';
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import CustomDataGrid from "../../components/CustomDataGrid";
import { DataContext, RowContext } from "../../context/DataContext";
import axios from "axios";
const ResidentApartments = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data, updateData } = React.useContext(DataContext);
    const { rows } = React.useContext(RowContext);    
    const columns = [
        {
            field: "id",
            headerName: "residentApartmentId",
            flex: 1,
        },
        {
            field: "residentId",
            headerName: "residentId",
            flex: 1,
        },
        {
            field: "apartmentId",
            headerName: "apartmentId",
            flex: 1,
        },
    ];

    const handleRowChange = (updatedRows) => {
        updateData('residentApartments', updatedRows);
    }

    const saveDataToServer = (residentApartment) => {
        switch (residentApartment.status) {
            // case 'Created':
            //   residentApartment = { ...residentApartment, residentApartments: [] };
            //   axios.post('http://localhost:5100/api/ResidentApartment', residentApartment)
            //     .then((response) => {
            //       console.log('Create response:', response.data);
            //     })
            //     .catch((error) => {
            //       console.error(error);
            //     });
            //   break;
            // case 'Updated':
            //   axios.put(`http://localhost:5100/api/ResidentApartment/${residentApartment.residentapartmentId}`, residentApartment)
            //     .then((response) => {
            //       console.log('Update response:', response.data);
            //     })
            //     .catch((error) => {
            //       console.error(error);
            //     });
            //   break;
            case 'Deleted':
                axios.delete(`http://localhost:5100/api/ResidentApartment/${residentApartment.id}`)
                    .then((response) => {
                        console.log('Delete response:', response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                break;
            default:
                break;
        }
    }

    const handleSaveData = () => {
        const userConfirmed = window.confirm('Bạn có chắc muốn lưu dữ liệu không?');
        if (!userConfirmed) {
            return;
        }

        data.residentApartments.forEach((residentApartment) => {
            saveDataToServer(residentApartment);
        });
    }

    return (
        <Box m="20px">
            <Header title="QUẢN LÝ TOÀ NHÀ" subtitle="Danh sách các phòng, các cư dân sống trong phòng" />
            <Box
                m="5px 0 0 0"
                height="68vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiSvgIcon-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiButtonBase-root": {
                        margin: "0",
                        border: "0",
                        padding: "15px",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <CustomDataGrid
                    entity="residentapartment"
                    initialRows={rows.residentApartmentRows}
                    columns={columns}
                    onRowsChange={handleRowChange}
                    handleClickSaveData={handleSaveData}
                />
            </Box>
        </Box>
    );
}

export default ResidentApartments;

import * as React from 'react';
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import CustomDataGrid from "../../components/CustomDataGrid";
import { mockDataResidentApartments } from '../../data/mockData';

const ResidentApartments = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: "residentId",
            headerName: "residentId",
            flex: 1,            
            editable: true,
        },
        {
            field: "apartmentId",
            headerName: "apartmentId",
            flex: 1,            
            editable: true,
        },
    ];

    const rowData = (residentApartment, id) => ({
        id: id,
        residentId: residentApartment.residentId,
        apartmentId: residentApartment.apartmentId,
    });

    let currentId = 0;
    const rowsData = mockDataResidentApartments.map((residentApartment) => {
        currentId += 1;
        return rowData(residentApartment, currentId);
    });

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
                    initialRows={rowsData}
                    columns={columns}
                />
            </Box>
        </Box>
    );
}

export default ResidentApartments;

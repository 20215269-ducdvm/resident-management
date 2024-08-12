import * as React from 'react';
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
// import { mockDataResidents } from "../../data/mockData";
import CustomDataGrid from "../../components/CustomDataGrid";
import { getResidents } from '../../data/residentData';
import { mockDataResidents } from '../../data/mockData';
const Residents = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "residentId" },
    {
      field: "name",
      headerName: "Tên",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "dateOfBirth",
      headerName: "Ngày sinh",
      flex: 1,
      type: "date",
      editable: true,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      headerAlign: "left",
      align: "left",
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "SĐT",
      flex: 1,
      editable: true,
      type: "tel",
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      flex: 1,
      editable: true,
    },
    // {
    //   field: "actions",
    //   headerName: "Thao tác",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Box display="flex" justifyContent="space-around">
    //       <Button startIcon={<EditIcon />} onClick={() => handleEditClick(params.row)}> </Button>
    //       <Button startIcon={<DeleteIcon />} onClick={() => handleDeleteClick(params.row)}> </Button>
    //     </Box>
    //   ),
    // }
  ];
  const valueGetter = (dateString) => {
    return new Date(dateString);
  };
  getResidents()
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
  const rows = mockDataResidents.map((resident) => ({
    id: resident.residentId,
    name: resident.name,
    dateOfBirth: valueGetter(resident.dateOfBirth),
    address: resident.address,
    phoneNumber: resident.phoneNumber,
    email: resident.email,
  }));
  return (
    <Box m="20px">
      <Header title="QUẢN LÝ CƯ DÂN" subtitle="Danh sách cư dân, thông tin cá nhân từng cư dân" />
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
          initialRows={rows}
          columns={columns}
        />

      </Box>
    </Box>
  );
}

export default Residents;

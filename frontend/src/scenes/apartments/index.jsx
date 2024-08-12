import * as React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { mockDataApartments } from "../../data/mockData";
import CustomDataGrid from "../../components/CustomDataGrid";

const Apartments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "apartmentId" },
    {
      field: "roomNumber",
      headerName: "Số phòng",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      headerAlign: "left",
      align: "left",
      editable: true,
    },
  ];
  const rows = mockDataApartments.map((apartment) => ({
    id: apartment.apartmentId,
    roomNumber: apartment.roomNumber,
    address: apartment.address,
  }));
  return (
    <Box m="20px">
      {/* HEADER */}
      <Header
        title="QUẢN LÝ CĂN HỘ"
        subtitle="Danh sách căn hộ, thông tin từng căn hộ"
      />
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
};

export default Apartments;

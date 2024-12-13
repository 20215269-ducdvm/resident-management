import * as React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import CustomDataGrid from "../../components/CustomDataGrid";
import { DataContext, RowContext } from "../../context/DataContext";
import axios from "axios";

const Apartments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, updateData } = React.useContext(DataContext);
  const { rows } = React.useContext(RowContext);  
  const columns = [
    { field: "id", headerName: "apartmentId" },
    {
      field: "roomNumber",
      headerName: "Số phòng",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      headerAlign: "left",
      align: "left",
    },
  ];

  const handleRowChange = (updatedRows) => {
    updateData("apartments", updatedRows);
  }

  const saveDataToServer = (apartment) => {
    switch (apartment.status) {
      // case 'Created':
      //   apartment = { ...apartment, residentApartments: [] };
      //   axios.post('http://localhost:5100/api/Apartment', apartment)
      //     .then((response) => {
      //       console.log('Create response:', response.data);
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      //   break;
      // case 'Updated':
      //   axios.put(`http://localhost:5100/api/Apartment/${apartment.apartmentId}`, apartment)
      //     .then((response) => {
      //       console.log('Update response:', response.data);
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      //   break;
      case 'Deleted':
        axios.delete(`http://localhost:5100/api/Apartment/${apartment.id}`)
          .then((response) => {
            console.log('Delete response:', response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        break;

      case 'Default':
        break;

      default:
        console.error('Invalid status:', apartment.status);
        break;
    }
  }

  const handleSaveData = () => {
    const userConfirmed = window.confirm('Bạn có chắc muốn lưu dữ liệu không?');
    if (!userConfirmed) {
      return;
    }
    data.apartments.forEach((apartment) => {
      saveDataToServer(apartment);
    });    
  }
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
          entity="apartment"
          initialRows={rows.apartmentRows}
          columns={columns}
          onRowsChange={handleRowChange}
          handleClickSaveData={handleSaveData}
        />
      </Box>
    </Box>
  );
};

export default Apartments;

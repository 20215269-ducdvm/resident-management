import * as React from 'react';
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import CustomDataGrid from "../../components/CustomDataGrid";
import axios from 'axios';
import { DataContext, RowContext } from '../../context/DataContext';

const Residents = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, updateData } = React.useContext(DataContext);
  const { rows } = React.useContext(RowContext);  
  const columns = [
    { field: "id", headerName: "residentId" },
    {
      field: "name",
      headerName: "Tên",
      flex: 1,
      cellClassName: "name-column--cell",      
    },
    {
      field: "dateOfBirth",
      headerName: "Ngày sinh",
      flex: 1,
      type: "date",      
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      headerAlign: "left",
      align: "left",      
    },
    {
      field: "phoneNumber",
      headerName: "SĐT",
      flex: 1,      
      type: "tel",
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      flex: 1,      
    },
  ];

  const handleRowChange = (updatedRows) => {
    updateData('residents', updatedRows);
  };

  const saveDataToServer = (resident) => {
    switch (resident.status) {
      // case 'Created':
      //   resident = { ...resident, residentApartments: [] };
      //   axios.post('http://localhost:5100/api/Resident', resident)
      //     .then((response) => {
      //       console.log('Create response:', response.data);
      //     })
      //     .catch((error) => {
      //       console.error('Create error:', error.response ? error.response.data : error.message);
      //     });
      //   break;

      // case 'Updated':
      //   axios.get(`http://localhost:5100/api/Resident/${resident.id}?includeApartment=true`)
      //     .then((response) => {
      //       const residentData = response.data;
      //       resident = { "$id": "1", "residentId": resident.id, ...resident, residentApartments: residentData.residentApartments };
      //       axios.put(`http://localhost:5100/api/Resident/${resident.id}`, resident)
      //         .then((response) => {
      //           console.log('Update response:', response.data);
      //         })
      //         .catch((error) => {
      //           console.error('Update error:', error.response ? error.response.data : error.message);
      //         });
      //     })
      //     .catch((error) => {
      //       console.error('Fetch error:', error.response ? error.response.data : error.message);
      //     });
      //   break;

      case 'Deleted':
        axios.delete(`http://localhost:5100/api/Resident/${resident.id}`)
          .then((response) => {
            console.log('Delete response:', response.data);
          })
          .catch((error) => {
            console.error('Delete error:', error.response ? error.response.data : error.message);
          });
        break;

      case 'Default':
        break;

      default:
        console.error('Invalid status:', resident.status);
        break;
    }
  }
  const handleSaveData = () => {
    const userConfirmed = window.confirm('Bạn có chắc muốn lưu dữ liệu không?');
    if (!userConfirmed) {
      return;
    }
    data.residents.forEach((resident) => {
      saveDataToServer(resident);
    });
  };
  
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
          entity="resident"
          initialRows={rows.residentRows}
          columns={columns}
          onRowsChange={handleRowChange}
          handleClickSaveData={handleSaveData}
        />
      </Box>
    </Box>
  );
};

export default Residents;

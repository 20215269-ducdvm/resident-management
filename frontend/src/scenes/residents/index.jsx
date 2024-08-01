import { Box, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataResidents } from "../../data/mockData";
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const Residents = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleInfoClick = (row) => {
        console.log('Info clicked for row:', row);
      };
      
      const handleEditClick = (row) => {
        console.log('Edit clicked for row:', row);
      };
      
      const handleDeleteClick = (row) => {
        console.log('Delete clicked for row:', row);
      };
    const columns = [
        { field: "residentId", headerName: "ID" },
        {
          field: "name",
          headerName: "Tên",
          flex: 1,
          cellClassName: "name-column--cell",
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
        },
        {
          field: "email",
          headerName: "Email",
          flex: 1,
        },
        {
            field: "actions",
            headerName: "Thao tác",
            flex: 1,
            renderCell: (params) => (
              <Box display="flex" justifyContent="space-around">
                <Button startIcon={<InfoIcon />} onClick={() => handleInfoClick(params.row)}> </Button>
                <Button startIcon={<EditIcon />} onClick={() => handleEditClick(params.row)}> </Button>
                <Button startIcon={<DeleteForeverIcon />} onClick={() => handleDeleteClick(params.row)}> </Button>
              </Box>
            ),
        }
      ];
    // function CustomToolbar() {
    // return (
    //     <GridToolbarContainer>
    //     <GridToolbarColumnsButton />
    //     <GridToolbarFilterButton />
    //     <GridToolbarDensitySelector
    //         slotProps={{ tooltip: { title: 'Change density' } }}
    //     />
    //     <Box sx={{ flexGrow: 1 }} />
    //     <GridToolbarExport
    //         slotProps={{
    //         tooltip: { title: 'Export data' },
    //         button: { variant: 'outlined' },
    //         }}
    //     />
    //     </GridToolbarContainer>
    // );
    // }
      
    return (
        <Box m="20px">
            <Header title="QUẢN LÝ CƯ DÂN" subtitle="Danh sách cư dân, thông tin cá nhân từng cư dân" />
            <Box
                m="40px 0 0 0"
                height="75vh"
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
                <DataGrid 
                    checkboxSelection 
                    rows={mockDataResidents} 
                    columns={columns} 
                    components={{ Toolbar: GridToolbar }}
                    getRowId={(row) => row.residentId}
                />
            </Box>
        </Box>
    );
}

export default Residents;
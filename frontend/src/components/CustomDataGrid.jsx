/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Close';
import { Typography } from "@mui/material";
import {
    // GridRowModes,
    DataGrid,
    GridToolbar,
    GridToolbarContainer,
    GridActionsCellItem,
    // GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from 'react-router-dom';
const CustomDataGrid = ({ entity, initialRows, columns, onRowsChange, handleClickSaveData }) => {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    React.useEffect(() => {
        setRows(initialRows);
    }, [initialRows]);

    React.useEffect(() => {
        onRowsChange(rows);
    }, [rows, onRowsChange]);

    function EditToolbar() {
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);


        const handleClickAddRow = () => {
            console.log('entity:', entity);
            if (entity === 'resident') navigate('/residentform');
            else if (entity === 'apartment') navigate('/apartmentform');
            else if (entity === 'residentapartment') navigate('/residentapartmentform');
        };

        return (
            <GridToolbarContainer style={{ display: 'flex', justifyContent: 'space-between' }}  >
                <GridToolbar />
                <Box display="flex" justifyContent="flex-end" m={0} sx={{
                    height: "75%",
                    "& .MuiButtonBase-root": {
                        background: colors.blueAccent[600],
                        margin: "0 0 0 10px",
                    },
                }}>
                    <Button variant="contained" sx={{ borderRadius: "20px" }} startIcon={<AddIcon />} onClick={handleClickAddRow}>
                        Thêm
                    </Button>
                    <Button variant="contained" sx={{ borderRadius: "20px" }} startIcon={<SaveIcon />} onClick={handleClickSaveData}>
                        Lưu
                    </Button>
                </Box>
            </GridToolbarContainer>
        );
    }

    // const handleRowEditStop = (params, event) => {
    //     if (params.reason === GridRowEditStopReasons.rowFocusOut) {
    //         event.defaultMuiPrevented = true;
    //     }
    // };

    const handleEditClick = (id) => () => {
        // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        switch (entity) {
            case 'resident':
                navigate('/residentformedit?id=' + id);
                break;
            case 'apartment':
                navigate('/apartmentformedit?id=' + id);
                break;
            case 'residentapartment':
                navigate('/residentapartmentformedit?id=' + id);
                break;
            default:
                break;
        }
    };

    // const handleSaveClick = (id) => () => {
    //     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    // const editedRow = rows.find((row) => row.id === id);
    // if (editedRow.isNew) {
    //     setRows(rows.map((row) => (row.id === id ? { ...row, status: "Created", isNew: false } : row)));
    // } else {
    //     setRows(rows.map((row) => (row.id === id ? { ...row, status: "Updated" } : row)));
    // }
    // };

    const handleDeleteClick = (id) => () => {
        setRows(rows.map((row) => (row.id === id ? { ...row, status: "Deleted" } : row)));
    };

    // const handleCancelClick = (id) => () => {
    //     setRowModesModel({
    //         ...rowModesModel,
    //         [id]: { mode: GridRowModes.View, ignoreModifications: true },
    //     });

    //     const editedRow = rows.find((row) => row.id === id);
    //     if (editedRow.isNew) {
    //         setRows(rows.filter((row) => row.id !== id));
    //     }
    // };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const statusColumn = [
        {
            field: 'status',
            headerName: 'Trạng thái',
            headerAlign: 'center',
            width: 100,
            renderCell: ({ row: { status } }) => {
                return (
                    <Box
                        width="80%"
                        m="10px"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            status === "Created"
                                ? colors.greenAccent[600]
                                : status === "Updated"
                                    ? colors.blueAccent[700]
                                    : status === "Deleted"
                                        ? colors.redAccent[700]
                                        : colors.grey[700]
                        }
                        borderRadius="20px"
                    >

                        <Typography color={colors.grey[100]}>
                            {status}
                        </Typography>
                    </Box>
                );
            },
        },
    ];

    const actionColumn = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Thao tác',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                // if (isInEditMode) {
                //     return [
                //         <GridActionsCellItem
                //             icon={<SaveIcon />}
                //             label="Save"
                //             sx={{
                //                 color: 'primary.main',
                //             }}
                //             onClick={handleSaveClick(id)}
                //         />,
                //         <GridActionsCellItem
                //             icon={<CancelIcon />}
                //             label="Cancel"
                //             className="textPrimary"
                //             onClick={handleCancelClick(id)}
                //             color="inherit"
                //         />,
                //     ];
                // }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const updatedColumns = [...columns, ...statusColumn, ...actionColumn];

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={updatedColumns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                // onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>
    );
}

export default CustomDataGrid;

/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbar,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

function ExtractColumns(columns) {
    return columns.map((column) => {
        const { field } = column;
        return { [field]: '' };
    });
}

const CustomDataGrid = ({ initialRows, columns }) => {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [commands, setCommands] = React.useState('');
    const [id, setLastID] = React.useState(rows.length + 1);

    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;

        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        

        const handleClickAddRow = () => {        
            setLastID((oldID) => oldID + 1);
            setRows((oldRows) => [...oldRows, { id, ...ExtractColumns(columns), isNew: true }]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
            }));            
        };

        const handleClickSaveData = () => {
            const userConfirmed = window.confirm('Bạn có chắc muốn lưu dữ liệu không?');
            if (userConfirmed) {
                // Save the data
                console.log(commands);
            }
        }
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
                        Thêm bản ghi
                    </Button>
                    <Button variant="contained" sx={{ borderRadius: "20px" }} startIcon={<SaveIcon />} onClick={handleClickSaveData}>
                        Lưu
                    </Button>
                </Box>
            </GridToolbarContainer>
        );
    }

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
        setCommands((prevCommands) => prevCommands + 'd')
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const actionColumn = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Thao tác',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

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

    const updatedColumns = Array.isArray(columns) ? [...columns, ...actionColumn] : [...actionColumn];

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
                onRowEditStop={handleRowEditStop}
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

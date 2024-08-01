import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";


const Apartments = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="QUẢN LÝ CĂN HỘ" subtitle="Danh sách căn hộ" />
      </Box>
    </Box>
}

export default Apartments;
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { TableCell, TableRow } from '@mui/material'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import { Paragraph } from 'app/components/Typography'

const DepartmentCard = ({
    brand,
    onCreateWingDialogOpen,
    onViewWingDialogOpen,
    onEdit,
    onDelete,
}) => {
    const adiitHandler = () => {
        onEdit(brand._id, brand.name)
    }
    const delHandler = () => {
        onDelete(brand._id)
    }

    const createWingDialogHandler = () => {
        onCreateWingDialogOpen(brand)
    }

    const viewWingDialogHandler = () => {
        onViewWingDialogOpen(brand)
    }

    return (
        <TableRow hover>
            <TableCell
                colSpan={4}
                align="left"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0, ml: 1 }}>{brand.name}</Paragraph>
                </Box>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="center" colSpan={2}>
                <Button onClick={viewWingDialogHandler}>
                    <VisibilityIcon />
                </Button>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="center" colSpan={2}>
                <Button onClick={createWingDialogHandler}>
                    <AddIcon />
                </Button>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="center" colSpan={2}>
                <Button onClick={adiitHandler}>
                    <EditIcon />
                </Button>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="center" colSpan={2}>
                <Button onClick={delHandler}>
                    <DeleteIcon color="error" />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default DepartmentCard

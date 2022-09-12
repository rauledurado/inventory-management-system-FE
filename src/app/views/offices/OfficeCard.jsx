import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TableCell, TableRow } from '@mui/material'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import { Paragraph } from 'app/components/Typography'
import { useNavigate } from 'react-router-dom'

const OfficeCard = ({ office, onEdit, onDelete }) => {
    const navigate = useNavigate()

    const adiitHandler = () => {
        onEdit(
            office._id,
            office.name,
            office.address,
            office.city,
            office.email,
            office.phone
        )
    }
    const delHandler = () => {
        onDelete(office._id)
    }

    return (
        <TableRow hover>
            <TableCell
                colSpan={3}
                align="left"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0, mx: 1 }}>{office.name}</Paragraph>
                </Box>
            </TableCell>
            <TableCell
                colSpan={3}
                align="center"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0, mx: 1 }}>{office.address}</Paragraph>
                </Box>
            </TableCell>
            <TableCell
                colSpan={1}
                align="center"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0, mx: 1 }}>{office.city}</Paragraph>
                </Box>
            </TableCell>
            <TableCell
                colSpan={2}
                align="center"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0 }}>
                        {office.email === undefined ? 'N/A' : office.email}
                    </Paragraph>
                </Box>
            </TableCell>
            <TableCell
                colSpan={1}
                align="center"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0 }}>
                        {office.phone === undefined ? 'N/A' : office.phone}
                    </Paragraph>
                </Box>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="center" colSpan={1}>
                <Button onClick={adiitHandler}>
                    <EditIcon />
                </Button>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="center" colSpan={1}>
                <Button onClick={delHandler}>
                    <DeleteIcon color="error" />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default OfficeCard

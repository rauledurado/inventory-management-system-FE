import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TableCell, TableRow } from '@mui/material'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import { Paragraph } from 'app/components/Typography'
import moment from 'moment'

const WingCard = ({ wing, onEdit, onDelete }) => {
    const adiitHandler = () => {
        onEdit(wing._id, wing)
    }
    const delHandler = () => {
        onDelete(wing._id)
    }

    return (
        <TableRow hover>
            <TableCell
                colSpan={4}
                align="left"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0, ml: 1 }}>{wing?.name}</Paragraph>
                </Box>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="center" colSpan={2}>
                <Box>
                    <Paragraph sx={{ m: 0, ml: 1 }}>
                        {moment(wing?.createdAt).format('LL')}
                    </Paragraph>
                </Box>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="center" colSpan={2}>
                <Box>
                    <Paragraph sx={{ m: 0, ml: 1 }}>
                        {moment(wing?.modifiedAt).format('LL')}
                    </Paragraph>
                </Box>
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

export default WingCard

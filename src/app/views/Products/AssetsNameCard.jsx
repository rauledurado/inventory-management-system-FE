import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TableCell, TableRow } from '@mui/material'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import { Paragraph } from 'app/components/Typography'
import moment from 'moment'

const AssetsNameCard = ({ asset, onEdit, onDelete }) => {
    const adiitHandler = () => {
        onEdit(asset?._id, asset.name)
    }
    const delHandler = () => {
        onDelete(asset?._id)
    }

    console.log(asset)

    return (

        <TableRow hover>
            <TableCell
                colSpan={4}
                align="center"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box display="flex" alignItems="left">
                    <Paragraph sx={{ m: 0, ml: 1 }}>{asset?.name}</Paragraph>
                </Box>
            </TableCell>
            <TableCell
                colSpan={2}
                align="center"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0, ml: 1 }}>
                        {asset?.createdAt === undefined
                            ? 'N/A'
                            : moment(asset?.createdAt).format('LL')}
                    </Paragraph>
                </Box>
            </TableCell>
            <TableCell
                colSpan={2}
                align="center"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0, ml: 1 }}>
                        {asset?.modifiedAt === undefined
                            ? 'N/A'
                            : moment(asset?.createdAt).format('LL')}
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

export default AssetsNameCard

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TableCell, TableRow } from '@mui/material'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import { Paragraph } from 'app/components/Typography'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
const label = { inputProps: { 'aria-label': 'Switch demo' } }

const ProductTypeCard = ({ product, onEdit, onDelete }) => {
    const navigate = useNavigate()

    const adiitHandler = (adit) => {
        onEdit(product._id, product.name)
    }
    const delHandler = () => {
        onDelete(product._id)
    }

    return (
        <TableRow
            hover
            // onClick={()=>navigate("/products/details/main")}
        >
            <TableCell
                colSpan={4}
                align="left"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0, ml: 1 }}>{product.name}</Paragraph>
                </Box>
            </TableCell>
            <TableCell
                align="center"
                colSpan={2}
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0, ml: 1 }}>
                        {product.createdAt === undefined
                            ? 'N/A'
                            : moment(product.createdAt).format('LL')}
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
                        {product.modifiedAt === undefined
                            ? 'N/A'
                            : moment(product.modifiedAt).format('LL')}
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

export default ProductTypeCard

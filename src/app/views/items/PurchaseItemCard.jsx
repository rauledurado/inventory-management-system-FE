import { useNavigate } from 'react-router-dom'
// material
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Stack,
    Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import config from 'config'
import noImage from '../../../images/no-image.jpg'

const PurchaseItemCard = ({ purchaseItem,pageNumber, onEdit, onDelete }) => {
    const [product, setProduct] = React.useState()

    const navigate = useNavigate()
    const UserImgStyle = styled('img')({
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
    })

    const onDeleteHandler = () => {
        onDelete(purchaseItem)
    }

    const onEditHandler = () => {
        onEdit(purchaseItem._id, purchaseItem)
    }

    const navigateToDetailsPage = () => {
        navigate('/items/PurchasedItemsDetail', {
            state: { purchaseItem: purchaseItem , pageNumber : pageNumber  },
        })
    }

    const productName = purchaseItem.product[0]?.name

    const productImage = purchaseItem.attachment[0]




//   purchaseItem.attachment[0]

    return (
        <Card sx={{ maxWidth: 345 }}>
            <Box onClick={navigateToDetailsPage}>
                <CardMedia sx={{ pt: '100%', position: 'relative' }}>
                    <UserImgStyle
                        alt="No Image"
                        src={
                              purchaseItem.attachment[0]
                                ? purchaseItem.attachment[0] !== "no-photo.jpg" && purchaseItem.attachment[0] !== "no-image" && purchaseItem.product[0] !== undefined
                                    ? config.base_url +
                                      '/' +
                                      'uploads/' +
                                      productImage
                                    : noImage
                                : noImage
                        }
                    />
                </CardMedia>
                <CardContent>
                    <Typography variant="subtitle2" noWrap>
                        {productName}
                    </Typography>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{ marginTop: '10px' }}
                    >
                        <Typography variant="subtitle1">
                            <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    color: 'text',
                                    textDecoration: '',
                                }}
                            >
                                Price: &nbsp;
                                {purchaseItem.price}
                            </Typography>
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{ marginTop: '10px' }}
                    >
                        <Typography variant="subtitle1">
                            <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    color: 'text',
                                    textDecoration: '',
                                }}
                            >
                                Quantity: &nbsp;
                                {purchaseItem.quantity}
                            </Typography>
                        </Typography>
                    </Stack>
                </CardContent>
            </Box>
            <CardActions>
                <Typography variant="subtitle1">
                    <Typography
                        component="span"
                        variant="body1"
                        sx={{
                            color: 'text.disabled',
                            textDecoration: '',
                        }}
                    >
                        <Button
                            variant="outlined"
                            style={{
                                marginRight: '5px',
                                marginLeft: '5px',
                                marginBottom: '5px',
                            }}
                            onClick={onEditHandler}
                        >
                            <EditIcon fontSize="small" />
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            style={{ marginLeft: '5px', marginBottom: '5px' }}
                            onClick={onDeleteHandler}
                        >
                            <DeleteIcon fontSize="small" />
                        </Button>
                    </Typography>
                </Typography>
            </CardActions>
        </Card>
    )
}
export default PurchaseItemCard

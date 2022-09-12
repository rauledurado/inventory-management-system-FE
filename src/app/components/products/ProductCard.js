import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'
// material
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

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import config from 'config'
import avatar from '../../views/AppUsers/a.png'
import noImage from '../../../images/no-image.jpg'

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
})

// ----------------------------------------------------------------------

ProductCard.propTypes = {
    product: PropTypes.object,
}

function ProductCard({ product, onDelete, onEdit }) {
    const navigate = useNavigate()
    const imgeBaseUrl = 'uploads/'

    const adiitHandler = () => {
        onEdit(product._id, product)
    }

    const delHandler = () => {
        onDelete(product._id)
    }

    const navigateToDetailsPage = () => {
        navigate('/products/details', { state: { product: product } })
    }

    console.log(product.photo)

    return (
        <Card sx={{ maxWidth: 345 }}>
            <Box onClick={navigateToDetailsPage}>
                {/* <CardMedia sx={{ pt: '100%', position: 'relative' }}>
                    <ProductImgStyle
                        alt="No Image"
                        src={
                            product.photo === 'no-image' || product.photo === "no-photo.jpg" ||
                            product.photo === undefined
                                ? noImage
                                : config.base_url +
                                  '/' +
                                  imgeBaseUrl +
                                  product.photo
                        }
                    />
                </CardMedia> */}
                <CardContent>
                    <Typography variant="subtitle2" noWrap>
                        {product.name}
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
                                Quantitiy: &nbsp;
                                {product.quantity === undefined
                                    ? 'N/A'
                                    : product.quantity}
                            </Typography>
                        </Typography>
                    </Stack>
                    <Typography variant="subtitle1">
                        {product?.averagePrice === undefined ? (
                            <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    color: 'text',
                                    textDecoration: '',
                                }}
                            >
                                Avg Price: &nbsp; N/A
                            </Typography>
                        ) : (
                            <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    color: 'text',
                                    textDecoration: '',
                                }}
                            >
                                Avg Price: &nbsp;
                                {product?.averagePrice.toFixed(2)}
                            </Typography>
                        )}
                    </Typography>
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
                            onClick={adiitHandler}
                        >
                            <EditIcon fontSize="small" />
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            style={{ marginLeft: '5px', marginBottom: '5px' }}
                            onClick={delHandler}
                        >
                            <DeleteIcon fontSize="small" />
                        </Button>
                    </Typography>
                </Typography>
            </CardActions>
        </Card>
    )
}

export default ProductCard

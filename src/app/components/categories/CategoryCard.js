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
    Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import config from 'config'
import avatar from '../../views/AppUsers/a.png'
import noImage from '../../../images/no-image.jpg'

// ----------------------------------------------------------------------

const CategoryImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
})

// ----------------------------------------------------------------------

CategoryCard.propTypes = {
    category: PropTypes.object,
}

function CategoryCard({ category, onEdit, onDelete }) {
    const navigate = useNavigate()

    const imgeBaseUrl = 'uploads/'

    const adiitHandler = (adit) => {
        //  console.log(props, 'props');
        onEdit(category._id, category.name)
    }
    const delHandler = () => {
        onDelete(category._id)
    }

    const navigateToDetailsPage = () => {
        navigate('/categories/details', { state: { category: category } })
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <Box onClick={navigateToDetailsPage}>
                <CardMedia sx={{ pt: '100%', position: 'relative' }}>
                    <CategoryImgStyle
                        alt="No Image"
                        src={
                            category.photo === 'no-image' ||
                            category.photo === undefined
                                ? noImage
                                : config.base_url +
                                  '/' +
                                  imgeBaseUrl +
                                  category.photo
                        }
                    />
                </CardMedia>
                <CardContent>
                    <Typography variant="subtitle2" noWrap>
                        {category.name}
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

export default CategoryCard

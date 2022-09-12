/* eslint-disable jsx-a11y/anchor-has-content */
import { useNavigate } from 'react-router-dom'
// material
import TextTruncate from 'react-text-truncate'

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
import config from 'config'
import avatar from '../AppUsers/a.png'

const UsersCard = ({ user, onDelete, onEdit }) => {
    const navigate = useNavigate()

    const UserImgStyle = styled('img')({
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
    })

    const imgeBaseUrl = 'uploads/'

    const onEditHandler = () => {
        onEdit(user._id, user)
    }

    const onDeleteHandler = () => {
        onDelete(user._id)
    }

    const navigateToDetailsPage = () => {
        navigate('/user/details', { state: { user: user } })
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <Box onClick={navigateToDetailsPage}>
                <CardMedia sx={{ pt: '100%', position: 'relative' }}>
                    <UserImgStyle
                        alt="No Image"
                        src={
                            user.photo === 'no-image' ||
                            user.photo === undefined
                                ? avatar
                                : config.base_url +
                                  '/' +
                                  imgeBaseUrl +
                                  user.photo
                        }
                    />
                </CardMedia>
                <CardContent>
                    {/* <Typography variant="subtitle2" noWrap>
                        {user.name}
                    </Typography> */}
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
                                }}
                            >
                                <TextTruncate
                                    line={1}
                                    element="span"
                                    truncateText="…"
                                    text={`Name: ${user.name}`}
                                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                />
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
                                }}
                            >
                                <TextTruncate
                                    line={1}
                                    element="span"
                                    truncateText="…"
                                    text={`Email: ${user.emailAddress}`}
                                />
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

export default UsersCard

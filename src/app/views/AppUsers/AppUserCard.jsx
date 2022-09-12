// material
import DeleteIcon from '@mui/icons-material/Delete'
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
import TextTruncate from 'react-text-truncate'
import avatar from './a.png'

const UsersCard = ({ user, onDelete, onEdit }) => {
    const UserImgStyle = styled('img')({
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
    })

    const onDeleteHandler = () => {
        onDelete(user)
    }

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <Box>
                    <CardMedia sx={{ pt: '100%', position: 'relative' }}>
                        <UserImgStyle alt={avatar} src={avatar} />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="subtitle2" noWrap>
                            {user.name}
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
                                    <TextTruncate
                                        line={1}
                                        element="span"
                                        truncateText="…"
                                        text={`Name: ${user.userName}`}
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
                                        textDecoration: '',
                                    }}
                                >
                                    <TextTruncate
                                        line={1}
                                        element="span"
                                        truncateText="…"
                                        text={`Email: ${user.email}`}
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
                                color="error"
                                onClick={onDeleteHandler}
                                style={{
                                    marginLeft: '5px',
                                    marginBottom: '5px',
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </Button>
                            {/* <button onClick={onEditHandler}>
                            <EditIcon />
                        </button> */}
                        </Typography>
                    </Typography>
                </CardActions>
            </Card>
        </>
    )
}

export default UsersCard

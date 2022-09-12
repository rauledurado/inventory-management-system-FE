import { Box, Card, CardHeader, Grid } from '@mui/material'
import { styled } from '@mui/system'
import config from 'config'
import moment from 'moment'
import { useLocation } from 'react-router-dom'

const AppUserDetail = () => {
    const { state } = useLocation()

    const Title = styled('span')(() => ({
        fontSize: '1rem',
        fontWeight: '500',
        textTransform: 'capitalize',
        display: 'flex',
    }))

    const FlexBox = styled(Box)(() => ({
        display: 'flex',
        alignItems: 'center',
    }))

    const JustifyBox = styled(FlexBox)(() => ({
        justifyContent: 'center',
    }))

    const IMG = styled('img')(() => ({
        width: '100%',
        height: '100%',
    }))

    const ContentBox = styled(JustifyBox)(() => ({
        padding: '32px',
        background: 'rgba(0, 0, 0, 0.01)',
    }))

    const imgeBaseUrl = 'uploads/'

    return (
        <>
            <Card elevation={3} sx={{ pt: '20px', mb: 10, margin: '50px' }}>
                <CardHeader>
                    <Title>USER DETAILS</Title>
                </CardHeader>
                <hr></hr>
                <Grid container>
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                        <ContentBox>
                            <IMG
                                src={
                                    config.base_url +
                                    '/' +
                                    imgeBaseUrl +
                                    state.category.photo
                                }
                                alt=""
                            />
                        </ContentBox>
                    </Grid>
                    <Grid
                        item
                        lg={7}
                        md={7}
                        sm={12}
                        xs={12}
                        style={{ padding: '1rem 3rem' }}
                    >
                        <h3>{state.category.name}</h3>

                        <br></br>

                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Created By: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.category.createdBy}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Modified By: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.category.modifiedBy}</b>
                                </span>
                            </Grid>
                        </Grid>

                        <hr></hr>

                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Created At: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {moment(
                                            state.category.createdAt
                                        ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Modified At: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.category.modifiedAt === undefined
                                            ? 'N/A'
                                            : moment(
                                                  state.category.createdAt
                                              ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default AppUserDetail

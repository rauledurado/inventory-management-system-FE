import React, { useEffect } from 'react'
import { Grid, Card, Icon, Fab } from '@mui/material'
import { lighten, styled, useTheme } from '@mui/system'
import axios from 'axios'
import config from 'config'
import { useNavigate } from 'react-router-dom'

const ContentBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wra,p',
    alignItems: 'center',
}))

const FabIcon = styled(Fab)(() => ({
    width: '44px !important',
    height: '44px !important',
    boxShadow: 'none !important',
}))

const H3 = styled('h3')(({ textcolor }) => ({
    margin: 0,
    fontWeight: '500',
    marginLeft: '12px',
    color: textcolor,
}))

const H1 = styled('h1')(({ theme }) => ({
    margin: 0,
    flexGrow: 1,
    color: theme.palette.text.secondary,
}))

const Span = styled('span')(({ textcolor }) => ({
    fontSize: '13px',
    color: textcolor,
    marginLeft: '4px',
}))

const IconBox = styled('div')(({ theme }) => ({
    width: 16,
    height: 16,
    overflow: 'hidden',
    borderRadius: '300px ',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    '& .icon': { fontSize: '14px' },
}))

const StatCards2 = () => {
    const { palette } = useTheme()
    const textError = palette.error.main
    const bgError = lighten(palette.error.main, 0.85)

    const navigate = useNavigate()

    const [officesLength, setOfficesLength] = React.useState("")

    useEffect(() => {
        getAllData()
    } , [])


    const getAllData = () => {
        axios
            .get(`${config.base_url}/api/v1/office`)
            .then((res) => {
                setOfficesLength(res.data.data.length)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        // axios
        //     .get(`${config.base_url}/api/v1/category`)
        //     .then((res) => {
        //         setCategoriesLength(res.data.data.length)
        //     })
        //     .catch((error) => {
        //         console.log(error, 'error')
        //     })
    }

    return (
        <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
                <Card elevation={3} sx={{ p: 2 }}>
                    <ContentBox>
                        <FabIcon
                            size="medium"
                            sx={{ background: 'rgba(9, 182, 109, 0.15)' }}
                        >
                            <Icon sx={{ color: '#08ad6c' }}>trending_up</Icon>
                        </FabIcon>
                        <H3 textcolor={'#08ad6c'}>No. Of Offices</H3>
                    </ContentBox>
                    <ContentBox sx={{ pt: 2 }}>
                        <H1>{officesLength}</H1>
                    </ContentBox>
                </Card>
            </Grid>
        </Grid>
    )
}

export default StatCards2

import React, { useEffect } from 'react'
import { Grid, Card, Icon, IconButton, Tooltip } from '@mui/material'
import { Box, styled } from '@mui/system'
import { Small } from 'app/components/Typography'
import axios from 'axios'
import config from 'config'
import { useNavigate } from 'react-router-dom'

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px !important',
    background: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
        padding: '16px !important',
    },
}))

const ContentBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& small': {
        color: theme.palette.text.secondary,
    },
    '& .icon': {
        opacity: 0.6,
        fontSize: '44px',
        color: theme.palette.primary.main,
    },
}))

const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontWeight: '500',
    fontSize: '14px',
    color: theme.palette.primary.main,
}))

const StatCards = () => {
    const navigate = useNavigate()

    const [usersLength, setUsersLength] = React.useState("")
    const [categoriesLength, setCategoriesLength] = React.useState("")
    const [purchasedItems, setPurchasedItems] = React.useState([])

    useEffect(() => {
        getAllData()
    } , [])


    const getAllData = () => {
        axios
            .get(`${config.base_url}/api/v1/employee`)
            .then((res) => {
                setUsersLength(res.data.data.length)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(`${config.base_url}/api/v1/category`)
            .then((res) => {
                setCategoriesLength(res.data.data.length)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(`${config.base_url}/api/v1/purchaseProduct`)
            .then((res) => {
                setPurchasedItems(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const handleOpenDetail = (page) => {
        navigate(page)
    }

    const totalInventoryCost = purchasedItems.reduce((acc, curr) => {
        return acc + curr.price
    } , 0);
    return (
        <Grid container spacing={3} sx={{ mb: '24px' }}>
            <Grid item xs={12} md={6}>
                <StyledCard elevation={6}>
                    <ContentBox>
                        <Icon className="icon">group</Icon>
                        <Box ml="12px">
                            <Small>Users</Small>
                            <Heading>{usersLength}</Heading>
                        </Box>
                    </ContentBox>
                    <Tooltip title="View Details" placement="top">
                        <IconButton onClick={() => handleOpenDetail("/user/usersList")}>
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard elevation={6}>
                    <ContentBox>
                        <Icon className="icon">attach_money</Icon>
                        <Box ml="12px">
                            <Small sx={{ lineHeight: 1 }}>
                                Total Inventory Cost
                            </Small>
                            <Heading>PKR {totalInventoryCost.toLocaleString()}</Heading>
                        </Box>
                    </ContentBox>
                    <Tooltip title="View Details" placement="top">
                        <IconButton onClick={() => handleOpenDetail("/items/purchasedItems")}>
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard elevation={6}>
                    <ContentBox>
                        <Icon className="icon">store</Icon>
                        <Box ml="12px">
                            <Small>Inventory Status</Small>
                            <Heading>{purchasedItems.length} Active Inventory</Heading>
                        </Box>
                    </ContentBox>
                    <Tooltip title="View Details" placement="top">
                        <IconButton onClick={() => handleOpenDetail("/items/purchasedItems")}>
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard elevation={6}>
                    <ContentBox>
                        <Icon className="icon">shopping_cart</Icon>
                        <Box ml="12px">
                            <Small>Total Categories</Small>
                            <Heading>{categoriesLength}</Heading>
                        </Box>
                    </ContentBox>
                    <Tooltip title="View Details" placement="top">
                        <IconButton onClick={() => handleOpenDetail("/categories/list")}>
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </StyledCard>
            </Grid>
        </Grid>
    )
}

export default StatCards

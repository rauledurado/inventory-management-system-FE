import React from 'react'
import { Card, Button } from '@mui/material'
import { styled } from '@mui/system'
import { convertHexToRGB } from 'app/utils/utils'

const CardRoot = styled(Card)(({ theme }) => ({
    marginBottom: '24px',
    padding: '24px !important',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px !important',
    },
}))

const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    position: 'relative',
    background: `rgb(${convertHexToRGB(
        theme.palette.primary.main
    )}, 0.15) !important`,
    padding: '24px !important',
    [theme.breakpoints.down('sm')]: {
        padding: '16px !important',
    },
}))

const Paragraph = styled('p')(({ theme }) => ({
    margin: 0,
    paddingTop: '24px',
    paddingBottom: '24px',
    color: theme.palette.text.secondary,
}))

const UpgradeCard = () => {
    return (
        <div>
            
        </div>
    );
}

export default UpgradeCard

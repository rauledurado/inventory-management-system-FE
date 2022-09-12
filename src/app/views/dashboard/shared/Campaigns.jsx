import React, { useEffect } from 'react'
import { Small } from 'app/components/Typography'
import { Box, useTheme } from '@mui/system'
import { SimpleCard, MatxProgressBar } from 'app/components'
import axios from 'axios'
import config from 'config'


const Campaigns = () => {
    const theme = useTheme()
    
    const [purchasedItems, setPurchasedItems] = React.useState([]);
    const [inUseValue, setInUseValue] = React.useState(0);
    const [replacementValue, setReplacementValue] = React.useState(0);
    const [scrapValue, setScrapValue] = React.useState(0);

    useEffect(() => {
        getAllData()
    } , [])

    const getAllData = () => {
        axios

            .get(`${config.base_url}/api/v1/purchaseProduct`)
            .then((res) => {
                setPurchasedItems(res.data.data)

                const inUse = res.data.data.filter(item => item.status === 'inuse')


                setInUseValue(inUse.length)

                const replacement = res.data.data.filter(item => item.status === 'replacement')

                setReplacementValue(replacement.length)

                const scrap = res.data.data.filter(item => item.status === 'scrap')

                setScrapValue(scrap.length)

            })
            .catch((error) => {
                console.log(error, 'error')
            })}
    const secondary = theme.palette.text.secondary

    return (
        <div>
            <SimpleCard title="Inventoery Status">
                <Box sx={{ pt: 1 }} />
                <MatxProgressBar
                    value={(inUseValue / purchasedItems.length) * 100}
                    color="primary"
                    text="In-Use"
                />
                <Box sx={{ py: '4px' }} />
                <MatxProgressBar
          value={(replacementValue / purchasedItems.length) * 100}
                    color="secondary"
                    text="In-Stcok"
                />
                <Box sx={{ py: '4px' }} />
                <MatxProgressBar
                   value={(scrapValue / purchasedItems.length) * 100}
                    color="primary"
                    text="Replacement"
                />
            </SimpleCard>
        </div>
    )
}

export default Campaigns

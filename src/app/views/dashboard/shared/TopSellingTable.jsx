import {
    Avatar, Card, Switch, Table, TableBody, TableCell, TableHead,
    TableRow
} from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import { Paragraph } from 'app/components/Typography'
import axios from 'axios'
import config from 'config'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import React from 'react'

import './pagination.css'
const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))



const ProductTable = styled(Table)(() => ({
    minWidth: 400,
    whiteSpace: 'pre',
    '& small': {
        height: 15,
        width: 50,
        borderRadius: 500,
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': {
        borderBottom: 'none',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const Small = styled('small')(({ bgcolor }) => ({
    height: 15,
    width: 50,
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}))

const TopSellingTable = () => {
    const { palette } = useTheme()

    const [purchasedItems, setPurchasedItems] = useState([])

    useEffect(() => {
        getAllData()
        console.log("purchase items",purchasedItems);
    } , [])

    const getAllData = () => {
        axios
            .get(`${config.base_url}/api/v1/purchaseProduct`)
            .then((res) => {
                setPurchasedItems(res.data.data)
            })
            .catch((error) => {
                console.log(error)
            } )
    }
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main


    const [pageNumber, setPageNumber] = React.useState(0)
    const [users, setUsers] = React.useState([])
   const usersPerPage = 8
   const pagesVisited = pageNumber * usersPerPage
   const pageCount = Math.ceil(purchasedItems.length / usersPerPage)
   
   const changePage = ({ selected }) => {
    setPageNumber(selected)
}



    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>Top Inventory (by quantity)</Title>
                {/* <Select size="small" defaultValue="this_month">
                    <MenuItem value="this_month">This Month</MenuItem>
                    <MenuItem value="last_month">Last Month</MenuItem>
                </Select> */}
            </CardHeader>
            <Box overflow="auto">
                <ProductTable>
               
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                Name
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Price
                            </TableCell>
                            {/* <TableCell sx={{ px: 0 }} colSpan={2}>
                                Active
                            </TableCell> */}
                            <TableCell sx={{ px: 0 }} colSpan={1}>
                                Stock Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {purchasedItems.sort((a,b)=>(b.quantity > a.quantity) ? 1 : -1)
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map((product, index) => (
                            <TableRow key={index} hover>
                                <TableCell
                                    colSpan={4}
                                    align="left"
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={product.product[0]?.photo} />
                                        <Paragraph sx={{ m: 0, ml: 4 }}>
                                            {product.product[0]?.name}
                                        </Paragraph>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    PKR &nbsp;
                                    {product?.price}
                                </TableCell>

                                {/* <TableCell
                                    sx={{ px: 0 }}
                                    align="left"
                                    colSpan={2}
                                >
                                    {product.status ? (
                                        product.status === true ? (
                                           
                                                <Switch defaultChecked />
                                            
                                        ) : (
                                            <Small>
                                                in stock
                                            </Small>
                                        )
                                    ) : (
                                        <Small>
                                            out of stock
                                        </Small>
                                    )}
                                </TableCell> */}
                                <TableCell sx={{ px: 0 }} colSpan={1}>
                                    {product.quantity}
                                </TableCell>
                            </TableRow>
                        ))}
<TableRow>
{purchasedItems.length > 0 && (
                    <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={'paginationBttns'}
                    previousLinkClassName={'previousBttn'}
                    nextLinkClassName={'nextBttn'}
                    disabledClassName={'paginationDisabled'}
                    activeClassName={'paginationActive'}
                    disableInitialCallback={true}
                    />
                )}
</TableRow>
                    </TableBody>
                  
                </ProductTable>
              
               
            </Box>
           
        </Card>
        
    )
}
const productList = [{
    id:1,
    name:"TABLES",
    price:"1200",
    coverImage:'https://img.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_768,dpr_2.0,q_auto:good,b_rgb:f5f6f4/v4/catalog/product/asset/3/2/b/e/32be1f750db0ebaaa7f06a4fe36e3ac7088aaa6b_TBLDVI017BLK_UK_Deauville_Extending_Dining_Table_Oak_Charcoal_Black_ar3_2_LB01_PS.png',
    colors:"black",
    status: true,
    priceSale:"12000",
    quantity: "12"
  },{
    id:3,
    name:"CHAIRS",
    cover:"coverimage",
    price:"10500",
    coverImage:'https://sc04.alicdn.com/kf/Hfe84e2ce9f1a41deb620baae3fee230bo.jpg',
    colors:"black",
    status: true,
    priceSale:"1200",
    quantity: "08"
  },{
    id:4,
    name:"SOFAS",
    cover:"coverimage",
    coverImage:'https://sc04.alicdn.com/kf/H197463f73be24ae5b8ca20cd671736bcf.jpg',
    price:"7850",
    colors:"black",
    status:true ,
    priceSale:"1200",
    quantity: "25"

  },{
    id:6,
    name:"LAPTOPS",
    cover:"coverimage",
    price:"6600",
    coverImage:'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
    colors:"black",
    status:true ,
    priceSale:"1200",
    quantity: "55"
  },{
    id:7,
    name:"LED'S",
    cover:"coverimage",
    price:"568",
    colors:"black",
    coverImage:'https://sc04.alicdn.com/kf/Ha5969bdc1fa941a0abd148617c235f2c6.jpg',
    status:true ,
    priceSale:"1200",
    quantity: "12"
  },{
    id:8,
    name:"CABNET'S",
    cover:"coverimage",
    price:"1200",
    colors:"black",
    coverImage:'https://sc04.alicdn.com/kf/H8840ba1e7c1e4a87a8f90fe055f04f7b4.jpg',
    status:true ,
    priceSale:"1200",
    quantity: "33",
  }]
export default TopSellingTable

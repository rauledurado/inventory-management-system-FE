import React from 'react'
import { Paragraph } from 'app/components/Typography'
import { Box, styled, useTheme } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import {
    Card,
    Icon,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    MenuItem,
    Select,
} from '@mui/material'

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

const SearchProductsTable = () => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main
    const navigate = useNavigate()

    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
             
            <Box overflow="auto">
                <ProductTable>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                Product Name
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Category
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Quantity
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={1}>
                                Average Price
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList.map((product, index) => (
                            <TableRow key={index} hover onClick={()=>navigate("/products/details/main")}>
                                <TableCell
                                    colSpan={4}
                                    align="left"
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={product.coverImage} />
                                        <Paragraph sx={{ m: 0, ml: 4 }}>
                                            {product.name}
                                        </Paragraph>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                   
                                        {product.category} 
                                </TableCell>

                                <TableCell
                                    sx={{ px: 0 }}
                                    align="left"
                                    colSpan={2}
                                >
                            <Small bgcolor={bgSecondary}>
                                {product.quantity} 
                                </Small>
                                </TableCell>
                                <TableCell sx={{ px: 0 }} colSpan={1}>
                                <Small bgcolor={bgPrimary}>
                                Rs {product.priceSale}  
                                </Small>
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ProductTable>
            </Box>
        </Card>
    )
}

const productList = [{
    id:1,
    name:"Glass Dining Room Set Metal Leg",
    price:"1200",
    coverImage:'https://sc04.alicdn.com/kf/Hdc887d99681d4ee49ecd721a5b84eddbO.jpg',
    colors:"black",
    status:"active",
    category:"Table",
    priceSale:"1200",
    quantity:"80"


  },{
    id:2,
    name:"Pure Wood Table",
    cover:"coverimage",
    price:"1200",
    coverImage:'https://sc04.alicdn.com/kf/H6bd0cecce9034464ace0221e3cbc99d7l.jpg',
    colors:"black",
    status:"active",
    category:"Table",
    priceSale:"1200",
    quantity:"120"


  },{
    id:3,
    name:"Middle back conference net cloth Chair",
    cover:"coverimage",
    price:"1200",
    coverImage:'https://sc04.alicdn.com/kf/Hfe84e2ce9f1a41deb620baae3fee230bo.jpg',
    colors:"black",
    status:"active",
    category:"Chair",
    priceSale:"1200",
    quantity:"10"


  },{
    id:4,
    name:"Pure Leather Sofa",
    cover:"coverimage",
    coverImage:'https://sc04.alicdn.com/kf/H197463f73be24ae5b8ca20cd671736bcf.jpg',
    price:"1200",
    colors:"black",
    status:"active",
    category:"Sofa",
    priceSale:"1200",
    quantity:"50"


  },{
    id:5,
    name:"Nordic Upholstered Velvet Sofa ",
    cover:"coverimage",
    price:"1200",
    colors:"black",    
    coverImage:'https://sc04.alicdn.com/kf/H5aecfcc540de4edcbe4c4974ef5148bd1.jpg',
    status:"active",
    category:"Sofa",
    priceSale:"1200",
    quantity:"40"


  },{
    id:6,
    name:"Core i7 RAM 8GB ROM 256 GB Laptop Computer Notebook",
    cover:"coverimage",
    price:"1200",
    coverImage:'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
    colors:"black",
    category:"Laptop",
    status:"active",
    priceSale:"1200",
    quantity:"30"


  },{
    id:7,
    name:" AIO Core I3 I5 I7 Laptops For Office Gaming ",
    cover:"coverimage",
    price:"1200",
    colors:"black",
    coverImage:'https://sc04.alicdn.com/kf/Ha5969bdc1fa941a0abd148617c235f2c6.jpg',
    status:"active",
    category:"Laptop",
    priceSale:"1200",
    quantity:"20"


  },{
    id:8,
    name:"Wooden Wardrobe Cabinet Clothes Closet",
    cover:"coverimage",
    price:"1200",
    colors:"black",
    coverImage:'https://sc04.alicdn.com/kf/H8840ba1e7c1e4a87a8f90fe055f04f7b4.jpg',
    status:"active",
    category:"Cabinet",
    priceSale:"1200",
    quantity:"20"


  }]

export default SearchProductsTable

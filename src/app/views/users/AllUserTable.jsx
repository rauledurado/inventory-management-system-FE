import { Grid } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import {
  Card, MenuItem,
  Select, Table, TableBody, TableCell, TableHead,
  TableRow
} from '@mui/material';
import Button from '@mui/material/Button';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
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

const AllUsersTable = () => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main
    const navigate = useNavigate()
    const [category, setCategory] = React.useState('');
    const [categoryError, setcategoryError] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const[image, setImage] = React.useState('')

  const [quantity, setQuantity] = React.useState('');
    
    const handleChange = (e, func, errorFunc) => {
        func(e.target.value);

        errorFunc(false)
      }
      const handleImage = (e) => {
        setImage(e.target.files[0])
      
      }

      const Input = styled('input')({
        display: 'none',
      });
    
    
      const handleClose = () => {
        setCategory('')
        setOpen(false);
      }; 
      const handleType = (event) => {
        setQuantity(event.target.value);
      };
    

     
      
    return (
        <>
        <Card elevation={3}  sx={{ pt: '20px', mAllUsersTableb: 10, margin: '50px' }}>
            <Box overflow="auto">
                <ProductTable>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                Office Address
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Price
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Transfer
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList.map((product, index) => (
                            <TableRow key={index} hover >
                                <TableCell
                                    colSpan={4}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Paragraph >
                                            {product.location}
                                        </Paragraph>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                   
                                        {product.price} 
                                </TableCell>

                                <TableCell
                                    sx={{ px: 0 }}
                                    align="left"
                                    colSpan={2}
                                >
                            <Button onClick={()=>setOpen(true)}>Transfer</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ProductTable>
            </Box>
            
        </Card>
        <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Transfer To"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <br></br>
            <Grid container spacing={3}>

              <Grid item lg={10} md={10} sm={10} xs={10}  >
              <Box sx={{ minWidth: 120 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">User</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quantity}
                    label="User"
                    onChange={handleType}

                  >
                    <MenuItem value={10}>ali</MenuItem>
                    <MenuItem value={20}>umer</MenuItem>
                    <MenuItem value={20}>usman</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              </Grid>


              <Grid item lg={3} md={3} sm={3} xs={3}   >

              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={4}   >


              </Grid>


            </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button >
            Confirm
          </Button>
        </DialogActions>

      </Dialog>

    


        </>
    )
}

const productList = [
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'CA-265, 7th Rd, Block F Satellite Town, Rawalpindi, 46300',
        price: 100000,
        purchaser: "Asad Ullah Baig",
        vendor: "Syed Rafay Javaid"
    },
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'Office #304-B Amna Plaza, near Radio Pakistan, Rawalpindi',
        price: 110000,
        purchaser: "Asad Ullah Baig",
        vendor: "Syed Rafay Javaid"
    },
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'Waheed Plaza, Blue Area,, G 6/2 Blue Area, Islamabad',
        price: 900000,
        purchaser: "Noor Imad Khan",
        vendor: "Syed Farhan Ali "
    },
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'G-5/2 G-5, Islamabad, Islamabad Capital Territory 43600',
        price: 105000,
        purchaser: "Abu Bakkar Khan",
        vendor: "Khurram Shahzad"
    },
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'Kashif Plaza، G-8 Markaz G 8 Markaz G-8, Islamabad',
        price: 110000,
        purchaser: "Khurram Shahzad",
        vendor: "Majeed Ahmed Ali"
    },
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'STP -3, Block A, Ground Floor , I-9, Islamabad, 44000',
        price: 130000,
        purchaser: "Sarfarz Hassan",
        vendor: "Hassan Ali"
    },
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'P583+2QC, Bani Gala, Islamabad, Islamabad Capital Territory',
        price: 115000,
        purchaser: "Zubair Ali khan",
        vendor: "Muzamil Iqrar"
    },
]

export default AllUsersTable

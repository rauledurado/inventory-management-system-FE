import React ,{ useRef }  from 'react'
import { Box, styled } from '@mui/system'
import { Card,CardContent,Grid } from '@mui/material'
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { Fab  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Barcode from 'react-barcode';



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
    display:"flex",
 
}))

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))


const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))


const ContentBox = styled(JustifyBox)(() => ({
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
    height:'100%'
}))



const ProductDetailMain = () => {

    const navigate = useNavigate()
    const value = "00400964000007"

    





  return (
            <>
    
            <Tooltip title="Add Product">
                <Fab color="secondary" aria-label="Add" size="medium"  style={{zIndex:999,right:"4vw",bottom:"10vh",position:"fixed"}} onClick={()=>navigate('/products/add')} >
                        <AddIcon />
                    </Fab>
                </Tooltip>


          <Card elevation={3} sx={{ pt: '20px', mb: 10 ,margin:"50px"}}>
                <CardHeader>
                <Title>PRODUCT DETAILS</Title>
                </CardHeader>
                    <hr></hr>
                <Grid container>
                <Grid item lg={5} md={5} sm={12} xs={12}  >
                            <ContentBox >
                                <IMG
                                src="https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg"
                                alt=""
                                />
                            </ContentBox>

                </Grid>
                <Grid item lg={7} md={7} sm={12} xs={12} style={{padding: "1rem 3rem"}}>
                <h3>Apple MacBook X512FL-EJ723T 10th Gen Intel Core i9</h3>

                    


                    <br></br>

                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                            <span>Product Type: </span>
                            <span style={{color: 'green'}}><b>Saleable</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Categoery Name: </span>
                            <span style={{color: 'green'}}><b>Laptops</b></span>
                        </Grid>  
                    </Grid>
                    
                    <hr></hr>

                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Purchase Price:   </span>
                            <span style={{color: 'green'}}><b>Rs 10000</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Quantity: </span>
                            <span style={{color: 'green'}}><b>23</b></span>
                        </Grid>  
                    </Grid>
                    <hr></hr>
                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Purchaser Name:   </span>
                            <span style={{color: 'green'}}><b>Asadullah Baig</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Vendor Name: </span>
                            <span style={{color: 'green'}}><b>Syed Rafay Javaid</b></span>
                        </Grid>  
                    </Grid>
                    <hr></hr>
                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Comment's:   </span>
                            <span style={{color: 'green'}}><b>In Use</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Modified By: </span>
                            <span style={{color: 'green'}}><b>N/A</b></span>
                        </Grid>  
                    </Grid>
                    <hr></hr>
                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Purcahse Date: </span>
                            <span style={{color: 'green'}}><b>12-26-2021</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Last Modified: </span>
                            <span style={{color: 'green'}}><b>N/A</b></span>
                        </Grid>  
                    </Grid>
                    <hr></hr>
                    <Box>
                    <span>Office Address:</span>   
                    <span style={{color: 'green'}}> CA-265, 7th Rd, Block F Satellite Town, Rawalpindi, 46300</span> 
                    </Box>
                    <hr></hr>
                    <Grid container >
                        <Grid item  lg={12} md={12} sm={12} xs={12} >
                        <span>Barcode: </span>
                        <div >
                        <Barcode  value={value}  height='30px' ></Barcode>
                        </div>
                        
                        
                      
                     
                        </Grid>  
                    </Grid>
                
    
                    <br></br>
                   
                </Grid>
                </Grid>
            </Card>
   
            </>
  


   
  )
}

export default ProductDetailMain
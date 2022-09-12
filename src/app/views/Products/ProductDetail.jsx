// import React ,{useState, useEffect} from 'react'

// material
import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { makeStyles } from '@material-ui/core/styles'
import { Card } from '@mui/material'
import Box from '@mui/material/Box'
import { styled } from '@mui/system'
import axios from 'axios'
import moment from 'moment'
import config from 'config'
import avatar from '../AppUsers/a.png'
import noImage from '../../../images/no-image.jpg'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { ConfirmationDialog } from 'app/components'
import ReactPaginate from 'react-paginate'
import AssetsNameCard from './AssetsNameCard'
import {
   
    Fab,
  
    IconButton,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
   
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    display: 'flex',
}))

const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))
const BrandTable = styled(Table)(() => ({
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

const Input = styled('input')({
    display: 'none',
})

const ProductsList = () => {
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

    const { state } = useLocation()

    const imgeBaseUrl = 'uploads/'

    const [categoryName, setCategoryName] = React.useState('')
    const [productTypeName, setProductTypeName] = React.useState('')
    const [brandName, setBrandName] = React.useState('')
    const [assetsNameData, setassetsNameData] = React.useState([])
    const [assetsNameId, setassetsNameId] = React.useState("")
    const [createAssetsNameError, setCreateAssetsNameError] =
    React.useState(false)
    const [createAssetsDialog, setCreateAssetsDialog] = React.useState(false)
    const [assets, setAssets] = React.useState([])
    const [snackBar, setSnackBar] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [editAssetsDialog, setEditAssetsDialog] = React.useState(false)
    const [editAssetsName, setEditAssetsName] = React.useState('')
    const [productId, setProductId] = React.useState('')
    const handleCreateClose = () => {
        setCreateAssetsDialog(false)
        setassetsNameData('')
        setCreateAssetsNameError(false)
    }




    useEffect(() => {
       getAlldata()
            axios
                .get(`${config.base_url}/api/v1/assetsName`)
                .then((res) => {
                    setassetsNameData(res.data.data)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
                // if (productId) {
                //     console.log("productId",productId)
                  
                //     getAssetsNameById(productId)
                   
                // }
    

    }, [])
    const userName = localStorage.getItem('username')


    // const getAssetsNameById = (productId) => {
    //     axios
    //         .post(config.base_url + `/api/v1/PurchaseProduct/assetName/${productId}`)
    //         .then((res) => {
    //             setAssets(res.data.data)
    //         })
    //         .catch((error) => {
    //             console.log(error, 'error')
    //         })
    // }

    const getAlldata = () => {
        console.log(state.product?._id)
        axios
            .post(`${config.base_url}/api/v1/PurchaseProduct/assetName/${state.product?._id}`)
            .then((res) => {
                setAssets(res.data.data)
                // setSearchBrandsList(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const handleClosed = () => {
        setSnackBar(false)
    }

    const onEdithandler = (editDataId, editDataName) => {
        setEditAssetsDialog(true)

        setEditAssetsName(editDataName)
        setassetsNameData(editDataId)
    }


    const onDelhandler = (id) => {
        setOpen(true)
        setassetsNameId(id)
        if (open && assetsNameId) {
            axios
                .delete(`${config.base_url}/api/v1/assetsName/${assetsNameId}`)
                .then((res) => {
                    getAlldata()
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClosed}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClosed}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )


        //  const postAssetsName = () => {
        //     axios
        //     .post(
        //         `${config.base_url}/api/v1/assetsName`
        //     )
        //     .then((res) => {
        //         setassetsNameData(res.data.data)
        //     })
        //     .catch((error) => {
        //         console.log(error, 'error')
        //     })
        // }

    const notAvailable = 'N/A'



    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)

        errorFunc(false)
    }

    const createHandler = () => {
        let data = new FormData()
        data.append('name', assetsNameData)
        data.append('createdBy', userName)
        data.append("productId",  state.product?._id)

        const assetsNameExist = assets.find((assets) => {
            return assets.name === assetsNameData
        })

        if (assetsNameExist) {
            setSnackBar(true)
            return
        }

        axios
            .post(`${config.base_url}/api/v1/assetsName`, data)
            .then((res) => {
                if (res) {
                    // getAlldata()
                    handleCreateClose()
                }

                setassetsNameData('')
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const handleCreateClickOpen = () => {
        // Check if any field of Form is Empty
        if (assetsNameData === '') {
            setCreateAssetsNameError(true)
        } else {
            createHandler()
        }
    }


    return (
        <>
     
            <Card elevation={3} sx={{ pt: '20px', mb: 10, margin: '50px' }}>
                <CardHeader>
                    <Title>ASSETS DETAILS</Title>
                   
                </CardHeader>
                <hr></hr>
                <Grid container>
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                        {/* <ContentBox>
                            <IMG
                                src={
                                    state.product.photo === 'no-image' || state.product.photo === "no-photo.jpg" ||
                            state.product.photo === undefined
                                        ? noImage
                                        : config.base_url +
                                          '/' +
                                          imgeBaseUrl +
                                          state.product.photo
                                }
                                alt=""
                            />
                        </ContentBox> */}
                    </Grid>
                    <Grid
                        item
                        lg={7}
                        md={7}
                        sm={12}
                        xs={12}
                        style={{ padding: '1rem 3rem' }}
                    >
                        <h3>{state.product.name}</h3>

                        <br></br>

                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Product Type: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        { state.product.productType[0]?state.product.productType[0].name : notAvailable
                                }
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Categoery Name: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                    { state.product.category[0]?state.product.category[0].name : notAvailable}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>

                        <hr></hr>

                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Avg Price: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.product.averagePrice ===
                                        undefined
                                            ? notAvailable
                                            : state.product.averagePrice.toFixed(
                                                  2
                                              )}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Quantity: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.product.quantity === undefined
                                            ? notAvailable
                                            : state.product.quantity}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            {/* <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Model: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.product.model === undefined
                                            ? notAvailable
                                            : state.product.model}
                                    </b>
                                </span>
                            </Grid> */}
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Brand: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                    { state.product.brand[0]?state.product.brand[0].name : notAvailable}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Created Date: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {moment(
                                            state.product?.createdAt
                                        ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Last Modified: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.product.modifiedAt === undefined
                                            ? moment(
                                                  state.product.createdAt
                                              ).format('LL')
                                            : moment(
                                                  state.product.modifiedAt
                                              ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Box>
                            <h4>Detail: </h4>
                            {state.product.detail === undefined
                                ? notAvailable
                                : state.product.detail}
                        </Box>

                        <br></br>
                    </Grid>
                </Grid>
            </Card>
            {/* //2nd------------------------------------- card */}



            {open && (
                <ConfirmationDialog
                    open={open}
                    onConfirmDialogClose={() => {
                        setOpen(false)
                    }}
                    title={`Are You Sure?`}
                    text={`Are You Sure You Want To Delete This AssetsName?`}
                    onYesClick={onDelhandler}
                />
            )}
            <Card elevation={3} sx={{ pt: '20px', mb: 10, margin: '50px' }}>
            
                <CardHeader>
                    <Title>ASSETS/NAMES</Title>
                </CardHeader>
                <hr></hr>
                <Box overflow="auto">
                    <BrandTable>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{ px: 3 }}
                                    align="left"
                                    colSpan={4}
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    sx={{ px: 3 }}
                                    align="center"
                                    colSpan={2}
                                >
                                    Create Date
                                </TableCell>
                                <TableCell
                                    sx={{ px: 3 }}
                                    align="center"
                                    colSpan={2}
                                >
                                    Modification Date
                                </TableCell>
                                <TableCell
                                    sx={{ px: 0 }}
                                    align="center"
                                    colSpan={2}
                                >
                                    Edit
                                </TableCell>
                                <TableCell
                                    sx={{ px: 0 }}
                                    align="center"
                                    colSpan={2}
                                >
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assets
                                .map((asset, index) => (
                                    <AssetsNameCard
                                        key={index}
                                        asset={asset}
                                        onEdit={onEdithandler}
                                        onDelete={onDelhandler}
                                    />
                                ))}
                        </TableBody>
                    </BrandTable>
                </Box>

                <Grid container>
                    <Grid
                        item
                        lg={7}
                        md={7}
                        sm={12}
                        xs={12}
                        style={{ padding: '1rem 3rem' }}
                    >
                        {/* {assetsNameData.map((e,index)=><h3 key={index}>{e.name}</h3>)} */}


                        <Dialog
                open={createAssetsDialog}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'ADD AssetsName'}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <br></br>
                    <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                error={createAssetsNameError}
                                id="AssetsName"
                                label="Assets Name"
                                placeholder="Enter Assets Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    createAssetsNameError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                // value={assetsNameData}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setassetsNameData,
                                        setCreateAssetsNameError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateClose}>Cancel</Button>
                    <Button autoFocus onClick={handleCreateClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>

                <Snackbar
                    open={snackBar}
                    autoHideDuration={6000}
                    onClose={handleClosed}
                    message="Name already exists"
                    action={action}
                />
            </Dialog>


                        <br></br>
                     

                        <Grid container>
                           
                            {/* <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Quantity: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.product.quantity === undefined
                                            ? notAvailable
                                            : state.product.quantity}
                                    </b>
                                </span>
                            </Grid> */}
                        </Grid>
                        <Tooltip title="Add AssetsName">
                <Fab
                    color="secondary"
                    aria-label="Add"
                    size="medium"
                    style={{
                        zIndex: 999,
                        right: '4vw',
                        bottom: '8vh',
                        position: 'fixed',
                    }}
                    onClick={() => setCreateAssetsDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}
      

// qrcode

const useStyles = makeStyles((theme) => ({
    conatiner: {
        marginTop: 10,
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#3f51b5',
        color: '#fff',
        padding: 20,
    },
    btn: {
        marginTop: 10,
        marginBottom: 20,
    },
}))

export default ProductsList

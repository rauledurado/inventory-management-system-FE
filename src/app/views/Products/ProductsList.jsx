// import React ,{useState, useEffect} from 'react'

// material
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import {
    Autocomplete,
    Container,
    Fab,
    Grid,
    IconButton,
    Snackbar,
    Typography,
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/products/ProductCard'

import { makeStyles } from '@material-ui/core/styles'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import CloseIcon from '@mui/icons-material/Close'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { CardContent } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/system'
import { ConfirmationDialog } from 'app/components'
import axios from 'axios'
import QRCode from 'qrcode'
import { CSVLink } from 'react-csv'
import ReactPaginate from 'react-paginate'
import config from '../../../config'
import '../users/user.css'

const Input = styled('input')({
    display: 'none',
})

const ProductsList = () => {
    const userName = localStorage.getItem('username')

    const [productId, setProductId] = React.useState('')

    const [snackBar, setSnackBar] = React.useState(false)

    // Form validation errors State Setting
    const [createName, setCreateName] = React.useState('')
    const [createNameError, setCreateNameError] = React.useState(false)
    const [createProductTypeName, setCreateProductTypeName] =
        React.useState(null)
    const [createProductTypeNameError, setCreateProductTypeNameError] =
        React.useState(false)
    const [createProductBrandName, setCreateProductBrandName] =
        React.useState(null)
    const [createProductCategory, setCreateProductCategory] =
        React.useState(null)
    const [createProductCategoryError, setCreateProductCategoryError] =
        React.useState(false)

    const [createBrandName, setCreateBrandName] = React.useState(null)
    const [createBrandNameError, setCreateBrandNameError] =
        React.useState(false)
    const [newCreateBrand, setNewCreateBrand] = React.useState(null)
    const [newCreateCategory, setNewCreateCategory] = React.useState(null)
    const [createDescription, setCreateDescription] = React.useState('')
    const [createDescriptionError, setCreateDescriptionError] =
        React.useState(false)

    const [editName, setEditName] = React.useState('')
    const [editNameError, setEditNameError] = React.useState(false)
    const [editProductTypeName, setEditProductTypeName] = React.useState(null)
    const [editProductTypeNameError, setEditProductTypeNameError] =
        React.useState(false)
    const [editProductCategory, setEditProductCategory] = React.useState(null)
    const [editProductCategoryError, setEditProductCategoryError] =
        React.useState(false)

    const [editBrandName, setEditBrandName] = React.useState(null)
    const [editBrandNameError, setEditBrandNameError] = React.useState(false)
    const [editDescription, setEditDescription] = React.useState('')
    const [editDescriptionError, setEditDescriptionError] =
        React.useState(false)

    const [image, setImage] = React.useState('')
    const [imageError, setImageError] = React.useState(false)
    const [createdBy, setCreatedBy] = React.useState(userName)
    const [createdByError, setCreatedByError] = React.useState(false)
    const [modifiedBy, setModifiedBy] = React.useState(userName)
    const [modifiedByError, setModifiedByError] = React.useState(false)

    const [createProductDialog, setCreateProductDialog] = React.useState(false)
    const [editProductDialog, setEditProductDialog] = React.useState(false)

    // Setting States
    const [quantity, setQuantity] = React.useState([])
    const [category, setCategory] = React.useState([])
    const [product1, setProduct1] = React.useState([])
    const [brands, setBrands] = React.useState([])
    const [offices, setOffices] = React.useState({})

    // web came code
    ///Search filters state
    const [pname, setPname] = React.useState(null)
    const [createdby, setCreatedby] = React.useState(null)
    const [createdbysearch, setCreatedsearch] = React.useState([])
    const [pname1, setPname1] = React.useState([])
    const [productType, setProductType] = React.useState(null)
    const [productType1, setProductType1] = React.useState([])
    const [productcategory, setProductcategory] = React.useState(null)
    const [productcategory1, setProductcategory1] = React.useState([])
    const [selectbrand, setSelectbrand] = React.useState(null)
    const [selectbrand1, setSelectbrand1] = React.useState([])
    const [selectcreateby, setSelectcreateby] = React.useState()
    const [selectcreateby1, setSelectcreateby1] = React.useState([])
    const [employeeDialogs, setEmployeeDialogs] = React.useState(false)
    const [searchCreatedBy, setSearchCreatedBy] = React.useState([])
    const [searchProductsList, setSearchProductList] = React.useState([])

    const [text1, setText1] = useState('')
    const [open, setOpen] = React.useState(false)
    const [imageUrl1, setImageUrl1] = useState('')
    const [scanResultFile, setScanResultFile] = useState('')
    const classes = useStyles()

    const [pageNumber, setPageNumber] = React.useState(0)
    const ProductsPerPage = 8
    const pagesVisited = pageNumber * ProductsPerPage
    const pageCount = Math.ceil(product1.length / ProductsPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)

        errorFunc(false)
    }

    const handleCreateClickOpen = () => {
        // Check if any field of Form is Empty
        if (
            createName === '' ||
            createProductTypeName === null ||
            createProductCategory === null ||
            createBrandName === null ||
            createDescription === ''
        ) {
            if (createName === '') {
                setCreateNameError(true)
            }
            if (createDescription === '') {
                setCreateDescriptionError(true)
            }
            if (createProductTypeName === null) {
                setCreateProductTypeNameError(true)
            }
            if (createProductCategory === null) {
                setCreateProductCategoryError(true)
            }
            if (createBrandName === null) {
                setCreateBrandNameError(true)
            }
        } else {
            checking()
        }
    }

    const handleEditClickOpen = () => {
        // Check if any field of Form is Empty
        if (
            editName === '' ||
            editProductTypeName === null ||
            editProductCategory === null ||
            editBrandName === null ||
            editDescription === ''
        ) {
            if (editName === '') {
                setEditNameError(true)
            }
            if (editDescription === '') {
                setEditDescriptionError(true)
            }
            if (editProductTypeName === null) {
                setEditProductTypeNameError(true)
            }
            if (editProductCategory === null) {
                setEditProductCategoryError(true)
            }
            if (editBrandName === null) {
                setEditBrandNameError(true)
            }
        } else {
            editHandler()
        }
    }

    const handleCreateClose = () => {
        setCreateProductDialog(false)
        setCreateName('')
        setCreateProductTypeName(null)
        setCreateProductCategory(null)
        setCreateDescription('')
        setCreateBrandName(null)
        setCreateNameError(false)
        setCreateProductTypeNameError(false)
        setCreateProductCategoryError(false)
        setCreateDescriptionError(false)
        setCreateBrandNameError(false)
    }

    const handleEditClose = () => {
        setEditProductDialog(false)
        setEditName('')
        setEditProductTypeName(null)
        setEditProductCategory(null)
        setEditDescription('')
        setEditBrandName(null)
        setEditNameError(false)
        setEditProductTypeNameError(false)
        setEditProductCategoryError(false)
        setEditDescriptionError(false)
        setEditBrandNameError(false)
    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    useEffect(() => {
        getAlldata()
    }, [])
    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/products`)
            .then((res) => {
                setProduct1(res.data.data)
                setSearchProductList(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(`${config.base_url}/api/v1/office`)
            .then((res) => {
                setOffices(res.data.data)
            })
            .catch((error) => {})
        // axios
        // .get(`${config.base_url}/api/v1/products/createdBySuggestions`)
        // .then((res) => {
        //     setCreatedsearch(res.data.data)
        // })
        // .catch((error) => {
        //     console.log(error, 'error')
        // })
        axios
            .get(config.base_url + '/api/v1/category')
            .then((res) => {
                setCategory(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(config.base_url + '/api/v1/productType')
            .then((res) => {
                setQuantity(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(config.base_url + '/api/v1/brand')
            .then((res) => {
                setBrands(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .post(config.base_url + '/api/v1/products/createdBySuggestions')

            .then((res) => {
                // console.log(res.data.data,"rgrewrewtwrt")
                setSearchCreatedBy(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    ///api send data for the search api
    const searchData = () => {
        let data = new FormData()

        data.append('createdBy', createdby ? createdby._id : '')

        data.append('categoryId', productcategory ? productcategory._id : '')
        data.append('productTypeId', productType ? productType._id : '')
        data.append('brandId', selectbrand ? selectbrand._id : '')
        data.append('productId', pname ? pname._id : '')

        axios
            .post(`${config.base_url}/api/v1/products/searchProducts/`, data)

            .then((res) => {
                setProduct1(res.data.data)
                // console.log(res.data.data)
            })
            .catch((error) => {
                alert('Record Not Found')
                console.log(error, 'error')
            })
    }

    const checking = () => {
        let data = new FormData()

        data.append('name', createName)
        data.append('productTypeId', createProductTypeName._id)
        data.append('categoryId', createProductCategory._id)

        data.append('brandId', createBrandName._id)
        data.append('file', image)
        data.append('createdBy', createdBy)
        data.append('detail', createDescription)

        const productNameExist = product1.find((product) => {
            return product.name === createName
        })

        if (productNameExist) {
            setSnackBar(true)
            return
        }

        axios
            .post(config.base_url + '/api/v1/products ', data)
            .then((res) => {
                if (res) {
                    handleCreateClose()
                    getAlldata()
                }
                setImage()
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const onEditHandler = (id, product) => {
        setEditProductDialog(true)
        setEditName(product.name)
        setEditProductTypeName(product.productType[0])
        setEditProductCategory(product.category[0])

        setEditBrandName(product.brand[0])
        setImage(product.photo)
        setModifiedBy(product.createdBy)
        setEditDescription(product.detail)
        setProductId(id)
    }

    const editHandler = () => {
        let data = new FormData()
        data.append('name', editName)
        data.append('productTypeId', editProductTypeName._id)
        data.append('categoryId', editProductCategory._id)

        data.append('brandId', editBrandName._id)
        data.append('photo', image)
        data.append('modifiedBy', modifiedBy)
        data.append('detail', editDescription)

        // const productNameExist = product1.find((product) => {
        //     return product.name === editName
        // })

        // if (productNameExist) {
        //     setSnackBar(true)
        //     return
        // }

        axios
            .put(config.base_url + `/api/v1/products/${productId}`, data)
            .then((res) => {
                if (res) {
                    getAlldata()
                    handleEditClose()
                }
            })
            .catch((error) => {
                if (error.message === 'Request failed with status code 400') {
                    setSnackBar(true)
                }
            })
    }

    const onDelhandler = (id) => {
        setProductId(id)
        setOpen(true)
        if (open && productId) {
            axios
                .delete(config.base_url + `/api/v1/products/${productId}`)
                .then((res) => {
                    getAlldata()
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setSnackBar(false)
    }

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const headers = [
        { label: 'Product Name', key: 'name' },
        { label: 'Product Id', key: 'productId' },

        { label: 'Detail', key: 'detail' },
        { label: 'Quantity', key: 'quantity' },
        { label: 'Average Price', key: 'averagePrice' },
        { label: 'Creation Date', key: 'createdAt' },
        { label: 'Created By', key: 'createdBy' },
        { label: 'Last Modified', key: 'modifiedAt' },
        { label: 'Modified By', key: 'modifiedBy' },
    ]

    ///////add fe3atue demay data
    const handlesearchClose = () => {
        setEmployeeDialogs(false)
    }

    //////post data
    const ApplyFilters = () => {
        setEmployeeDialogs(false)
        searchData()
    }

    return (
        <>
            {open && (
                <ConfirmationDialog
                    open={open}
                    onConfirmDialogClose={() => {
                        setOpen(false)
                    }}
                    title={`Are You Sure?`}
                    text={`Are You Sure You Want To Delete This Product?`}
                    onYesClick={onDelhandler}
                />
            )}
            <Tooltip title="Add Assets / Items">
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
                    onClick={() => setCreateProductDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Tooltip title="Search Filters">
                <Fab
                    color="primary"
                    aria-label="Add"
                    size="medium"
                    style={{
                        zIndex: 999,
                        right: '4vw',
                        top: '9vh',
                        position: 'fixed',
                    }}
                    onClick={() => setEmployeeDialogs(true)}
                >
                    <SearchIcon />
                </Fab>
            </Tooltip>
            <Tooltip title="Generate Report">
                <Fab
                    color="primary"
                    aria-label="Add"
                    size="medium"
                    style={{
                        zIndex: 999,
                        right: '9vw',
                        top: '9vh',
                        position: 'fixed',
                    }}
                >
                    <CSVLink
                        filename={'all-products.csv'}
                        data={product1}
                        headers={headers}
                    >
                        <div style={{ marginTop: '8px' }}>
                            <SummarizeIcon />
                        </div>
                    </CSVLink>
                </Fab>
            </Tooltip>

            <Container>
                <br></br>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Assets / Items
                </Typography>
                <Grid container spacing={3}>
                    {product1
                        .slice(pagesVisited, pagesVisited + ProductsPerPage)
                        .map((product) => (
                            <Grid
                                key={product._id}
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                            >
                                <ProductCard
                                    product={product}
                                    onDelete={onDelhandler}
                                    onEdit={onEditHandler}
                                />
                            </Grid>
                        ))}
                </Grid>
                <br />
                {product1.length > 0 && (
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
                        disableInitialCallback={false}
                    />
                )}
            </Container>

            <Dialog
                open={createProductDialog}
                fullWidth={true}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD ASSETS / ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <br></br>

                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={createNameError}
                                    id="name"
                                    label="Product Name"
                                    placeholder="Product Name"
                                    autoComplete="off"
                                    helperText={
                                        createNameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={createName}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCreateName,
                                            setCreateNameError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Autocomplete
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={quantity}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                error={
                                                    createProductTypeNameError
                                                }
                                                {...params}
                                                label="Product Type"
                                                helperText={
                                                    createProductTypeNameError &&
                                                    'Field Required'
                                                }
                                            />
                                        )
                                    }}
                                    value={createProductTypeName}
                                    onChange={(_event, product) => {
                                        setCreateProductTypeName(product)
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '13rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={brands}
                                    filterSelectedOptions={true}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Brands"
                                            />
                                        )
                                    }}
                                    value={createBrandName}
                                    onChange={(_event, brand) => {
                                        setCreateBrandName(brand)
                                    }}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Autocomplete
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) => {
                                        return option.name
                                    }}
                                    options={category}
                                    renderInput={(params) => (
                                        <TextField
                                            error={createProductCategoryError}
                                            {...params}
                                            label="Category"
                                            size="small"
                                            helperText={
                                                createProductCategoryError &&
                                                'Field Required'
                                            }
                                        />
                                    )}
                                    value={createProductCategory}
                                    onChange={(event, category) => {
                                        setCreateProductCategory(category)
                                    }}
                                />
                            </Grid>

                            <Grid
                                item
                                lg={4}
                                md={4}
                                sm={6}
                                xs={6}
                                style={{ justifyContent: 'center' }}
                            >
                                {/* <Box>
                                    <label htmlFor="contained-button-file">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={handleImage}
                                        />
                                        <Button
                                            variant="contained"
                                            component="span"
                                            startIcon={<AddAPhotoIcon />}
                                        >
                                            Upload1
                                        </Button>
                                    </label>
                                </Box> */}
                            </Grid>
                        </Grid>

                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    disabled
                                    error={createdByError}
                                    id="name"
                                    label="Created By"
                                    placeholder="Created By"
                                    autoComplete="off"
                                    helperText={
                                        setCreatedByError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={createdBy}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCreatedBy,
                                            setCreatedByError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    label="Detail"
                                    placeholder="Detail"
                                    style={{ textAlign: 'left' }}
                                    hinttext="Message Field"
                                    floatinglabeltext="MultiLine and FloatingLabel"
                                    multiline
                                    fullWidth
                                    rows={3}
                                    value={createDescription}
                                    error={createDescriptionError}
                                    helperText={
                                        createDescriptionError &&
                                        'Field Required'
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCreateDescription,
                                            setCreateDescriptionError
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
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
                    onClose={handleClose}
                    message="Name already exists"
                    action={action}
                />
            </Dialog>

            <Dialog
                open={editProductDialog}
                fullWidth={true}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'EDIT ASSETS / ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <br></br>

                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    error={editNameError}
                                    id="name"
                                    label="Product Name"
                                    placeholder="Product Name"
                                    autoComplete="off"
                                    helperText={
                                        editNameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={editName}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEditName,
                                            setEditNameError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box>
                                    <Autocomplete
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        isOptionEqualToValue={(
                                            option,
                                            value
                                        ) => {
                                            return option._id === value._id
                                        }}
                                        getOptionLabel={(option) => {
                                            return option.name
                                        }}
                                        options={quantity}
                                        renderInput={(params) => (
                                            <TextField
                                                error={editProductTypeNameError}
                                                {...params}
                                                label="Product Type"
                                                size="small"
                                                helperText={
                                                    editProductTypeNameError &&
                                                    'Field Required'
                                                }
                                            />
                                        )}
                                        value={editProductTypeName}
                                        onChange={(event, productType) => {
                                            setEditProductTypeName(productType)
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box>
                                    <Autocomplete
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        isOptionEqualToValue={(
                                            option,
                                            value
                                        ) => {
                                            return option._id === value._id
                                        }}
                                        getOptionLabel={(option) => {
                                            return option.name
                                        }}
                                        options={category}
                                        renderInput={(params) => (
                                            <TextField
                                                error={editProductCategoryError}
                                                {...params}
                                                label="Product Category"
                                                size="small"
                                                helperText={
                                                    editProductCategoryError &&
                                                    'Field Required'
                                                }
                                            />
                                        )}
                                        value={editProductCategory}
                                        onChange={(event, productCategory) => {
                                            setEditProductCategory(
                                                productCategory
                                            )
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={8} md={8} sm={8} xs={8}>
                                <Box sx={{ minWidth: 120 }}>
                                    <Autocomplete
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        isOptionEqualToValue={(
                                            option,
                                            value
                                        ) => {
                                            return option._id === value._id
                                        }}
                                        getOptionLabel={(option) => {
                                            return option.name
                                        }}
                                        options={brands}
                                        renderInput={(params) => (
                                            <TextField
                                                error={editBrandNameError}
                                                {...params}
                                                label="Brand"
                                                size="small"
                                                helperText={
                                                    editBrandNameError &&
                                                    'Field Required'
                                                }
                                            />
                                        )}
                                        value={editBrandName}
                                        onChange={(event, brand) => {
                                            console.log('editBrand', brand)
                                            setEditBrandName(brand)
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid
                                item
                                lg={4}
                                md={4}
                                sm={4}
                                xs={4}
                                style={{ justifyContent: 'center' }}
                            >
                                <Box>
                                    <label htmlFor="contained-button-file">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={handleImage}
                                        />
                                        <Button
                                            variant="contained"
                                            component="span"
                                            startIcon={<AddAPhotoIcon />}
                                        >
                                            Upload2
                                        </Button>
                                    </label>
                                </Box>
                            </Grid>
                        </Grid>
                        <br></br>

                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    disabled
                                    error={modifiedByError}
                                    id="name"
                                    label="Modified By"
                                    placeholder="Modified By"
                                    autoComplete="off"
                                    helperText={
                                        modifiedByError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={modifiedBy}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setModifiedBy,
                                            setModifiedByError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    label="Detail"
                                    placeholder="Detail"
                                    style={{ textAlign: 'left' }}
                                    hinttext="Message Field"
                                    floatinglabeltext="MultiLine and FloatingLabel"
                                    multiline
                                    fullWidth
                                    rows={3}
                                    value={editDescription}
                                    error={editDescriptionError}
                                    helperText={
                                        editDescriptionError && 'Field Required'
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEditDescription,
                                            setEditDescriptionError
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button autoFocus onClick={handleEditClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>
                <Snackbar
                    open={snackBar}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Name already exists"
                    action={action}
                />
            </Dialog>

            {/* /////search filter of the data */}

            <Dialog
                open={employeeDialogs}
                onClose={handlesearchClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{'Search Filters'}</DialogTitle>

                <DialogContent style={{ width: '500px' }}>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Box>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '13rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={searchCreatedBy}
                                    filterSelectedOptions={true}
                                    getOptionLabel={(option) => `${option._id}`}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Created By"
                                            />
                                        )
                                    }}
                                    value={createdby}
                                    onChange={(_event, vender) => {
                                        setCreatedby(vender)
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Box>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '13rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={category}
                                    filterSelectedOptions={true}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) =>
                                        `${option.name}`
                                    }
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Category"
                                            />
                                        )
                                    }}
                                    value={productcategory}
                                    onChange={(_event, vender) => {
                                        setProductcategory(vender)
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Box>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '13rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={quantity}
                                    filterSelectedOptions={true}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) =>
                                        `${option.name}`
                                    }
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Product Type"
                                            />
                                        )
                                    }}
                                    value={productType}
                                    onChange={(_event, vender) => {
                                        setProductType(vender)
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Box>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '13rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={brands}
                                    filterSelectedOptions={true}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) =>
                                        `${option.name}`
                                    }
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Brands"
                                            />
                                        )
                                    }}
                                    value={selectbrand}
                                    onChange={(_event, vender) => {
                                        console.log(vender)
                                        setSelectbrand(vender)
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Box>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '13rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={searchProductsList}
                                    filterSelectedOptions={true}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) =>
                                        `${option.name}`
                                    }
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Product Name"
                                            />
                                        )
                                    }}
                                    value={pname}
                                    onChange={(_event, vender) => {
                                        setPname(vender)
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlesearchClose}>Cancel</Button>
                    <Button autoFocus onClick={ApplyFilters}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

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

import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import SummarizeIcon from '@mui/icons-material/Summarize'
import {
    Card,
    Fab,
    Grid,
    IconButton,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Autocomplete,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { Box, styled } from '@mui/system'
import { ConfirmationDialog } from 'app/components'
import axios from 'axios'
import React, { useEffect } from 'react'
import { CSVLink } from 'react-csv'
import ReactPaginate from 'react-paginate'
import config from '../../../config'
import '../users/user.css'
import BrandCard from './BrandCard'

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

const Brands = () => {
    // Form validation errors State Setting

    const userName = localStorage.getItem('username')

    const [createBrandName, setCreateBrandName] = React.useState('')
    const [createBrandNameError, setCreateBrandNameError] =
        React.useState(false)
    const [editBrandName, setEditBrandName] = React.useState('')
    const [editBrandNameError, setEditBrandNameError] = React.useState(false)

    // Setting States
    const [quantity, setQuantity] = React.useState([])
    const [brand, setBrand] = React.useState([])
    const [searchbrands, setSearchBrands] = React.useState()
    const [brandId, setBrandId] = React.useState('')
    const [image, setImage] = React.useState('')
    const [snackBar, setSnackBar] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [searchBrandsList, setSearchBrandsList] = React.useState([])

    const [pageNumber, setPageNumber] = React.useState(0)
    const BrandsPerPage = 8
    const pagesVisited = pageNumber * BrandsPerPage
    const pageCount = Math.ceil(brand.length / BrandsPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)

        errorFunc(false)
    }

    const [createBrandDialog, setCreateBrandDialog] = React.useState(false)
    const [editBrandDialog, setEditBrandDialog] = React.useState(false)

    const handleCreateClose = () => {
        setCreateBrandDialog(false)
        setCreateBrandName('')
        setCreateBrandNameError(false)
    }
    const handleEditClose = () => {
        setEditBrandDialog(false)
        setEditBrandName('')
        setEditBrandNameError(false)
    }
    const handleClosed = () => {
        setSnackBar(false)
    }

    const handleCreateClickOpen = () => {
        // Check if any field of Form is Empty
        if (createBrandName === '') {
            setCreateBrandNameError(true)
        } else {
            createHandler()
        }
    }

    const handleEditClickOpen = () => {
        // Check if any field of Form is Empty
        if (editBrandName === '') {
            setEditBrandNameError(true)
        } else {
            editHandler()
        }
    }
    ///////
    const SEARCH = () => {
        let data = new FormData()

        data.append('searchbrands', searchbrands)

        //  console.log(searchproductList,"data responce of t")
        axios
            .get(`${config.base_url}/api/v1/brand/${searchbrands._id}`)

            .then((res) => {
                setBrand([res.data.data])
                console.log(res.data.data, 'data responce of t')
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    //////
    useEffect(() => {
        getAlldata()
    }, [])
    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/brand`)
            .then((res) => {
                setBrand(res.data.data)
                setSearchBrandsList(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const onDelhandler = (id) => {
        setOpen(true)
        setBrandId(id)
        if (open && brandId) {
            axios
                .delete(`${config.base_url}/api/v1/brand/${brandId}`)
                .then((res) => {
                    getAlldata()
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    const onEdithandler = (editDataId, editDataName) => {
        setEditBrandDialog(true)

        setEditBrandName(editDataName)
        setBrandId(editDataId)
    }

    const createHandler = () => {
        let data = new FormData()
        data.append('name', createBrandName)
        data.append('createdBy', userName)

        const brandNameExist = brand.find((brand) => {
            return brand.name === createBrandName
        })

        if (brandNameExist) {
            setSnackBar(true)
            return
        }

        axios
            .post(`${config.base_url}/api/v1/brand`, data)
            .then((res) => {
                if (res) {
                    getAlldata()
                    handleCreateClose()
                }

                setCreateBrandName('')
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const editHandler = () => {
        let data = new FormData()
        data.append('name', editBrandName)

        const brandNameExist = brand.find((brand) => {
            return brand.name === editBrandName
        })

        if (brandNameExist) {
            setSnackBar(true)
            return
        }

        axios
            .put(`${config.base_url}/api/v1/brand/${brandId}`, data)
            .then((res) => {
                if (res) {
                    getAlldata()
                    handleEditClose()
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
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

    const headers = [
        { label: 'Brand Name', key: 'name' },
        { label: 'Brand Id', key: 'brandId' },
        { label: 'Creation Date', key: 'createdAt' },
        { label: 'Created By', key: 'createdBy' },
        { label: 'Last Modified', key: 'modifiedAt' },
        { label: 'Modified By', key: 'modifiedBy' },
    ]

    const [employeeDialogs, setEmployeeDialogs] = React.useState(false)
    const handleEmployeeClose = () => {
        setEmployeeDialogs(false)
    }

    //////post data
    const ApplyFilters = () => {
        setEmployeeDialogs(false)
        SEARCH()
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
                    text={`Are You Sure You Want To Delete This Brand?`}
                    onYesClick={onDelhandler}
                />
            )}
            <Typography variant="h4" sx={{ m: 5 }}>
                Brands
            </Typography>

            <Card elevation={3} sx={{ pt: '20px', mx: 5 }}>
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
                            {brand
                                .slice(
                                    pagesVisited,
                                    pagesVisited + BrandsPerPage
                                )
                                .map((brand, index) => (
                                    <BrandCard
                                        key={index}
                                        brand={brand}
                                        onEdit={onEdithandler}
                                        onDelete={onDelhandler}
                                    />
                                ))}
                        </TableBody>
                    </BrandTable>
                </Box>
            </Card>

            <br></br>
            {brand.length > 0 && (
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
                />
            )}

            <Tooltip title="Generate Report">
                <Fab
                    color="primary"
                    aria-label="Add"
                    size="medium"
                    style={{
                        zIndex: 999,
                        right: '4vw',
                        top: '11vh',
                        position: 'fixed',
                    }}
                >
                    <CSVLink
                        filename={'all-brands.csv'}
                        data={brand}
                        headers={headers}
                    >
                        <div style={{ marginTop: '8px' }}>
                            <SummarizeIcon />
                        </div>
                    </CSVLink>
                </Fab>
            </Tooltip>

            <Dialog
                open={createBrandDialog}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'ADD BRAND'}</DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                error={createBrandNameError}
                                id="brandname"
                                label="Brand Name"
                                placeholder="Enter Brand Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    createBrandNameError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={createBrandName}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCreateBrandName,
                                        setCreateBrandNameError
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

            <Dialog
                open={editBrandDialog}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'EDIT BRAND'}
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                error={editBrandNameError}
                                id="brandname"
                                label="Brand Name"
                                placeholder="Enter Brand Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    editBrandNameError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={editBrandName}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEditBrandName,
                                        setEditBrandNameError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
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
                    onClose={handleClosed}
                    message="Name already exists"
                    action={action}
                />
            </Dialog>
            {/* /////search filter of the data */}
            <Dialog
                open={employeeDialogs}
                onClose={handleEmployeeClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{'Search Filters'}</DialogTitle>

                <DialogContent style={{ width: '500px', height: '200px' }}>
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
                                    options={searchBrandsList}
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
                                                label="Brand Name"
                                            />
                                        )
                                    }}
                                    value={searchbrands}
                                    onChange={(_event, vender) => {
                                        setSearchBrands(vender)
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEmployeeClose}>Cancel</Button>
                    <Button autoFocus onClick={ApplyFilters}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Tooltip title="Search Filters">
                <Fab
                    color="primary"
                    aria-label="Add"
                    size="medium"
                    style={{
                        zIndex: 999,
                        right: '9vw',
                        top: '11vh',
                        position: 'fixed',
                    }}
                    onClick={() => setEmployeeDialogs(true)}
                >
                    <SearchIcon />
                </Fab>
            </Tooltip>
            <Tooltip title="Add Brand">
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
                    onClick={() => setCreateBrandDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </>
    )
}

export default Brands

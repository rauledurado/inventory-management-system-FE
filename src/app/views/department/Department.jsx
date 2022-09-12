import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import SummarizeIcon from '@mui/icons-material/Summarize'
import SearchIcon from '@mui/icons-material/Search'
import {
    Autocomplete,
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
} from '@mui/material'

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
import DepartmentCard from './DepartmentCard'
import WingCard from './WingCard'

const DepartmentTable = styled(Table)(() => ({
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

const Department = () => {
    const userName = localStorage.getItem('username')
    const [wingdata, setWingdata] = React.useState([])
    const [searchwing, setSearchwing] = React.useState(null)
    const [searchdepartments, setSearchDepartments] = React.useState(null)
    const [searchDepartment, setSearchDepartment] = React.useState([])
    // Form validation errors State Setting
    const [createBrandName, setCreateBrandName] = React.useState('')
    const [createBrandNameError, setCreateBrandNameError] =
        React.useState(false)
    const [editBrandName, setEditBrandName] = React.useState('')
    const [editBrandNameError, setEditBrandNameError] = React.useState(false)

    const [wingName, setWingName] = React.useState('')
    const [wingNameError, setWingNameError] = React.useState(false)
    const [departments, setDepartments] = React.useState([])

    const [departmentId, setDepartmentId] = React.useState('')
    const [wings, setWings] = React.useState([])
    const [selectedDepartment, setSelectedDepartment] = React.useState(null)

    const [createWingDialog, setCreateWingDialog] = React.useState(false)
    const [viewWingDialog, setViewWingDialog] = React.useState(false)
    const [wingId, setWingId] = React.useState('')
    const [editWingDialog, setEditWingDialog] = React.useState(false)

    // Setting States
    const [brandId, setBrandId] = React.useState('')
    const [snackBar, setSnackBar] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [openConfirmationDialog, setOpenConfirmationDialog] =
        React.useState(false)

    const [pageNumber, setPageNumber] = React.useState(0)
    const DepartmentsPerPage = 8
    const pagesVisited = pageNumber * DepartmentsPerPage
    const pageCount = Math.ceil(departments.length / DepartmentsPerPage)
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
        setCreateBrandNameError(false)
        setCreateBrandName('')
        setCreateBrandNameError(false)
    }
    const handleEditClose = () => {
        setEditBrandDialog(false)
        setEditBrandNameError(false)
        setEditBrandName('')
        setEditBrandNameError(false)
    }
    const handleEditWingClose = () => {
        setEditWingDialog(false)
        setWingNameError(false)
    }
    const handleClosed = () => {
        setSnackBar(false)
    }

    const handleCreateWingClose = () => {
        setCreateWingDialog(false)
        setWingName('')
        setWingNameError(false)
    }

    const handleViewWingClose = () => {
        setViewWingDialog(false)
    }

    const handleCreateClickOpen = () => {
        // Check if any field of Form is Empty
        if (createBrandName === '') {
            setCreateBrandNameError(true)
        } else {
            createHandler()
        }
    }
    const handleCreateWingClickOpen = () => {
        // Check if any field of Form is Empty
        if (wingName === '') {
            setWingNameError(true)
        } else {
            createWingHandler()
        }
    }
    const handleEditWingClickOpen = () => {
        // Check if any field of Form is Empty
        if (wingName === '') {
            setWingNameError(true)
        } else {
            editWingHandler()
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

    useEffect(() => {
        getAlldata()
        getSeggive()
        if (departmentId) {
            getDepartment(departmentId)
            getWing(departmentId)
        }
    }, [departmentId])

    const getDepartment = (departmentId) => {
        axios
            .get(`${config.base_url}/api/v1/department/${departmentId}`)
            .then((res) => {
                setSelectedDepartment(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const getWing = (departmentId) => {
        axios
            .get(`${config.base_url}/api/v1/wing/${departmentId}`)
            .then((res) => {
                setWings(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/department`)
            .then((res) => {
                setDepartments(res.data.data)
                setSearchDepartment(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const onDelhandler = (editData) => {
        setOpenConfirmationDialog(true)
        setDepartmentId(editData)

        if (openConfirmationDialog && departmentId) {
            axios
                .delete(`${config.base_url}/api/v1/department/${departmentId}`)
                .then((res) => {
                    getAlldata()
                    setOpenConfirmationDialog(false)
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

    const onEditHandler = (id, wing) => {
        setEditWingDialog(true)
        setWingId(id)
        setWingName(wing.name)
    }

    const editWingHandler = () => {
        let data = new FormData()

        data.append('name', wingName)
        data.append('department', selectedDepartment?._id)

        axios
            .put(`${config.base_url}/api/v1/wing/${wingId}`, data)
            .then((res) => {
                if (res) {
                    getAlldata()
                    getWing(departmentId)
                    handleEditWingClose()
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const onDelHandler = (id) => {
        setWingId(id)
        setOpen(true)

        if (open && wingId) {
            axios
                .delete(`${config.base_url}/api/v1/wing/${wingId}`)
                .then((res) => {
                    getWing(departmentId)
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    const createWingHandler = () => {
        let data = new FormData()

        data.append('name', wingName)
        data.append('createdBy', userName)
        data.append('department', selectedDepartment?._id)

        // const wingNameExist = wings.find((wing) => {
        //     return wing.name === wingName
        // })

        // if (wingNameExist) {
        //     setSnackBar(true)
        //     return
        // }

        axios
            .post(`${config.base_url}/api/v1/wing`, data)
            .then((res) => {
                if (res) {
                    getAlldata()
                    handleCreateWingClose()
                }

                setWingName('')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const openCreateWingDialog = (department) => {
        setCreateWingDialog(true)
        setSelectedDepartment(department)
    }

    const openViewWingDialog = (department) => {
        setViewWingDialog(true)

        setDepartmentId(department?._id)

        axios
            .get(`${config.base_url}/api/v1/wing/${department?._id}`)
            .then((res) => {
                setWings(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const createHandler = () => {
        let data = new FormData()
        data.append('name', createBrandName)
        data.append('createdBy', userName)

        const brandNameExist = departments.find((brand) => {
            return brand.name === createBrandName
        })

        if (brandNameExist) {
            setSnackBar(true)
            return
        }

        axios
            .post(`${config.base_url}/api/v1/department`, data)

            .then((res) => {
                if (res) {
                    getAlldata()
                    handleCreateClose()
                }
            })
            .catch((error) => {})
    }

    const editHandler = () => {
        let data = new FormData()
        data.append('name', editBrandName)
        data.append('modifiedBy', userName)

        const brandNameExist = departments.find((brand) => {
            return brand.name === editBrandName
        })

        if (brandNameExist) {
            setSnackBar(true)
            return
        }

        axios
            .put(`${config.base_url}/api/v1/department/${brandId}`, data)
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

    ////// get the wing seggive
    const getSeggive = () => {
        axios
            .post(`${config.base_url}/api/v1/wing/wingsSuggestions`)
            .then((res) => {
                if (res) {
                    setWingdata(res.data.data)
                }

                ///  setWingName('')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    /////search for the replace of the data
    const searchData = () => {
        let data = new FormData()

        data.append(
            'departmentId',
            searchdepartments ? searchdepartments._id : ''
        )
        data.append('wingName', searchwing ? searchwing._id : '')
        axios
            .post(`${config.base_url}/api/v1/department/searchDepartment`, data)

            .then((res) => {
                setDepartments(res.data.data)
                setSearchDepartments(null)
                setSearchwing(null)
            })
            .catch((error) => {
                alert('Record Not Found')
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
        { label: 'Department Name', key: 'name' },
        { label: 'Wings', key: 'wings' },
        { label: 'Creation Date', key: 'createdAt' },
        { label: 'Created By', key: 'createdBy' },
        { label: 'Last Modified', key: 'modifiedAt' },
        { label: 'Modified By', key: 'modifiedBy' },
    ]

    //////search dialog
    const [employeeDialogs, setEmployeeDialogs] = React.useState(false)
    const handleEmployeeClose = () => {
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
                    text={`Are You Sure You Want To Delete This Wing?`}
                    onYesClick={onDelHandler}
                />
            )}
            {openConfirmationDialog && (
                <ConfirmationDialog
                    open={openConfirmationDialog}
                    onConfirmDialogClose={() => {
                        setOpenConfirmationDialog(false)
                    }}
                    title={`Are You Sure?`}
                    text={`Are You Sure You Want To Delete This Department?`}
                    onYesClick={onDelhandler}
                />
            )}
            <Typography variant="h4" sx={{ m: 5 }}>
                Departments
            </Typography>
            <Card elevation={3} sx={{ pt: '20px', mx: 5 }}>
                <Box overflow="auto">
                    <DepartmentTable>
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
                                    View Wings
                                </TableCell>
                                <TableCell
                                    sx={{ px: 3 }}
                                    align="center"
                                    colSpan={2}
                                >
                                    Add Wings
                                </TableCell>
                                <TableCell
                                    sx={{ px: 0 }}
                                    align="center"
                                    colSpan={2}
                                >
                                    Edit Department
                                </TableCell>
                                <TableCell
                                    sx={{ px: 0 }}
                                    align="center"
                                    colSpan={2}
                                >
                                    Delete Department
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departments
                                .slice(
                                    pagesVisited,
                                    pagesVisited + DepartmentsPerPage
                                )
                                .map((brand, index) => (
                                    <DepartmentCard
                                        key={index}
                                        brand={brand}
                                        onCreateWingDialogOpen={
                                            openCreateWingDialog
                                        }
                                        onViewWingDialogOpen={
                                            openViewWingDialog
                                        }
                                        onEdit={onEdithandler}
                                        onDelete={onDelhandler}
                                    />
                                ))}
                        </TableBody>
                    </DepartmentTable>
                </Box>
            </Card>
            <br></br>
            {departments.length > 0 && (
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
                        filename={'all-departments.csv'}
                        data={departments}
                        headers={headers}
                    >
                        <div style={{ marginTop: '8px' }}>
                            <SummarizeIcon />
                        </div>
                    </CSVLink>
                </Fab>
            </Tooltip>

            <Dialog
                open={createWingDialog}
                onClose={handleCreateWingClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'ADD WINGS'}</DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                error={wingNameError}
                                id="brandname"
                                label="Wing Name"
                                placeholder="Enter Wing Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    wingNameError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={wingName}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setWingName,
                                        setWingNameError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateWingClose}>Cancel</Button>
                    <Button autoFocus onClick={handleCreateWingClickOpen}>
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
                open={editWingDialog}
                onClose={handleEditWingClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'EDIT WINGS'}
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={wingNameError}
                                id="brandname"
                                label="Wing Name"
                                placeholder="Enter Wing Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    wingNameError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={wingName}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setWingName,
                                        setWingNameError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Box sx={{ minWidth: 120 }}>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '4rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={departments}
                                    filterSelectedOptions={true}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Department"
                                            />
                                        )
                                    }}
                                    value={selectedDepartment}
                                    onChange={(_event, department) => {
                                        setSelectedDepartment(department)
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditWingClose}>Cancel</Button>
                    <Button autoFocus onClick={handleEditWingClickOpen}>
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
                open={viewWingDialog}
                onClose={handleViewWingClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'VIEW WINGS'}
                </DialogTitle>
                <DialogContent style={{ minWidth: '600px' }}>
                    <br></br>
                    <Grid container spacing={3}>
                        {wings.length > 0 && (
                            <Box overflow="auto">
                                <DepartmentTable>
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
                                                Created Date
                                            </TableCell>
                                            <TableCell
                                                sx={{ px: 3 }}
                                                align="center"
                                                colSpan={2}
                                            >
                                                Last Modified
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
                                        {wings.map((brand, index) => (
                                            <WingCard
                                                key={index}
                                                wing={brand}
                                                onEdit={onEditHandler}
                                                onDelete={onDelHandler}
                                            />
                                        ))}
                                    </TableBody>
                                </DepartmentTable>
                            </Box>
                        )}
                        {wings.length === 0 && (
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                No Record Found
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleViewWingClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={createBrandDialog}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Add Department'}
                </DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                error={createBrandNameError}
                                id="brandname"
                                label="Department Name"
                                placeholder="Enter Department Name"
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
                    {'EDIT DEPARTMENT'}
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                error={editBrandNameError}
                                id="brandname"
                                label="Department Name"
                                placeholder="Enter Department Name"
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

                <DialogContent style={{ width: '500px', height: '220px' }}>
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
                                    options={searchDepartment}
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
                                                label="Department"
                                            />
                                        )
                                    }}
                                    value={searchdepartments}
                                    onChange={(_event, vender) => {
                                        setDepartmentId(vender._id)
                                        setSearchDepartments(vender)
                                    }}
                                />
                            </Box>
                        </Grid>
                        <br></br>
                        <br></br>
                        <br></br>
                      
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Box>
                                {departmentId ? (
                                    <Autocomplete
                                        ListboxProps={{
                                            style: { maxHeight: '11rem' },
                                            position: 'bottom-start',
                                        }}
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={wings}
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
                                                    label="Departments Wing"
                                                />
                                            )
                                        }}
                                        value={searchwing}
                                        onChange={(_event, vender) => {
                                            setSearchwing(vender)
                                        }}
                                    />
                                ) : (
                                    <Autocomplete
                                        ListboxProps={{
                                            style: { maxHeight: '13rem' },
                                            position: 'bottom-start',
                                        }}
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={wingdata}
                                        filterSelectedOptions={true}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) =>
                                            `${option._id}`
                                        }
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="Wing Departments"
                                                />
                                            )
                                        }}
                                        value={searchwing}
                                        onChange={(_event, vender) => {
                                            setSearchwing(vender)
                                        }}
                                    />
                                )}
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

            <Tooltip title="Add department">
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

export default Department

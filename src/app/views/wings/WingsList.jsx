import AddIcon from '@mui/icons-material/Add'
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
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { makeStyles } from '@mui/styles'
import { Box, styled } from '@mui/system'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import WingsCard from './WingsCard'
import CloseIcon from '@mui/icons-material/Close'
import config from '../../../config'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { CSVLink } from 'react-csv'

const WingsTable = styled(Table)(() => ({
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

const WingsList = () => {
    // Form validation errors State Setting
    const [wingName, setWingName] = React.useState('')
    const [wingNameError, setWingNameError] = React.useState(false)
    const [selectedDepartment, setSelectedDepartment] = React.useState(null)

    // Setting States
    const [departments, setDepartments] = React.useState([])
    const [snackBar, setSnackBar] = React.useState(false)

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)

        errorFunc(false)
    }

    const [createBrandDialog, setCreateBrandDialog] = React.useState(false)
    const [editBrandDialog, setEditBrandDialog] = React.useState(false)

    const handleCreateClose = () => {
        setCreateBrandDialog(false)
        setWingNameError(false)
    }
    const handleEditClose = () => {
        setEditBrandDialog(false)
        setWingNameError(false)
    }
    const handleClosed = () => {
        setSnackBar(false)
    }

    const handleCreateClickOpen = () => {
        // Check if any field of Form is Empty
        if (wingName === '') {
            setWingNameError(true)
        } else {
            createHandler()
        }
    }

    const handleEditClickOpen = () => {
        // Check if any field of Form is Empty
        if (wingName === '') {
            setWingNameError(true)
        } else {
            editHandler()
        }
    }

    const handleOpen = (id) => {
        setCreateBrandDialog(true)
    }
    const handleClickOpen2 = () => {
        setCreateBrandDialog(true)
    }

    useEffect(() => {
        getAlldata()
    }, [])
    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/department`)
            .then((res) => {
                setDepartments(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const onDelhandler = (editData) => {
        axios
            .delete(`${config.base_url}/api/v1/department/${editData}`)
            .then((res) => {
                getAlldata()
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const onEdithandler = (id, wing) => {
        setEditBrandDialog(true)
        // setEditBrandName(editDataName)
        // setBrandId(editDataId)
    }

    const navigate = useNavigate()

    const createHandler = () => {
        let data = new FormData()
        data.append('name', wingName)

        // const brandNameExist = departments.find((brand) => {
        //     return brand.name === wingName
        // })

        // if (brandNameExist) {
        //     setSnackBar(true)
        //     return
        // }

        axios
            .post(`${config.base_url}/api/v1/department`, data)
            .then((res) => {
                if (res) {
                    getAlldata()
                    handleCreateClose()
                }

                setWingName('')
            })
            .catch((error) => {})
    }

    const editHandler = () => {
        // let data = new FormData()
        // data.append('name', editBrandName)
        // const brandNameExist = brand.find((brand) => {
        //     return brand.name === editBrandName
        // })
        // if (brandNameExist) {
        //     setSnackBar(true)
        //     return
        // }
        // axios
        //     .put(`${config.base_url}/api/v1/department/${brandId}`, data)
        //     .then((res) => {
        //         if (res) {
        //             getAlldata()
        //             handleEditClose()
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error, 'error')
        //     })
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
        { label: 'Creation Date', key: 'createdAt' },
    ]

    return (
        <>
            <Typography variant="h4" sx={{ m: 5 }}>
                Wings
            </Typography>
            <Card elevation={3} sx={{ pt: '20px', mx: 5 }}>
                <Box overflow="auto">
                    <WingsTable>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{ px: 3 }}
                                    align="left"
                                    colSpan={6}
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    sx={{ px: 0 }}
                                    align="center"
                                    colSpan={3}
                                >
                                    Edit
                                </TableCell>
                                <TableCell
                                    sx={{ px: 0 }}
                                    align="center"
                                    colSpan={3}
                                >
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departments.map((brand, index) => (
                                <WingsCard
                                    key={index}
                                    wing={brand}
                                    onEdit={onEdithandler}
                                    onDelete={onDelhandler}
                                />
                            ))}
                        </TableBody>
                    </WingsTable>
                </Box>
            </Card>
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
                open={createBrandDialog}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'ADD WING'}</DialogTitle>
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
                <DialogTitle id="alert-dialog-title">{'EDIT WING'}</DialogTitle>
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

export default WingsList

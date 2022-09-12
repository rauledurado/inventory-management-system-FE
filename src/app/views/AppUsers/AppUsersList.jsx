import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import SummarizeIcon from '@mui/icons-material/Summarize'
import {
    Container,
    Fab,
    FormHelperText,
    Grid,
    Typography,
    Autocomplete,
    Box,
} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/system'
import { ConfirmationDialog } from 'app/components'
import AppUserCaerd from 'app/views/AppUsers/AppUserCard'
import axios from 'axios'
import config from 'config'
import React, { useEffect } from 'react'
import { CSVLink } from 'react-csv'
import ReactPaginate from 'react-paginate'
import '../users/user.css'
import SearchIcon from '@mui/icons-material/Search'

const AppUsersList = () => {
    const username = localStorage.getItem('username')

    const [createdBy, setCreatedBy] = React.useState(username)
    const [users, setUsers] = React.useState([])
    const [searchusers, setSearchUsers] = React.useState()
    const [searchname, setSearchname] = React.useState(null)
    const [searchrole, setSearchrole] = React.useState()
    const [searchemail, setSearchemail] = React.useState(null)

    const [userName, setUserName] = React.useState('')
    const [userNameError, setUserNameError] = React.useState(false)

    const [emailAddress, setEmailAddress] = React.useState('')
    const [emailAddressError, setEmailAddressError] = React.useState(false)
    const [superEmailAddress, setSuperEmailAddress] = React.useState('')
    const [superPassword, setSuperPassword] = React.useState('')
    const [superEmailAddressError, setSuperEmailAddressError] =
        React.useState(false)
    const [createEmailErrorMessage, setCreateEmailErrorMessage] =
        React.useState('field required')
    const [superPasswordError, setSuperPasswordError] = React.useState(false)
    const [password, setPassword] = React.useState('')
    const [passwordError, setPasswordError] = React.useState(false)
    const [role, setRole] = React.useState('')
    // const [userRole, setUserRole] = React.useState('')
    const [roleError, setRoleError] = React.useState(false)

    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [open4, setOpen4] = React.useState(false)
    const [userId, setUserId] = React.useState('')

    const [createSnackBar, setCreateSnackBar] = React.useState(false)
    const [emailSnackBar, setEmailSnackBar] = React.useState(false)
    const [editSnackBar, setEditSnackBar] = React.useState(false)
    const [createUserDialog, setCreateUserDialog] = React.useState(false)
    const [editUserDialog, setEditUserDialog] = React.useState(false)
    const [user, setUser] = React.useState()

    const [pageNumber, setPageNumber] = React.useState(0)
    const usersPerPage = 8
    const pagesVisited = pageNumber * usersPerPage
    const pageCount = Math.ceil(users.length / usersPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const handleCreateClose = () => {
        setCreateUserDialog(false)
        setUserName('')
        setEmailAddress('')
        setPassword('')
        setRole('')
        setUserNameError(false)
        setEmailAddressError(false)
        setPasswordError(false)
        setRoleError(false)
    }

    const handleCreateSnackBarClose = () => {
        setCreateSnackBar(false)
    }

    const handleEmailSnackBarClose = () => {
        setEmailSnackBar(false)
    }

    const handleEditClose = () => {
        setEditUserDialog(false)
        setUserName('')
        setEmailAddress('')
        setPassword('')
        setRole('')
        setUserNameError(false)
        setEmailAddressError(false)
        setPasswordError(false)
        setRoleError(false)
    }

    const handleEditSnackBarClose = () => {
        setEditSnackBar(false)
    }

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)

        errorFunc(false)
    }

    const handleCreateClickOpen = () => {
        var emailRegex = /\S+@\S+\.\S+/
        if (
            userName === '' ||
            password === '' ||
            role === '' ||
            emailAddress === '' ||
            !emailRegex.test(emailAddress)
        ) {
            if (userName === '') {
                setUserNameError(true)
            }
            if (emailAddress === '') {
                setEmailAddressError(true)
            }
            if (emailAddress != '' && !emailRegex.test(emailAddress)) {
                setCreateEmailErrorMessage('Please Enter a valid Email Address')
                setEmailAddressError(true)
            }
            if (password === '') {
                setPasswordError(true)
            }
            if (role === '') {
                setRoleError(true)
            }
        } else {
            setOpen2(true)
        }
    }

    const handleEditClickOpen = () => {
        if (
            userName === '' ||
            emailAddress === '' ||
            password === '' ||
            role === ''
        ) {
            if (userName === '') {
                setUserNameError(true)
            }
            if (emailAddress === '') {
                setEmailAddressError(true)
            }
            if (password === '') {
                setPasswordError(true)
            }
            if (role === '') {
                setRoleError(true)
            }
        } else {
            editHandler()
        }
    }

    const handleCreateClosed = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setCreateSnackBar(false)
    }

    const handleEditClosed = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setEditSnackBar(false)
    }

    const handleFormSubmit = async (event) => {
        try {
            // await register(state.email, state.username, state.password)
            // navigate('/')
        } catch (e) {
            if (e.error == 'Duplicate field value entered') {
                alert('Username Already exists, try different username')
            } else {
                alert(e.error)
            }
        }
    }

    const handleMessageClose = () => {
        setOpen4(false)
    }

    const createAction = (
        <React.Fragment>
            <Button
                color="secondary"
                size="small"
                onClick={handleCreateSnackBarClose}
            >
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCreateSnackBarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const emailAction = (
        <React.Fragment>
            <Button
                color="secondary"
                size="small"
                onClick={handleEmailSnackBarClose}
            >
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleEmailSnackBarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const editAction = (
        <React.Fragment>
            <Button
                color="secondary"
                size="small"
                onClick={handleEditSnackBarClose}
            >
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleEditSnackBarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    useEffect(() => {
        getAlldata()
    }, [])

    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/auth/users`)
            .then((res) => {
                setUsers(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const createHandler = () => {
        let data = new FormData()
        data.append('userName', userName)
        data.append('email', emailAddress)
        data.append('password', password)
        data.append('role', role)
        users.find((userData) => {
            if (userData.userName === userName) {
                setCreateSnackBar(true)
                // setEmailSnackBar(true)
                return null
            }
            if (userData.email === emailAddress) {
                setEmailSnackBar(true)
                return null
            }
            return null
        })

        axios
            .post(`${config.base_url}/api/v1/auth/register`, data)
            .then((res) => {
                if (res) {
                    console.log('responce of the role', res.data, data)
                    handleCreateClose()
                    getAlldata()
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const editHandler = () => {
        let data = new FormData()
        data.append('userName', userName)
        data.append('email', emailAddress)
        data.append('password', password)
        data.append('role', role)
        data.append('modifiedBy', username)
        axios
            .put(`${config.base_url}/api/v1/auth/${userId}`, data)
            .then((res) => {
                if (res) {
                    getAlldata()
                    handleEditClose()
                }
            })
            .catch((error) => {
                if (error.message === 'Request failed with status code 400') {
                    setEditSnackBar(true)
                }
            })
    }

    const onDelhandler = (user) => {
        setUserId(user._id)

        setOpen(true)

        if (open3 && user.role !== 'SA') {
            axios
                .delete(`${config.base_url}/api/v1/auth/${user._id}`)
                .then((res) => {
                    getAlldata()
                    setOpen(false)
                    setOpen3(false)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        } else if (user.role === 'SA') {
            setOpen4(true)
            setOpen(false)
            setOpen3(false)
        }
    }

    const onEdithandler = (id, user) => {
        setEditUserDialog(true)
        setUserName(user.userName)
        setEmailAddress(user.email)
        setPassword(user.password)
        setRole(user.role)
        setUserId(id)
    }

    const open2Close = () => {
        setOpen2(false)
    }
    const open3Close = () => {
        setOpen3(false)
    }
    const handleSuperAdmin = () => {
        let data = {}

        data.email = superEmailAddress
        data.password = superPassword

        axios
            .post(`${config.base_url}/api/v1/auth/SA`, data)
            // console.log(user)
            .then((res) => {
                if (res.data.grantAccess) {
                    setOpen2(false)
                    createHandler()
                }
            })
            .catch((error) => {
                console.log(error, 'error')
                alert('Invalid Credentials')
                setOpen2(false)
            })
    }

    const handleDeleteSuperAdmin = () => {
        let data = {}

        data.email = superEmailAddress
        data.password = superPassword
        //  console.log('superPassword',superPassword)
        axios
            .post(`${config.base_url}/api/v1/auth/SA`, data)
            .then((res) => {
                // console.log(user)
                if (res.data.grantAccess) {
                    onDelhandler(user)

                    setOpen3(false)
                }
            })
            .catch((error) => {
                console.log(error, 'error')
                alert('Invalid Credentials')
                // setOpen2(false)
            })
    }

    const headers = [
        { label: 'User Name', key: 'userName' },
        { label: 'Email', key: 'email' },
        { label: 'Employee Id', key: 'employeeId' },
        { label: 'Role', key: 'role' },
        { label: 'Creation Date', key: 'createdAt' },
    ]

    //////search dialog
    const [employeeDialogs, setEmployeeDialogs] = React.useState(false)
    const handleEmployeeClose = () => {
        setEmployeeDialogs(false)
    }

    // const handleSubmit = () => {
    //     console.log('handleSubmit ran');
    //   //  event.preventDefault(); // 👈️ prevent page refresh

    //     // 👇️ clear all input values in the form
    //     setSearchemail('');
    //     setSearchemail('');
    //     setSearchrole('')
    //   };
    //////post data
    const ApplyFilters = () => {
        setEmployeeDialogs(false)
        searchData()
    }

    ///api send data for the search api
    const searchData = () => {
        let data = new FormData()
        data.append('name', searchname ? searchname.userName : '')
        data.append('role', searchrole ? searchrole : '')
        data.append('email', searchemail === null ? '' : searchemail.email)
        axios
            .post(`${config.base_url}/api/v1/auth/searchFilters`, data)

            .then((res) => {
                setUsers(res.data.data)
                // console.log(res.data.data)
            })
            .catch((error) => {
                alert('Record Not Found')
                console.log(error, 'error')
            })
    }

    return (
        <>
            {open && (
                <ConfirmationDialog
                    open={open}
                    onConfirmDialogClose={() => {
                        setOpen(false)
                        setOpen3(false)
                    }}
                    title={`Are You Sure?`}
                    text={`Are You Sure You Want To Delete This User?`}
                    onYesClick={() => {
                        setOpen3(true)
                    }}
                />
            )}
            <Tooltip title="Create User">
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
                    onClick={() => setCreateUserDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Container>
                <br></br>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Users
                </Typography>
                <Grid container spacing={3}>
                    {users
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map((category) => (
                            <Grid
                                key={category._id}
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                            >
                                <AppUserCaerd
                                    user={category}
                                    onEdit={onEdithandler}
                                    onDelete={(user) => {
                                        setOpen(true)
                                        setUser(user)
                                    }}
                                />
                            </Grid>
                        ))}
                </Grid>
                <br></br>
                {users.length > 0 && (
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
            </Container>

            <Tooltip title="Generate Report">
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
                >
                    <CSVLink
                        filename={'all-users.csv'}
                        data={users}
                        headers={headers}
                    >
                        <div style={{ marginTop: '8px' }}>
                            <SummarizeIcon />
                        </div>
                    </CSVLink>
                </Fab>
            </Tooltip>

            <Dialog
                open={createUserDialog}
                onClose={handleCreateClose}
                maxWidth="xs"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD NEW APP USER'}
                </DialogTitle>
                <DialogContent>
                    {/* <ValidatorForm onSubmit={handleFormSubmit} style={{ marginTop: "12px" }}>
                        <TextValidator
                            sx={{ mb: 3, width: '100%' }}
                            variant="outlined"
                            size="small"
                            label="Username"
                            onChange={handleChange}
                            type="text"
                            name="username"
                            value={username || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            sx={{ mb: 3, width: '100%' }}
                            variant="outlined"
                            size="small"
                            label="Email"
                            onChange={handleChange}
                            type="email"
                            name="email"
                            value={email || ''}
                            validators={['required', 'isEmail']}
                            errorMessages={[
                                'this field is required',
                                'email is not valid',
                            ]}
                        />
                        <TextValidator
                            sx={{ mb: '16px', width: '100%' }}
                            label="Password"
                            variant="outlined"
                            size="small"
                            onChange={handleChange}
                            name="password"
                            type="password"
                            value={password || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <FormControlLabel
                            sx={{ mb: '16px' }}
                            name="agreement"
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: 'agreement',
                                        value: e.target.checked,
                                    },
                                })
                            }
                            control={
                                <Checkbox
                                    size="small"
                                    checked={agreement || false}
                                />
                            }
                            label="I have read and agree to the terms of service."
                        />
                        <FlexBox>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                sx={{ textTransform: 'capitalize' }}
                            >
                                Sign up
                            </Button>
                            <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                            <Button
                                sx={{ textTransform: 'capitalize' }}
                            // onClick={() => navigate("/session/signin")}
                            >
                                Sign in
                            </Button>
                        </FlexBox>
                    </ValidatorForm> */}

                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={userNameError}
                                id="User Name"
                                label="User Name"
                                placeholder="Enter User Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    userNameError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={userName}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setUserName,
                                        setUserNameError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={emailAddressError}
                                id="Email"
                                label="Email Address"
                                placeholder="Email Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    emailAddressError === true
                                        ? createEmailErrorMessage
                                        : ''
                                }
                                value={emailAddress}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEmailAddress,
                                        setEmailAddressError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={passwordError}
                                id="Password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    passwordError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={password}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setPassword,
                                        setPasswordError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <FormControl error={roleError} fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    labelId="Role"
                                    id="Role"
                                    value={role}
                                    label="Role"
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setRole, setRoleError)
                                    }
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    {/* <MenuItem value="SA">Super Admin</MenuItem> */}
                                    <MenuItem value="User">User</MenuItem>
                                </Select>
                                <FormHelperText>
                                    {roleError && 'Field Required'}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateClose}>Cancel</Button>
                    <Button autoFocus onClick={handleCreateClickOpen}>
                        Create User
                    </Button>
                </DialogActions>
                <Snackbar
                    open={createSnackBar}
                    autoHideDuration={2000}
                    onClose={handleCreateClosed}
                    message="Name already exists"
                    action={createAction}
                />

                <Snackbar
                    open={emailSnackBar}
                    autoHideDuration={2000}
                    onClose={handleCreateClosed}
                    message="Email already exists"
                    action={emailAction}
                />
            </Dialog>

            <Dialog
                open={open2}
                onClose={open2Close}
                maxWidth="xs"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Super Admin Confirmation'}
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={superEmailAddressError}
                                id="Email"
                                label="Email Address"
                                placeholder="Email Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    superEmailAddressError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={superEmailAddress}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setSuperEmailAddress,
                                        setSuperEmailAddressError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={superPasswordError}
                                id="Password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    superPasswordError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={superPassword}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setSuperPassword,
                                        setSuperPasswordError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={open2Close}>Cancel</Button>
                    <Button autoFocus onClick={handleSuperAdmin}>
                        Confirm
                    </Button>
                </DialogActions>
                <Snackbar
                    open={createSnackBar}
                    autoHideDuration={2000}
                    onClose={handleCreateClosed}
                    message="Name already exists"
                    action={createAction}
                />
            </Dialog>

            <Dialog
                open={editUserDialog}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Edit Category'}
                </DialogTitle>
                <DialogContent>
                    {/* <ValidatorForm onSubmit={handleFormSubmit} style={{ marginTop: "12px" }}>
                        <TextValidator
                            sx={{ mb: 3, width: '100%' }}
                            variant="outlined"
                            size="small"
                            label="Username"
                            onChange={handleChange}
                            type="text"
                            name="username"
                            value={username || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            sx={{ mb: 3, width: '100%' }}
                            variant="outlined"
                            size="small"
                            label="Email"
                            onChange={handleChange}
                            type="email"
                            name="email"
                            value={email || ''}
                            validators={['required', 'isEmail']}
                            errorMessages={[
                                'this field is required',
                                'email is not valid',
                            ]}
                        />
                        <TextValidator
                            sx={{ mb: '16px', width: '100%' }}
                            label="Password"
                            variant="outlined"
                            size="small"
                            onChange={handleChange}
                            name="password"
                            type="password"
                            value={password || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <FormControlLabel
                            sx={{ mb: '16px' }}
                            name="agreement"
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: 'agreement',
                                        value: e.target.checked,
                                    },
                                })
                            }
                            control={
                                <Checkbox
                                    size="small"
                                    checked={agreement || false}
                                />
                            }
                            label="I have read and agree to the terms of service."
                        />
                        <FlexBox>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                sx={{ textTransform: 'capitalize' }}
                            >
                                Sign up
                            </Button>
                            <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                            <Button
                                sx={{ textTransform: 'capitalize' }}
                            // onClick={() => navigate("/session/signin")}
                            >
                                Sign in
                            </Button>
                        </FlexBox>
                    </ValidatorForm> */}

                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={userNameError}
                                id="User Name"
                                label="User Name"
                                placeholder="Enter User Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    userNameError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={userName}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setUserName,
                                        setUserNameError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={emailAddressError}
                                id="Email"
                                label="Email Address"
                                placeholder="Email Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    emailAddressError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={emailAddress}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEmailAddress,
                                        setEmailAddressError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={passwordError}
                                id="Password"
                                label="Password"
                                placeholder="Password"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    passwordError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={password}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setPassword,
                                        setPasswordError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <FormControl fullWidth error={roleError}>
                                <InputLabel id="demo-simple-select-label">
                                    Role
                                </InputLabel>
                                <Select
                                    labelId="Role"
                                    id="Role"
                                    value={role}
                                    label="Role"
                                    size="small"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="SA">Super Admin</MenuItem>
                                    <MenuItem value="User">Users</MenuItem>
                                </Select>
                                <FormHelperText>
                                    {roleError && 'Field Required'}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button autoFocus onClick={handleEditClickOpen}>
                        Create User
                    </Button>
                </DialogActions>
                <Snackbar
                    open={editSnackBar}
                    autoHideDuration={2000}
                    onClose={handleEditClosed}
                    message="Name already exists"
                    action={editAction}
                />
            </Dialog>

            {/* Delete Confirmation Box */}
            <Dialog
                open={open3}
                onClose={open3Close}
                maxWidth="xs"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Delete User Confirmation'}
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={superEmailAddressError}
                                id="Email"
                                label="Email Address"
                                placeholder="Email Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    superEmailAddressError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={superEmailAddress}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setSuperEmailAddress,
                                        setSuperEmailAddressError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={superPasswordError}
                                id="Password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    superPasswordError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={superPassword}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setSuperPassword,
                                        setSuperPasswordError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={open3Close}>Cancel</Button>
                    <Button autoFocus onClick={handleDeleteSuperAdmin}>
                        Confirm
                    </Button>
                </DialogActions>
                <Snackbar
                    open={createSnackBar}
                    autoHideDuration={2000}
                    onClose={handleCreateClosed}
                    message="Name already exists"
                    action={createAction}
                />
            </Dialog>

            {/* Delete the SuperAdmin message */}

            <Dialog
                open={open4}
                onClose={handleMessageClose}
                maxWidth="xs"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'You Can Not Delete The SuperAdmin User'}
                </DialogTitle>
                <DialogContent></DialogContent>
                <DialogActions>
                    <Button onClick={handleMessageClose}>OK</Button>
                </DialogActions>
            </Dialog>

            {/* /////search filter of the data */}
            <Dialog
                open={employeeDialogs}
                onClose={handleEmployeeClose}
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
                                    options={users}
                                    filterSelectedOptions={true}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) =>
                                        `${option.userName}`
                                    }
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Name"
                                            />
                                        )
                                    }}
                                    value={searchname}
                                    onChange={(_event, vender) => {
                                        setSearchname(vender)
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    labelId="Role"
                                    id="Role"
                                    value={searchrole}
                                    label="Role"
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setSearchrole,
                                            setRoleError
                                        )
                                    }
                                >
                                    <MenuItem value="Admin">Admins</MenuItem>
                                    <MenuItem value="SA">Super Admins</MenuItem>
                                    <MenuItem value="User">Users</MenuItem>
                                </Select>
                                <FormHelperText>
                                    {roleError && 'Field Required'}
                                </FormHelperText>
                            </FormControl>
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
                                    options={users}
                                    filterSelectedOptions={true}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) =>
                                        `${option.email}`
                                    }
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Email"
                                            />
                                        )
                                    }}
                                    value={searchemail}
                                    onChange={(_event, vender) => {
                                        setSearchemail(vender)
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
                        top: '9vh',
                        position: 'fixed',
                    }}
                    onClick={() => setEmployeeDialogs(true)}
                >
                    <SearchIcon />
                </Fab>
            </Tooltip>
        </>
    )
}

export default AppUsersList

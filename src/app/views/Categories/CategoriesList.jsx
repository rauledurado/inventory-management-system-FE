import axios from 'axios'
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { Container, Fab, Grid, Switch, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/system'
import CategoryCard from 'app/components/categories/CategoryCard'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import config from 'config'
import { ConfirmationDialog } from 'app/components'
import { CSVLink } from 'react-csv'
import SummarizeIcon from '@mui/icons-material/Summarize'
import ReactPaginate from 'react-paginate'
import '../users/user.css'
import SearchIcon from '@mui/icons-material/Search'
import { Autocomplete, Box } from '@mui/material'
const label = { inputProps: { 'aria-label': 'Switch demo' } }

const CategoriesList = () => {
    const userName = localStorage.getItem('username')
    const [categories, setCategories] = React.useState([])
    const [searchcategories, setSearchCategories] = React.useState()
    const [open, setOpen] = React.useState(false)

    const [imge, setImage] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [categoryError, setCategoryError] = React.useState(false)
    const [categoryId, setCategoryId] = React.useState('')

    const [createSnackBar, setCreateSnackBar] = React.useState(false)
    const [editSnackBar, setEditSnackBar] = React.useState(false)
    const [createCategoryDialog, setCreateCategoryDialog] =
        React.useState(false)
    const [editCategoryDialog, setEditCategoryDialog] = React.useState(false)

    const [pageNumber, setPageNumber] = React.useState(0)
    const categoriesPerPage = 8
    const pagesVisited = pageNumber * categoriesPerPage
    const pageCount = Math.ceil(categories.length / categoriesPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const handleCreateClose = () => {
        setCreateCategoryDialog(false)
        setCategory('')
        setImage('')
        setCategoryError(false)
    }

    const handleCreateSnackBarClose = () => {
        setCreateSnackBar(false)
    }

    const handleEditClose = () => {
        setEditCategoryDialog(false)
        setCategory('')
        setImage('')
        setCategoryError(false)
    }

    const handleEditSnackBarClose = () => {
        setEditSnackBar(false)
    }

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)

        errorFunc(false)
    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleCreateClickOpen = () => {
        if (category === '') {
            setCategoryError(true)
        } else {
            createHandler()
        }
    }

    const handleEditClickOpen = () => {
        if (category === '') {
            setCategoryError(true)
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

    const Input = styled('input')({
        display: 'none',
    })

    useEffect(() => {
        getAlldata()
    }, [])

    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/category`)
            .then((res) => {
                setCategories(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }
    ////CATEGORIES SEARCH FILYTER API DATA WITH

    const SEARCH = () => {
        let data = new FormData()

        data.append('department', searchcategories)

        axios
            .get(`${config.base_url}/api/v1/category/${searchcategories._id}`)

            .then((res) => {
                setCategories([res.data.data])
                console.log(res.data.data, 'rewtertertrt')
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const createHandler = () => {
        let data = new FormData()

        if (imge === '') {
            console.log('No Image')
        }

        data.append('file', imge)
        console.log('imge: ', imge)
        data.append('name', category)
        data.append('createdBy', userName)

        const categoryNameExist = categories.find((categoryData) => {
            return categoryData.name === category
        })

        if (categoryNameExist) {
            setCreateSnackBar(true)
            return
        }

        axios
            .post(`${config.base_url}/api/v1/category`, data)
            .then((res) => {
                if (res) {
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
        data.append('name', category)
        data.append('modifiedBy', userName)
        data.append('file', imge)

        axios
            .put(`${config.base_url}/api/v1/category/${categoryId}`, data)
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

    const onDelhandler = (id) => {
        setCategoryId(id)
        setOpen(true)
        if (open && categoryId) {
            axios
                .delete(`${config.base_url}/api/v1/category/${categoryId}`)
                .then((res) => {
                    getAlldata()
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    const onEdithandler = (id, category) => {
        setEditCategoryDialog(true)
        setCategory(category)
        setImage(category.photo)
        setCategoryId(id)
    }

    const headers = [
        { label: 'Category Id', key: 'categoryId' },
        { label: 'Category Name', key: 'name' },
        { label: 'Creation Date', key: 'createdAt' },
        { label: 'Created By', key: 'createdBy' },
        { label: 'Last Modified', key: 'modifiedAt' },
        { label: 'Modified By', key: 'modifiedBy' },
    ]

    const [employeeDialogs, setEmployeeDialogs] = React.useState(false)

    const handleEmployeeClose = () => {
        setEmployeeDialogs(false)
    }

    const ApplyFilters = () => {
        SEARCH()
        setEmployeeDialogs(false)
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
                    text={`Are You Sure You Want To Delete This Category?`}
                    onYesClick={onDelhandler}
                />
            )}
            <Tooltip title="Add Category">
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
                    onClick={() => setCreateCategoryDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
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
                        filename={'all-categories.csv'}
                        data={categories}
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
                    Categories
                </Typography>
                <Grid container spacing={3}>
                    {categories
                        .slice(pagesVisited, pagesVisited + categoriesPerPage)
                        .map((category) => (
                            <Grid key={category._id} item xs={12} sm={6} md={3}>
                                <CategoryCard
                                    category={category}
                                    onEdit={onEdithandler}
                                    onDelete={onDelhandler}
                                />
                            </Grid>
                        ))}
                </Grid>
                <br></br>
                {categories.length > 0 && (
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

            <Dialog
                open={createCategoryDialog}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD CATEGORY'}
                </DialogTitle>
                <DialogContent style={{ width: '500px' }}>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={categoryError}
                                id="category"
                                label="Category Name"
                                placeholder="Category Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    categoryError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={category}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCategory,
                                        setCategoryError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6}>
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
                                    Upload
                                </Button>
                            </label>
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
                    open={createSnackBar}
                    autoHideDuration={2000}
                    onClose={handleCreateClosed}
                    message="Name already exists"
                    action={createAction}
                />
            </Dialog>

            <Dialog
                open={editCategoryDialog}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Edit Category'}
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={7} md={7} sm={7} xs={7}>
                            <TextField
                                error={categoryError}
                                id="category"
                                label="Category Name"
                                placeholder="Category Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    categoryError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={category}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCategory,
                                        setCategoryError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={5} md={5} sm={5} xs={5}>
                            <label htmlFor="contained-button-file">
                                <Input
                                    accept="image/*"
                                    id="contained-button-file"
                                    type="file"
                                    onChange={handleImage}
                                />
                                <Button
                                    variant="contained"
                                    component="span"
                                    startIcon={<AddAPhotoIcon />}
                                >
                                    Upload
                                </Button>
                            </label>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button
                        autoFocus
                        onClick={() => {
                            handleEditClickOpen()
                        }}
                    >
                        Confirm
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
                                    options={categories}
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
                                                label="Category Name"
                                            />
                                        )
                                    }}
                                    value={searchcategories}
                                    onChange={(_event, vender) => {
                                        setSearchCategories(vender)
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

export default CategoriesList

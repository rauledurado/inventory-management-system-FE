import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import { Box, styled } from '@mui/system'
import axios from 'axios'
import config from 'config'
import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import AllUsersTable from './AllUserTable'
import avatar from '../AppUsers/a.png'
import { BiTransfer } from 'react-icons/bi'
import { Paragraph } from 'app/components/Typography'
import CloseIcon from '@mui/icons-material/Close'
import { CSVLink } from 'react-csv'
import SummarizeIcon from '@mui/icons-material/Summarize'

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
    display: 'flex',
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
    height: '100%',
}))

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

const UserDetail = () => {
    // States
    const [showTable, setShowTable] = React.useState(false)
    const [employeeProducts, setEmployeeProducts] = React.useState([])

    const [quantity, setQuantity] = React.useState('')
    const [quantityError, setQuantityError] = React.useState(false)
    const [snackBar, setSnackBar] = React.useState(false)

    const [custodianIds, setCustodianIds] = React.useState([])
    const [custodianId, setCustodianId] = React.useState('')
    const [custodianIdError, setCustodianIdError] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [employeeProductDetail, setEmployeeProductDetail] = React.useState()
    const [transferTo, setTransferTo] = React.useState()
    const [productDetailDialog, setProductDetailDialog] = React.useState(false)
    const [purchaseItem, setPurchaseItem] = React.useState()
    const [productName, setProductName] = React.useState('')

    const { state } = useLocation()

    const imgeBaseUrl = 'uploads/'

    const EmployeeTable = styled(Table)(() => ({
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

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)
        errorFunc(false)
    }

    const handleClickOpen = () => {
        if (custodianId === '' || quantity === '') {
            if (custodianId === '') {
                setCustodianIdError(true)
            }
            if (quantity === '') {
                setQuantityError(true)
            }
        } else {
            productTransferHandler()
        }
    }

    const productTransferHandler = () => {
        // getTransferTo(custodianId)

        let data = new FormData()

        data.append('ItemId', employeeProductDetail?.ItemId)
        data.append('employId', custodianId)
        data.append('productId', employeeProductDetail?.productId)
        data.append('quantity', quantity)
        data.append('_id', employeeProductDetail?._id)

        if (custodianId === state.user._id) {
            alert("You Can't Transfer Product To Yourself")
        } else if (quantity < 1) {
            alert(`Quantity Must Be Greater Than ${quantity}`)
        } else if (quantity > employeeProductDetail?.quantity) {
            alert(
                `Quantity Must Be Smaller or Equal To ${employeeProductDetail?.quantity}`
            )
        } else {
            axios
                .post(
                    `${config.base_url}/api/v1/productTransfer/transfer`,
                    data
                )
                .then((res) => {
                    if (res) {
                        setOpen(false)
                        getEmployeeDetails()
                    }
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    useEffect(() => {
        getEmployee()
        if (custodianId) {
            getTransferTo(custodianId)
        }
        getEmployeeDetails()
        // getData()
    }, [custodianId])

    const getTransferTo = (id) => {
        axios
            .get(`${config.base_url}/api/v1/employee/${id}`)
            .then((res) => {
                setTransferTo(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const getEmployee = () => {
        axios
            .get(`${config.base_url}/api/v1/employee`)
            .then((res) => {
                setCustodianIds(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setSnackBar(false)
    }

    const action = (
        <React.Fragment>
            <Button
                color="secondary"
                size="small"
                onClick={handleSnackBarClose}
            >
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackBarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const transferProduct = (item) => {
        setOpen(true)

        setEmployeeProductDetail(item)
    }

    const getEmployeeDetails = () => {
        axios
            .get(
                `${config.base_url}/api/v1/employee/currentProducts/${state.user._id}`
            )
            .then((res) => {
                setEmployeeProducts(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
                alert('Record Not Found')
                setShowTable(false)
            })
    }

    const onEmployeeDetails = () => {
        setShowTable(true)
        getEmployeeDetails()
    }

    const headers = [
        { label: 'Name', key: 'products[0].name' },
        { label: 'Quantity', key: 'quantity' },
        { label: 'Vender Name', key: 'PurchaseProduct[0].venderName' },
        { label: 'Vender Email', key: 'PurchaseProduct[0].venderEmail' },
        { label: 'Vender Contact', key: 'PurchaseProduct[0].venderContact' },
        { label: 'Product Price', key: 'PurchaseProduct[0].price' },
        { label: 'Status', key: 'PurchaseProduct[0].status' },
        { label: 'OwnerShip', key: 'PurchaseProduct[0].ownership' },
        { label: 'Model', key: 'PurchaseProduct[0].model' },
        { label: 'PurchaseOrder', key: 'PurchaseProduct[0].purchaseOrder' },
        { label: 'Model', key: 'PurchaseProduct[0].model' },
        { label: 'Sr No', key: 'PurchaseProduct[0].srNo' },
        { label: 'Tag No', key: 'PurchaseProduct[0].tagNo' },
        { label: 'Transfered From', key: 'TransferedFromEmploy[0].name' },
        { label: 'Created By', key: 'PurchaseProduct[0].createdBy' },
        { label: 'Created At', key: 'createdAt' },
        { label: 'Features', key: 'PurchaseProduct[0].features' },
    ]

    return (
        <>
            <Tooltip title="Generate Report">
                <Fab
                    color="primary"
                    aria-label="Add"
                    size="medium"
                    style={{
                        zIndex: 999,
                        right: '2vw',
                        top: '12vh',
                        position: 'fixed',
                    }}
                >
                    <CSVLink
                        filename={'all-products.csv'}
                        data={employeeProducts}
                        headers={headers}
                    >
                        <div style={{ marginTop: '8px' }}>
                            <SummarizeIcon />
                        </div>
                    </CSVLink>
                </Fab>
            </Tooltip>
            <Card elevation={3} sx={{ pt: '20px', mb: 10, margin: '50px' }}>
                <CardHeader>
                    <Title>EMPLOYEE DETAILS</Title>
                </CardHeader>
                <hr></hr>
                <Grid container>
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                        <ContentBox>
                            <IMG
                                src={
                                    state.user.photo === 'no-image' ||
                                    state.user.photo === undefined
                                        ? avatar
                                        : config.base_url +
                                          '/' +
                                          imgeBaseUrl +
                                          state.user.photo
                                }
                                alt=""
                            />
                        </ContentBox>
                    </Grid>

                    <Grid
                        item
                        lg={7}
                        md={7}
                        sm={12}
                        xs={12}
                        style={{ padding: '1rem 3rem' }}
                    >
                        <h3>
                            {state.user.name === undefined
                                ? 'N/A'
                                : state.user.name}
                        </h3>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Email Address: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.emailAddress === undefined
                                            ? 'N/A'
                                            : state.user.emailAddress}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Mobile Number: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.mobileNumber === undefined
                                            ? 'N/A'
                                            : state.user.mobileNumber}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Department: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.department[0]
                                            ? state.user.department[0].name
                                            : 'N/A'}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Designation: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.designation === undefined
                                            ? 'N/A'
                                            : state.user.designation}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Pg: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.pg === undefined
                                            ? 'N/A'
                                            : state.user.pg}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Wing: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.wing[0]
                                            ? state.user.wing[0].name
                                            : 'N/A'}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Office: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.office[0]
                                            ? state.user.office[0].name
                                            : 'N/A'}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>CNIC: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.cnic === undefined
                                            ? 'N/A'
                                            : state.user.cnic}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Created Date: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {moment(state.user.createdAt).format(
                                            'LL'
                                        )}
                                    </b>
                                </span>
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Modification Date: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.modifiedAt === undefined
                                            ? 'N/A'
                                            : moment(
                                                  state.user.modifiedAt
                                              ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Gender </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.gender === undefined
                                            ? 'N/A'
                                            : state.user.gender}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Date of Birth: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.dob === undefined
                                            ? 'N/A'
                                            : moment(state.user.dob).format(
                                                  'LL'
                                              )}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Date Of Joining: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.dateOfJoining === undefined
                                            ? 'N/A'
                                            : moment(
                                                  state.user.dateOfJoining
                                              ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Reporting Manager: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.reportingManager[0]
                                            ? state.user.reportingManager[0]
                                                  .name
                                            : 'N/A'}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Employee Id: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.employeeId === undefined
                                            ? 'N/A'
                                            : state.user.employeeId}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Job Title: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.jobTitle === undefined
                                            ? 'N/A'
                                            : state.user.jobTitle}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Box sx={{ marginBottom: '5px' }}>
                            <h4>Detail: </h4>
                            {state.user.remarks === undefined
                                ? 'N/A'
                                : state.user.remarks}
                        </Box>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={onEmployeeDetails}
                                >
                                    Employee Details
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
            {showTable && (
                <Card
                    elevation={3}
                    sx={{ pt: '20px', mAllUsersTableb: 10, margin: '50px' }}
                >
                    <Box overflow="auto">
                        <EmployeeTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Product Name
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Quantity
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Serial Number
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Tag Number
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Transfered From
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Transfer
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employeeProducts.length > 0
                                    ? employeeProducts.map(
                                          (employeeProduct) => {
                                              return (
                                                  <TableRow hover>
                                                      <TableCell
                                                          align="center"
                                                          colSpan={2}
                                                          color={`blue`}
                                                      >
                                                          <Box>
                                                              <Paragraph
                                                                  sx={{
                                                                      m: 0,
                                                                      ml: 1,
                                                                      cursor: 'pointer',
                                                                      color: 'blue',
                                                                  }}
                                                                  onClick={() => {
                                                                      setPurchaseItem(
                                                                          employeeProduct
                                                                              .PurchaseProduct[0]
                                                                      )
                                                                      setProductName(
                                                                          employeeProduct
                                                                              .products[0]
                                                                              .name
                                                                      )
                                                                      setProductDetailDialog(
                                                                          true
                                                                      )
                                                                  }}
                                                              >
                                                                  {employeeProduct
                                                                      .products[0]
                                                                      ? employeeProduct
                                                                            .products[0]
                                                                            .name
                                                                          ? employeeProduct
                                                                                .products[0]
                                                                                .name
                                                                          : 'N/A'
                                                                      : 'N/A'}
                                                              </Paragraph>
                                                          </Box>
                                                      </TableCell>
                                                      <TableCell
                                                          align="center"
                                                          colSpan={2}
                                                          sx={{
                                                              px: 0,
                                                              textTransform:
                                                                  'capitalize',
                                                          }}
                                                      >
                                                          {
                                                              employeeProduct.quantity
                                                          }
                                                      </TableCell>
                                                      <TableCell
                                                          align="center"
                                                          colSpan={2}
                                                          sx={{
                                                              px: 0,
                                                              textTransform:
                                                                  'capitalize',
                                                          }}
                                                      >
                                                          {employeeProduct
                                                              .PurchaseProduct[0]
                                                              ? employeeProduct
                                                                    .PurchaseProduct[0]
                                                                    .srNo
                                                                  ? employeeProduct
                                                                        .PurchaseProduct[0]
                                                                        .srNo
                                                                  : 'N/A'
                                                              : 'N/A'}
                                                      </TableCell>
                                                      <TableCell
                                                          align="center"
                                                          colSpan={2}
                                                          sx={{
                                                              px: 0,
                                                              textTransform:
                                                                  'capitalize',
                                                          }}
                                                      >
                                                          {employeeProduct
                                                              .PurchaseProduct[0]
                                                              ? employeeProduct
                                                                    .PurchaseProduct[0]
                                                                    .tagNo
                                                                  ? employeeProduct
                                                                        .PurchaseProduct[0]
                                                                        .tagNo
                                                                  : 'N/A'
                                                              : 'N/A'}
                                                      </TableCell>
                                                      <TableCell
                                                          align="center"
                                                          colSpan={2}
                                                          sx={{
                                                              px: 0,
                                                              textTransform:
                                                                  'capitalize',
                                                          }}
                                                      >
                                                          {employeeProduct.transferedFrom ===
                                                          undefined
                                                              ? 'Store'
                                                              : employeeProduct
                                                                    .transferedFromEmploy[0]
                                                              ? employeeProduct
                                                                    .transferedFromEmploy[0]
                                                                    .name
                                                              : 'N/A'}
                                                      </TableCell>

                                                      <TableCell
                                                          sx={{ px: 0 }}
                                                          align="center"
                                                          colSpan={2}
                                                      >
                                                          <Button
                                                              onClick={() => {
                                                                  transferProduct(
                                                                      employeeProduct
                                                                  )
                                                              }}
                                                          >
                                                              <BiTransfer
                                                                  size={22}
                                                              />
                                                          </Button>
                                                      </TableCell>
                                                  </TableRow>
                                              )
                                          }
                                      )
                                    : ''}
                            </TableBody>
                        </EmployeeTable>
                    </Box>
                </Card>
            )}
            <Dialog
                open={open}
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'TRANSFER ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid
                            item
                            lg={5}
                            md={5}
                            sm={5}
                            xs={5}
                            sx={{ marginTop: '10px' }}
                        >
                            <TextField
                                type={`number`}
                                error={quantityError}
                                id="quantity"
                                label="Quantity"
                                placeholder="Enter Quantity"
                                autoComplete="off"
                                helperText={
                                    quantityError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={quantity}
                                size="small"
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setQuantity,
                                        setQuantityError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid
                            item
                            lg={7}
                            md={7}
                            sm={7}
                            xs={7}
                            sx={{ marginTop: '10px' }}
                        >
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth error={custodianIdError}>
                                    <InputLabel
                                        size="small"
                                        id="demo-simple-select-label"
                                    >
                                        Transfer To
                                    </InputLabel>
                                    <Select
                                        size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={custodianId}
                                        label="Transfer To"
                                        onChange={(event) => {
                                            setCustodianId(event.target.value)
                                        }}
                                    >
                                        {custodianIds.map((custodianId) => {
                                            return (
                                                <MenuItem
                                                    key={custodianId._id}
                                                    value={custodianId._id}
                                                >
                                                    {custodianId.employeeId}
                                                    &nbsp;/&nbsp;
                                                    {custodianId.name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                    <FormHelperText>
                                        {custodianIdError && 'Field Required'}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button autoFocus onClick={handleClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={productDetailDialog}
                onClose={() => setProductDetailDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Product Details`}</DialogTitle>
                <DialogContent sx={{ width: `600px` }}>
                    <Card elevation={3}>
                        <Grid container>
                            <Grid item lg={5} md={5} sm={12} xs={12}>
                                <ContentBox>
                                    <IMG
                                        src={purchaseItem?.QRCodeImage}
                                        alt=""
                                    />
                                </ContentBox>
                            </Grid>

                            <Grid
                                item
                                lg={7}
                                md={7}
                                sm={12}
                                xs={12}
                                style={{ padding: '1rem 3rem' }}
                            >
                                <h3>
                                    {productName === '' ? 'N/A' : productName}
                                </h3>
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Vender Name: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.venderName ===
                                                undefined
                                                    ? 'N/A'
                                                    : purchaseItem?.venderName}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Vender Email: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.venderEmail ===
                                                undefined
                                                    ? 'N/A'
                                                    : purchaseItem?.venderEmail}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr></hr>
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Vender Contact: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.venderContact ===
                                                undefined
                                                    ? 'N/A'
                                                    : purchaseItem?.venderContact}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Quantity: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.quantity ===
                                                undefined
                                                    ? 'N/A'
                                                    : purchaseItem?.quantity}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr></hr>
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Purchase Order: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.purchaseOrder ===
                                                undefined
                                                    ? 'N/A'
                                                    : purchaseItem?.purchaseOrder}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Model: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.model ===
                                                undefined
                                                    ? 'N/A'
                                                    : purchaseItem?.model}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Price: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.price ===
                                                undefined
                                                    ? 'N/A'
                                                    : purchaseItem?.price}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>OwnerShip: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.ownership ===
                                                undefined
                                                    ? 'N/A'
                                                    : purchaseItem?.ownership}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>OwnerShip: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.ownership ===
                                                undefined
                                                    ? 'N/A'
                                                    : purchaseItem?.ownership}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Status: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.status ===
                                                undefined
                                                    ? 'N/A'
                                                    : purchaseItem?.status}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Tag No: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.tagNo ===
                                                undefined
                                                    ? 'N/A'
                                                    : purchaseItem?.tagNo}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Sr No: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.srNo === ''
                                                    ? 'N/A'
                                                    : purchaseItem?.srNo}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Features: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.features ===
                                                undefined
                                                    ? 'N/A'
                                                    : purchaseItem?.features.map(
                                                          (feature) => {
                                                              return (
                                                                  <>
                                                                      {feature +
                                                                          ', '}
                                                                  </>
                                                              )
                                                          }
                                                      )}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Created Date: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {moment(
                                                    purchaseItem?.createdAt
                                                ).format('LL')}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Modification Date: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {purchaseItem?.modifiedAt ===
                                                undefined
                                                    ? 'N/A'
                                                    : moment(
                                                          purchaseItem?.modifiedAt
                                                      ).format('LL')}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr></hr>
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Box>
                                            <h4>Qr Code: </h4>
                                            <img
                                                src={purchaseItem?.QRCodeImage}
                                                width={`150px`}
                                                height={`150px`}
                                                alt=""
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <hr></hr>
                                {/* <Box sx={{ marginBottom: '5px' }}>
                                    <h4>Detail: </h4>
                                    {product?.detail === undefined
                                        ? 'N/A'
                                        : product?.detail}
                                </Box> */}
                            </Grid>
                        </Grid>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setProductDetailDialog(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UserDetail

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { saveAs } from 'file-saver'
import { useNavigate } from 'react-router-dom'
import {
    Autocomplete,
    Button,
    Card,
    CardContent,
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
    Select,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box, styled } from '@mui/system'
import { Paragraph } from 'app/components/Typography'
import axios from 'axios'
import config from 'config'
import moment from 'moment'
import QRCode from 'qrcode'
import React, { useEffect, useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import { BiTransfer } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import SummarizeIcon from '@mui/icons-material/Summarize'
import avatar from '../AppUsers/a.png'
import noImage from '../../../images/no-image.jpg'
import DownloadIcon from '@mui/icons-material/Download'
import { v4 as uuidv4 } from 'uuid'
import { ConfirmationDialog } from 'app/components'

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    display: 'flex',
}))
const Input = styled('input')({
    display: 'none',
})
const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))
const PurchaseItemDetail = () => {
    function printPageArea(areaID) {
        var printContent = document.getElementById(areaID)
        var WinPrint = window.open('', '', 'width=1000,height=600')
        // WinPrint.document.write(printMe)
        WinPrint.document.write(printContent.innerHTML)
        WinPrint.document.close()
        WinPrint.focus()
        WinPrint.print()
        WinPrint.close()
    }
    const { state } = useLocation()

    const userName = localStorage.getItem('username')

    const [showTable, setShowTable] = React.useState(false)
    const [showCard, setShowCard] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [editDialogOpen, setEditDialogOpen] = React.useState(false)
    const [duplicateDialogOpen, setDuplicateDialogOpen] = React.useState(false)
    const [quantity, setQuantity] = React.useState('')
    const [quantityError, setQuantityError] = React.useState(false)
    const [snackBar, setSnackBar] = React.useState(false)

    const [custodianIds, setCustodianIds] = React.useState([])
    const [custodianId, setCustodianId] = React.useState()
    const [custodianIdError, setCustodianIdError] = React.useState(false)
    const [statusError, setStatusError] = React.useState(false)
    const [ownerShipError, setOwnerShipError] = React.useState(false)
    const [modelError, setModelError] = React.useState(false)
    const [dateOfPurchaseError, setDateOfPurchaseError] = React.useState(false)
    const [officeNameError, setOfficeNameError] = React.useState(false)
    const [UserError, setUserError] = React.useState(false)
    const [purchasedOrderError, setPurchasedOrderError] = React.useState(false)
    const [productIdError, setProductIdError] = React.useState(false)
    // Setting States
    const [productQuantity, setProductQuantity] = React.useState('')
    const [productQuantityError, setProductQuantityError] =
        React.useState(false)
    const [price, setPrice] = React.useState('')
    const [priceError, setPriceError] = React.useState(false)
    const [productId, setproductId] = React.useState('')
    const [purchaseOrder, setPurchaseOrder] = React.useState('')
    const [image, setImage] = React.useState('')
    const [openTransferDialog, setOpenTransferDialog] = React.useState(false)
    const [transferQuantity, setTransferQuantity] = React.useState('')
    const [transferQuantityError, setTransferQuantityError] =
        React.useState(false)
    const [transferCustodianId, setTransferCustodianId] = React.useState()
    const [transferCustodianIdError, setTransferCustodianIdError] =
        React.useState('')

        const [openDuplicateItemEntryDialog, setOpenDuplicateItemEntryDialog] = React.useState(false)

    ///
    //API For the dialogbox
    ///dialog state
    const [model, setModel] = React.useState('')

    // web came code

    const [qrCode, setQrCode] = useState('')
    const [imageUrl1, setImageUrl1] = useState('')
    const classes = useStyles()
    const qrRef = useRef(null)

    ///dialog
    const [statusValue, setStatusValue] = React.useState('')
    const [officeNameList, setOfficeNameList] = React.useState('')
    const [ownerShip, setOwnerShip] = React.useState('')
    const [venderName, setVenderName] = React.useState('')
    const [venderNameError, setVenderNameError] = React.useState(false)
    const [venderEmail, setVenderEmail] = React.useState('N/A')
    const [venderEmailError, setVenderEmailError] = React.useState(false)
    const [venderNumber, setVenderNumber] = React.useState('')
    const [venderNumberError, setVenderNumberError] = React.useState(false)

    const date = new Date().toISOString().split('T')[0]

    const [dataOfPurchase, setDateOfPurchase] = React.useState(date)
    const [user, setUser] = React.useState('')
    const [tagdata, setTagdata] = React.useState(state.purchaseItem.tagNo)
    const [tagdataError, setTagdataError] = React.useState(false)
    const [srno, setSrNo] = React.useState(state.purchaseItem.srNo)
    const [srnoError, setSrNoError] = React.useState(false)
    const [product, setProduct] = React.useState()
    const [office, setOffice] = React.useState()

    const [productTransferDetails, setProductTransferDetails] = React.useState()
    const [currentData, setCurrentData] = React.useState()
    const [PurchaseItemDetail, setPurchaseItemDetail] = React.useState()
    const [itemsEntryDetail, setItemsEntryDetail] = React.useState()

    const [inStore, setInStore] = React.useState('')

    const [showProductName, setShowProductName] = React.useState(false)
    const [openPrintDialog, setOpenPrintDialog] = React.useState(false)
    const navigate = useNavigate()
    const [employeeDetailDialog, setEmployeeDetailDialog] =
        React.useState(false)
    const [employee, setEmployee] = React.useState()
    const [pageNumber, setPageNumber] = React.useState(1)
    const generateQrCode = async () => {
        try {
            const qrProduct = state.purchaseItem.product[0].name

            const qrModel = state.purchaseItem.model

            const qrPrice = state.purchaseItem.price

            const qrPurchaseOrder = state.purchaseItem.purchaseOrder

            const qrProductQuantity = state.purchaseItem.quantity

            const qrStatus = state.purchaseItem.status

            const qrOffice = state.purchaseItem.office[0].name

            const qrDateOfPurchase = state.purchaseItem.dataOfPurchase

            const qrOwnerShip = state.purchaseItem.ownership

            const qrVenderName = state.purchaseItem.venderName

            const qrVenderEmail = state.purchaseItem.venderEmail

            const qrVenderNumber = state.purchaseItem.venderContact

            const qrTag = tagdata === '' ? 'N/A' : tagdata

            const qrSrNo = srno === '' ? 'N/A' : srno

            const qrUUID = uuidv4()

            const qrCode = `Product Name: ${qrProduct}\nModel: ${qrModel}\nPrice: ${qrPrice}\nPurchase Order: ${qrPurchaseOrder}\nQuantity: ${qrProductQuantity}\nStatus: ${qrStatus}\nOffice: ${qrOffice}\nDate Of Purchase: ${qrDateOfPurchase}\nOwnership: ${qrOwnerShip}\nVender Name: ${qrVenderName}\nVender Email: ${qrVenderEmail}\nVender Number: ${qrVenderNumber}\nTag: ${qrTag}\nSr No: ${qrSrNo}\nqrUUID: ${qrUUID}`

            setQrCode(qrCode)
            const response = await QRCode.toDataURL(qrCode)
            setImageUrl1(response)
        } catch (error) {
            console.log(error)
        }
    }

    // const handleClick = () => {
    //     setSnackBar(true)
    // }


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

    const imgeBaseUrl = 'uploads/'

    const handleClose = () => {
        setOpen(false)
    }
    const handleTransferDialogClose = () => {
        setOpenTransferDialog(false)
        setOpen(false)
    }

    const handleEditClose = () => {
        setEditDialogOpen(false)
    }

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
            allocationHandler()
        }
    }

    const handleTransferClickOpen = () => {
        if (transferCustodianId === '' || transferQuantity === '') {
            if (transferCustodianId === '') {
                setTransferCustodianIdError(true)
            }
            if (transferQuantity === '') {
                setTransferQuantityError(true)
            }
        } else {
            productTransferHandler()
        }
    }

    const allocationHandler = () => {
        let data = new FormData()

        data.append('employId', custodianId._id)
        data.append('ItemId', state.purchaseItem._id)
        data.append('quantity', quantity)
        data.append('status', 'valid')
        data.append('createdBy', userName)
        data.append('productId', state.purchaseItem.productId)
        // data.append('transferedTo', 'N/A')
        // data.append('transferedFrom', 'store')

        if (quantity < 1) {
            setSnackBar(true)
            return
        }
        if (quantity > state.purchaseItem.quantity) {
            setSnackBar(true)
            return
        }

        axios
            .post(`${config.base_url}/api/v1/productTransfer`, data)
            .then((res) => {
                if (res) {
                    getProductTransferDetails()
                    getItemsEntryDetail()
                    setOpen(false)
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const productTransferHandler = () => {
        let data = new FormData()

        data.append('ItemId', PurchaseItemDetail?.ItemId)
        data.append('employId', transferCustodianId._id)
        data.append('productId', PurchaseItemDetail?.productId)
        data.append('quantity', transferQuantity)
        data.append('_id', PurchaseItemDetail?._id)

        if (transferCustodianId === employee?._id) {
            alert("You Can't Transfer Product To Yourself")
        }

        // if (quantity < 1) {
        //     setSnackBar(true)
        //     return
        // } else if (quantity > state.purchaseItem.quantity) {
        //     setSnackBar(true)
        //     return
        // } else if (quantity > inStore) {
        //     alert(`Quantity Must Be Smaller Or Equal To ${inStore}`)
        // }

        if (transferQuantity < 1) {
            alert(`Quantity Must Be Greater Than ${transferQuantity}`)
        } else if (transferQuantity > PurchaseItemDetail?.quantity) {
            alert(
                `Quantity Must Be Smaller or Equal To ${PurchaseItemDetail?.quantity}`
            )
        } else {
            axios
                .post(
                    `${config.base_url}/api/v1/productTransfer/transfer`,
                    data
                )
                .then((res) => {
                    setOpenTransferDialog(false)
                    setTransferQuantity('')
                    setOpen(false)
                    getProductTransferDetails()
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    const getEmployee = () => {
        setOpen(true)
        axios
            .get(`${config.base_url}/api/v1/employee`)
            .then((res) => {
                setCustodianIds(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const handlePhoto = (event) => {
        setImage(event.target.files)
    }

    const handleProduct = (event) => {
        setproductId(event.target.value)
    }

    const dateOfPurchase = new Date(state.purchaseItem.dataOfPurchase)
        .toISOString()
        .split('T')[0]

    const PurchaseItemTable = styled(Table)(() => ({
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

    const editfunction = (item) => {
        setCurrentData(item)
        setEditDialogOpen(true)

        setCustodianId(item.employId)

        setQuantity(item.quantity)
    }

    const handleCreateClickOpen = () => {
        if (tagdata === '' || srno === '' || srno === state.purchaseItem.srNo || tagdata === state.purchaseItem.tagNo) {
            if (tagdata === '') {
                setTagdataError(true)
            }
            if (srno === '') {
                setSrNoError(true)
            }
            if (srno === state.purchaseItem.srNo) {
                alert('Please Add Different Serial Number')
            }
            if (tagdata === state.purchaseItem.tagNo) {
                alert('Please Add Different Tag Number')
            }
        } else {
            generateQrCode()
            setOpenDuplicateItemEntryDialog(true)
        }
    }

    const createHandler = () => {
        let data = new FormData()

        data.append('productId', state.purchaseItem.product[0]?._id)
        data.append('price', state.purchaseItem?.price)
        data.append('createdBy', state.purchaseItem.createdBy)

        data.append('dataOfPurchase', state.purchaseItem.dataOfPurchase)
        data.append('ownership', state.purchaseItem.ownership)
        data.append('officeId', state.purchaseItem.office[0]?._id)
        data.append('status', state.purchaseItem.status)
        data.append('venderName', state.purchaseItem.venderName)
        data.append('venderEmail', state.purchaseItem.venderEmail)
        data.append('venderContact', state.purchaseItem.venderContact)
        data.append('attachment', state.purchaseItem.attachment)
        data.append('QRCodeImage', imageUrl1)
        data.append('model', state.purchaseItem.model)
        data.append('purchaseOrder', state.purchaseItem.purchaseOrder)
        data.append('quantity', state.purchaseItem.quantity)
        data.append('QRCode', state.purchaseItem.QRCode)
        data.append('srNo', srno)
        data.append('features', state.purchaseItem.features)
        data.append('tagNo', tagdata)
        data.append('active', state.purchaseItem.active)
        data.append('qrUUID', state.purchaseItem.qrUUID)

        if (srno === state.purchaseItem.srNo) {
            alert('Please Add Different Serial Number')
            return
        }
        if (tagdata === state.purchaseItem.tagNo) {
            alert('Please Add Different Tag Number')
        }

        axios
            .post(`${config.base_url}/api/v1/purchaseProduct`, data)
            .then((res) => {
                if (res) {
                    // handleCreateClose()
                    // getAlldata()
                    setOpen(false)
                    setDuplicateDialogOpen(false)
                    setOpenDuplicateItemEntryDialog(false)
                }
                setStatusValue('')
                setPrice('')
                setDateOfPurchase('')
                setOwnerShip('')
                setOfficeNameList('')
                setVenderName('')
                setVenderEmail('')
                setVenderNumber('')
                setImage('')
                setImageUrl1('')
                setModel('')
                setQrCode('')
                setProductQuantity('')
                setPurchaseOrder('')
                setSrNo('')
                setTagdata('')
                // setSelectedProduct(null)
                // setChecked(false)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const UpdateRecord = () => {
        let data = new FormData()
        data.append('employId', custodianId)
        data.append('ItemId', state.purchaseItem._id)
        data.append('quantity', quantity)
        data.append('status', 'valid')
        data.append('createdBy', userName)
        data.append('productId', state.purchaseItem.productId)
        data.append('_id', currentData._id)
        data.append('uuid', currentData.uuid)

        if (quantity < 1) {
            setSnackBar(true)
            return
        } else if (quantity > state.purchaseItem.quantity) {
            setSnackBar(true)
            return
        } else if (quantity > inStore) {
            alert(`Quantity Must Be Smaller Or Equal To ${inStore}`)
        } else {
            axios
                .put(`${config.base_url}/api/v1/productTransfer/update`, data)
                .then((res) => {
                    if (res) {
                        setEditDialogOpen(false)
                        getProductTransferDetails()
                        getItemsEntryDetail()
                        setCustodianId('')
                        setQuantity('')
                        console.log(res)
                    }
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    const transferProduct = (item) => {
        setOpenTransferDialog(true)

        getEmployee()

        setPurchaseItemDetail(item)
    }

    const deleteTransferProduct = (productTransfer) => {
        axios
            .delete(
                `${config.base_url}/api/v1/productTransfer/${productTransfer._id}`
            )
            .then((res) => {
                getProductTransferDetails()
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    useEffect(() => {
        getProductTransferDetails()
        getItemsEntryDetail()
    }, [])

    const getItemsEntryDetail = () => {
        axios
            .get(
                `${config.base_url}/api/v1/purchaseProduct/${state.purchaseItem._id}`
            )
            .then((res) => {
                setItemsEntryDetail(res.data.data)
                setInStore(res.data.stock)
            })
            .catch((error) => {
                console.log(error, 'error')

                setShowTable(false)
            })
    }

    const onTrackHistory = () => {
        setShowTable(true)
        getProductTransferDetails()
    }

    const getProductTransferDetails = () => {
        axios
            .get(
                `${config.base_url}/api/v1/productTransfer/${state.purchaseItem._id}`
            )
            .then((res) => {
                setProductTransferDetails(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
                alert('No Record Found')
                setShowTable(false)
            })
    }

    const handleQrPrint = () => {
        printPageArea('qrcode')
    }

    const headers = [
        { label: 'Name', key: 'products[0].name' },
        { label: 'Price', key: 'PurchaseProduct[0].price' },
        { label: 'Quantity', key: 'PurchaseProduct[0].quantity' },
        { label: 'PurchaseOrder', key: 'PurchaseProduct[0].purchaseOrder' },
        { label: 'Vender Name', key: 'PurchaseProduct[0].venderName' },
        { label: 'Vender Email', key: 'PurchaseProduct[0].venderEmail' },
        { label: 'Vender Contact', key: 'PurchaseProduct[0].venderContact' },
        { label: 'Date Of Purchase', key: 'PurchaseProduct[0].dataOfPurchase' },
        { label: 'Ownership', key: 'PurchaseProduct[0].ownership' },
        { label: 'Status', key: 'PurchaseProduct[0].status' },
        { label: 'Sr No', key: 'PurchaseProduct[0].srNo' },
        { label: 'Tag No', key: 'PurchaseProduct[0].tagNo' },
        { label: 'Transferred From', key: 'transferedFrom' },
        { label: 'Transfer Quantity', key: 'quantity' },
        { label: 'Employee Name', key: 'employees[0].name' },
        { label: 'Employee Id', key: 'employees[0].employeeId' },
    ]

    const productImage = state.purchaseItem.product[0]
    
    //------------------------------------------back button------------------------------------------

    localStorage.setItem("page", state.pageNumber)

    const backButtonClick = () =>{
        navigate(`/items/PurchasedItems/${state.pageNumber}`
    )}
    
    

    return (
        <>

<Button variant="contained" color="primary" onClick={backButtonClick} >Back</Button>

        {openDuplicateItemEntryDialog && <ConfirmationDialog
                    open={openDuplicateItemEntryDialog}
                    onConfirmDialogClose={() => {
                        setOpenDuplicateItemEntryDialog(false)
                    }}
                    title={`Are You Sure?`}
                    text={`Are You Sure You Want To Duplicate This Item?`}
                    onYesClick={createHandler}
                />}
            {productTransferDetails && (
                <Tooltip title="Generate Report">
                    <Fab
                        color="primary"
                        aria-label="Add"
                        size="medium"
                        style={{
                            zIndex: 999,
                            right: '4vw',
                            top: '10vh',
                            position: 'fixed',
                        }}
                    >
                        <CSVLink
                            filename={'product-details.csv'}
                            data={productTransferDetails}
                            headers={headers}
                        >
                            <div style={{ marginTop: '8px' }}>
                                <SummarizeIcon />
                            </div>
                        </CSVLink>
                    </Fab>
                </Tooltip>
            )}


            <Card elevation={3} sx={{ pt: '20px', mb: 10, margin: '50px' }}>
           
                <CardHeader>
                    <Title>ITEMS ENTRY DETAILS</Title>
                   
                </CardHeader>
                <hr></hr>
                <Grid container>
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                        <ContentBox>
                            <IMG
                              src={
                                state.purchaseItem.attachment[0] === 'no-image' || state.purchaseItem.attachment[0] === "no-photo.jpg" ||
                        state.purchaseItem.attachment[0] === undefined
                                    ? noImage
                                    : config.base_url +
                                      '/' +
                                      imgeBaseUrl +
                                      state.purchaseItem.attachment[0]
                            }                                                    
                                // src={
                                //     state.purchaseItem.attachment[0]
                                //         ? state.purchaseItem.attachment[0] !== "no-photo.jpg" && state.purchaseItem.attachment[0] !== "no-image" && state.purchaseItem.attachment[0] !== undefined
                                //             ? config.base_url +
                                //               '/' +
                                //               'uploads/' +
                                //               productImage
                                //             : noImage
                                //         : noImage
                                // }
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
                            {state.purchaseItem.product[0]
                                ? state.purchaseItem?.product[0].name
                                : 'N/A'}
                        </h3>
                        <br></br>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Price: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.price}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Quantity: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.quantity}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>In Store: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{inStore}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Ownership: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.ownership}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Date Of Purchase: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{dateOfPurchase}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Model: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.model}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Status: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.status}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Vender Name: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.venderName}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Purchase Order: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.purchaseOrder}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Vender Email: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.purchaseItem.venderEmail ===
                                        undefined
                                            ? 'N/A'
                                            : state.purchaseItem?.venderEmail}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Vender Contact: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.purchaseItem.venderContact ===
                                        undefined
                                            ? 'N/A'
                                            : state.purchaseItem?.venderContact}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Serial Number: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.purchaseItem.srNo === ''
                                            ? 'N/A'
                                            : state.purchaseItem?.srNo}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Tag Number: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.purchaseItem.tagNo === undefined
                                            ? 'N/A'
                                            : state.purchaseItem?.tagNo}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Created At: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {moment(
                                            state.purchaseItem?.createdAt
                                        ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Modified At: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.purchaseItem?.modifiedAt ===
                                        undefined
                                            ? 'N/A'
                                            : moment(
                                                  state.purchaseItem?.modifiedAt
                                              ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Office: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.purchaseItem.office[0]
                                            ? state.purchaseItem.office[0].name
                                            : 'N/A'}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={11} md={11} sm={11} xs={11}>
                                <span>Features: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.purchaseItem.features !== undefined
                                            ? state.purchaseItem?.features.map(
                                                  (feature) => {
                                                      return (
                                                          <>{feature + ', '}</>
                                                      )
                                                  }
                                              )
                                            : 'N/A'}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={1} md={1} sm={1} xs={1}>
                                {state.purchaseItem.attachment?.length != 0 ? (
                                    <IconButton
                                        color="primary"
                                        onClick={() => {
                                            saveAs(
                                                `${config.base_url}/uploads/${state.purchaseItem.attachment[0]}`,
                                                ''
                                            )
                                        }}
                                    >
                                        <DownloadIcon />
                                    </IconButton>
                                ) : null}
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Box sx={{
                                    marginTop: '-20px'
                                }} id="qrcode">
                                    <h6
                                        style={{
                                            marginLeft: '40px',
                                        }}
                                    >
                                        {state.purchaseItem.product[0]
                                            ? state.purchaseItem.product[0].name
                                            : 'N/A'}
                                    </h6>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginTop: '-15px',
                                            marginBottom: '15px',
                                        }}
                                    >
                                        <img
                                            src={
                                                state.purchaseItem?.QRCodeImage
                                            }
                                            width={`150px`}
                                            height={`150px`}
                                            alt=""
                                        />
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>
                        {state.purchaseItem.quantity === 1 ? (
                            <Grid container>
                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                    <Button
                                        variant="contained"
                                        type="button"
                                        style={{ width: '200px' }}
                                        onClick={getEmployee}
                                    >
                                        Allocate Items
                                    </Button>
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                    <Button
                                        variant="contained"
                                        type="button"
                                        style={{ width: '200px' }}
                                        onClick={onTrackHistory}
                                    >
                                        Track History
                                    </Button>
                                </Grid>

                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                    <Button
                                        style={{
                                            marginTop: '15px',
                                            width: '200px',
                                        }}
                                        variant="contained"
                                        type="button"
                                        onClick={() => {
                                            setDuplicateDialogOpen(true)
                                        }}
                                    >
                                        Duplicate
                                    </Button>
                                </Grid>

                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                    <Button
                                        style={{
                                            marginTop: '15px',
                                            width: '200px',
                                        }}
                                        variant="contained"
                                        type="button"
                                        onClick={() => {
                                            handleQrPrint()
                                        }}
                                    >
                                        Print QR Code
                                    </Button>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <Button
                                        variant="contained"
                                        type="button"
                                        onClick={getEmployee}
                                    >
                                        Allocate Items
                                    </Button>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <Button
                                        variant="contained"
                                        type="button"
                                        onClick={onTrackHistory}
                                    >
                                        Track History
                                    </Button>
                                </Grid>

                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <Button
                                        variant="contained"
                                        type="button"
                                        onClick={() => {
                                            handleQrPrint()
                                        }}
                                    >
                                        Print QR Code
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Card>
            {showTable && (
                <Card
                    elevation={3}
                    sx={{ pt: '20px', mAllUsersTableb: 10, margin: '50px' }}
                >
                    <Box overflow="auto">
                        <PurchaseItemTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="left"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Employee Id
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 0 }}
                                        colSpan={2}
                                    >
                                        Employee Name
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 0 }}
                                        colSpan={2}
                                    >
                                        Allocation Date
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 0 }}
                                        colSpan={1}
                                    >
                                        Quantity
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 0 }}
                                        colSpan={2}
                                    >
                                        Transferred From
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 0 }}
                                        colSpan={1}
                                    >
                                        Edit
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 0 }}
                                        colSpan={1}
                                    >
                                        Transfer
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 0 }}
                                        colSpan={1}
                                    >
                                        Delete
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productTransferDetails &&
                                    productTransferDetails.map(
                                        (productTransfer) => (
                                            <TableRow
                                                key={productTransfer._id}
                                                hover
                                            >
                                                <TableCell
                                                    align="left"
                                                    sx={{ px: 0 }}
                                                    colSpan={2}
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
                                                                setEmployee(
                                                                    productTransfer
                                                                        .employees[0]
                                                                )
                                                                setEmployeeDetailDialog(
                                                                    true
                                                                )
                                                            }}
                                                        >
                                                            {productTransfer
                                                                .employees[0]
                                                                ? productTransfer
                                                                      .employees[0]
                                                                      .employeeId
                                                                    ? productTransfer
                                                                          .employees[0]
                                                                          .employeeId
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
                                                        cursor: 'pointer',
                                                        color: 'blue',
                                                    }}
                                                >
                                                    <Paragraph
                                                        sx={{
                                                            m: 0,
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => {
                                                            setEmployeeDetailDialog(
                                                                true
                                                            )
                                                            setEmployee(
                                                                productTransfer
                                                                    .employees[0]
                                                            )
                                                        }}
                                                    >
                                                        {productTransfer
                                                            .employees[0]
                                                            ? productTransfer
                                                                  .employees[0]
                                                                  .name
                                                                ? productTransfer
                                                                      .employees[0]
                                                                      .name
                                                                : 'N/A'
                                                            : 'N/A'}
                                                    </Paragraph>
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
                                                    {date}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    colSpan={1}
                                                    sx={{
                                                        px: 0,
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    {productTransfer.quantity}
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
                                                    {productTransfer.transferedFrom ===
                                                    undefined
                                                        ? 'Store'
                                                        : productTransfer
                                                              .transferedFromEmploy[0]
                                                        ? productTransfer
                                                              .transferedFromEmploy[0]
                                                              .name
                                                        : 'N/A'}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    colSpan={1}
                                                    sx={{
                                                        px: 0,
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            editfunction(
                                                                productTransfer
                                                            )
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </Button>
                                                </TableCell>

                                                <TableCell
                                                    sx={{ px: 0 }}
                                                    align="center"
                                                    colSpan={1}
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            transferProduct(
                                                                productTransfer
                                                            )
                                                        }
                                                    >
                                                        <BiTransfer size={22} />
                                                    </Button>
                                                </TableCell>
                                                <TableCell
                                                    sx={{ px: 0 }}
                                                    align="center"
                                                    colSpan={1}
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            deleteTransferProduct(
                                                                productTransfer
                                                            )
                                                        }}
                                                    >
                                                        <DeleteIcon color="error" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                            </TableBody>
                        </PurchaseItemTable>
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
                    {'ALLOCATE ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid
                            item
                            lg={7}
                            md={7}
                            sm={7}
                            xs={7}
                            sx={{ marginTop: '10px' }}
                        >
                            <Box sx={{ minWidth: 120 }}>
                                <Autocomplete
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={custodianIds}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) =>
                                        `${option.employeeId} / ${option.name}`
                                    }
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                error={custodianIdError}
                                                {...params}
                                                label="Employee Id / Name"
                                                helperText={
                                                    custodianIdError &&
                                                    'Field Required'
                                                }
                                            />
                                        )
                                    }}
                                    value={custodianId}
                                    onChange={(_event, custodianId) => {
                                        setCustodianId(custodianId)
                                    }}
                                />
                            </Box>
                        </Grid>
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
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button autoFocus onClick={handleClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>
                <Snackbar
                    open={snackBar}
                    autoHideDuration={6000}
                    onClose={handleSnackBarClose}
                    message={
                        quantity < 1
                            ? `Quantity Must Be Greater Than ${quantity}`
                            : `Quantity Must Be Smaller Than ${state.purchaseItem.quantity}`
                    }
                    action={action}
                />
            </Dialog>
            <Dialog
                open={editDialogOpen}
                fullWidth={true}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'EDIT ALLOCATE ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={4}>
                        {/* <Grid
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
                                        Employee Id / Name
                                    </InputLabel>
                                    <Select
                                        size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={custodianId}
                                        label="Custodian Id"
                                        onChange={(event) =>
                                            setCustodianId(event.target.value)
                                        }
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
                        </Grid> */}
                        <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
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
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button autoFocus onClick={UpdateRecord}>
                        Confirm
                    </Button>
                </DialogActions>
                <Snackbar
                    open={snackBar}
                    autoHideDuration={6000}
                    onClose={handleSnackBarClose}
                    message={
                        quantity < 1
                            ? `Quantity Must Be Greater Than ${quantity}`
                            : `Quantity Must Be Smaller Than ${state.purchaseItem.quantity}`
                    }
                    action={action}
                />
            </Dialog>

            <Dialog
                open={duplicateDialogOpen}
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD PURCHASE ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <br></br>

                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={productIdError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Product
                                        </InputLabel>
                                        <Select
                                            disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={
                                                state.purchaseItem.product[0]
                                                    ?._id
                                            }
                                            label="Product Category"
                                            onChange={handleProduct}
                                        >
                                            <MenuItem
                                                value={
                                                    state.purchaseItem
                                                        .product[0]?._id
                                                }
                                            >
                                                {
                                                    state.purchaseItem
                                                        .product[0]?.name
                                                }
                                            </MenuItem>
                                        </Select>

                                        <FormHelperText>
                                            {' '}
                                            {productIdError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    disabled
                                    error={modelError}
                                    id="name"
                                    label="Model"
                                    placeholder="Model"
                                    autoComplete="off"
                                    helperText={
                                        modelError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.model}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setModel, setModelError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    disabled
                                    error={priceError}
                                    type={`number`}
                                    id="name"
                                    label="Price"
                                    placeholder="Price"
                                    autoComplete="off"
                                    helperText={
                                        priceError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.price}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setPrice, setPriceError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    disabled
                                    error={purchasedOrderError}
                                    id="name"
                                    label="Purchase Order(PO)"
                                    placeholder="Purchase Order(PO)"
                                    autoComplete="off"
                                    helperText={
                                        purchasedOrderError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.purchaseOrder}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setPurchaseOrder,
                                            setPurchasedOrderError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    disabled
                                    error={productQuantityError}
                                    id="name"
                                    label="Product Quantity"
                                    placeholder="Product Quantity"
                                    autoComplete="off"
                                    helperText={
                                        productQuantityError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.quantity}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setProductQuantity,
                                            setProductQuantityError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid
                                item
                                lg={4}
                                md={4}
                                sm={4}
                                xs={6}
                                style={{
                                    justifyContent: 'center',
                                    marginLeft: '0px',
                                }}
                            >
                                <Box>
                                    {/* <span>Active</span>
                <Switch {...label} defaultChecked />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}

                                    <label htmlFor="contained-button-file">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={handlePhoto}
                                        />
                                        <Button
                                            disabled
                                            variant="contained"
                                            component="span"
                                            startIcon={<AddAPhotoIcon />}
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            Upload
                                        </Button>
                                    </label>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={statusError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Status
                                        </InputLabel>
                                        <Select
                                            disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.purchaseItem.status}
                                            label="Status"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setStatusValue,
                                                    setStatusError
                                                )
                                            }
                                        >
                                            <MenuItem value={`inuse`}>
                                                Inuse
                                            </MenuItem>
                                            <MenuItem value={`replacement`}>
                                                Replacement
                                            </MenuItem>
                                            <MenuItem value={`scrap`}>
                                                Scrap
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {' '}
                                            {statusError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={officeNameError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Office
                                        </InputLabel>
                                        <Select
                                            disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={
                                                state.purchaseItem.office[0]
                                                    ?._id
                                            }
                                            label="Office"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setOfficeNameList,
                                                    setOfficeNameError
                                                )
                                            }
                                        >
                                            <MenuItem
                                                value={
                                                    state.purchaseItem.office[0]
                                                        ?._id
                                                }
                                            >
                                                {
                                                    state.purchaseItem.office[0]
                                                        ?.name
                                                }
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {' '}
                                            {officeNameError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <form
                                    // className={myclass.container}
                                    noValidate
                                >
                                    <TextField
                                        disabled
                                        id="date"
                                        size="small"
                                        label="Date Of Purchase"
                                        type="date"
                                        value={dateOfPurchase}
                                        defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={dateOfPurchaseError}
                                        helperText={
                                            dateOfPurchaseError === true
                                                ? 'Field Required'
                                                : ''
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                setDateOfPurchase,
                                                setDateOfPurchaseError
                                            )
                                        }
                                    />
                                </form>
                            </Grid>

                            {/* <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={UserError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Custodian Id
                                        </InputLabel>
                                        <Select
                                            disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.purchaseItem.custodian}
                                            label="Custodian Id / Name"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setUser,
                                                    setUserError
                                                )
                                            }
                                        >
                                            {custodianIds.map((employee) => {
                                                // setEmployeeId(
                                                //     employee.employeeId
                                                // )
                                                return (
                                                    <MenuItem
                                                        key={employee._id}
                                                        value={employee._id}
                                                    >
                                                        {employee.employeeId}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>
                                            {' '}
                                            {UserError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid> */}

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box sx={{ minWidth: 145 }}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={ownerShipError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            OwnerShip
                                        </InputLabel>
                                        <Select
                                            disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.purchaseItem.ownership}
                                            label="OwnerShip"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setOwnerShip,
                                                    setOwnerShipError
                                                )
                                            }
                                        >
                                            <MenuItem value={`PRAL`}>
                                                PRAL
                                            </MenuItem>
                                            <MenuItem value={`FBR`}>
                                                FBR
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {' '}
                                            {ownerShipError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    disabled
                                    error={venderNameError}
                                    id="name"
                                    label="Vendor Name"
                                    placeholder="Enter Vendor Name"
                                    autoComplete="off"
                                    helperText={
                                        venderNameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.venderName}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setVenderName,
                                            setVenderNameError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <br></br>

                            {/* this is the qr code of the PRAL */}

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    disabled
                                    error={venderEmailError}
                                    id="name"
                                    label="Vendor Email"
                                    placeholder="Enter Vendor Email"
                                    autoComplete="off"
                                    helperText={
                                        venderEmailError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.venderEmail}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setVenderEmail,
                                            setVenderEmailError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    disabled
                                    error={venderNumberError}
                                    id="name"
                                    label="Vendor Number"
                                    placeholder="Enter Vendor Number"
                                    autoComplete="off"
                                    helperText={
                                        venderNumberError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.venderContact}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setVenderNumber,
                                            setVenderNumberError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={tagdataError}
                                    id="name"
                                    label="Tag"
                                    placeholder="Tag"
                                    autoComplete="off"
                                    helperText={
                                        tagdataError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={tagdata}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setTagdata,
                                            setTagdataError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={12}>
                                <TextField
                                    error={srnoError}
                                    id="name"
                                    label="Serial Number"
                                    placeholder="Enter Serial Number"
                                    autoComplete="off"
                                    helperText={
                                        srnoError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={srno}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setSrNo, setSrNoError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={4}></Grid>
                        {/* <Grid container spacing={2}>
                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                <Button
                                    className={classes.btn}
                                    variant="contained"
                                    color="primary"
                                    onClick={generateQrCode}
                                >
                                    Generate
                                </Button>
                                <br></br>
                                {imageUrl1 ? (
                                    <a href={imageUrl1} download>
                                        <img
                                            src={imageUrl1}
                                            alt="img"
                                            style={{
                                                marginLeft: '24px',
                                            }}
                                        />
                                    </a>
                                ) : null}
                            </Grid>
                        </Grid> */}
                    </CardContent>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setDuplicateDialogOpen(false)
                            setImageUrl1('')
                        }}
                    >
                        Cancel
                    </Button>
                    <Button autoFocus onClick={handleCreateClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openTransferDialog}
                fullWidth={true}
                onClose={handleTransferDialogClose}
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
                                error={transferQuantityError}
                                id="quantity"
                                label="Quantity"
                                placeholder="Enter Quantity"
                                autoComplete="off"
                                helperText={
                                    transferQuantityError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={transferQuantity}
                                size="small"
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setTransferQuantity,
                                        setTransferQuantityError
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
                                <Autocomplete
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={custodianIds}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) =>
                                        `${option.employeeId} / ${option.name}`
                                    }
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                error={transferCustodianIdError}
                                                {...params}
                                                label="Transfer To"
                                                helperText={
                                                    transferCustodianIdError &&
                                                    'Field Required'
                                                }
                                            />
                                        )
                                    }}
                                    value={transferCustodianId}
                                    onChange={(_event, custodianId) => {
                                        setTransferCustodianId(custodianId)
                                    }}
                                />
                                {/* <FormControl
                                    fullWidth
                                    error={transferCustodianIdError}
                                >
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
                                        value={transferCustodianId}
                                        label="Transfer To"
                                        onChange={(event) => {
                                            setTransferCustodianId(
                                                event.target.value
                                            )
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
                                        {transferCustodianIdError &&
                                            'Field Required'}
                                    </FormHelperText>
                                </FormControl> */}
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTransferDialogClose}>Cancel</Button>
                    <Button autoFocus onClick={handleTransferClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={employeeDetailDialog}
                onClose={() => setEmployeeDetailDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Employee Details`}</DialogTitle>
                <DialogContent>
                    <Card elevation={3}>
                        <Grid container>
                            <Grid item lg={5} md={5} sm={12} xs={12}>
                                <ContentBox>
                                    <IMG
                                        src={
                                            employee?.photo === 'no-image' ||
                                            employee?.photo === undefined
                                                ? avatar
                                                : config.base_url +
                                                  '/' +
                                                  imgeBaseUrl +
                                                  employee?.photo
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
                                    {employee?.name === undefined
                                        ? 'N/A'
                                        : employee?.name}
                                </h3>
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Email Address: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.emailAddress ===
                                                undefined
                                                    ? 'N/A'
                                                    : employee?.emailAddress}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Mobile Number: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.mobileNumber ===
                                                undefined
                                                    ? 'N/A'
                                                    : employee?.mobileNumber}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr></hr>
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Department: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.department ===
                                                undefined
                                                    ? 'N/A'
                                                    : employee?.department}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Designation: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.designation ===
                                                undefined
                                                    ? 'N/A'
                                                    : employee?.designation}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr></hr>
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Pg: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.pg === undefined
                                                    ? 'N/A'
                                                    : employee?.pg}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Wing: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.wing.length < 1
                                                    ? 'N/A'
                                                    : employee?.wing}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr></hr>
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Office: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.office === undefined
                                                    ? 'N/A'
                                                    : employee?.office}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>CNIC: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.cnic === undefined
                                                    ? 'N/A'
                                                    : employee?.cnic}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr></hr>
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Created Date: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {moment(
                                                    employee?.createdAt
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
                                                {employee?.modifiedAt ===
                                                undefined
                                                    ? 'N/A'
                                                    : moment(
                                                          employee?.modifiedAt
                                                      ).format('LL')}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr></hr>
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Gender </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.gender === undefined
                                                    ? 'N/A'
                                                    : employee?.gender}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Date of Birth: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.dob === undefined
                                                    ? 'N/A'
                                                    : employee?.dob}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Date Of Joining: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.dateOfJoining ===
                                                undefined
                                                    ? 'N/A'
                                                    : employee?.dateOfJoining}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Reporting Manager: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.reportingManager ===
                                                undefined
                                                    ? 'N/A'
                                                    : employee.reportingManager}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr></hr>
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Employee Id: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.employeeId ===
                                                undefined
                                                    ? 'N/A'
                                                    : employee?.employeeId}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <span>Job Title: </span>
                                        <span style={{ color: 'green' }}>
                                            <b>
                                                {employee?.jobTitle ===
                                                undefined
                                                    ? 'N/A'
                                                    : employee?.jobTitle}
                                            </b>
                                        </span>
                                    </Grid>
                                </Grid>
                                <hr></hr>
                                <Box sx={{ marginBottom: '5px' }}>
                                    <h4>Detail: </h4>
                                    {employee?.remarks === undefined
                                        ? 'N/A'
                                        : employee?.remarks}
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEmployeeDetailDialog(false)}>
                        Close
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

export default PurchaseItemDetail

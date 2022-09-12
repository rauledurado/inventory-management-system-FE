import { useTheme } from '@mui/material/styles'
import * as React from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import QrCodeIcon from '@mui/icons-material/QrCode'
import { v4 as uuidv4 } from 'uuid'

import {
    Autocomplete,
    Checkbox,
    Container,
    Fab,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    Typography,
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import QRCode from 'qrcode'
import { CardContent } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/system'
import { ConfirmationDialog } from 'app/components'
import axios from 'axios'
import config from 'config'
import moment from 'moment'
import PurchaseItemCard from './PurchaseItemCard'
import QrReader from 'react-qr-reader'
import { CSVLink } from 'react-csv'
import SummarizeIcon from '@mui/icons-material/Summarize'
import '../users/user.css'
import ReactPaginate from 'react-paginate'
import TagsInput from './TagsInput'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import * as XLSX from "xlsx"
import { useLocation } from 'react-router-dom'

const dateStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}))

const Input = styled('input')({
    display: 'none',
})

const PurchasedItems = () => {

    const [createEmailErrorMessage, setCreateEmailErrorMessage] =
        React.useState('field required')
    // States
    const userName = localStorage.getItem('username')
    const [qrUUID, setQrUUID] = React.useState('')
    const [mychips, setMyChips] = React.useState('')
    const [features, setmyFeatures] = React.useState('')
    const [brand, setBrand] = React.useState(null)
    const [brands, setBrands] = React.useState([])
    const [assetsName, setAssetsName] = React.useState(null)
    const [assets, setAssets] = React.useState([])
    const [editmodifyOnError, seteditModifyOnError] = React.useState(false)
    // Form validation errors State Setting
    const [priceError, setPriceError] = React.useState(false)
    const [productQuantityError, setProductQuantityError] =
        React.useState(false)
    const [statusError, setStatusError] = React.useState(false)
    const [officeError, setOfficeError] = React.useState(false)
    const [createdByError, setCreatedByError] = React.useState(false)
    const [createdAtError, setCreatedAtError] = React.useState(false)
    const [modifyByError, setModifyByError] = React.useState(false)
    const [modifyOnError, setModifyOnError] = React.useState(false)
    const [ownerShipError, setOwnerShipError] = React.useState(false)
    const [venderError, setVenderError] = React.useState(false)
    const [imageError, setImageError] = React.useState(false)
    const [modelError, setModelError] = React.useState(false)
    const [dateOfPurchaseError, setDateOfPurchaseError] = React.useState(false)
    const [custodienIdError, setCustodienIdError] = React.useState(false)
    const [purchasedError, setPurchasedError] = React.useState(false)
    const [officeNameError, setOfficeNameError] = React.useState(false)
    const [UserError, setUserError] = React.useState(false)
    const [purchasedOrderError, setPurchasedOrderError] = React.useState(false)
    const [productIdError, setProductIdError] = React.useState(false)
    // Setting States
    const [quantity, setQuantity] = React.useState([])
    const [checked, setChecked] = React.useState(false)
    const [productQuantity, setProductQuantity] = React.useState('1')
    const [price, setPrice] = React.useState('')
    const [product, setProduct] = React.useState([])
    const [purchaseOrder, setPurchaseOrder] = React.useState('')
    const [image, setImage] = React.useState('')
    const [product1, setProduct1] = React.useState([])
    const myclass = dateStyles()

    //API For the dialogbox
    const [purchaseBy, setPurchaseBy] = React.useState([])
    ///dialog state
    const [model, setModel] = React.useState('')

    const [qrCode, setQrCode] = useState('')
    const [imageUrl1, setImageUrl1] = useState('')
    const [scanResultFile, setScanResultFile] = useState('')
    const [scanResultWebCam, setScanResultWebCam] = useState('')
    const classes = useStyles()
    const qrRef = useRef(null)

    ///dialog
    const [statusDialog, setStatusDialog] = React.useState([])
    const [statusValue, setStatusValue] = React.useState('')

    const [officeDialog, setOfficeDialog] = React.useState([])
    const [officeNameList, setOfficeNameList] = React.useState(null)
    const [officeNameListError, setOfficeNameListError] = React.useState(false)
    const [purchasedDialog, setPurchasedDialog] = React.useState([])
    const [customerDialog, setCustomerDialog] = React.useState([])
    const [custodienId, setCustodienId] = React.useState([])
    const [createdBy, setCreatedBy] = React.useState(userName)
    const [createdAt, setCreatedAt] = React.useState('')
    const [modifyByDialog, setModifyByDialog] = React.useState([])
    const [modifyOnDialog, setModifyOnDialog] = React.useState([])
    const [purchasedItems, setPurchasedItems] = React.useState([])
    const [ownerShip, setOwnerShip] = React.useState('')
    const [venderName, setVenderName] = React.useState('')
    const [venderNameError, setVenderNameError] = React.useState(false)
    const [venderEmail, setVenderEmail] = React.useState('N/A')
    const [venderEmailError, setVenderEmailError] = React.useState(false)
    const [venderNumber, setVenderNumber] = React.useState('')
    const [venderNumberError, setVenderNumberError] = React.useState(false)
    const [invoiceNo, setInvoiceNo] = React.useState("")
    const [invoiceNoError, setInvoiceNoError] = React.useState(false)
    const [tenderNo, setTenderNo] = React.useState("")
    const [tenderNoError, setTenderNoError] = React.useState(false)
    const date = new Date().toISOString().split('T')[0]

    // new changes useState

    const [grnNo, setGrnNo] = useState("")
    const [grnDate, setGrnDate] = useState(date)
    const [volcherNo, setVolcherNo] = useState("")
    const [volcherDate, setVolcherDate] = useState(date)
    const [assetName, setAssetName] = useState("")

    // new changes error useState

    const [grnError, setGrnError] = useState(false)
    const [grnDateError, setGrnDateError] = useState(false)
    const [volcherNoError, setVolcherNoError] = useState(false)
    const [volcherDateError, setVolcherDateError] = useState(false)
    const [assetNameError, setAssetNameError] = useState(false)



    const [departments, setDepartments] = React.useState([])
    const [selectedDepartment, setSelectedDepartment] = React.useState(null)
    const [wings, setWings] = React.useState([])
    const [wingsByDepartment, setWingsByDepartment] = React.useState([])
    const [wing, setWing] = React.useState('')


    const [dataOfPurchase, setDateOfPurchase] = React.useState(date)
    const [receivingDate, setReceivingDate] = React.useState(date)

    const [user, setUser] = React.useState('')
    const [purchaseId, setPurchaseId] = React.useState('')
    const [assetsNameId, setassetsNameId] = React.useState(null)
    const [asset, setAsset] = React.useState([])
    const [handleEditDialog, setHandleEditDialog] = React.useState(false)
    ///search items
    const [searchItemsDialog, setSearchItemsDialog] = React.useState(false)
    const [vender, setVender] = React.useState('')
    const [custodienIdName, setCustodienIdName] = React.useState('')
    const [productName, setProductName] = React.useState([])
    const [tagdata, setTagdata] = React.useState('')
    const [tagdataError, setTagdataError] = React.useState(false)
    const [srno, setSrNo] = React.useState('')
    const [srnoError, setSrNoError] = React.useState(false)
    const [productData, setProductData] = React.useState()
    const [officeData, setOfficeData] = React.useState()
    const [openConfirmationDialog, setOpenConfirmationDialog] =
        React.useState(false)
    const [selectedProduct, setSelectedProduct] = React.useState(null)
    const [selectedProductError, setSelectedProductError] = React.useState(null)
    const [productId, setProductId] = React.useState('')

    const [
        openItemEntryConfirmationDialog,
        setOpenItemEntryConfirmationDialog,
    ] = React.useState(false)
    const [
        editItemEntryConfirmationDialog,
        setEditItemEntryConfirmationDialog,
    ] = React.useState(false)

    const [searchProduct, setSearchProduct] = React.useState(null)
    const [searchVender, setSearchVender] = React.useState(null)
    const [searchTag, setSearchTag] = React.useState('')
    const [searchSrNo, setSearchSrNo] = React.useState('')
    const [searchCustodianId, setSearchCustodianId] = React.useState(null)

    const [deletePurchaseItem, setDeletePurchaseItem] = React.useState()

    const [searchByQrCode, setSearchByQrCode] = React.useState(false)

    ////search filter state
    const [searchStatus, setSearchStatus] = React.useState('')
    const [ownerShipSearch, setOwnerShipSearch] = React.useState('')
    const [purchaseOrderSearch, setPurchaseOrdersearch] = React.useState('')
    const [sdate, setSdate] = React.useState('')
    const [sdate1, setSdate1] = React.useState('')
    const [searchFeature, setSearchFeature] = React.useState([])
    const [searchPriceRange, setSearchPriceRange] = React.useState([
        0, 1000_000,
    ])
    const [searchQuantityRange, setSearchQuantityRange] = React.useState([
        0, 1000,
    ])

    const [searchFeaturesByProductId, setSearchFeaturesByProductId] =
        React.useState([])
    const [searchFeatures, setSearchFeatures] = React.useState([])
    const [searchVenders, setSearchVenders] = React.useState([])

    const [selectedFeatures, setSelectedFeatures] = React.useState([])
    const [newFeatures, setNewFeatures] = React.useState([])

    const handlestatus = (event) => {
        setSearchStatus(event.target.value)
    }
    const handleOwnerShipe = (event) => {
        setOwnerShipSearch(event.target.value)
    }
    const handlePurchasedOrderSearch = (event) => {
        setPurchaseOrdersearch(event.target.value)
    }

    const priceMarks = [
        {
            value: 0,
            label: '0',
        },

        {
            value: 250000,
            label: '250000',
        },
        {
            value: 500000,
            label: '500000',
        },
        {
            value: 750000,
            label: '750000',
        },
        {
            value: 1000000,
            label: '1000000',
        },
    ]

    const quantityMarks = [
        {
            value: 0,
            label: '0',
        },

        {
            value: 250,
            label: '250',
        },
        {
            value: 500,
            label: '500',
        },
        {
            value: 750,
            label: '750',
        },
        {
            value: 1000,
            label: '1000',
        },
    ]

    function valuetext(value) {
        return `${value}`
    }

    ///////
    const [pageNumber, setPageNumber] = React.useState(0)
    const [pageCount, setPageCount] = React.useState(0)


    const handleChecked = (event) => {
        setProductQuantity(1)
        setChecked(event.target.checked)
    }

    const handleErrorWebCam = (error) => {
        console.log(error)
    }
    const handleScanWebCam = (result) => {
        if (result) {
            setScanResultWebCam(result)
        }
    }

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)
        errorFunc(false)
    }
    const handleModel = (event) => {
        setModel(event.target.value)
    }
    const handlePrice = (event) => {
        setPrice(event.target.value)
    }

    const handleStatusDialog = (event) => {
        setStatusValue(event.target.value)
    }

    const handleOfficeDialog = (event) => {
        setOfficeNameList(event.target.value)
    }

    const handleCreatedByDialog = (event) => {
        setCreatedBy(event.target.value)
    }
    const handleCreatedOnDialog = (event) => {
        setCreatedAt(event.target.value)
    }
    const handleModifyByDialog = (event) => {
        setModifyByDialog(event.target.value)
    }
    const handleModifyOnDialog = (event) => {
        setModifyOnDialog(event.target.value)
    }
    const handleOwenerShipeDialog = (event) => {
        setOwnerShip(event.target.value)
    }

    const handlePurchasedDate = (event) => {
        setDateOfPurchase(event.target.value)
    }

    const handleReceivingDate = (event) => {
        setReceivingDate(event.target.value)
    }

    const handlePhoto = (event) => {
        console.log('Image In Function', event.target.files[0])
        setImage(event.target.files[0])
    }
    const [open, setOpen] = React.useState(false)

    const handleCloseClick = () => {
        setSearchItemsDialog(false)
        setSdate('')
        setSdate1('')
        setSearchProduct(null)
        setSearchVender(null)
        setSearchCustodianId(null)
        setSearchTag('')
        setSearchSrNo('')
        setSearchStatus('')
        setOwnerShipSearch('')
        setSearchFeatures([])
        setPurchaseOrdersearch('')
        setSearchPriceRange([0, 1000000])
        setSearchQuantityRange([0, 1000])
    }

    const handleCreateClose = () => {
        setOpen(false)
        setStatusValue('')
        setPrice('')
        setOwnerShip('')
        setOfficeNameList(null)
        setVenderName('')
        setVenderEmail('')
        setVenderNumber('')
        setImage('')
        setImageUrl1('')
        setModel('')
        setQrCode('')
        setProductQuantity(1)
        setPurchaseOrder('')
        setSrNo('')
        setTagdata('')
        setInvoiceNo('')
        setTenderNo('')
        setInvoiceNoError(false)
        setTenderNoError(false)
        setSelectedProduct(null)
        setChecked(false)
        setQrUUID('')
        setSelectedProductError(false)
        setModelError(false)
        setPriceError(false)
        setPurchasedOrderError(false)
        setProductQuantityError(false)
        setStatusError(false)
        setOfficeNameListError(false)
        setOwnerShipError(false)
        setVenderNameError(false)
        setVenderEmailError(false)
        setVenderNumberError(false)
        setTagdataError(false)
        setSrNoError(false)
    }

    const handleEditDialogClose = () => {
        setHandleEditDialog(false)
        setStatusValue('')
        setPrice('')
        setOwnerShip('')
        setOfficeNameList(null)
        setVenderName('')
        setVenderEmail('')
        setVenderNumber('')
        setImage('')
        setImageUrl1('')
        setModel('')
        setQrCode('')
        setProductQuantity(1)
        setPurchaseOrder('')
        setSrNo('')
        setTagdata('')
        setInvoiceNo('')
        setTenderNo('')
        setInvoiceNoError(false)
        setTenderNoError(false)
        setSelectedProduct(null)
        setChecked(false)
        setQrUUID('')
        setSelectedProductError(false)
        setModelError(false)
        setPriceError(false)
        setPurchasedOrderError(false)
        setProductQuantityError(false)
        setStatusError(false)
        setOfficeNameListError(false)
        setOwnerShipError(false)
        setVenderNameError(false)
        setVenderEmailError(false)
        setVenderNumberError(false)
        setTagdataError(false)
        setSrNoError(false)
    }

    const handleSearchDialogClose = () => {
        setSearchItemsDialog(false)
    }

    useEffect(() => {
        console.log("Effect function")

        getAlldata()

        if (productId) {
            console.log("productId", productId)
            getProduct(productId)
            getAssetsNameById(productId)
            getFeaturesSuggestionsByProduct(productId)
        }
        if (officeNameList) {
            getoffice(officeNameList)
        }
        getFeaturesSuggestions()

        getAllWingsSuggestions()

        if (selectedDepartment) {
            getWingsByDepartment(selectedDepartment?._id)
        }



        // if (user) {
        //     getCustodianId(user)
        // }

        const page = localStorage.getItem("page")


        if (!page)
            page = pageNumber
        setPageNumber(page)
        console.log("Page use Effect:" + page)
        axios
            .get(`${config.base_url}/api/v1/purchaseProduct/${page}`)
            .then((res) => {
                setPageNumber(page)
                setPageCount(res.data.pages)
                setPurchasedItems(res.data.data)

                console.log(pageNumber)
            })
        axios
            .get(config.base_url + '/api/v1/brand')
            .then((res) => {
                setBrands(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })

        // axios
        //     .get(config.base_url + '/api/v1/assetsName')
        //     .then((res) => {
        //         setAssets(res.data.data)
        //     })
        //     .catch((error) => {
        //         console.log(error, 'error')
        //     })

    }, [productId])


    const getAssetsNameById = (productId) => {
        axios
            .post(config.base_url + `/api/v1/PurchaseProduct/assetName/${productId}`)
            .then((res) => {
                setAsset(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/products`)
            .then((res) => {
                setProduct1(res.data.data)
                console.log(product1, 'setProduct1')

            })
            .catch((error) => {
                console.log(error, 'error')
            })

        //product name fetch from the api

        axios
            .get(`${config.base_url}/api/v1/productType`)
            .then((res) => {
                setProduct(res.data.data)
            })
            .catch((error) => { })
        axios
            .get(`${config.base_url}/api/v1/office`)
            .then((res) => {
                setOfficeDialog(res.data.data)
            })
            .catch((error) => { })
        axios
            .get(`${config.base_url}/api/v1/employee`)
            .then((res) => {
                setCustodienId(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(`${config.base_url}/api/v1/department`)
            .then((res) => {
                setDepartments(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })

        axios
            .get(`${config.base_url}/api/v1/employee`)
            .then((res) => {
                const data = res.data.data
                const canPurchase = []
                var purcahedTrue = data.map((item) => {
                    if (item.purchase == true) {
                        canPurchase.push(item)
                    }
                })
                setPurchaseBy(canPurchase)
            })
            .catch((error) => {
                console.log(error, 'error')
            })

        axios
            .post(
                `${config.base_url}/api/v1/purchaseProduct/vendorsSuggestions`
            )
            .then((res) => {
                setSearchVenders(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const getProduct = (productId) => {
        axios
            .get(`${config.base_url}/api/v1/products/${productId}`)
            .then((res) => {
                setProductData(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const getFeaturesSuggestionsByProduct = (productId) => {
        axios
            .post(
                `${config.base_url}/api/v1/purchaseProduct/allFeaturesSuggestions/${productId}`
            )
            .then((res) => {
                setSearchFeaturesByProductId(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const getFeaturesSuggestions = () => {
        axios
            .post(
                `${config.base_url}/api/v1/purchaseProduct/allFeaturesSuggestions`
            )
            .then((res) => {
                setSearchFeatures(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const getAllWingsSuggestions = () => {
        axios
            .post(`${config.base_url}/api/v1/wing/wingsSuggestions`)
            .then((res) => {
                setWings(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const getWingsByDepartment = (departmentId) => {
        axios
            .get(`${config.base_url}/api/v1/wing/${departmentId}`)
            .then((res) => {
                setWingsByDepartment(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const generateQrCode = async () => {
        try {
            const qrProduct =
                selectedProduct?.name === undefined
                    ? 'N/A'
                    : selectedProduct?.name

            const qrModel = model === '' ? 'N/A' : model

            const qrPrice = price === '' ? 'N/A' : price

            const qrPurchaseOrder = purchaseOrder === '' ? 'N/A' : purchaseOrder

            const qrProductQuantity =
                productQuantity === '' ? 'N/A' : productQuantity

            const qrStatus = statusValue === '' ? 'N/A' : statusValue

            const qrOffice =
                officeData?.name === undefined ? 'N/A' : officeData?.name

            const qrDateOfPurchase =
                dataOfPurchase === '' ? 'N/A' : dataOfPurchase

            const qrOwnerShip = ownerShip === '' ? 'N/A' : ownerShip

            const qrVenderName = venderName === '' ? 'N/A' : venderName

            const qrVenderEmail = venderEmail === '' ? 'N/A' : venderEmail

            const qrVenderNumber = venderNumber === '' ? 'N/A' : venderNumber

            const qrTag = tagdata === '' ? 'N/A' : tagdata

            const qrSrNo = srno === '' ? 'N/A' : srno

            const qrInvoiceNo = invoiceNo === '' ? 'N/A' : invoiceNo

            const qrTenderNo = tenderNo === '' ? 'N/A' : tenderNo

            const qrReceivingDate = receivingDate === '' ? 'N/A' : receivingDate

            const qrUUID = uuidv4()
            setQrUUID(qrUUID)
            const combinedFeatures = combine(selectedFeatures, newFeatures)
            const combineLoweredFeatures = lowerFeatures(combinedFeatures)

            const qrFeatures = combineLoweredFeatures
            const qrCode = `Product Name: ${qrProduct}\nModel: ${qrModel}\nPrice: ${qrPrice}\nPurchase Order: ${qrPurchaseOrder}\nQuantity: ${qrProductQuantity}\nStatus: ${qrStatus}\nOffice: ${qrOffice}\nDate Of Purchase: ${qrDateOfPurchase}\nOwnership: ${qrOwnerShip}\nVendor Name: ${qrVenderName}\nVendor Email: ${qrVenderEmail}\nVendor Number: ${qrVenderNumber}\nTag: ${qrTag}\nSr No: ${qrSrNo}\nFeatures: ${qrFeatures}\nqrUUID: ${qrUUID}\nInvoice No.: ${qrInvoiceNo}\nTenderNo.: ${qrTenderNo}\nReceivingDate: ${qrReceivingDate}`

            setQrCode(qrCode)
            const response = await QRCode.toDataURL(qrCode)
            setImageUrl1(response)
        } catch (error) {
            console.log(error)
        }
    }

    const getoffice = (officeId) => {
        axios
            .get(`${config.base_url}/api/v1/office/${officeId}`)
            .then((res) => {
                setOfficeData(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    // Combine Features Function

    const combine = (selectedFeatures, newFeatures) => {
        // Combining features
        let combineFeaturesArray = []

        console.log(selectedFeatures)

        if (selectedFeatures.length > 0) {
            selectedFeatures.map((feature) => {
                combineFeaturesArray.push(feature._id)
            })
        }
        if (newFeatures.length > 0) {
            combineFeaturesArray = combineFeaturesArray.concat(newFeatures)
        }

        console.log('insideCombinedFeatures', combineFeaturesArray)

        return combineFeaturesArray
    }

    const createHandler = async () => {
        // Calling combine features function
        const combinedFeatures = combine(selectedFeatures, newFeatures)
        const combineLoweredFeatures = lowerFeatures(combinedFeatures)

        let data = new FormData()
        data.append('productId', selectedProduct?._id)
        data.append('price', price)
        data.append('createdBy', createdBy)

        data.append('dataOfPurchase', dataOfPurchase)
        data.append('ownership', ownerShip)
        data.append('officeId', officeNameList._id)
        data.append('status', statusValue)
        data.append('venderName', venderName)
        data.append('venderEmail', venderEmail)
        data.append('venderContact', venderNumber)
        if (image !== '') {
            data.append('attachment', image)
        }
        data.append('photo', image)
        data.append('QRCodeImage', imageUrl1)
        data.append('model', model)

        // new changes

        data.append('grnNo', grnNo)
        data.append('grnDate', grnDate)
        data.append('volcherNO', volcherNo)
        data.append('volcherDate', volcherDate)

        console.log(typeof grnNo)


        data.append('purchaseOrder', purchaseOrder)
        data.append('quantity', productQuantity)
        data.append('QRCode', qrCode)
        data.append('srNo', srno)
        data.append('invoiceNo', invoiceNo)
        data.append('tenderNo', tenderNo)
        data.append('receivingDate', receivingDate)

        console.log(officeNameList?._id)

        if (
            combineLoweredFeatures[0] !== undefined &&
            combineLoweredFeatures[0] !== ''
        ) {
            data.append('features', combineLoweredFeatures)
        }
        data.append('tagNo', tagdata)
        data.append('active', checked)
        console.log('the qr id send', qrUUID)
        data.append('qrUUID', qrUUID)
        data.append('stockIn', productQuantity)

        // new changes


        data.append('grnNo', grnNo)
        data.append('grnDate', grnDate)
        data.append('volcherNO', volcherNo)
        data.append('volcherDate', volcherDate)
        data.append('assetsName', assetName)


        setProductId(selectedProduct?._id)

        axios
            .post(`${config.base_url}/api/v1/purchaseProduct`, data)

            .then((res) => {
                if (res) {
                    handleCreateClose()
                    setProductQuantity('1')
                    getAlldata()
                    setOpen(false)
                    setOpenItemEntryConfirmationDialog(false)
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }
    ///////error
    //error handling
    const handleCreateClickOpen = () => {
        var emailRegex = /\S+@\S+\.\S+/
        if (
            price === '' ||
            dataOfPurchase === '' ||
            officeNameList === '' ||
            ownerShip === '' ||
            statusValue === '' ||
            model === '' ||
            purchaseOrder === '' ||
            // productQuantity === '' ||
            venderName === '' ||
            venderNumber === '' ||
            tagdata === '' ||
            selectedProduct === null ||
            officeNameList === null ||
            srno === '' ||
            invoiceNo === '' || tenderNo === ''
        ) {
            if (price === '') {
                setPriceError(true)
            }

            if (dataOfPurchase === '') {
                setDateOfPurchaseError(true)
            }
            if (ownerShip === '') {
                setOwnerShipError(true)
            }
            if (officeNameList === '') {
                setOfficeNameError(true)
            }
            if (statusValue === '') {
                setStatusError(true)
            }
            if (model === '') {
                setModelError(true)
            }
            if (purchaseOrder === '') {
                setPurchasedOrderError(true)
            }
            // if (productQuantity === '') {
            //     setProductQuantityError(true)
            // }
            if (venderName === '') {
                setVenderNameError(true)
            }
            if (venderNumber === '') {
                setVenderNumberError(true)
            }
            if (tagdata === '') {
                setTagdataError(true)
            }
            if (selectedProduct === null) {
                setSelectedProductError(true)
            }
            if (officeNameList === null) {
                setOfficeNameListError(true)
            }
            if (srno === '') {
                setSrNoError(true)
            }
            if (invoiceNo === '') {
                setInvoiceNoError(true)
            }
            if (tenderNo === '') {
                setTenderNoError(true)
            }
            if (!emailRegex.test(venderEmail)) {
                setCreateEmailErrorMessage('Please Enter a valid Email Address')
                setVenderEmailError(true)
            }
        } else {
            // createHandler()
            generateQrCode().then((res) => {
                // createHandler()
                setOpenItemEntryConfirmationDialog(true)
            })
            // generateQrCode()
        }
    }

    const handleEdit = () => {
        // var emailRegex = /\S+@\S+\.\S+/
        // if (
        //     // price === '' ||
        //     dataOfPurchase === '' ||
        //     // officeNameList === '' ||
        //     // ownerShip === '' ||
        //     // statusValue === '' ||
        //     // model === '' ||
        //     purchaseOrder === '' ||
        //     // productQuantity === '' ||
        //     venderName === '' ||
        //     venderNumber === '' ||
        //     tagdata === '' ||
        //     !emailRegex.test(venderEmail) ||
        //     // selectedProduct === null ||
        //     // officeNameList === null ||
        //     // srno === '' || 
        //     invoiceNo === '' ||
        //     tenderNo === ''
        // ) {
        //     // if (price === '') {
        //     //     setPriceError(true)
        //     // }
        //     if (dataOfPurchase === '') {
        //         setDateOfPurchaseError(true)
        //     }
        //     // if (ownerShip === '') {
        //     //     setOwnerShipError(true)
        //     // }
        //     // if (officeNameList === '') {
        //     //     setOfficeNameError(true)
        //     // }
        //     // if (statusValue === '') {
        //     //     setStatusError(true)
        //     // }
        //     // if (model === '') {
        //     //     setModelError(true)
        //     // }
        //     if (purchaseOrder === '') {
        //         setPurchasedOrderError(true)
        //     }
        //     // if (productQuantity === '') {
        //     //     setProductQuantityError(true)
        //     // }
        //     if (venderName === '') {
        //         setVenderNameError(true)
        //     }
        //     if (venderNumber === '') {
        //         setVenderNumberError(true)
        //     }
        //     if (tagdata === '') {
        //         setTagdataError(true)
        //     }
        //     // if (selectedProduct === null) {
        //     //     setSelectedProductError(true)
        //     // }
        //     // if (officeNameList === null) {
        //     //     setOfficeNameListError(true)
        //     // }
        //     // if (srno === '') {
        //     //     setSrNoError(true)
        //     // }
        //     if (invoiceNo === '') {
        //         setInvoiceNoError(true)
        //     }
        //     if (tenderNo === '') {
        //         setTenderNoError(true)
        //     }
        //     if (!emailRegex.test(venderEmail)) {
        //         setCreateEmailErrorMessage('Please Enter a valid Email Address')
        //         setVenderEmailError(true)
        //     }
        // } else {
        // generateQrCode()
        generateQrCode().then((res) => {
            setEditItemEntryConfirmationDialog(true)
        })
        // }
    }

    const onDelhandler = (purchaseItem) => {
        setOpenConfirmationDialog(true)

        setPurchaseId(purchaseItem._id)

        setDeletePurchaseItem(purchaseItem)
    }

    const onDelPurchaseItemHandler = () => {
        var data = new FormData()
        data.append('productId', deletePurchaseItem.productId)
        data.append('price', deletePurchaseItem.price)
        data.append('createdBy', deletePurchaseItem.createdBy)
        data.append('dataOfPurchase', deletePurchaseItem.dataOfPurchase)
        data.append('ownership', deletePurchaseItem.ownership)
        data.append('officeId', deletePurchaseItem.officeId)
        data.append('status', deletePurchaseItem.status)
        data.append('venderName', deletePurchaseItem.venderName)
        data.append('venderEmail', deletePurchaseItem.venderEmail)
        data.append('venderContact', deletePurchaseItem.venderContact)
        data.append('attachment', deletePurchaseItem.attachment)
        data.append('QRCodeImage', deletePurchaseItem.QRCodeImage)
        data.append('model', deletePurchaseItem.model)
        data.append('purchaseOrder', deletePurchaseItem.purchaseOrder)
        data.append('quantity', deletePurchaseItem.quantity)
        data.append('QRCode', deletePurchaseItem.QRCode)
        data.append('srNo', deletePurchaseItem.srNo)
        data.append('features', deletePurchaseItem.features)
        data.append('tagNo', deletePurchaseItem.tagNo)
        data.append('active', deletePurchaseItem.active)
        data.append('qrUUID', deletePurchaseItem.qrUUID)
        data.append('_id', deletePurchaseItem._id)

        // new changes

        data.append('grnNo',deletePurchaseItem.grnNo)
        data.append('grnDate', deletePurchaseItem.grnDate)
        data.append('volcherNO', deletePurchaseItem.volcherNo)
        data.append('volcherDate', deletePurchaseItem.volcherDate)
        data.append('assetName', deletePurchaseItem.assetName)

        axios
            .put(
                `${config.base_url}/api/v1/purchaseProduct/delete/${purchaseId}`,
                data
            )
            .then((res) => {
                getAlldata()
                setOpenConfirmationDialog(false)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const onEdithandler = (id, purchaseItem) => {

        console.log("inside", purchaseItem)

        setPurchaseId(id)

        setProductId(purchaseItem.productId)

        if (purchaseItem.product.length > 0) {
            setSelectedProduct(purchaseItem.product[0])
        }

        // Making Array Of Objects

        const featuresStringArray = purchaseItem.features

        if (featuresStringArray?.length > 0) {
            const featuresObjectArray = []

            featuresStringArray.map((item) => {
                featuresObjectArray.push({ _id: item })
            })

            setSelectedFeatures(featuresObjectArray)
        } else {
            setSelectedFeatures([])
        }



        setStatusValue(purchaseItem.status === undefined ? "N/A" : purchaseItem.status)
        setPrice(purchaseItem.price)
        const date = new Date(purchaseItem.dataOfPurchase)
            .toISOString()
            .split('T')[0]
        setDateOfPurchase(date)
        setOwnerShip(purchaseItem.ownership)
        if (purchaseItem.office.length > 0) {
            setOfficeNameList(purchaseItem.office[0])
        }
        setVenderName(purchaseItem.venderName)
        setVenderEmail(purchaseItem.venderEmail)
        setVenderNumber(purchaseItem.venderContact)
        console.log(
            'The purchase item image has the value ',
            purchaseItem.attachment
        )
        if (purchaseItem.attachment?.length > 0) {
            setImage(purchaseItem.attachment)
        }
        setModel(purchaseItem.model)
        setPurchaseOrder(purchaseItem.purchaseOrder)
        setProductQuantity(purchaseItem.quantity)
        setTagdata(purchaseItem.tagData)
        setSrNo(purchaseItem.srNo)
        setQrCode(purchaseItem.QRCode)
        setCreatedBy(purchaseItem.createdBy)
        setCreatedAt(purchaseItem.createdAt)
        setModifyByDialog(purchaseItem.modifiedBy)
        setModifyOnDialog(purchaseItem.modifiedAt)
        setSrNo(purchaseItem.srNo)
        setTagdata(purchaseItem.tagNo)
        setChecked(purchaseItem.active)
        setInvoiceNo(purchaseItem.invoiceNo)
        setTenderNo(purchaseItem.tenderNo)

        const receivingDateFormat = new Date(purchaseItem.receivingDate)
            .toISOString()
            .split('T')[0]

        setReceivingDate(receivingDateFormat)

        setHandleEditDialog(true)
    }

    const editHandler = () => {

        const combinedFeatures = combine(selectedFeatures, newFeatures)
        const combineLoweredFeatures = lowerFeatures(combinedFeatures)

        let data = new FormData()
        data.append('productId', selectedProduct?._id)
        data.append('price', price)
        data.append('dataOfPurchase', dataOfPurchase)
        data.append('ownership', ownerShip)
        data.append('officeId', officeNameList?._id)
        data.append('status', statusValue)
        data.append('venderName', venderName)
        data.append('venderEmail', venderEmail)
        data.append('venderContact', venderNumber)
        if (image !== undefined) {
            console.log("inside", image)
            data.append('attachment', image)
        }
        data.append('QRCodeImage', imageUrl1)
        data.append('purchaseOrder', purchaseOrder)
        data.append('model', model)
        data.append('quantity', productQuantity)
        data.append('QRCode', qrCode)
        data.append('srNo', srno)
        data.append('tagNo', tagdata)
        data.append('qrUUID', qrUUID)
        data.append('createdBy', createdBy)
        data.append('createdAt', createdAt)
        data.append('modifiedBy', createdBy)
        data.append('modifiedAt', modifyOnDialog)
        data.append('active', checked)
        data.append('invoiceNo', invoiceNo)
        data.append('tenderNo', tenderNo)
        data.append('receivingDate', receivingDate)

        if (
            combineLoweredFeatures[0] !== undefined &&
            combineLoweredFeatures[0] !== ''
        ) {
            data.append('features', combineLoweredFeatures)
        }
        // Settign the product quantity state to 1
        setProductQuantity('1')

        axios
            .put(
                `${config.base_url}/api/v1/purchaseProduct/${purchaseId}`,
                data
            )
            .then((res) => {
                if (res) {
                    getAlldata()
                    setProductQuantity('1')
                    handleEditDialogClose()
                    setEditItemEntryConfirmationDialog(false)
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })

        axios
            .put(
                `${config.base_url}/api/assetsName/${assetsNameId}`,
                data
            )
            .then((res) => {
                if (res) {
                    getAlldata()
                    setProductQuantity('1')
                    handleEditDialogClose()
                    setEditItemEntryConfirmationDialog(false)
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const getSearchdata = () => {
        let searchFeaturesString = ''

        if (searchFeature.length > 0) {
            searchFeaturesString = searchFeature[0]._id

            for (let index = 1; index < searchFeature.length; index++) {
                searchFeaturesString = searchFeaturesString.concat(
                    ',' + searchFeature[index]._id
                )
            }
        } else {
            searchFeaturesString = ''
        }

        let data = {}
        data.productId = searchProduct === null ? '' : searchProduct._id
        data.venderEmail = searchVender === null ? '' : searchVender._id
        data.custodian = searchCustodianId === null ? '' : searchCustodianId._id
        data.tagNo = searchTag
        data.srNo = searchSrNo
        data.status = searchStatus
        data.ownership = ownerShipSearch
        data.features = searchFeaturesString
        data.startPrice = searchPriceRange[0]
        data.endPrice = searchPriceRange[1]
        data.startQuantity = searchQuantityRange[0]
        data.endQuantity = searchQuantityRange[1]
        data.startDate = sdate
        data.endDate = sdate1
        data.purchaseOrder = purchaseOrderSearch

        if (sdate !== '' && sdate1 === '') {
            alert('Select End Date Too')
            return
        } else if (sdate === '' && sdate1 !== '') {
            alert('Select Start Date Too')
            return
        }

        axios
            .post(
                `${config.base_url}/api/v1/purchaseProduct/searchFilters`,
                data
            )
            .then((res) => {
                setPurchasedItems(res.data.data)
                setSearchItemsDialog(false)
                setSdate('')
                setSdate1('')
                setSearchProduct(null)
                setSearchVender(null)
                setSearchCustodianId(null)
                setSearchTag('')
                setSearchSrNo('')
                setSearchStatus('')
                setOwnerShipSearch('')
                setSearchFeatures([])
                setSearchPriceRange([0, 1000000])
                setSearchQuantityRange([0, 1000])
                setPurchaseOrdersearch('')
            })

            .catch((error) => {
                console.log(error, 'error')
                alert('No Record Found')
            })
    }

    const headers = [
        { label: 'Product', key: 'product[0].name' },
        { label: 'Price', key: 'price' },
        { label: 'Stock In', key: 'quantity' },
        { label: 'Stock Issued', key: 'stockIssued' },
        { label: 'Closing Balance', key: 'stockIn' },
        { label: 'Model', key: 'model' },
        { label: 'Office', key: 'office[0].name' },
        { label: 'Purchase Order', key: 'purchaseOrder' },
        { label: 'Ownership', key: 'ownership' },
        { label: 'Date Of Purchase', key: 'dataOfPurchase' },
        { label: 'Vender Name', key: 'venderName' },
        { label: 'Vender Email', key: 'venderEmail' },
        { label: 'Vender Contact', key: 'venderContact' },
        { label: 'Sr No', key: 'srNo' },
        { label: 'GRN No', key: 'grnNo' },
        { label: 'GRN Date', key: 'grnDate' },
        { label: 'Volcher No', key: 'volcherNO' },
        { label: 'Volcher Date', key: 'volcherDate' },
        { label: 'Asset Name', key: 'assetName' },
        { label: 'Status', key: 'status' },
        { label: 'Creation Date', key: 'createdAt' },
        { label: 'Created By', key: 'createdBy' },
        { label: 'Last Modified', key: 'modifiedAt' },
        { label: 'Modified By', key: 'modifiedBy' },
    ]

    function lowerFeatures(items) {
        const lowerCaseTags = items.map((tag) => {
            return tag.toLowerCase()
        })

        return lowerCaseTags
    }

    function handleNewTags(items) {
        setNewFeatures(items)
    }

    const handleSelectedTags = (items) => {
        setSelectedFeatures(items)
    }

    const qrBasedSearch = (qrcode) => {
        console.log('inside the qr based scanner')
        const qrArray = qrcode.split(' ')
        const id = qrArray[qrArray.length - 1]

        axios
            .get(
                `${config.base_url}/api/v1/purchaseProduct/qrBasedSearch/${id}`
            )
            .then((res) => {
                setPurchasedItems(res.data.data)
                setScanResultWebCam('')
                setSearchByQrCode(false)
                setSearchItemsDialog(false)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }
    // const usersPerPage = 8
    // const pagesVisited = pageNumber * usersPerPage
    // const page = localStorage.getItem("page")
    // console.log("something>>>>>>>>>>>>>>>",page)
    //  const pageCount = Math.ceil(purchasedItems.length / usersPerPage)
    const changePage = ({ selected }) => {
        console.log(selected)
        setPageNumber(selected)

        axios
            .get(`${config.base_url}/api/v1/purchaseProduct/${selected}`)
            .then((res) => {
                //setPageNumber(res.data.pageNumber)
                setPageCount(res.data.pages)
                setPurchasedItems(res.data.data)
                console.log(purchasedItems)

            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }


    return (
        <>
            {openConfirmationDialog && (
                <ConfirmationDialog
                    open={openConfirmationDialog}
                    onConfirmDialogClose={() => {
                        setOpenConfirmationDialog(false)
                    }}
                    text={`Are you sure you want to delete this item?`}
                    title={`Are You Sure?`}
                    onYesClick={onDelPurchaseItemHandler}
                />
            )}
            {openItemEntryConfirmationDialog && (
                <ConfirmationDialog
                    open={openItemEntryConfirmationDialog}
                    onConfirmDialogClose={() => {
                        setOpenItemEntryConfirmationDialog(false)
                    }}
                    title={`Are You Sure?`}
                    text={`Are You Sure You Want To Create New Item?`}
                    onYesClick={createHandler}
                />
            )}
            {editItemEntryConfirmationDialog && (
                <ConfirmationDialog
                    open={editItemEntryConfirmationDialog}
                    onConfirmDialogClose={() => {
                        setEditItemEntryConfirmationDialog(false)
                    }}
                    title={`Are You Sure?`}
                    text={`Are You Sure You Want To Edit This Item?`}
                    onYesClick={editHandler}
                />
            )}


            <Box sx={{
                zIndex: 999,
                right: '14vw',
                top: '9.5vh',
                position: 'fixed',
            }}>
                <label htmlFor="contained-button-file">
                    <Input
                        accept="*"
                        id="import-button-file"
                        type="file"
                        onChange={(e) => {
                            e.preventDefault();
                            if (e.target.files) {
                                const reader = new FileReader();
                                reader.onload = async (e) => {
                                    const data = e.target.result;
                                    const workbook = XLSX.read(data, { type: "array" });

                                    const sheetNames = workbook.SheetNames[6];

                                    const worksheet = workbook.Sheets[sheetNames];
                                    const json = XLSX.utils.sheet_to_json(worksheet);

                                    axios
                                        .post(`${config.base_url}/api/v1/purchaseProduct/postData`, json)

                                        .then((res) => {
                                            console.log(res.data)
                                            getAlldata()
                                        })
                                        .catch((error) => {
                                            console.log(error, 'error')
                                        })
                                };
                                reader.readAsArrayBuffer(e.target.files[0]);
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        component="span"
                        startIcon={<ImportExportIcon />}
                        style={{
                            width: '100%',
                        }}
                    >
                        Import Data
                    </Button>
                </label>
            </Box>

            <Tooltip title="Search Items">
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
                    onClick={() => setSearchItemsDialog(true)}
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
                        filename={'all-purchased-items.csv'}
                        data={purchasedItems}
                        headers={headers}
                    >
                        <div style={{ marginTop: '8px' }}>
                            <SummarizeIcon />
                        </div>
                    </CSVLink>
                </Fab>
            </Tooltip>

            <Tooltip title="Add Items">
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
                    onClick={() => setOpen(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

            <Container>
                <br></br>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Items Entry
                </Typography>
                <Grid container spacing={3}>
                    {purchasedItems
                        .map((purchaseItem) => (
                            <Grid
                                key={purchaseItem._id}
                                item
                                xs={12}
                                sm={6}
                                md={3}
                            >
                                <PurchaseItemCard
                                    pageNumber={pageNumber}
                                    purchaseItem={purchaseItem}
                                    onDelete={onDelhandler}
                                    onEdit={onEdithandler}
                                />
                            </Grid>
                        ))}
                </Grid>
                <br></br>

                {purchasedItems.length > 0 && (
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={pageCount}
                        disableInitialCallback={true}
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
                open={open}
                fullWidth={true}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'ADD ITEMS'}</DialogTitle>
                <DialogContent>
                    <br></br>

                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box>
                                    <Autocomplete
                                        size="large"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={product1}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    error={selectedProductError}
                                                    {...params}
                                                    label="Product"
                                                    helperText={
                                                        selectedProductError &&
                                                        'Field Required'
                                                    }
                                                />
                                            )
                                        }}
                                        value={selectedProduct}
                                        onChange={(_event, product) => {
                                            setProductId(product?._id)
                                            setSelectedProduct(product)
                                            setSelectedProductError(false)
                                        }}
                                    />
                                </Box>
                            </Grid>

                            {/* assetsName field for adding   */}
                            <Grid item lg={4} md={4} sm={4} xs={4}>


                                <Box>
                                    <Autocomplete
                                        size="large"
                                        disablePortal
                                        id="combo-box-demo2"
                                        options={asset}
                                        // filterSelectedOptions={true}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id == value._id
                                        }
                                        getOptionLabel={(option) => option.name}

                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    // error={selectedProductError}
                                                    {...params}
                                                    label="AssetsName"
                                                // helperText={
                                                //     selectedProductError &&
                                                //     'Field Required'
                                                // }
                                                />
                                            )
                                        }}
                                        // value={asset}
                                        onChange={(_event, asset) => {
                                            setAsset(asset)
                                            // setSelectedProduct(product)
                                            // setSelectedProductError(false)
                                        }}
                                    />
                                </Box>

                            </Grid>


                            {/* for brands */}

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '13rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo3"
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
                                    value={brand}
                                    onChange={(_event, brand) => {
                                        setBrand(brand)
                                    }}
                                />
                            </Grid>
                            
                            {/* new changes */}
                            {/* new changes */}
                            {/* new changes */}

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    error={grnError}
                                    id="name"
                                    label="GRN No"
                                    placeholder="GRN No"
                                    autoComplete="off"
                                    helperText={
                                        grnError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={grnNo}
                                    type={`number`}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setGrnNo, setGrnError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    id="name"
                                    error={grnDateError}
                                    label="GRN Date"
                                    type="date"
                                    autoComplete="off"
                                    helperText={
                                        grnDateError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={grnDate}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setGrnDate,setGrnDateError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    error={volcherNoError}
                                    id="name"
                                    label="Volcher No"
                                    placeholder="Volcher No"
                                    autoComplete="off"
                                    helperText={
                                        volcherNoError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={volcherNo}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setVolcherNo, setVolcherNoError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    error={volcherDateError}
                                    id="name"
                                    label="Volcher Date"
                                    type="date"
                                    autoComplete="off"
                                    helperText={
                                        volcherDateError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={volcherDate}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setVolcherDate,setVolcherDateError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>


                            {/* <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    error={assetNameError}
                                    id="name"
                                    label="Asset Name"
                                    placeholder='Asset Name'
                                    autoComplete="off"
                                    helperText={
                                        assetNameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={assetName}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setAssetName, setAssetNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid> */}





                            {/* new changes */}


                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
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
                                    value={model}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setModel, setModelError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    type={`number`}
                                    id="name"
                                    label="Price"
                                    placeholder="Price"
                                    autoComplete="off"
                                    value={price}
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
                                    value={purchaseOrder}
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
                                    disabled={!checked}
                                    type={`number`}
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
                                    value={productQuantity}
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
                                xs={4}
                                style={{
                                    justifyContent: 'center',
                                    marginLeft: '0px',
                                }}
                            >
                                <Box>
                                    <label htmlFor="contained-button-file">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file"
                                            type="file"
                                            onChange={(event) => {
                                                console.log("Image In Edit", event.target.files[0])
                                                setImage(event.target.files[0])
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            component="span"
                                            startIcon={<AddAPhotoIcon />}
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            Attachment
                                        </Button>
                                    </label>
                                </Box>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={statusError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Status
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={statusValue}
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
                                            {statusError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box>
                                    <Autocomplete
                                        size="large"
                                        disablePortal
                                        id="combo-box-demo"
                                        isOptionEqualToValue={(
                                            option,
                                            value
                                        ) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) => {
                                            return option.name
                                        }}
                                        renderOption={(props, option) => {
                                            return (
                                                <li {...props} key={option._id}>
                                                    {option.name}
                                                </li>
                                            )
                                        }}
                                        options={officeDialog}
                                        renderInput={(params) => (
                                            <TextField
                                                error={officeNameListError}
                                                {...params}
                                                label="Office"
                                                size="large"
                                                helperText={
                                                    officeNameListError &&
                                                    'Field Required'
                                                }
                                            />
                                        )}
                                        value={officeNameList}
                                        onChange={(event, office) => {
                                            setOfficeNameList(office)
                                            setOfficeNameListError(false)
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <form className={myclass.container} noValidate>
                                    <TextField
                                        id="date"
                                        size="small"
                                        label="Date Of Purchase"
                                        type="date"
                                        value={dataOfPurchase}
                                        className={myclass.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={dateOfPurchaseError}
                                        helperText={
                                            dateOfPurchaseError === true
                                                ? 'Field Required'
                                                : ''
                                        }
                                        onChange={handlePurchasedDate}
                                    />
                                </form>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={ownerShipError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            OwnerShip
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={ownerShip}
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
                                            {ownerShipError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            {/* <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <Autocomplete
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
                            </Grid> */}
                            {/* <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    {selectedDepartment ? (
                                        <FormControl fullWidth>
                                            <InputLabel
                                                id="demo-simple-select-label"
                                                size="small"
                                            >
                                                Wing
                                            </InputLabel>
                                            <Select
                                                size="small"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={wing}
                                                label="Wing"
                                                onChange={handleWingChange}
                                            >
                                                {wingsByDepartment.map(
                                                    (wing) => {
                                                        return (
                                                            <MenuItem
                                                                key={wing._id}
                                                                value={
                                                                    wing.name
                                                                }
                                                            >
                                                                {wing.name}
                                                            </MenuItem>
                                                        )
                                                    }
                                                )}
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        <FormControl fullWidth>
                                            <InputLabel
                                                id="demo-simple-select-label"
                                                size="small"
                                            >
                                                Wing
                                            </InputLabel>
                                            <Select
                                                size="small"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={wing}
                                                label="Wing"
                                                onChange={handleWingChange}
                                            >
                                                {wings.map((wing) => {
                                                    return (
                                                        <MenuItem
                                                            key={wing._id}
                                                            value={wing._id}
                                                        >
                                                            {wing._id}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Box>
                            </Grid> */}
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    type={`text`}
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
                                    value={venderName}
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

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={venderEmailError}
                                    id="name"
                                    label="Vendor Email"
                                    placeholder="Enter Vendor Email"
                                    autoComplete="off"
                                    helperText={
                                        venderEmailError === true
                                            ? createEmailErrorMessage
                                            : ''
                                    }
                                    value={venderEmail}
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
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
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
                                    value={venderNumber}
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
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    error={invoiceNoError}
                                    id="invoice"
                                    label="Invoice"
                                    placeholder="Invoice"
                                    autoComplete="off"
                                    helperText={
                                        invoiceNoError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={invoiceNo}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setInvoiceNo,
                                            setInvoiceNoError
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
                            <Grid item lg={3} md={3} sm={3} xs={6}>
                                <TextField
                                    error={tenderNoError}
                                    id="name"
                                    label="Tender No"
                                    placeholder="Tender No"
                                    autoComplete="off"
                                    helperText={
                                        tenderNoError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={tenderNo}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setTenderNo,
                                            setTenderNoError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <form className={myclass.container} noValidate>
                                    <TextField
                                        id="date"
                                        size="small"
                                        label="Receiving Date"
                                        type="date"
                                        value={receivingDate}
                                        className={myclass.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}

                                        onChange={handleReceivingDate}
                                    />
                                </form>
                            </Grid>
                            <Grid item lg={5} md={5} sm={5} xs={5}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            value={checked}
                                            onChange={handleChecked}
                                            inputProps={{
                                                'aria-label': 'controlled',
                                            }}
                                        />
                                    }
                                    label="Disable Serial Number"
                                />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                {checked ? (
                                    <TextField
                                        disabled={checked}
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
                                        value={`N/A`}
                                        size="small"
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                setSrNo,
                                                setSrNoError
                                            )
                                        }
                                        variant="outlined"
                                        fullWidth
                                    />
                                ) : (
                                    <TextField
                                        disabled={checked}
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
                                            handleChange(
                                                e,
                                                setSrNo,
                                                setSrNoError
                                            )
                                        }
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                {productId ? (
                                    <Autocomplete
                                        multiple
                                        id="multiple-limit-tags"
                                        options={searchFeaturesByProductId}
                                        getOptionLabel={(option) => option._id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="features suggestive"
                                                placeholder="features suggestive"
                                            />
                                        )}
                                        value={selectedFeatures}
                                        onChange={(_event, feature) => {
                                            handleSelectedTags(feature)
                                        }}
                                    />
                                ) : (
                                    <Autocomplete
                                        multiple
                                        id="multiple-limit-tags"
                                        options={searchFeatures}
                                        getOptionLabel={(option) => option._id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="features suggestive"
                                                placeholder="features suggestive"
                                            />
                                        )}
                                        value={selectedFeatures}
                                        onChange={(_event, feature) => {
                                            handleSelectedTags(feature)
                                        }}
                                    />
                                )}
                            </Grid>
                        </Grid>
                        <br></br>
                        <p>Add Features Suggestive</p>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TagsInput
                                    selectedTags={handleNewTags}
                                    fullWidth
                                    variant="outlined"
                                    id="features"
                                    name="features"
                                    placeholder="features"
                                    label="Add New Features"
                                />
                            </Grid>
                        </Grid>
                        <br></br>

                        {/* <Grid container spacing={3}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                    <Button onClick={handleCreateClose}>Cancel</Button>
                    <Button
                        autoFocus
                        onClick={() => {
                            handleCreateClickOpen()
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Search Items Dialog */}

            <Dialog
                open={searchItemsDialog}
                fullWidth={true}
                onClose={handleSearchDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    id="alert-dialog-title"
                >
                    <div>{'Search Filters'}</div>
                    <Tooltip title="Qr Search">
                        <div
                            style={{
                                borderRadius: '50%',
                            }}
                            onClick={() => {
                                setSearchByQrCode(true)
                            }}
                        >
                            <IconButton
                                color="primary"
                                aria-label="search"
                                size="large"
                            >
                                <QrCodeIcon />
                            </IconButton>
                        </div>
                    </Tooltip>
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '13rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={product1}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Product"
                                            />
                                        )
                                    }}
                                    value={searchProduct}
                                    onChange={(_event, product) => {
                                        setProductId(product._id)
                                        setSearchProduct(product)
                                    }}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '13rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={searchVenders}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) =>
                                        `${option.vendorName} / ${option._id}`
                                    }
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Vender Name / Email"
                                            />
                                        )
                                    }}
                                    value={searchVender}
                                    onChange={(_event, vender) => {
                                        setSearchVender(vender)
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    id="name"
                                    label="Tag"
                                    placeholder="Tag"
                                    autoComplete="off"
                                    value={searchTag}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setSearchTag,
                                            setTagdataError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    id="name"
                                    label="Serial Number"
                                    placeholder="Serial Number"
                                    autoComplete="off"
                                    value={searchSrNo}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setSearchSrNo,
                                            setTagdataError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Box>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={statusError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Status
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={searchStatus}
                                            label="Status"
                                            onChange={handlestatus}
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
                                            {statusError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Box>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={ownerShipError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            OwnerShip Search
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={ownerShipSearch}
                                            label="Owner Ship"
                                            onChange={handleOwnerShipe}
                                        >
                                            <MenuItem value={`PRAL`}>
                                                PRAL
                                            </MenuItem>
                                            <MenuItem value={`FBR`}>
                                                FBR
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {ownerShipError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
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
                                    value={purchaseOrderSearch}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setPurchaseOrdersearch,
                                            setPurchasedError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            {/* <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Box>
                                    <Autocomplete
                                        ListboxProps={{
                                            style: { maxHeight: '8rem' },
                                            position: 'bottom-start',
                                        }}
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={custodienId}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) =>
                                            `${option.employeeId} / ${option.name}`
                                        }
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="CustodianId / Name"
                                                />
                                            )
                                        }}
                                        value={searchCustodianId}
                                        onChange={(_event, custodianId) => {
                                            setSearchCustodianId(custodianId)
                                        }}
                                    />
                                </Box>
                            </Grid> */}
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                {productId ? (
                                    <Autocomplete
                                        multiple
                                        id="multiple-limit-tags"
                                        options={searchFeaturesByProductId}
                                        getOptionLabel={(option) => {
                                            return option._id
                                        }}
                                        // isOptionEqualToValue={(
                                        //     option,
                                        //     value
                                        // ) => {
                                        //     return (option._id = value._id)
                                        // }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="features suggestive"
                                                placeholder="features suggestive"
                                            // onClick={guardarNumeros()}
                                            />
                                        )}
                                        value={searchFeature}
                                        onChange={(_event, feature) => {
                                            setSearchFeature(feature)
                                        }}
                                    />
                                ) : (
                                    <Autocomplete
                                        multiple
                                        id="multiple-limit-tags"
                                        options={searchFeatures}
                                        getOptionLabel={(option) => {
                                            return option._id
                                        }}
                                        // isOptionEqualToValue={(
                                        //     option,
                                        //     value
                                        // ) => {
                                        //     return (option._id = value._id)
                                        // }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="features suggestive"
                                                placeholder="features suggestive"
                                            // onClick={guardarNumeros()}
                                            />
                                        )}
                                        value={searchFeature}
                                        onChange={(_event, feature) => {
                                            setSearchFeature(feature)
                                        }}
                                    />
                                )}
                            </Grid>
                        </Grid>

                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Box>
                                    <Typography id="input-slider" gutterBottom>
                                        Price Range
                                    </Typography>
                                    <Slider
                                        aria-label="Custom marks"
                                        defaultValue={0}
                                        getAriaValueText={valuetext}
                                        step={50000}
                                        min={0}
                                        max={1000000}
                                        valueLabelDisplay="auto"
                                        marks={priceMarks}
                                        value={searchPriceRange}
                                        onChange={(_, value) => {
                                            setSearchPriceRange(value)
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Box>
                                    <Typography id="input-slider" gutterBottom>
                                        Quantity Range
                                    </Typography>
                                    <Slider
                                        aria-label="Custom marks"
                                        defaultValue={0}
                                        getAriaValueText={valuetext}
                                        step={50}
                                        min={0}
                                        max={1000}
                                        valueLabelDisplay="auto"
                                        marks={quantityMarks}
                                        value={searchQuantityRange}
                                        onChange={(_, value) => {
                                            setSearchQuantityRange(value)
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                        <br></br>

                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Typography gutterBottom>
                                    Start Date of Purchased Items
                                </Typography>
                                <TextField
                                    value={sdate}
                                    id="date"
                                    label="Start Date"
                                    type="date"
                                    onChange={(e) => setSdate(e.target.value)}
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Typography gutterBottom>
                                    End Date Purchased Items
                                </Typography>
                                <TextField
                                    value={sdate1}
                                    id="date"
                                    label="End Date"
                                    type="date"
                                    onChange={(e) => setSdate1(e.target.value)}
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseClick}>Cancel</Button>
                    <Button autoFocus onClick={getSearchdata}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={searchByQrCode}
                fullWidth={true}
                onClose={() => setSearchByQrCode(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    id="alert-dialog-title"
                >
                    <div>{'Search By Qr Code'}</div>
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <CardContent>
                        <Grid container>
                            <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                                <h3>Please Search Your Qr code Below</h3>
                                <QrReader
                                    delay={300}
                                    style={{ width: '100%' }}
                                    onError={handleErrorWebCam}
                                    onScan={handleScanWebCam}
                                />
                                {/* <h3>
                                    Scanned By WebCam Code: {scanResultWebCam}
                                </h3> */}
                                {scanResultWebCam != ''
                                    ? qrBasedSearch(scanResultWebCam)
                                    : ''}
                            </Grid>
                        </Grid>
                        <br></br>
                    </CardContent>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setSearchByQrCode(false)
                            setSearchItemsDialog(false)
                        }}
                    >
                        Cancel
                    </Button>
                    <Button autoFocus onClick={() => { }}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={handleEditDialog}
                fullWidth={true}
                onClose={handleEditDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'EDIT ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <br></br>

                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box>
                                    <Autocomplete
                                        size="large"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={product1}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    // error={selectedProductError}
                                                    {...params}
                                                    label="Product"
                                                />
                                            )
                                        }}
                                        value={selectedProduct}
                                        onChange={(_event, product) => {
                                            setSelectedProduct(product)
                                            // setSelectedProductError(false)
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    // error={modelError}
                                    id="name"
                                    label="Model"
                                    placeholder="Model"
                                    autoComplete="off"
                                    // helperText={
                                    //     modelError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={model}
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
                                    // error={priceError}
                                    id="name"
                                    label="Price"
                                    placeholder="Price"
                                    autoComplete="off"
                                    // helperText={
                                    //     priceError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={price}
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
                                    value={purchaseOrder}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setPurchaseOrder,
                                            setPurchasedError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    disabled={!checked}
                                    // error={productQuantityError}
                                    id="name"
                                    label="Product Quantity"
                                    placeholder="Product Quantity"
                                    autoComplete="off"
                                    // helperText={
                                    //     productQuantityError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={productQuantity}
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

                                <Box >
                                    <label htmlFor="contained-button-file">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file"
                                            type="file"
                                            onChange={handlePhoto}
                                        />
                                        <Button
                                            variant="contained"
                                            component="span"
                                            startIcon={<ImportExportIcon />}
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            Attachment
                                        </Button>
                                    </label>
                                </Box>
                                {/* <Box>
                                    <label htmlFor="contained-button-file">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={() => {
                                                console.log("Image")
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            component="span"
                                            startIcon={<AddAPhotoIcon />}
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            Attachment
                                        </Button>
                                    </label>
                                </Box> */}
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                    // error={statusError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Status
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={statusValue}
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
                                        {/* <FormHelperText>
                                            {statusError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText> */}
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Autocomplete
                                    size="large"
                                    disablePortal
                                    id="combo-box-demo"
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) => {
                                        return option.name
                                    }}
                                    options={officeDialog}
                                    renderInput={(params) => (
                                        <TextField
                                            // error={officeNameListError}
                                            {...params}
                                            label="Office"
                                            size="large"
                                        // helperText={
                                        //     officeNameListError &&
                                        //     'Field Required'
                                        // }
                                        />
                                    )}
                                    value={officeNameList}
                                    onChange={(event, office) => {
                                        setOfficeNameList(office)
                                        // setOfficeNameListError(false)
                                    }}
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <form className={myclass.container} noValidate>
                                    <TextField
                                        id="date"
                                        size="small"
                                        label="Date Of Purchase"
                                        type="date"
                                        value={dataOfPurchase}
                                        className={myclass.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        // error={dateOfPurchaseError}
                                        // helperText={
                                        //     dateOfPurchaseError === true
                                        //         ? 'Field Required'
                                        //         : ''
                                        // }
                                        onChange={handlePurchasedDate}
                                    />
                                </form>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    style={{ width: '160px' }}
                                    // error={createdByError}
                                    disabled
                                    id="name"
                                    label="Created by"
                                    placeholder="Created by"
                                    autoComplete="off"
                                    // helperText={
                                    //     createdByError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={userName}
                                    size="small"
                                    onChange={(e) =>
                                        handleCreatedByDialog(
                                            e,
                                            setCreatedBy,
                                            setCreatedByError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <br></br>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    style={{ width: '160px' }}
                                    // error={createdAtError}
                                    disabled
                                    id="name"
                                    label="Created At"
                                    placeholder="Created At"
                                    autoComplete="off"
                                    // helperText={
                                    //     createdAtError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={moment(createdAt).format('LL')}
                                    size="small"
                                    onChange={(e) =>
                                        handleCreatedOnDialog(
                                            e,
                                            setCreatedAt,
                                            setCreatedAtError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <br></br>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    style={{ width: '160px' }}
                                    // error={modifyByError}
                                    disabled
                                    id="name"
                                    label="Modify by"
                                    placeholder="Modify by"
                                    autoComplete="off"
                                    // helperText={
                                    //     modifyByError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={
                                        modifyByDialog === undefined
                                            ? 'N/A'
                                            : userName
                                    }
                                    size="small"
                                    onChange={(e) =>
                                        handleModifyByDialog(
                                            e,
                                            setModifyByDialog,
                                            setModifyByError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <br></br>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    style={{ width: '160px' }}
                                    // error={modifyOnError}
                                    disabled
                                    id="name"
                                    label="Modify on"
                                    placeholder="Modify on"
                                    autoComplete="off"
                                    // helperText={
                                    //     editmodifyOnError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={
                                        modifyOnDialog === undefined
                                            ? 'N/A'
                                            : moment(modifyOnDialog).format(
                                                'LL'
                                            )
                                    }
                                    size="small"
                                    onChange={(e) =>
                                        handleModifyOnDialog(
                                            e,
                                            setModifyOnDialog,
                                            setModifyOnError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box sx={{ minWidth: 145 }}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                    // error={ownerShipError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            OwnerShip
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={ownerShip}
                                            label="Owner Ship"
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
                                        {/* <FormHelperText>
                                            {ownerShipError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText> */}
                                    </FormControl>
                                </Box>
                            </Grid>
                            {/* <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <Autocomplete
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
                            </Grid> */}
                            {/* <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            size="small"
                                        >
                                            Wing
                                        </InputLabel>
                                        <Select
                                            size="small"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Wing"
                                            onChange={handleWingChange}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>
                                                Twenty
                                            </MenuItem>
                                            <MenuItem value={30}>
                                                Thirty
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid> */}
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    type={`text`}
                                    // error={venderNameError}
                                    id="name"
                                    label="Vendor Name"
                                    placeholder="Enter Vendor Name"
                                    autoComplete="off"
                                    // helperText={
                                    //     venderNameError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={venderName}
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
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    // error={venderEmailError}
                                    id="name"
                                    label="Vendor Email"
                                    placeholder="Enter Vendor Email"
                                    autoComplete="off"
                                    // helperText={
                                    //     venderEmailError === true
                                    //         ? createEmailErrorMessage
                                    //         : ''
                                    // }
                                    value={venderEmail}
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
                                    // error={venderNumberError}
                                    id="name"
                                    label="Vendor Number"
                                    placeholder="Enter Vendor Number"
                                    autoComplete="off"
                                    // helperText={
                                    //     venderNumberError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={venderNumber}
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
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    // error={tagdataError}
                                    id="name"
                                    label="Tag"
                                    placeholder="Tag"
                                    autoComplete="off"
                                    // helperText={
                                    //     tagdataError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
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
                            <Grid item lg={5} md={5} sm={5} xs={5}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            value={checked}
                                            onChange={handleChecked}
                                            inputProps={{
                                                'aria-label': 'controlled',
                                            }}
                                        />
                                    }
                                    label="Disable Serial Number"
                                />
                            </Grid>
                            <Grid item lg={7} md={7} sm={7} xs={7}>
                                <TextField
                                    disabled={checked}
                                    // error={srnoError}
                                    id="name"
                                    label="Serial Number"
                                    placeholder="Enter Serial Number"
                                    autoComplete="off"
                                    // helperText={
                                    //     srnoError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={srno}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setSrNo, setSrNoError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    // error={invoiceNoError}
                                    id="name"
                                    label="Invoice"
                                    placeholder="Enter Invoice"
                                    autoComplete="off"
                                    // helperText={
                                    //     invoiceNoError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={invoiceNo}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setInvoiceNo, setInvoiceNoError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    // error={tenderNoError}
                                    id="name"
                                    label="Tender No"
                                    placeholder="Enter Tender No"
                                    autoComplete="off"
                                    // helperText={
                                    //     tenderNoError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={tenderNo}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setTenderNo, setTenderNoError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <form className={myclass.container} noValidate>
                                    <TextField
                                        id="date"
                                        size="small"
                                        label="ReceivingDate"
                                        type="date"
                                        value={receivingDate}
                                        className={myclass.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}

                                        onChange={handleReceivingDate}
                                    />
                                </form>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                {productId ? (
                                    <Autocomplete
                                        multiple
                                        id="multiple-limit-tags"
                                        options={searchFeaturesByProductId}
                                        getOptionLabel={(option) => option._id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="features suggestive"
                                                placeholder="features suggestive"
                                            />
                                        )}
                                        value={selectedFeatures}
                                        onChange={(_event, feature) => {
                                            handleSelectedTags(
                                                feature,
                                                setSelectedFeatures
                                            )
                                        }}
                                    />
                                ) : // (
                                    //     <Autocomplete
                                    //         multiple
                                    //         id="multiple-limit-tags"
                                    //         options={searchFeatures}
                                    //         getOptionLabel={(option) => option._id}
                                    //         renderInput={(params) => (
                                    //             <TextField
                                    //                 {...params}
                                    //                 label="features suggestive"
                                    //                 placeholder="features suggestive"
                                    //             />
                                    //         )}
                                    //         value={selectedFeatures}
                                    //         onChange={(_event, feature) => {
                                    //             handleSelectedTags(
                                    //                 feature,
                                    //                 setSelectedFeatures
                                    //             )
                                    //         }}
                                    //     />
                                    // )
                                    null}
                            </Grid>
                        </Grid>

                        <br></br>
                        <p>Add Features Suggestive</p>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TagsInput
                                    selectedTags={handleNewTags}
                                    fullWidth
                                    variant="outlined"
                                    id="features"
                                    name="features"
                                    placeholder="features"
                                    label="Add New Features"
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
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button autoFocus onClick={handleEdit}>
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

export default PurchasedItems

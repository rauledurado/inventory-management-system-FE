import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import React, { useEffect } from 'react'
import ReactPaginate from 'react-paginate'
// material
import ImportExportIcon from '@mui/icons-material/ImportExport';
import * as XLSX from "xlsx"
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@mui/icons-material/Add'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import CloseIcon from '@mui/icons-material/Close'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import validator from 'validator'
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormHelperText,
    Grid,
    IconButton,
    Snackbar,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/styles'
import { ConfirmationDialog } from 'app/components'
import axios from 'axios'
import config from 'config'
import UsersCard from './UsersCard'

import SummarizeIcon from '@mui/icons-material/Summarize'
import { CSVLink } from 'react-csv'
import './user.css'

const useStyles = makeStyles((theme) => ({
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
const UsersList = () => {
    const userName = localStorage.getItem('username')
    const [modifiedBy, setModifiedBy] = React.useState(userName)
    const [createEmailErrorMessage, setCreateEmailErrorMessage] =
        React.useState('field required')
    const [searchwing, setSearchwing] = React.useState(null)
    const [isValid, setIsvalid] = React.useState(true)
    const [personName, setPersonName] = React.useState([])
    const [brandName, setBrandName] = React.useState([])
    const [wingdata, setWingdata] = React.useState([])
    const [users, setUsers] = React.useState([])
    const [image, setImage] = React.useState('')
    //const [designation, setDesignation] = React.useState('')
    const [createSnackBar, setCreateSnackBar] = React.useState(false)
    const [editSnackBar, setEditSnackBar] = React.useState(false)
    const [userId, setUserId] = React.useState('')
    const [createEmployeeDialog, setCreateEmployeeDialog] =
        React.useState(false)
    const [editEmployeeDialog, setEditEmployeeDialog] = React.useState(false)
    const date = new Date().toISOString().split('T')[0]
    const [name, setName] = React.useState('')
    const [createdBy, setCreatedBy] = React.useState(userName)
    const [nameError, setNameError] = React.useState(false)
    const [custodianIds, setCustodianIds] = React.useState([])
    const [custodianId, setCustodianId] = React.useState(null)
    const [description, setDescription] = React.useState('')
    const [descriptionError, setDescriptionError] = React.useState(false)
    const [cnic, setCnic] = React.useState('')
    const [cnicError, setCnicError] = React.useState(false)
    const [employeeId, setEmployeeId] = React.useState('')
    const [employeeIdError, setEmployeeIdError] = React.useState(false)
    //  const [checked, setChecked] = React.useState([])
    const [office, setOffice] = React.useState([])
    const [officeName, setOfficeName] = React.useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null)
    // const open1 = Boolean(anchorEl)
    const [anchorEl1, setAnchorEl1] = React.useState(null)
    const open2 = Boolean(anchorEl1)
    const [addDepartment, setAddDepartment] = React.useState(null)
    const [addDepartmentError, setAddDepartmentError] = React.useState(false)
    const [addDepartmentarr, setAddDepartmentarr] = React.useState([])
    /////// employee dialoge
    const [employeeDialogs, setEmployeeDialogs] = React.useState(false)
    const label = { inputProps: { 'aria-label': 'Switch demo' } }
    ///////
    const [wings, setWings] = React.useState([])
    const [mobileNumber1, setMobileNumber1] = React.useState('')
    const [mobilenumber1Error, setMobileNumber1Error] = React.useState(false)
    // const [remarks1,setRemarks1]= React.useState('')
    // const [remarks1Error,setRemarks1Error]= React.useState(false)
    const [emailAddress1, setEmailAddress1] = React.useState('')
    const [emailAddress1Error, setEmailAddress1Error] = React.useState(false)
    const [placeOfPosting1, setPlaceOfPosting1] = React.useState([])
    const [placeOfPosting1Name, setPlaceOfPosting1Name] = React.useState(null)
    const [placeOfPosting1Error, setPlaceOfPosting1Error] =
        React.useState(false)
    const [pg1, setPg1] = React.useState('')
    const [pg1Error, setPg1Error] = React.useState(false)
    const [wing1, setWing1] = React.useState(null)
    const [wing1Error, setWing1Error] = React.useState(false)
    const [department1, setDepartment1] = React.useState()

    const [department1Error, setDepartment1Error] = React.useState(false)
    const [dateOfJoinnig1, setDateOfJoinnig1] = React.useState(date)
    const [dateOfJoinnig1Error, setDateOfJoinnig1Error] = React.useState(false)
    const [designation1, setDesignation1] = React.useState('')
    const [designationError, setDesignationError] = React.useState(false)

    ///error Handling
    const [designation1Error, setDesignation1Error] = React.useState(false)
    const [gender, setGender] = React.useState('')
    const [genderError, setGenderError] = React.useState(false)
    const [dateOfBirth, setDateOfBirth] = React.useState(date)
    const [dateOfBirthError, setDateOfBirthError] = React.useState(false)
    const [jobTitle, setJobTitle] = React.useState('')
    const [jobTitleError, setJobTitleError] = React.useState(false)
    const [departmentId, setDepartmentId] = React.useState('')

    ///Search filters state
    const [sdynamic, setDynamic] = React.useState(null)
    const [sdesignation, setSdesignation] = React.useState(null)
    const [sPg, setSPg] = React.useState(null)
    const [sdepartment, setSdepartment] = React.useState(null)
    const [sdate, setSdate] = React.useState('')
    const [sdate1, setSdate1] = React.useState('')
    const [sOffice, setSOffice] = React.useState(null)

    const [designations, setDesignations] = React.useState([])
    const [departments, setDepartments] = React.useState([])
    const [names, setNames] = React.useState([])

    const [reportingManagers, setReportingManagers] = React.useState([])
    const [selectedReportingManager, setSelectedReportingManager] =
        React.useState(null)
    const [selectedReportingManagerError, setSelectedReportingManagerError] =
        React.useState(null)

    ////pagination code set here

    const [pageNumber, setPageNumber] = React.useState(1)
    const usersPerPage = 8
    const pagesVisited = pageNumber * usersPerPage
    const pageCount = Math.ceil(users.length / usersPerPage)
    const changePage = (value) => {
        setPageNumber(value.selected )
        getAlldata()
    }

    const [open5, setOpen5] = React.useState(false)

    const Input = styled('input')({
        display: 'none',
    })

    const pgs = [
        { _id: 1 },
        { _id: 2 },
        { _id: 3 },
        { _id: 4 },
        { _id: 5 },
        { _id: 6 },
        { _id: 7 },
        { _id: 8 },
        { _id: 9 },
        { _id: 10 },
    ]

    // setTimeout(() => {
    //     getAlldata()
    // }, 500);

    useEffect(() => {
        getAlldata()
    }, [getAlldata])
    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/employee`)
            .then((res) => {
                setUsers(res.data.data)
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
            .get(`${config.base_url}/api/v1/office`)
            .then((res) => {
                setPlaceOfPosting1(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .post(`${config.base_url}/api/v1/employee/designationSuggestions`)
            .then((res) => {
                setDesignations(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .post(`${config.base_url}/api/v1/office/multiSuggestion`)
            .then((res) => {
                const filteredNames = res.data.names.filter((filteredName) => {
                    return (
                        filteredName !== null ||
                        filteredName !== '' ||
                        filteredName !== undefined
                    )
                })

                setNames(filteredNames)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const handleCreateClose = () => {
        setCreateEmployeeDialog(false)
        setName('')
        // setOffice('')
        setCnic('')
        setEmployeeId('')
        setDescription('')
        setImage('')
        setNameError(false)
        // setOfficeError(false)
        setCnicError(false)
        setEmployeeIdError(false)
        setDescriptionError(false)
        // setChecked(true)
        // setMobileNumber(false)
        // setDateOfJoining(false)
        // setDepartment(false)
        // setWing(false)
        // setPg(false)
        // setDesgnation(false)
        // setEmailAdress(false)
        // setRemark(false)
        // setPlaceOfPoset(false)
        setMobileNumber1('')
        setMobileNumber1Error(false)
        // setRemarks1('')
        // setRemarks1Error(false)
        setEmailAddress1('')
        setEmailAddress1Error(false)
        setPlaceOfPosting1Name(null)
        // setPlaceOfPosting1('')
        setPlaceOfPosting1Error(false)
        setPg1('')
        setPg1Error(false)
        setWing1(null)
        setWing1Error(false)
        setAddDepartment(null)
        setDepartment1Error(false)
        setDesignation1('')
        setDesignation1Error(false)
        setDateOfJoinnig1(date)
        setGender('')
        setDateOfBirth(date)
        setJobTitle('')
        setSelectedReportingManager(null)
        setSelectedReportingManagerError(false)
        setAddDepartmentError(false)
        setGenderError(false)
        setJobTitleError(false)
    }

    const handleCreateSnackBarClose = () => {
        setCreateSnackBar(false)
    }

    const handleEditClose = () => {
        setEditEmployeeDialog(false)
        setCreateEmployeeDialog(false)
        setName('')
        // setOffice('')
        setCnic('')
        setEmployeeId('')
        setDescription('')
        setImage('')
        setNameError(false)
        // setOfficeError(false)
        setCnicError(false)
        setEmployeeIdError(false)
        setDescriptionError(false)
        // setChecked(true)
        // setMobileNumber(false)
        // setDateOfJoining(false)
        // setDepartment(false)
        // setWing(false)
        // setPg(false)
        // setDesgnation(false)
        // setEmailAdress(false)
        // setRemark(false)
        // setPlaceOfPoset(false)
        setMobileNumber1('')
        setMobileNumber1Error(false)
        // setRemarks1('')
        // setRemarks1Error(false)
        setEmailAddress1('')
        setEmailAddress1Error(false)
        setPlaceOfPosting1Name(null)
        // setPlaceOfPosting1('')
        setPlaceOfPosting1Error(false)
        setPg1('')
        setPg1Error(false)
        setWing1(null)
        setWing1Error(false)
        setAddDepartment(null)
        setDepartment1Error(false)
        setDesignation1('')
        setDesignation1Error(false)
        setDateOfJoinnig1(date)
        setGender('')
        setDateOfBirth(date)
        setJobTitle('')
        setSelectedReportingManager(null)
        setSelectedReportingManager(null)
        setSelectedReportingManagerError(false)
        setAddDepartmentError(false)
        setGenderError(false)
        setJobTitleError(false)
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
        var emailRegex = /\S+@\S+\.\S+/
        if (
            name === '' ||
            cnic === '' ||
            description === '' ||
            employeeId === '' ||
            mobileNumber1 === '' ||
            pg1 === '' ||
            placeOfPosting1Name === null ||
            wing1 === null ||
            addDepartment === null ||
            designation1 === '' ||
            gender === '' ||
            dateOfBirth === '' ||
            jobTitle === '' ||
            emailAddress1 === '' ||
            // selectedReportingManager === null ||
            !emailRegex.test(emailAddress1)
        ) {
            if (name === '') {
                setNameError(true)
            }
            if (cnic === '') {
                setCnicError(true)
            }
            if (description === '') {
                setDescriptionError(true)
            }
            if (employeeId === '') {
                setEmployeeIdError(true)
            }
            if (mobileNumber1 === '') {
                setMobileNumber1Error(true)
            }
            if (emailAddress1 === '') {
                setEmailAddress1Error(true)
            }
            if (placeOfPosting1Name === null) {
                setPlaceOfPosting1Error(true)
            }
            if (emailAddress1 !== '' && !emailRegex.test(emailAddress1)) {
                setCreateEmailErrorMessage('Please Enter a valid Email Address')
                setEmailAddress1Error(true)
            }
            if (pg1 === '') {
                setPg1Error(true)
            }
            if (wing1 === null) {
                setWing1Error(true)
            }
            // if (selectedReportingManager === null) {
            //     setSelectedReportingManagerError(true)
            // }
            if (addDepartment === null) {
                setAddDepartmentError(true)
            }
            if (designation1 === '') {
                setDesignation1Error(true)
            }
            if (gender === '') {
                setGenderError(true)
            }
            if (dateOfBirth === '') {
                setDateOfBirthError(true)
            }
            if (jobTitle === '') {
                setJobTitleError(true)
            }
        } else {
            createHandler()
        }
    }

    const handleEditClickOpen = () => {
        console.log('cnic', cnic)
        var emailRegex = /\S+@\S+\.\S+/
        if (
            name === '' ||
            name === undefined ||
            cnic === '' ||
            cnic === undefined ||
            description === '' ||
            description === undefined ||
            employeeId === '' ||
            employeeId === undefined ||
            mobileNumber1 === '' ||
            mobileNumber1 === undefined ||
            pg1 === '' ||
            pg1 === undefined ||
            placeOfPosting1Name === null ||
            placeOfPosting1Name === undefined ||
            selectedReportingManager === null ||
            selectedReportingManager === undefined ||
            wing1 === null ||
            wing1 === undefined ||
            department1 === null ||
            department1 === undefined ||
            designation1 === '' ||
            designation1 === undefined ||
            gender === '' ||
            gender === undefined ||
            dateOfBirth === '' ||
            dateOfBirth === undefined ||
            jobTitle === '' ||
            jobTitle === undefined ||
            emailAddress1 === '' ||
            emailAddress1 === undefined ||
            !emailRegex.test(emailAddress1)
        ) {
            if (name === '' || name === undefined) {
                setNameError(true)
            }
            if (cnic === '' || cnic === undefined) {
                setCnicError(true)
            }
            if (description === '' || description === undefined) {
                setDescriptionError(true)
            }
            if (employeeId === '' || employeeId === undefined) {
                setEmployeeIdError(true)
            }
            if (mobileNumber1 === '' || mobileNumber1 === undefined) {
                setMobileNumber1Error(true)
            }
            if (wing1 === null || wing1 === undefined) {
                setWing1Error(true)
            }
            if (
                selectedReportingManager === null ||
                selectedReportingManager === undefined
            ) {
                setSelectedReportingManagerError(true)
            }
            // if (
            //     placeOfPosting1Name === null ||
            //     placeOfPosting1Name === undefined
            // ) {
            //     setPlaceOfPosting1Error(true)
            // }
            if (department1 === null || department1 === undefined) {
                setAddDepartmentError(true)
            }
            if (emailAddress1 === '' || emailAddress1 === undefined) {
                setEmailAddress1Error(true)
            }
            if (emailAddress1 !== '' && !emailRegex.test(emailAddress1)) {
                setCreateEmailErrorMessage('Please Enter a valid Email Address')
                setEmailAddress1Error(true)
            }
            if (pg1 === '' || pg1 === undefined) {
                setPg1Error(true)
            }
            if (designation1 === '' || designation1 === undefined) {
                setDesignation1Error(true)
            }
            if (gender === '' || gender === undefined) {
                setGenderError(true)
            }
            if (dateOfBirth === '' || dateOfBirth === undefined) {
                setDateOfBirthError(true)
            }
            if (jobTitle === '' || jobTitle === undefined) {
                setJobTitleError(true)
            }
        } else {
            editHandler()
        }
    }

    const createHandler = () => {
        let data = new FormData()

        data.append('name', name)
        data.append('photo', image)
        // data.append('office', office)
        data.append('cnic', cnic)
        data.append('remarks', description)
        data.append('employeeId', employeeId)
        // data.append('purchasedItems', checked)

        data.append('mobileNumber', mobileNumber1)
        data.append('officeId', placeOfPosting1Name._id)
        // data.append('remarks', remarks1)
        data.append('dateOfJoining', dateOfJoinnig1)
        data.append('wing', wing1._id)
        data.append('pg', pg1)
        // data.append('department', department1)
        data.append('department', addDepartment._id)
        data.append('designation', designation1.toUpperCase())
        data.append('emailAddress', emailAddress1)
        data.append('gender', gender)
        data.append('jobTitle', jobTitle)
        data.append('dob', dateOfBirth)
        // data.append('reportingManager', selectedReportingManager._id)
        data.append('createdBy', createdBy)
        const userNameExist = users.find((user) => {
            return user.employeeId === employeeId
        })

        if (userNameExist) {
            setCreateSnackBar(true)
            return
        }

        axios
            .post(`${config.base_url}/api/v1/employee`, data)
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
        if (name != undefined) {
            data.append('name', name)
        }
        if (image != undefined) {
            data.append('photo', image)
        }
        if (cnic != undefined) {
            data.append('cnic', cnic === '' ? '' : cnic)
        }
        if (description != undefined) {
            data.append('remarks', description)
        }
        if (employeeId != undefined) {
            data.append('employeeId', employeeId)
        }
        // data.append('purchase', checked)

        if (mobileNumber1 != undefined) {
            data.append(
                'mobileNumber',
                mobileNumber1 === '' ? '' : mobileNumber1
            )
        }

        if (placeOfPosting1Name != undefined) {
            data.append('officeId', placeOfPosting1Name._id)
        }
        if (wing1 != undefined) {
            data.append('wing', wing1._id)
        }

        if (department1 != undefined) {
            data.append('department', department1._id)
        }

        // if (selectedReportingManager != undefined) {
        //     data.append('reportingManager', selectedReportingManager._id)
        // }
        if (dateOfJoinnig1 != undefined) {
            data.append('dateOfJoining', dateOfJoinnig1)
        }
        if (pg1 != undefined) {
            data.append('pg', pg1 === null ? '' : pg1)
        }
        if (designation1 != undefined) {
            data.append('designation', designation1.toUpperCase())
        }
        if (emailAddress1 != undefined) {
            data.append('emailAddress', emailAddress1)
        }
        if (gender != undefined) {
            data.append('gender', gender === '' ? '' : gender)
        }
        if (dateOfBirth != undefined) {
            data.append('dob', dateOfBirth)
        }
        if (jobTitle != undefined) {
            data.append('jobTitle', jobTitle === '' ? '' : jobTitle)
        }
        if (modifiedBy != undefined) {
            data.append('modifiedBy', modifiedBy)
        }

        axios
            .put(`${config.base_url}/api/v1/employee/${userId}`, data)
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

    const onEditHandler = (id, user) => {

        console.log("User", user.gender)

        setEditEmployeeDialog(true)
        setName(user.name)
        // setOffice(user.office)
        setCnic(user.cnic)
        setEmailAddress1(user.emailAddress)
        setPg1(user.pg)
        setImage(user.photo)
        setEmployeeId(user.employeeId)
        setDescription(user.remarks)
        setMobileNumber1(user.mobileNumber)
        setWing1(user.wing[0])
        setDepartment1(user.department[0])
        setSelectedReportingManager(user.reportingManager[0])
        setPlaceOfPosting1Name(user.office[0])
        setDesignation1(user.designation)
        const date = new Date(user.dateOfJoining).toISOString().split('T')[0]
        setDateOfJoinnig1(date)
        setGender(user.gender)
        setDateOfBirth(user.dob)
        setJobTitle(user.jobTitle)

        // setChecked(user.purchase)
        setUserId(id)
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
    ///employee dialogs close

    const handleEmployeeClose = () => {
        setEmployeeDialogs(false)
        setSdate('')
        setSdate1('')
        setOffice('')
        setName('')
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

    const onDeleteHandler = (id) => {
        setOpen5(true)
        setUserId(id)
        if (open5 && userId) {
            axios
                .delete(`${config.base_url}/api/v1/employee/${userId}`)
                .then((res) => {
                    getAlldata()
                    setOpen5(false)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    // const iconeHandler = (event) => {
    //     setAnchorEl(event.currentTarget);
    //   };
    //   const iconeHandler1 = (event) => {
    //     setAnchorEl1(event.currentTarget);
    //   };
    //   const handleClose = () => {
    //     setAnchorEl();
    //   };
    //   const handleClose1 = () => {
    //     setAnchorEl1();
    //   };

    //   const [checkedBox1, setCheckedBox1] = React.useState(true);
    //   const [emailAdress, setEmailAdress] = React.useState(false);
    //   const [designation, setDesgnation] = React.useState(false);
    //   const [remark, setRemark] = React.useState(false);
    //   const [dateOfJoining, setDateOfJoining] = React.useState(false);
    //   const [pg, setPg] = React.useState(false);
    //   const [wing, setWing] = React.useState(false);
    //   const [placeOfPoset, setPlaceOfPoset] = React.useState(false);
    //   const [department, setDepartment] = React.useState(false);
    //   const [mobileNumber, setMobileNumber] = React.useState(false);

    //   const checkBoxHandler1 = (event) => {
    //     setCheckedBox1(event.target.checked);

    //   };

    //   const stateModifier= (state,func)=>{

    //     func(!state)

    //     func(!state)

    //   }
    const dateOfjoinnignHandler = (event) => {
        setDateOfJoinnig1(event.target.value)
    }

    const ApplyFilters = () => {
        let data = {}

        data.employeeId = sdynamic === null ? '' : sdynamic._id
        data.designation = sdesignation === null ? '' : sdesignation._id
        data.startDate = sdate
        data.endDate = sdate1
        data.location = sOffice === null ? '' : sOffice._id
        data.department = sdepartment === null ? '' : sdepartment._id
        data.pg = sPg === null ? '' : sPg._id

        if (sdate !== '' && sdate1 === '') {
            alert('Please Select End Date Too')
            return
        } else if (sdate === '' && sdate1 !== '') {
            alert('Please Select Start Date Too')
            return
        }

        axios
            .post(`${config.base_url}/api/v1/employee/search`, data)
            .then((res) => {
                if (res.data.data.length < 1) {
                    alert('No record found')
                } else {
                    setUsers(res.data.data)
                    setEmployeeDialogs(false)
                }
            })
            .catch((error) => {
                console.log(error, 'error')
                alert('No Record Found')
                setEmployeeDialogs(false)
            })
    }

    /////department nameid/employee
    useEffect(() => {
        getEmployee()
        // getSeggive()

        //getWing()

        if (departmentId) {
            // addDepartment(addDepartment._id)
            getWing(departmentId)
        }
    }, [departmentId])

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

    ///offices get the name
    useEffect(() => {
        getOfficedata()
        //  getData()
    }, [])

    const getOfficedata = () => {
        axios
            .get(`${config.base_url}/api/v1/office`)
            .then((res) => {
                setOffice(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    ////department
    useEffect(() => {
        getDepartmentdata()
        //  getData()
    }, [])

    const getDepartmentdata = () => {
        axios
            .get(`${config.base_url}/api/v1/department`)
            .then((res) => {
                setAddDepartmentarr(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const headers = [
        { label: 'Employee Code', key: 'employeeID' },
        { label: 'Name', key: 'name' },
        { label: 'Phone', key: 'mobileNumber' },
        { label: 'Date Of Birth', key: 'dob' },
        { label: 'CNIC', key: 'cnic' },
        { label: 'Gender', key: 'gender' },
        { label: 'Joining Date', key: 'dateOfJoining' },
        { label: 'Official Email', key: 'emailAddress' },
        { label: 'Place Of Posting', key: 'office[0].city' },
        { label: 'Branch', key: 'office[0].name' },
        { label: 'Grade', key: 'pg' },
        { label: 'Wing', key: 'wing' },
        { label: 'Department', key: 'department' },
        { label: 'Designation', key: 'designation' },
        { label: 'Job Title', key: 'jobTitle' },
        { label: 'Creation Date', key: 'createdAt' },
        { label: 'Created By', key: 'createdBy' },
        { label: 'Last Modified', key: 'modifiedAt' },
        { label: 'Modified By', key: 'modifiedBy' },
    ]

    ////// get the wing seggive
    // const getSeggive = () => {
    //     axios
    //         .post(`${config.base_url}/api/v1/wing/wingsSuggestions`)
    //         .then((res) => {
    //             if (res) {
    //                 setWingdata(res.data.data)
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

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
    /////search for the replace of the data

    return (
        <>
            {open5 && (
                <ConfirmationDialog
                    open={open5}
                    onConfirmDialogClose={() => {
                        setOpen5(false)
                    }}
                    text={`Are You Sure Yoou Want To Delete This Employee?`}
                    title={`Are You Sure?`}
                    onYesClick={onDeleteHandler}
                />
            )}
            <Container>
                <br></br>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Employees
                </Typography>

                <Grid container spacing={3}>
                    {users
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map((user) => (
                            <Grid key={user._id} item xs={12} sm={6} md={3}>
                                <UsersCard
                                    user={user}
                                    onDelete={onDeleteHandler}
                                    onEdit={onEditHandler}
                                />
                            </Grid>
                        ))}
                </Grid>
                <br></br>
                <br></br>
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
                        disableInitialCallback={true}
                    />
                )}
            </Container>
            <Box sx={{
                zIndex: 999,
                right: '14vw',
                top: '9.5vh',
                position: 'fixed',
            }}>
                <label htmlFor="contained-button-file2">
                    <Input
                        accept="*"
                        id="contained-button-file2"
                        type="file"
                        onChange={(e) => {

                            console.log("inside")

                            e.preventDefault();
                            if (e.target.files) {
                                const reader = new FileReader();
                                reader.onload = async (e) => {
                                    const data = e.target.result;
                                    const workbook = XLSX.read(data, { type: "array" });

                                    const sheetNames = workbook.SheetNames[0];

                                    const worksheet = workbook.Sheets[sheetNames];
                                    const json = XLSX.utils.sheet_to_json(worksheet);

                                    const uniqueDepartments = [...new Set(json.map(item => item.department))];

                                    const uniqueWings = [...new Set(json.map(item => item.wing))];

                                    const uniqueOffices = [...new Set(json.map(item => item.officeId))];

                                    axios
                                        .post(`${config.base_url}/api/v1/Employee/postEmployeeData`, {data: {
                                            employee: json,
                                            departments: uniqueDepartments,
                                            wings: uniqueWings,
                                            offices: uniqueOffices
                                        }})

                                        .then((res) => {
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
                        right: '4vw',
                        top: '17vh',
                        position: 'fixed',
                    }}
                >
                    <CSVLink
                        filename={'all-employees.csv'}
                        data={users}
                        headers={headers}
                    >
                        <div style={{ marginTop: '8px' }}>
                            <SummarizeIcon />
                        </div>
                    </CSVLink>
                </Fab>
            </Tooltip>
            <div>
                <Tooltip title="Add Employee">
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
                        onClick={() => setCreateEmployeeDialog(true)}
                    >
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <Dialog
                    open={createEmployeeDialog}
                    onClose={handleCreateClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'ADD EMPLOYEE'}
                        <IconButton
                            aria-label="settings"
                            sx={{ ml: 45 }}
                            // onClick={iconeHandler}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            {/* <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={officeError}
                                    id="office"
                                    label="Office"
                                    placeholder="Enter Office"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        officeError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={office}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setOffice,
                                            setOfficeError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid> */}

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={cnicError}
                                    id="cnic"
                                    label="CNIC"
                                    placeholder="Enter CNIC"
                                    size="small"
                                    type="number"
                                    autoComplete="off"
                                    helperText={
                                        cnicError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={cnic}
                                    onChange={(e) =>
                                        handleChange(e, setCnic, setCnicError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={employeeIdError}
                                    id="employeeId"
                                    label="Employee ID"
                                    placeholder="Enter Employee ID"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        employeeIdError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={employeeId}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEmployeeId,
                                            setEmployeeIdError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={mobilenumber1Error}
                                    id="category"
                                    label="Mobile Number"
                                    placeholder="Mobile Number"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        mobilenumber1Error === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={mobileNumber1}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setMobileNumber1,
                                            setMobileNumber1Error
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={emailAddress1Error}
                                    id="category"
                                    label="Email Address"
                                    placeholder="Eg. recipient@email.com"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        emailAddress1Error === true
                                            ? createEmailErrorMessage
                                            : ''
                                    }
                                    value={emailAddress1}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEmailAddress1,
                                            setEmailAddress1Error
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={pg1Error}
                                    id="category"
                                    label="PG"
                                    type="number"
                                    placeholder="PG"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        pg1Error === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={pg1}
                                    onChange={(e) =>
                                        handleChange(e, setPg1, setPg1Error)
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
                                    options={placeOfPosting1}
                                    renderInput={(params) => (
                                        <TextField
                                            error={placeOfPosting1Error}
                                            {...params}
                                            label="Location"
                                            helperText={
                                                placeOfPosting1Error &&
                                                'Field Required'
                                            }
                                        />
                                    )}
                                    renderOption={(props, option) => {
                                        return (
                                            <li {...props} key={option._id}>
                                                {option.name}
                                            </li>
                                        )
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    value={placeOfPosting1Name}
                                    onChange={(_event, location) => {
                                        setPlaceOfPosting1Name(location)
                                    }}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Autocomplete
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={users}
                                    renderInput={(params) => (
                                        <TextField
                                            error={
                                                selectedReportingManagerError
                                            }
                                            {...params}
                                            label="Reporting Manager"
                                            helperText={
                                                selectedReportingManagerError &&
                                                'Field Required'
                                            }
                                        />
                                    )}
                                    renderOption={(props, option) => {
                                        return (
                                            <li {...props} key={option._id}>
                                                {option.name}
                                            </li>
                                        )
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    value={selectedReportingManager}
                                    onChange={(_event, location) => {
                                        setSelectedReportingManager(location)
                                    }}
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box>
                                    <Autocomplete
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={addDepartmentarr}
                                        renderInput={(params) => (
                                            <TextField
                                                error={addDepartmentError}
                                                {...params}
                                                label="Department"
                                                helperText={
                                                    addDepartmentError &&
                                                    'Field Required'
                                                }
                                            />
                                        )}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id === value._id
                                        }
                                        value={addDepartment}
                                        onChange={(_event, department) => {
                                            setDepartmentId(department._id)
                                            setAddDepartment(department)
                                        }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box>
                                    {addDepartment ? (
                                        <Autocomplete
                                            ListboxProps={{
                                                style: { maxHeight: '13rem' },
                                                position: 'bottom-start',
                                            }}
                                            size="small"
                                            disablePortal
                                            id="combo-box-demo"
                                            options={wings}
                                            isOptionEqualToValue={(
                                                option,
                                                value
                                            ) => option._id === value._id}
                                            getOptionLabel={(option) =>
                                                `${option.name}`
                                            }
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        error={wing1Error}
                                                        {...params}
                                                        label="Departments Wing"
                                                        helperText={
                                                            wing1Error &&
                                                            'Field Required'
                                                        }
                                                    />
                                                )
                                            }}
                                            value={wing1}
                                            onChange={(_event, vender) => {
                                                setWing1(vender)
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
                                            isOptionEqualToValue={(
                                                option,
                                                value
                                            ) => option._id === value._id}
                                            getOptionLabel={(option) =>
                                                `${option._id}`
                                            }
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        error={wing1Error}
                                                        {...params}
                                                        label="Departments Wing"
                                                        helperText={
                                                            wing1Error &&
                                                            'Field Required'
                                                        }
                                                    />
                                                )
                                            }}
                                            value={wing1}
                                            onChange={(_event, vender) => {
                                                setWing1(vender)
                                            }}
                                        />
                                    )}
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={dateOfJoinnig1Error}
                                    id="category"
                                    // label="Date Of Joinnig"
                                    // placeholder="Date Of Joinnig"
                                    size="small"
                                    type="date"
                                    // helperText={
                                    //     dateOfJoinnig1Error === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={dateOfJoinnig1}
                                    onChange={dateOfjoinnignHandler}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={designation1Error}
                                    id="category"
                                    label="Designation"
                                    placeholder="Designation"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        designation1Error === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={designation1}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setDesignation1,
                                            setDesignation1Error
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <FormControl error={genderError} fullWidth>
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        size="small"
                                    >
                                        Gender
                                    </InputLabel>
                                    <Select
                                        size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={gender}
                                        label="Gender"
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                setGender,
                                                setGenderError
                                            )
                                        }
                                    >
                                        <MenuItem value={'male'}>Male</MenuItem>
                                        <MenuItem value={'female'}>
                                            Female
                                        </MenuItem>
                                    </Select>
                                    <FormHelperText>
                                        {genderError && 'Field Required'}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
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

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={dateOfBirthError}
                                    id="category"
                                    // label=""
                                    // placeholder=""
                                    size="small"
                                    autoComplete="off"
                                    type={`date`}
                                    // helperText={
                                    //     dateOfBirthError === true
                                    //         ? 'Field Required'
                                    //         : ''
                                    // }
                                    value={dateOfBirth}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setDateOfBirth,
                                            setDateOfBirthError
                                        )
                                    }
                                    // variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={jobTitleError}
                                    id="jobtitle"
                                    label="Job Title"
                                    placeholder="Enter Job Title"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        jobTitleError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={jobTitle}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setJobTitle,
                                            setJobTitleError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    error={descriptionError}
                                    helperText={
                                        descriptionError && 'Field Required'
                                    }
                                    label="Remarks"
                                    placeholder="Remarks"
                                    style={{ textAlign: 'left' }}
                                    hinttext="Message Field"
                                    floatinglabeltext="MultiLine and FloatingLabel"
                                    multiline
                                    fullWidth
                                    rows={3}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setDescription,
                                            setDescriptionError
                                        )
                                    }
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
                        open={createSnackBar}
                        autoHideDuration={5000}
                        onClose={handleCreateClosed}
                        message="Employee with same Id already exists"
                        action={createAction}
                    />
                </Dialog>
            </div>
            <Dialog
                open={editEmployeeDialog}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'EDIT EMPLOYEE'}
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={nameError}
                                id="category"
                                label="Name"
                                placeholder="Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    nameError === true ? 'Field Required' : ''
                                }
                                value={name}
                                onChange={(e) =>
                                    handleChange(e, setName, setNameError)
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={cnicError}
                                id="cnic"
                                type="number"
                                label="CNIC"
                                placeholder="Enter CNIC"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    cnicError === true ? 'Field Required' : ''
                                }
                                value={cnic}
                                onChange={(e) =>
                                    handleChange(e, setCnic, setCnicError)
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={employeeIdError}
                                id="employeeId"
                                label="Employee ID"
                                placeholder="Enter Employee ID"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    employeeIdError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={employeeId}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEmployeeId,
                                        setEmployeeIdError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={mobilenumber1Error}
                                id="category"
                                label="Mobile Number"
                                placeholder="Mobile Number"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    mobilenumber1Error === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={mobileNumber1}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setMobileNumber1,
                                        setMobileNumber1Error
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        {/* 
 <Grid item lg={4} md={4} sm={4} xs={6}>
 <TextField
     error={remarks1Error}
     id="category"
     label="Remarks"
     placeholder="Remarks"
     size="small"
     autoComplete="off"
     helperText={
         remarks1Error === true
             ? 'Field Required'
             : ''
     }
     value={remarks1}
     onChange={(e) =>
         handleChange(e, setRemarks1, setRemarks1Error)
     }
     variant="outlined"
     fullWidth
 />
</Grid> */}

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={emailAddress1Error}
                                id="category"
                                label="Email Address"
                                placeholder="Email Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    emailAddress1Error === true
                                        ? createEmailErrorMessage
                                        : ''
                                }
                                value={emailAddress1}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEmailAddress1,
                                        setEmailAddress1Error
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        {/* <Grid item lg={4} md={4} sm={4} xs={6}>
 <TextField
     error={placeOfPosting1Error}
     id="category"
     label="Place Of Posting"
     placeholder="Place Of Posting"
     size="small"
     autoComplete="off"
     helperText={
         placeOfPosting1Error === true
             ? 'Field Required'
             : ''
     }
     value={placeOfPosting1}
     onChange={(e) =>
         handleChange(e, setPlaceOfPosting1, setPlaceOfPosting1Error)
     }
     variant="outlined"
     fullWidth
 />
</Grid> */}
                        {/* <Grid item lg={4} md={4} sm={4} xs={6}>
                            <Autocomplete
                                size="small"
                                disablePortal
                                id="combo-box-demo"
                                options={placeOfPosting1}
                                renderInput={(params) => (
                                    <TextField {...params} label="Location" />
                                )}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) =>
                                    option._id === value._id
                                }
                                value={placeOfPosting1Name}
                                onChange={(_event, location) => {
                                    setPlaceOfPosting1Name(location)
                                }}
                            />
                        </Grid> */}

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={pg1Error}
                                id="category"
                                label="PG"
                                placeholder="PG"
                                size="small"
                                autoComplete="off"
                                type="number"
                                helperText={
                                    pg1Error === true ? 'Field Required' : ''
                                }
                                value={pg1}
                                onChange={(e) =>
                                    handleChange(e, setPg1, setPg1Error)
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
                                options={placeOfPosting1}
                                renderInput={(params) => (
                                    <TextField
                                        error={placeOfPosting1Error}
                                        {...params}
                                        label="Location"
                                        helperText={
                                            placeOfPosting1Error &&
                                            'Field Required'
                                        }
                                    />
                                )}
                                renderOption={(props, option) => {
                                    return (
                                        <li {...props} key={option._id}>
                                            {option.name}
                                        </li>
                                    )
                                }}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) =>
                                    option._id === value._id
                                }
                                value={placeOfPosting1Name}
                                onChange={(_event, location) => {
                                    setPlaceOfPosting1Name(location)
                                }}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Autocomplete
                                size="small"
                                disablePortal
                                id="combo-box-demo"
                                options={users}
                                renderInput={(params) => (
                                    <TextField
                                        error={selectedReportingManagerError}
                                        {...params}
                                        label="Reporting Manager"
                                        helperText={
                                            selectedReportingManagerError &&
                                            'Field Required'
                                        }
                                    />
                                )}
                                renderOption={(props, option) => {
                                    return (
                                        <li {...props} key={option._id}>
                                            {option.name}
                                        </li>
                                    )
                                }}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) =>
                                    option._id === value._id
                                }
                                value={selectedReportingManager}
                                onChange={(_event, location) => {
                                    setSelectedReportingManager(location)
                                }}
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <Autocomplete
                                size="small"
                                disablePortal
                                id="combo-box-demo"
                                options={addDepartmentarr}
                                renderInput={(params) => (
                                    <TextField
                                        error={addDepartmentError}
                                        {...params}
                                        label="Department"
                                        helperText={
                                            addDepartmentError &&
                                            'Field Required'
                                        }
                                    />
                                )}
                                getOptionLabel={(option) => option.name}
                                // isOptionEqualToValue={(option, value) =>
                                //     option._id === value._id
                                // }
                                value={department1}
                                onChange={(_event, department) => {
                                    setDepartmentId(department?._id)
                                    setDepartment1(department)
                                }}
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <Box>
                                {departmentId ? (
                                    <Autocomplete
                                        ListboxProps={{
                                            style: { maxHeight: '13rem' },
                                            position: 'bottom-start',
                                        }}
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={wings}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) =>
                                            `${option.name}`
                                        }
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    error={wing1Error}
                                                    {...params}
                                                    label="Departments Wing"
                                                    helperText={
                                                        wing1Error &&
                                                        'Field Required'
                                                    }
                                                />
                                            )
                                        }}
                                        value={wing1}
                                        onChange={(_event, vender) => {
                                            setWing1(vender)
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
                                        isOptionEqualToValue={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) =>
                                            `${option.name}`
                                        }
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    error={wing1Error}
                                                    {...params}
                                                    label="Departments Wing"
                                                    helperText={
                                                        wing1Error &&
                                                        'Field Required'
                                                    }
                                                />
                                            )
                                        }}
                                        value={wing1}
                                        onChange={(_event, vender) => {
                                            setWing1(vender)
                                        }}
                                    />
                                )}
                            </Box>
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={dateOfJoinnig1Error}
                                id="date"
                                label="Date Of Joinnig"
                                placeholder="Date Of Joinnig"
                                type="date"
                                size="small"
                                helperText={
                                    dateOfJoinnig1Error === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={dateOfJoinnig1}
                                onChange={dateOfjoinnignHandler}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={designation1Error}
                                id="category"
                                label="Designation"
                                placeholder="Designation"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    designation1Error === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={designation1}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setDesignation1,
                                        setDesignation1Error
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <FormControl error={genderError} fullWidth>
                                <InputLabel
                                    id="demo-simple-select-label"
                                    size="small"
                                >
                                    Gender
                                </InputLabel>
                                <Select
                                    size="small"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    label="Age"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setGender,
                                            setGenderError
                                        )
                                    }
                                >
                                    <MenuItem value={'male'}>Male</MenuItem>
                                    <MenuItem value={'female'}>Female</MenuItem>
                                </Select>
                                <FormHelperText>
                                    {genderError && 'Field Required'}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={dateOfBirthError}
                                id="category"
                                label="Date Of Birth"
                                placeholder="Enter Date Of Birth"
                                size="small"
                                autoComplete="off"
                                type={`date`}
                                // helperText={
                                //     dateOfBirthError === true
                                //         ? 'Field Required'
                                //         : ''
                                // }
                                value={dateOfBirth}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setDateOfBirth,
                                        setDateOfBirthError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={6}>
                            <TextField
                                error={jobTitleError}
                                id="jobtitle"
                                label="Job Title"
                                placeholder="Enter Job Title"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    jobTitleError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={jobTitle}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setJobTitle,
                                        setJobTitleError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        {/* old colde start */}

                        {/* 
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>


 */}

                        {/* old code end */}

                        <Grid item lg={3} md={3} sm={3} xs={3}>
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
                        {/* <Grid item lg={3} md={3} sm={3} xs={3}>
                                <span>Purchase</span>
                                <Switch
                                    {...label}
                                    onChange={handleEditChange}
                                    checked={checked}
                                    defaultChecked
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Grid> */}

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                error={descriptionError}
                                helperText={
                                    descriptionError && 'Field Required'
                                }
                                label="Remarks"
                                placeholder="Remarks"
                                style={{ textAlign: 'left' }}
                                hinttext="Message Field"
                                floatinglabeltext="MultiLine and FloatingLabel"
                                multiline
                                fullWidth
                                rows={3}
                                value={description}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setDescription,
                                        setDescriptionError
                                    )
                                }
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
                    open={editSnackBar}
                    autoHideDuration={5000}
                    onClose={handleEditClosed}
                    message="Employee with same Id already exists"
                    action={editAction}
                />
            </Dialog>

            {/* this is the dialogs of the employee search button */}

            <Dialog
                open={employeeDialogs}
                onClose={handleEmployeeClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{'Search Filters'}</DialogTitle>

                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Autocomplete
                                ListboxProps={{
                                    style: { maxHeight: '13rem' },
                                    position: 'bottom-start',
                                }}
                                size="small"
                                disablePortal
                                id="combo-box-demo"
                                options={custodianIds}
                                filterSelectedOptions={true}
                                isOptionEqualToValue={(option, value) =>
                                    option._id === value._id
                                }
                                getOptionLabel={(option) =>
                                    `${option.name} / ${
                                        option.emailAddress
                                    } / ${
                                        option.cnic === undefined ||
                                        option.cnic === ''
                                            ? 'N/A'
                                            : option.cnic
                                    } / ${option.employeeId}`
                                }
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            {...params}
                                            label="Name/Email/CNIC/Employee Code"
                                        />
                                    )
                                }}
                                value={sdynamic}
                                onChange={(_event, vender) => {
                                    setDynamic(vender)
                                }}
                            />
                            {/* <Autocomplete
                                size="small"
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Name/Email/CNIC/Employee Code"
                                    />
                                )}
                            /> */}
                            {/* <TextField
                                    id="category"
                                    label="Name/Email/CNIC/Employ Code"
                                    placeholder="Name/Email/CNIC/Employ Code"
                                    size="small"
                                    autoComplete="off"
                                    value={sdynamic}
                                    onChange={(e) =>
                                        setDynamic(e.target.value)
                                    }
                                    variant="outlined"
                                    fullWidth

                                /> */}
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Autocomplete
                                size="small"
                                disablePortal
                                id="combo-box-demo"
                                options={designations}
                                getOptionLabel={(option) => option._id}
                                isOptionEqualToValue={(option, value) =>
                                    option._id === value._id
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Designation"
                                    />
                                )}
                                value={sdesignation}
                                onChange={(_event, designation) => {
                                    console.log(designation)
                                    setSdesignation(designation)
                                }}
                            />

                            {/* <TextField
                                    id="category"
                                    label="Designation"
                                    placeholder="Designation"
                                    size="small"
                                    autoComplete="off"
                                    value={sdesignation}
                                    onChange={(e) =>
                                        setSdesignation(e.target.value)
                                    }
                                    variant="outlined"
                                    fullWidth

                                /> */}
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
                                    options={placeOfPosting1}
                                    filterSelectedOptions={true}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) =>
                                        `${option.name}`
                                    }
                                    renderOption={(props, option) => {
                                        return (
                                            <li {...props} key={option._id}>
                                                {option.name}
                                            </li>
                                        )
                                    }}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Location"
                                            />
                                        )
                                    }}
                                    value={sOffice}
                                    onChange={(_event, office) => {
                                        setSOffice(office)
                                    }}
                                />
                            </Box>
                        </Grid>
                        {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    id="category"
                                    label="Reporting Manager"
                                    placeholder="Reporting Manager"
                                    size="small"
                                    autoComplete="off"
                                    value={sreportingManager}
                                    onChange={(e) =>
                                        setSreportingManager(e.target.value)
                                    }
                                    variant="outlined"
                                    fullWidth

                                />
                            </Grid> */}

                        {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    id="category"
                                    label="Department"
                                    placeholder="Department"
                                    size="small"
                                    autoComplete="off"
                                    value={sdepartment}
                                    onChange={(e) =>
                                        setSdepartment(e.target.value)
                                    }
                                    variant="outlined"
                                    fullWidth

                                />
                            </Grid> */}
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
                                    value={sdepartment}
                                    onChange={(_event, department) => {
                                        setSdepartment(department)
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
                                    options={pgs}
                                    filterSelectedOptions={true}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) => option._id}
                                    renderInput={(params) => {
                                        return (
                                            <TextField {...params} label="Pg" />
                                        )
                                    }}
                                    value={sPg}
                                    onChange={(_event, pg) => {
                                        setSPg(pg)
                                    }}
                                />
                            </Box>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography gutterBottom>Start Date</Typography>
                            <TextField
                                value={sdate}
                                id="date"
                                type="date"
                                onChange={(e) => setSdate(e.target.value)}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography gutterBottom>End Date</Typography>
                            <TextField
                                value={sdate1}
                                id="date"
                                type="date"
                                onChange={(e) => setSdate1(e.target.value)}
                                size="small"
                                fullWidth
                            />
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
        </>
    )
}

export default UsersList

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { Card, CardContent, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";



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
  display: "flex",

}))


function AddProduct() {


  const Input = styled('input')({
    display: 'none',
  });




  const [age, setAge] = React.useState('');








  const config = {};
  const history = useNavigate();
  const Dat = new Date()
  const start = new Date((Dat.setDate(Dat.getDate() - 1))).toISOString().split('T')[0]
  const [startDate, setStartDate] = React.useState(start);
  const [open, setOpen] = React.useState(false);

  // Form validation errors State Setting 
  const [nameError, setNameError] = React.useState(false);
  const [stockError, setstockError] = React.useState(false);
  const [categoryError, setcategoryError] = React.useState(false);
  const [subCategoryError, setsubCategoryError] = React.useState(false);
  const [costError, setcostError] = React.useState(false);
  const [saleError, setsaleError] = React.useState(false);
  const [colourError, setColourError] = React.useState(false);
  const [brandError, setBrandError] = React.useState(false);
  const [descriptionError, setdescriptionError] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [modelError, setModelError] = React.useState(false);

  // Setting States 
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [purchaser, setPurchaser] = React.useState('');
  const [vendor, setVendor] = React.useState('');
  const [office, setOffice] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [pcost, setPcost] = React.useState('');
  const [sprice, setSprice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('');
  const [color, setColor] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');
  const [modelImage, setModelImage] = React.useState('');
  const [categoryData, setCategoryData] = React.useState({});
  const [subcategoryData, setSubcategoryData] = React.useState({});

  //Validation Check After Button Click
  const handleClickOpen = () => {
    // Check if any field of Form is Empty
    if (name === '' || category === '' || quantity === '' || pcost === '' || sprice === '' || subCategory === '' || color === '' || brand === '' || description === '' || image === '' || modelImage === '') {
      if (name == '') {
        setNameError(true)
      }
      if (quantity === '') {
        setstockError(true)
      }
      if (pcost === '') {
        setcostError(true)
      }
      if (sprice === '') {
        setsaleError(true)
      }
      if (color === '') {
        setColourError(true)
      }
      if (brand === '') {
        setBrandError(true)
      }
      if (description === '') {
        setdescriptionError(true)
      }
      if (category === '') {
        setcategoryError(true)
      }
      if (subCategory === '') {
        setsubCategoryError(true)
      }
      if (image === '') {
        alert("Please Upload  an image")
      }
      if (modelImage === '') {
        alert("Please Upload 3D Model")
      }


    }
    else {
      setOpen(true);
    }
  };


  const handleClose = () => {
    setOpen(false);
  };

  // OnChange function form field state set 


  // On file select (from the pop up)
  const onChangeImage = event => {
    setImage(event.target.files);
  };


  const handleClickOpen2 = () => {
    setOpen(true);
  };


  const handleModelImage = event => {
    setModelImage(event.target.files);
  };

  const handleType = (event) => {
    setType(event.target.value);
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };




  const handleChange = (e, func, errorFunc) => {
    func(e.target.value);
  
    errorFunc(false)
  }

  function postDataToServer() {
 
    let data = new FormData();
    for (var x = 0; x < image.length; x++) {
      data.append('file', image[x])
    }

    for (var x = 0; x < modelImage.length; x++) {
      data.append('modelfile', modelImage[x])
    }
    // data.append('modelfile',modelImage);
    // data.append('modelfile', modelImage);
    data.append('Name', name);
    data.append('Quantity', quantity);
    data.append('PurchaseCost', pcost);
    data.append('SalePrice', sprice);
    data.append('brand', brand);
    data.append('Colour', color);
    data.append('Category', category);
    data.append('SubCategory', subCategory);
    data.append('Description', description);
    // data.append('file', setModelImage);


    setName('')
    setQuantity('')
    setPcost('')
    setSprice('')
    setBrand('')
    setDescription('')
    setColor('')
    setCategory('')
    setSubCategory('')
    setImage('')
    setModelImage('')
    handleClose();

 
    axios.post("" + '/new-product/add', data,
      {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
    )
      .then(res => {
        if (res.data.code === 0) {


          setSnackOpen(true)

        }



      })
      .catch(err => {
        console.log(err)
      });
  }







  ////////////////// FETCHING CATEGORY DATA //////////////////////////CardBody

  const viewCategoryData = async () => {



    //   await axios.get("" +'/admin/category/view?product=rafay')
    //   .then(res =>{
    //     console.log('viewCategoryData - res: ', res);
    //       console.log(res);
    //       if (res.status === 200){
    //         setCategoryData(res.data.data);
    //       }
    //       else{
    //         setCategoryData([]);
    //       }
    //   }).catch(err =>{
    //       console.log(err)
    //   });
  }
  //------------------------------------------------------------------







  ////////////////// FETCHING SUBCATEGORY DATA //////////////////////////

  const viewSubcategoryData = async () => {

    // if(category===''){

    //   const res = await axios.get("" + "/admin/Subcategory/view?product=rafay")
    //   .then(res =>{
    //       console.log(res);
    //       return res.data.data;
    //   }).catch(err =>{
    //       console.log(err)
    //   });

    //   setSubcategoryData(res);


    // }
    // else{

    //   const res = await axios.get("" + `/admin/Subcategory/view?categoryName=${category}`)
    //   .then(res =>{
    //       console.log(res);
    //       return res.data.data;
    //   }).catch(err =>{
    //       console.log(err)
    //   });

    //   setSubcategoryData(res);


    // }

  }
  //------------------------------------------------------------------




  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleClick = () => {
    setSnackOpen(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };



  const back = () => {

    history.push("/admin/MyProducts")

  };





  //////////////// INVOKING CATEGORY VIEW FUNCATION //////////////////

  useEffect(() => {
    viewCategoryData();
    viewSubcategoryData();
  }, [category])

  //-------------------------------------------------------------------




  return (
    <>

      <div>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleClose2}
          message="Product Added Successfully"
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose2}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>



      <Card elevation={3} sx={{ pt: '20px', mb: 10, margin: "50px" }}>

        <CardHeader>
          <Title>ADD PRODUCT</Title>
        </CardHeader>
        <hr></hr>
        <br></br>



        <CardContent>


          <Grid container spacing={3}>

            <Grid item lg={4} md={4} sm={4} xs={6}  >

              <TextField
                error={nameError}
                id="name"
                label="Product Name"
                placeholder="Product Name"
                autoComplete="off"
                helperText={nameError === true ? "Field Required" : ''}
                value={name}
                size="small"
                onChange={(e) => handleChange(e, setName, setNameError)}
                variant="outlined"
                fullWidth

              />



            </Grid>



            <Grid item lg={4} md={4} sm={4} xs={6}  >

              <Box sx={{ minWidth: 120 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Product Type"
                    onChange={handleType}

                  >

                    <MenuItem value={10}>Saleable</MenuItem>
                    <MenuItem value={20}>Storable</MenuItem>
                    <MenuItem value={30}>Services</MenuItem>

                  </Select>
                </FormControl>
              </Box>
            </Grid>


            <Grid item lg={4} md={4} sm={4} xs={6}  >


              <Box sx={{ minWidth: 120 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Product Category"
                    onChange={handleCategory}

                  >
                    <MenuItem value={10}>Sofa</MenuItem>
                    <MenuItem value={20}>Table</MenuItem>
                    <MenuItem value={30}>Laptop</MenuItem>
                    <MenuItem value={30}>Tablet</MenuItem>
                  </Select>
                </FormControl>
              </Box>

            </Grid>




          </Grid>
          <br></br>
          <Grid container spacing={3}>

            <Grid item lg={4} md={4} sm={4} xs={6}  >
              <TextField
                error={nameError}
                id="name"
                label="Product Quantity"
                placeholder="Product Quantity"
                size="small"
                type="number"
                autoComplete="off"
                helperText={nameError === true ? "Field Required" : ''}
                value={quantity}
                onChange={(e) => handleChange(e, setQuantity, setNameError)}
                variant="outlined"
                fullWidth

              />

            </Grid>



            <Grid item lg={4} md={4} sm={4} xs={6}  >
              <TextField
                error={nameError}
                id="name"
                label="Product Price"
                placeholder="Product Price"
                size="small"
                type="number"
                autoComplete="off"
                helperText={nameError === true ? "Field Required" : ''}
                value={sprice}
                onChange={(e) => handleChange(e, setSprice, setNameError)}
                variant="outlined"
                fullWidth

              />


            </Grid>


            <Grid item lg={4} md={4} sm={4} xs={6}  >
              <TextField
                error={nameError}
                id="name"
                label="Office Location"
                placeholder="Office Location"
                autoComplete="off"
                helperText={nameError === true ? "Field Required" : ''}
                value={office}
                size="small"
                onChange={(e) => handleChange(e, setOffice, setNameError)}
                variant="outlined"
                fullWidth

              />

            </Grid>




          </Grid>
          <br></br>
          <Grid container spacing={3} rowSpacing={3}  >

            <Grid item lg={4} md={4} sm={4} xs={6}  >
              <TextField
                error={nameError}
                id="name"
                label="Purchaser's Name"
                placeholder="Product Purchaser"
                autoComplete="off"
                helperText={nameError === true ? "Field Required" : ''}
                value={purchaser}
                size="small"
                onChange={(e) => handleChange(e, setPurchaser, setNameError)}
                variant="outlined"
                fullWidth

              />

            </Grid>



            <Grid item lg={4} md={4} sm={4} xs={6}  >
              <TextField
                error={nameError}
                id="name"
                label="Vendor's Name"
                placeholder="Product Vendor"
                autoComplete="off"
                helperText={nameError === true ? "Field Required" : ''}
                value={vendor}
                size="small"
                onChange={(e) => handleChange(e, setVendor, setNameError)}
                variant="outlined"
                fullWidth

              />

            </Grid>


            <Grid item lg={4} md={4} sm={4} xs={6}  >
              <TextField
                error={nameError}
                label="Purchase Date"
                type="date"
                value={startDate}
                size="small"
                onChange={(e) => handleChange(e, setStartDate, setNameError)}
                variant="outlined"
                fullWidth

              />

            </Grid>




          </Grid>
          <br></br>
          <Grid container spacing={3} rowSpacing={3}  >

            <Grid item lg={4} md={4} sm={4} xs={6}  >

              <Box sx={{ minWidth: 120 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Comment's</InputLabel>
                  <Select
                    label="comment's"
                    id="demo-simple-select"
                    value={comment}
                    onChange={handleComment}

                  >
                    <MenuItem value={10}>In Use</MenuItem>
                    <MenuItem value={20}>Replacement Required</MenuItem>
                    <MenuItem value={30}>Scrap</MenuItem>
                  </Select>
                </FormControl>
              </Box>

            </Grid>



            <Grid item lg={8} md={8} sm={8} xs={8}  >
              <TextField
                error={nameError}
                id="name"
                label="Description"
                placeholder="Description"
                autoComplete="off"
                helperText={nameError === true ? "Field Required" : ''}
                value={description}
                size="small"
                onChange={(e) => handleChange(e, setDescription, setNameError)}
                variant="outlined"
                fullWidth

              />

            </Grid>



          </Grid>

          <br></br>
          <Grid container spacing={3} rowSpacing={3}  >

            <Grid item lg={4} md={4} sm={4} xs={6}  >
              <label htmlFor="contained-button-file">
                <Input accept="*" id="contained-button-file" multiple type="file" />
                <Button variant="contained" component="span" startIcon={<AttachFileIcon />}>
                  Attachment
                </Button>
              </label>


            </Grid>



            <Grid item lg={8} md={8} sm={8} xs={8} style={{ justifyContent: "center" }} >
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <Button variant="contained" component="span" startIcon={<AddAPhotoIcon />}>
                  Picture
                </Button>
              </label>
            </Grid>








          </Grid>


          <br></br>
          <br></br>
          <Grid container spacing={3}>

            <Grid item lg={4} md={4} sm={4} xs={4}  >




            </Grid>

            <Grid item lg={4} md={4} sm={4} xs={4}  >

              <Button variant='contained' fullWidth onClick={handleClickOpen2} s>
                ADD PRODUCT
              </Button>

            </Grid>



          </Grid>






        </CardContent>





      </Card>





      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to add this New Product
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>









    </>
  )

}


export default AddProduct
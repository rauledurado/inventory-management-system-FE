import React, { useRef, useState }from 'react'
import { Card, Grid ,CardContent, Button, IconButton, Tooltip} from '@mui/material';
import SearchProductsTable from 'app/components/products/SearchProductTable'
import { styled } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Webcam from "react-webcam";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import SearchIcon from '@mui/icons-material/Search';




const label = { inputProps: { 'aria-label': 'Switch demo' } };

const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const Title = styled('span')(() => ({
    fontSize: '27px',
    fontWeight: '600',
    textTransform: 'capitalize',
    display:"flex",
 
}))








const SearchProduct = () => {



    const [open, setOpen] = React.useState(false);
    const [isShowVideo, setIsShowVideo] = useState(false);
    const videoElement = useRef(null);
    
    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: "user"
    }

    const startCam = () => {
        setOpen(true)
        setIsShowVideo(true);
    }

    const stopCam = () => {
        let stream = videoElement.current.stream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        setIsShowVideo(false);
        setOpen(false)
    }


    const handleClose = () => {
        setOpen(false);
      };





  return (
    <>
    
    <Card elevation={3} sx={{ pt: '20px', mb: 10 ,margin:"20px"}}>
        <Grid container>
            <Grid  item lg={8} md={8} sm={8} xs={8}>
            <CardHeader>
            <Title>Search Products</Title>
             </CardHeader>
            
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>

            <Tooltip title="Search Filter's" >
                <Button variant='contained'  color='primary'  style={{top:"12px",left:"12vw"}}>

                    <FilterListIcon/>
                  
                </Button>
                </Tooltip>
               
            

            
                
            </Grid>
             <Grid item lg={2} md={2} sm={2} xs={2}>

                <Tooltip title="QR Based Search" >
                <Button variant='contained' onClick={startCam} color='primary'   style={{top:"12px",left:"6vw"}}>

                    <QrCodeScannerIcon/>
                  
                </Button>
                </Tooltip>
                </Grid>


        </Grid>
   
    <SearchProductsTable></SearchProductsTable>
    </Card>


    <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
        <DialogTitle style={{textAlign:"center"}} id="alert-dialog-title">
          {"Scan Your Product's QR code "}
        </DialogTitle>
        {isShowVideo &&
            <Webcam audio={false} ref={videoElement} videoConstraints={videoConstraints} />
                }
                

        <DialogActions style={{justifyContent:"center", margin:"12px"}}>
        
          <Button variant='contained' onClick={stopCam}startIcon={<SearchIcon/>} >Scan</Button >
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <Button  variant='contained' onClick={stopCam} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>




    </>
  )
}

export default SearchProduct
import React, { useEffect, useState } from 'react';
import { Container, Stack, Typography,Grid } from '@mui/material';
import { Fab  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import QrCode from 'qrcode';
function QrCodeMain() {
    const start = 'ya qr code ka under ka Data'
    const [src, setSrc] = useState('');

    useEffect(() => {
        for(const i of start){
            // console.log(start,'start');
            // console.log(i,'start[i].qrCodename');
        QrCode.toDataURL(start).then((data) => {
           
            setSrc(data)
        })
    }
    }, [])

    return (
        <>

            <Tooltip title="Search Product">
                <Fab color="primary" aria-label="Add" size="medium" style={{ zIndex: 999, right: "4vw", top: "13vh", position: "fixed" }}  >
                    <SearchIcon />
                </Fab>
            </Tooltip>
            <Container>
                <br></br>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Qr Code
                </Typography>
                <Grid container spacing={3} >
                <img src={src}></img>
                    {/* {start.map((product) => (
                        <img src={product.qrCodename} key={product.key} >
                        </img>
                    ))} */}
                </Grid>
                <br></br>
                <br></br>
                <br></br>
            </Container>
        </>
        
    )
}
export default QrCodeMain;
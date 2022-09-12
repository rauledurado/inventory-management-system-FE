import React, { useState, useEffect } from 'react';
import { Container, Stack, Typography, Grid } from '@mui/material';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';


function MapMain() {
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords, 'position');
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude)
        })
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
                    Map
                </Typography>
                <Grid container spacing={3} >

                    <h1>
                    Longitude :
                    </h1>
                    <h2 style={{paddingTop:'9px',paddingLeft:'9px'}}>
                        {longitude}
                    </h2>

                </Grid>
                <br></br>
                <br></br>
                <br></br>
                <Grid container spacing={3} >

                    <h1 >
                        Latitude :
                    </h1>
                    <h2 style={{paddingTop:'9px',paddingLeft:'9px'}}>
                        {latitude}
                    </h2>

                </Grid>
            </Container>
        </>
    )
}
export default React.memo(MapMain);

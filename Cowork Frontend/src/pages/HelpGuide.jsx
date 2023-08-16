import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Typography, Card, CardContent, CardMedia, Grid, Container, CssBaseline, Box, TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core'
import useStyles from './helpguidestyles'
import img1 from '../assets/Helpguide1.jpg'
import img2 from '../assets/helpguide2.jpg'
import img3 from '../assets/helpguide3.jpg'

function HelpGuide() {

    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <Header />

            <Box sx={{ bgcolor: '#F4EDE5' }}>
                <div className={classes.container}>
                    <Container maxWidth="md" style={{ marginTop: '200px' }}>
                        <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
                            Ready to move office? Download our handy guides to help with the many common issues faced by companies during their move. Alternatively, call our helpful team for advice.
                        </Typography>

                        <Typography variant="h5" align="center" color="textPrimary" paragraph>
                            Tick the guides you want to receive
                        </Typography>

                    </Container>

                </div>
                <Container className={classes.cardGrid} >
                    <Grid container spacing={4}>

                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={img2}
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography >
                                        7 factors to consider before starting your office research
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={img3}
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography >
                                        Different Office Types: Compare services, leased and Coworking
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={img1}
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography >
                                        Islamabad and Rawalpindi offices
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
                <Typography variant="h6" gutterBottom align="center">
                    Fill in your details to receive free guides
                 </Typography>
            </Box>

            <Box className={classes.informationCard}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="Name"
                            name="Name"
                            label="Name"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="Email"
                            name="Email"
                            label="Email"
                            fullWidth
                            autoComplete="Email"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="Phone No"
                            name="Phone No"
                            label="Phone No"
                            fullWidth
                            autoComplete="Phone No"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="#F1B47B" name="saveAddress" value="yes" />}
                            label="Are you looking for office space?"
                        />
                    </Grid>
                    <Button variant="contained" className={classes.submitbutton}>Submit</Button>
                </Grid>
            </Box>

            <Footer />
        </>
    )
}

export default HelpGuide;
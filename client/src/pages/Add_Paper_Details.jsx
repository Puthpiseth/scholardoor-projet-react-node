import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { makeStyles } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({

    paperDetailTitle: {
        display: "flex",
        justifyContent: "center",
        marginTop: "12%",
        marginBottom: "2%",
        fontSize: "26px",
        color: "#474747",
        [theme.breakpoints.down("md")]: {
            marginTop: "18%",
        },
        [theme.breakpoints.down("sm")]: {
            marginTop: "28%",
        },
        [theme.breakpoints.down("xs")]: {
            marginTop: "35%",
            marginBottom: "5%",
            fontSize: "22px",
         },
    },
    AddPaperContainer: {
        background: "#fdfcfc",
        width: "35%",
        margin: "auto",
        padding: "1.7% 0%",
        borderRadius: "5px",
        boxShadow: "0px 1px 2px #999999",
        [theme.breakpoints.down("md")]: {
            width: "45%",
            padding: "2.2% 0%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "60%",
            padding: "2.5% 0%",
        },
        [theme.breakpoints.down("xs")]: {
            width: "95%",
            padding: "4% 0%",
        },
    },
    addFormInputDetails: {
        display: "flex",
        flexDirection: "columns",
        justifyContent: "center",
        width: "90%",
        margin: "auto",
        marginBottom: theme.spacing(2),      
    },
    labelPublicationDate: {
        color: "#474747",
        marginLeft: "5.5%",
        fontSize: "14px",
    },
    publicationAndIssue: {
        display: "flex",
        justifyContent: "center", 
        paddingTop: "2%",
        paddingBottom: "2%"       
    },
    publicationDate: {
        marginRight: theme.spacing(1),
        width: "44%"
    },
    issue: {
        width: "44%"
    },
    backButton: {
        display: "flex",
        justifyContent: "center",
        marginTop: "1%",
    }
}));

function AddPaperDetails() {
    const classes = useStyles();
    return (
        <>
            <Navbar/>
                <main>
                    <h1 className={classes.paperDetailTitle}>Fill Paper Details</h1>
                    <form className={classes.AddPaperContainer} >
                        <div>
                            <TextField
                                variant="outlined"
                                type="text"
                                // change font size of input text
                                inputProps={{style: {fontSize: "14px"}}}
                                // change font size of input label
                                InputLabelProps= {{style: {fontSize: "14px"}}}
                                name="title"
                                className={classes.addFormInputDetails}
                                label="Title"
                            >
                            </TextField>
                    
                            <TextField
                                variant="outlined"
                                type="text"
                                // change font size of input text
                                inputProps={{style: {fontSize: "14px"}}}
                                // change font size of input label
                                InputLabelProps= {{style: {fontSize: "14px"}}}
                                name="authors"
                                className={classes.addFormInputDetails}
                                label="Authors"
                            >
                            </TextField>

                            <TextareaAutosize
                                maxRows={4}
                                aria-label="maximum height"
                                name="abstract"
                                type="text"
                                className={classes.addFormInputDetails}
                                placeholder="Add your abstract"
                                style={{paddingBottom: "5%", paddingLeft: "2%", fontSize: "14px"}}
                            />

                            <TextField
                                variant="outlined"
                                type="text"
                                // change font size of input text
                                inputProps={{style: {fontSize: "14px"}}}
                                // change font size of input label
                                InputLabelProps= {{style: {fontSize: "14px"}}}
                                name="journal"
                                className={classes.addFormInputDetails}
                                label="Journal"
                            >
                            </TextField>
                            <TextField
                                variant="outlined"
                                type="text"
                                // change font size of input text
                                inputProps={{style: {fontSize: "14px"}}}
                                // change font size of input label
                                InputLabelProps= {{style: {fontSize: "14px"}}}
                                name="journal"
                                className={classes.addFormInputDetails}
                                label="Publisher"
                            >
                            </TextField>                     
                        </div>
                        <label className={classes.labelPublicationDate}>Publication Date</label>
                        <div className={classes.publicationAndIssue}>
                            <TextField
                                variant="outlined"
                                type="date"
                                // change font size of input text
                                inputProps={{style: {fontSize: "14px"}}}
                                // change font size of input label
                                InputLabelProps= {{style: {fontSize: "14px"}}}
                                name="publicationDate"
                                className={classes.publicationDate}
                            >
                            </TextField>
                            
                            <TextField
                                variant="outlined"
                                type="text"
                               // change font size of input text
                                inputProps={{style: {fontSize: "14px"}}}
                               // change font size of input label
                                InputLabelProps= {{style: {fontSize: "14px"}}}
                                name="issue"
                                className={classes.issue}
                                label="Issue"
                            >
                            </TextField>
                        </div>
                            
                        <Button 
                            variant="contained" 
                            type="submit"
                            style={{marginTop: "2%", marginLeft: "5%", background: "#0F6A7D", color: "#fff", width: "90%", height: "5vh"}}
                        >Submit
                        </Button>     
                    </form>

                    <div className={classes.backButton}>
                        <Button variant="contained">Back</Button>
                        
                    </div>
                </main>
            <Footer/>
        </>
    )
}

export default AddPaperDetails;

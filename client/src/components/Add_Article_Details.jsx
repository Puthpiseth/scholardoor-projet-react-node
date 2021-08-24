import React from 'react';
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '../styles/components/success.scss';

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
            marginTop: "30%",
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
    submitBtn: {
        border: "none",
        width: "90%", 
        height: "5vh",
        [theme.breakpoints.down("xs")]: {
            height: "7vh",
        },
    },
    backBtn: {
        display: "flex",
        justifyContent: "center",
        marginTop: "1%",
        marginBottom: "15%",
    }
}));

function success() {
    toast.success("You have successfully added your paper detail", {
        className:"success-toast",
        draggable: true,
        position: toast.POSITION.BOTTOM_LEFT,
    });
}

function AddArticleDetails(props) {
    const classes = useStyles();
    return (
        <>
            <Navbar/>
                <h1 className={classes.paperDetailTitle}>Fill Paper Details</h1>
                <form className={classes.AddPaperContainer} onSubmit={props.handleSubmit}>
                    <div>
                        <TextField
                            onChange={props.handleChange}
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
                            onChange={props.handleChange}
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
                            onChange={props.handleChange}
                            maxRows={4}
                            aria-label="maximum height"
                            name="abstract"
                            type="text"
                            className={classes.addFormInputDetails}
                            placeholder="Add your abstract"
                            style={{paddingBottom: "5%", paddingLeft: "2%", fontSize: "14px"}}
                        />
                        <TextField
                            onChange={props.handleChange}
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
                            onChange={props.handleChange}
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
                    <div className={classes.publicationAndIssue}>
                        <TextField
                            onChange={props.handleChange}
                            variant="outlined"
                            type="text"
                            // change font size of input text
                            inputProps={{style: {fontSize: "14px"}}}
                            // change font size of input label
                            InputLabelProps= {{style: {fontSize: "14px"}}}
                            name="publicationDate"
                            className={classes.publicationDate}
                            label="Date of publication"
                        >
                        </TextField>
                        
                        <TextField
                            onChange={props.handleChange}
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
                    <ToastContainer
                        draggable={false}
                        transition={Zoom}
                        autoClose={3000}
                    />
                    <Button
                        onClick={success}
                        className={classes.submitBtn}
                        variant="contained" 
                        type="submit"
                        style={{marginTop: "2%", marginLeft: "5%", background: "#0F6A7D", color: "#fff"}}
                    >
                        Submit
                    </Button>     
                </form>
                <div className={classes.backBtn}>
                    <Button
                        onClick = {props.handlePrevStep} 
                        variant="contained"
                    >
                        Back
                    </Button>
                    
                </div>
        </>
    )
}

export default AddArticleDetails;

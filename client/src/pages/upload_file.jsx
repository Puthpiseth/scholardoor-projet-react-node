import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { makeStyles } from '@material-ui/core';
import {DropzoneArea} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button'
import UploadFile from '../services/article';

const useStyles = makeStyles((theme) => ({
    
    uploadAndTitleZone: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
    },
    uploadTitle: {
        color: "#474747",
        marginBottom: "2%",
        marginTop: "10%",
        [theme.breakpoints.down("md")]: {
            marginTop: "15%",
        },
        [theme.breakpoints.down("sm")]: {
            marginTop: "20%",
        },
        [theme.breakpoints.down("xs")]: {
            marginTop: "40%",
        },
    },
    uploadText: {
        fontSize: "26px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "22px",
        },
    },
    dropZone: {
        width: "40%",
        [theme.breakpoints.down("md")]: {
            width: "50%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "65%",
        },
        [theme.breakpoints.down("xs")]: {
            width: "90%",
        },
    },
    

}));

function UploadUserFile(props) {
    const classes = useStyles();

    const fileMaxSize = 10000000// max size 10MB

    return (
        <>
            <Navbar/>
                <main>
                    <div className={classes.uploadAndTitleZone}>
                        <div className={classes.uploadTitle}>
                            <h1 className={classes.uploadText}>Upload your papers</h1>
                        </div>
                        <DropzoneArea 
                            dropzoneClass={classes.dropZone}
                            dropzoneText={'Drag and drop or click upload icon to upload your papers'}
                            name="filePath"
                            acceptedFiles={["application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"]}
                            filesLimit={1}
                            showFileNames
                            onDrop={props.handleChange}
                            onChange={props.handleChange}
                            maxFileSize={fileMaxSize}// Files are accepted less than 20MB
                        >
                        </DropzoneArea>

                        <Button 
                            variant="contained" 
                            style={{background: "#2794f2", color: "#fff", marginTop: "1%"}}
                            onClick ={props.handleNextStep}
                        > 
                            Next 
                        </Button>
                    </div>
                </main>
            <Footer/>
        </>
    )
}

export default UploadUserFile;

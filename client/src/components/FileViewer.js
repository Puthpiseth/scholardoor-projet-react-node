import { useState, useRef } from "react";
import { Modal, makeStyles,CircularProgress } from "@material-ui/core";
import {Document, Page} from 'react-pdf/dist/umd/entry.webpack'
import { Loading } from "./Loading";

const useStyle = makeStyles({
    document : {
        margin : '0 auto',
        width : '50%',
        height : '100vh',
        overflow : 'scroll',
        dispaly : 'flex',
        flexDirection : 'column',

    },
    page: {
    }
})
export const FileViewer = (props) => {
    const [pagesNumber, setPagesNumber] = useState(1);
    const document = useRef(null);
    const classes = useStyle();

   const handleLoadFileSuccess = (e) =>{
       console.log(e)
       setPagesNumber(e.numPages);
       
   }

    return(
        <Modal
            open = {props.open}
            onClose = {props.onClose}
           >
            <Document
                inputRef = {document}
                className = {classes.document}
                loading = {() => <Loading />}
                file = {`data:application/pdf;base64,${props.fileSrc}`} 
                onLoadSuccess = {handleLoadFileSuccess}
            >
            
            {Array.from(Array(pagesNumber)).map((_, i) => {
                return(
                    <Page 
                        size = 'A4'  
                        pageNumber= {i+1}  
                    >
                    </Page>
                )
            })}    
            </Document> 
        </Modal>
    )
}
import React, {useState, useEffect} from 'react'
import UploadFile from './upload_file';
import {uploadNewArticle} from '../services/article'
import AddPaperDetails from './Add_Paper_Details';

function UploadArticle() {

    const [step, setStep] = useState(0)
    const [filePath, setFilePath] = useState(null);
    const [file, setFile] = useState({
        title: '',
        authors: '',
        abstract: '',
        publicationDate: '',
        journal: '',
        publisher: '',
        issue: '',
    });
    
    const switchStep = (stp) => {

        (step>=0 && step<=1) && setStep(step => step + stp)
    }

    const handleChange = (e) => {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        setFile({...file, [name]: value})
    }

    const handleChangeFilePath = (files) => {
        setFilePath(files[0])
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(filePath, file);
        if(filePath){
            const datas = {...file}
            for(let data in datas){
                if(!datas[data]) {
                    delete datas[data]
                }
            }
            let formData = new FormData()
            formData.append('filePath', filePath)
            formData.append('details', JSON.stringify(datas))
            const response = await uploadNewArticle(formData)
            console.log(response)
        }

    }

    switch(step) {
        case 0: 
            return <UploadFile 
                handleChange={handleChangeFilePath} 
                handleNextStep = {()=> switchStep(1)}/>
        default: 
            return <AddPaperDetails 
                handleSubmit={handleSubmit}
                handleChange={handleChange} 
                handlePrevStep ={()=> switchStep(-1)}/>
    }

}

export default UploadArticle;

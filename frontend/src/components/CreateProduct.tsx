import React, { ChangeEvent, ReactHTMLElement, useState } from 'react'
import { ProductInterface } from '../models/IProduct'
import { ImageInterface } from '../models/IImage'


function CreateProduct() {
    // Api
    const apiUrl = "http://localhost:4200";

    const [file, setFile] = useState<File>() // also tried <string | Blob>

    const handleImageChange = (event: React.FormEvent) => {
        const files = (event.target as HTMLInputElement).files
        console.log(files);

        if (files && files.length > 0) {
            setFile(files[0])
        }
    }

    function submit(e: React.SyntheticEvent) {
        e.preventDefault();
        let payload = {
            file: ""
        }
        //const reader = new FileReader();
        const formData = new FormData();
        //reader.readAsDataURL(file as File)
        //reader.onload = () => {
            //formData.append('file', reader.result!.toString())
            //payload.file = reader.result!.toString();
       // }
       formData.append('file', file as File);

        //console.log(formData);
        const requestOptionsPost = {
            method: "POST",
            //headers: { "Content-Type": "application/json" },
            //body: JSON.stringify(payload),
            body: formData,
        };
        console.log(formData);

        fetch(`${apiUrl}/product/singlefile`, requestOptionsPost)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.message) {
                    console.log("upload file completed");
                } else {
                    console.log("error");
                }
            });
        
        
    }


    return (
        <div className="product-form-container">
            <form className="product-form" id="product-form" >
                <div className="product-form-content">
                    <div className="form-group mt-3">
                        <label>Images</label>
                        <input
                            type="file"
                            className="form-control mt-1"
                            placeholder="Enter images"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary" onClick={submit}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateProduct;

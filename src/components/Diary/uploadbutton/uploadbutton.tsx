import React, { ChangeEvent, FormEvent, useState } from "react"
import "./uploadbutton.css"

interface UploadProps {
    uploadState: () => void
}



const UploadPage: React.FC<UploadProps> = ({ uploadState }) => {

    const [file, setFile] = useState<File | null>(null)
    const [password, setPassword] = useState<string>("")

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => [
        setFile(e.target.files ? e.target.files[0] : null)
    ]

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (file && password) {
            const data = new FormData();
            data.append("file", file)
            data.append("password", password)

            try {
                const response = await fetch(`https://blog.bianmu.link:6109/public/uploadMD`, {
                    method: 'POST',
                    body: data,
                })
                if (response.ok) {
                    window.location.reload()
                }
            } catch (error) {
                console.log("Error loading")
                return
            }
        }
    }

    return (
        <div id="upload-overlay">
            <h3>Upload-Markdown</h3>
            <form onSubmit={handleSubmit}>
                <div className="upload-ability" >
                    <label htmlFor="upload-file">
                        Choose MD
                        <input type="file" id="upload-file" onChange={handleFileChange} />
                    </label>
                </div>
                <div className="upload-ability" >
                    <label>
                        <input type="password" value={password} id="upload-password" placeholder="PASSWORD" onChange={handlePasswordChange} />
                    </label>
                </div>
                <div className="upload-ability">
                    <button type="submit">
                        <mark>
                            ✔✔✔
                        </mark>
                    </button>
                    <button onClick={uploadState}>
                        <mark>
                            ✗✗✗
                        </mark>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UploadPage;
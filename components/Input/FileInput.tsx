import React, { useEffect, useRef, useState } from 'react'
import styles from "./Input.module.scss";
import SVG from '../SVG/SVG';
import { fileSizeToMB } from '@/utils/helperFunctions';
import Link from 'next/link';

const FileInput = ({ onFileUpload, presetFilename }: { onFileUpload: (file: File | null) => void, presetFilename?: string }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null); // preview is simply the temporary URL string that you created to display the selected image. --> Notice it's not the file itself—it's a blob URL that points to the file in the browser's memory. -> preview → the temporary blob URL used only to display the image before it's uploaded.
    const [file, setFile] = useState<File | null>(null); // file → the actual File object that you'll upload to S3.

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const selected: File = files[0];
        if (!selected) return;
        if (selected.size > 1 * 1024 * 1024) { // 1MB
            alert("File size exceeds 1MB. Please select a smaller file.");
            return;
        }

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setFile(selected);
        setPreview(URL.createObjectURL(selected));
        onFileUpload(selected);
    };

    const removeImage = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setFile(null);
        setPreview(null);
        onFileUpload(null);
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    /*
        Single file --> <input type="file" />
        Multiple files --> <input type="file" multiple />
    */

    return (
        <div className={file ? styles['label-active'] : styles['label']}>
            <label htmlFor="">
                Cover Image
                {<span className={styles['necessary-mark']}> *</span>}
                {presetFilename && !file && <Link className={styles['uploaded-img-link']} href={presetFilename} target="_blank" rel="noopener noreferrer"> (See Uploaded Image)</Link>}

            </label>

            {/* accept=".png,.jpg,.jpeg,.webp" OR accept="application/pdf" */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    handleFiles(e.target.files);
                    e.target.value = "";
                }}
            />

            <div className={(file || dragging || presetFilename) ? styles["dropzone-dragging"] : styles["file-handle-container"]}
                onClick={() => inputRef.current?.click()}
                onDragEnter={(e) => {
                    e.preventDefault();
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    setDragging(false);
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    handleFiles(e.dataTransfer.files);
                }}
            >

                <div className={styles["file-handle-img"]}>
                    <SVG type="gallery" color='var(--text)' />
                </div>
                <h5>{file ? `File name: ${file?.name}` : presetFilename ? "Image Selected" : "Drag and drop an image here, or click to select"}</h5>
                <h5>{file ? `Size: ${fileSizeToMB(file?.size)}MB` : "Max size: 1MB"}</h5>

            </div>
        </div>
    )
}

export default FileInput
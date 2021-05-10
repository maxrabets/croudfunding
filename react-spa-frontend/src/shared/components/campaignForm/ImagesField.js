import React, {useState, useCallback, useMemo} from "react";
import { InputLabel, Box} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import {useDropzone} from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};
  
const activeStyle = {
    borderColor: '#2196f3'
};
  
const acceptStyle = {
    borderColor: '#00e676'
};
  
const rejectStyle = {
    borderColor: '#ff1744'
};

const ImagesField = ({onChange, defaultImages}) => {
    const [images, setImages] = useState(defaultImages || []);
    
    const onDrop = useCallback(acceptedFiles => {
        setImages(images.concat(acceptedFiles));
        onChange(acceptedFiles);
    }, [images, onChange]);

    const { getRootProps, getInputProps, isDragActive,
        isDragAccept, isDragReject } = useDropzone({
        accept: 'image/jpeg, image/jpg, image/png',
        onDrop
    });
    

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return(
        <Box m={4}>
            <InputLabel id="images-label">
                <FormattedMessage id="campaigns.images" />
            </InputLabel>
            <section className="container">
                <Box {...getRootProps({style, height: "20%"})}>
                    <input {...getInputProps()} />
                    <p><FormattedMessage id="campaigns.dragndrop" /></p>
                </Box>
            </section>
            <ul>               
                {images.map(image => <li key={image.name}>{image.name}</li>)}
            </ul>
        </Box>
    )
}

export default ImagesField
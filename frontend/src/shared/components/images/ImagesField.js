import React, {useState, useCallback, useMemo} from "react";
import { InputLabel, Box} from '@material-ui/core';
import {FormattedMessage} from "react-intl";
import {useDropzone} from 'react-dropzone';
import ImageCard from "./ImageCard";

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

const ImagesField = ({onChange, defaultImages=[], max}) => {
    // default images
    const [images, setImages] = useState(defaultImages.map(image => {
        image.url = URL.createObjectURL(image);
        return image;
    }));
    
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(image => image.url = URL.createObjectURL(image));        
        let newImages = images.concat(acceptedFiles);
        if(max) {
            newImages = newImages.splice(0, max);
        }
        setImages(newImages);
        onChange(newImages);
    }, [images, max, onChange]);

    const onClose = useCallback(image => {
        URL.revokeObjectURL(image);
        const index = images.indexOf(image);
        const imagesCopy = images.slice();
        imagesCopy.splice(index, 1);
        setImages(imagesCopy);
        onChange(imagesCopy);
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
        <>
            <InputLabel id="images-label">
                <FormattedMessage id="campaigns.images" />
            </InputLabel>
            <section className="container">
                <Box {...getRootProps({style, height: "20%"})}>
                    <input {...getInputProps()} />
                    <p><FormattedMessage id="campaigns.dragndrop" /></p>
                </Box>
            </section>              
                {images.map(image => 
                    <Box component="span" width={ max == 1 ? "100%" : "18%" } 
                        height="20%" m={1} display="inline-flex"
                    >
                        <ImageCard filename={image.name} 
                            image={image.url}
                            onClose={() => onClose(image)}
                        />
                    </Box>
                )}
        </>
    )
}

export default ImagesField;
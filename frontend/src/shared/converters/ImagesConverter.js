export function convertImageToFile(image) {
    if(image) {
        const file = new File([Buffer.from(image.buffer)], image.name);
        file.url = URL.createObjectURL(file);
        return file;
    }
}
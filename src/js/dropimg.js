import { Dropzone } from "dropzone";

Dropzone.options.addImagesProperty = {
    dictDefaultMessage: 'Upload your images',
    acceptedFiles: '.png, .jpg, .jpeg',
    maxFilesize: 10, 
    maxFiles: 1, 
    parallelUploads: 1, 
    autoProcessQueue: false, 
    addRemoveLinks: true, 
    dictRemoveFile: 'Delete File', 
    dictMaxFilesExceeded: 'The maximum number of images is nine (9)',
    paramName: 'addImagesProperty',
    init: function(){
        const dropzone = this;
        const btnPostImage = document.querySelector('#postPropertyImage');

        btnPostImage.addEventListener('click', function(){
            console.log('hello dropzone')
            dropzone.processQueue();
        });

        dropzone.on('queuecomplete', function(){
            if(dropzone.getActiveFiles().length == 0){
                window.location.href = '/properties'
            }
        });
    }
};
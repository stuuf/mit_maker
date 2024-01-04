const fileSelector = document.getElementById('file-selector');
    fileSelector.addEventListener('change', (event) => {
        const fileList = event.target.files;
        processFiles(fileList);
    });


const dropArea = document.getElementById('drop-area');

dropArea.addEventListener('dragover', (event) => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
});

dropArea.addEventListener('drop', (event) => {
  event.stopPropagation();
  event.preventDefault();
  const fileList = event.dataTransfer.files;
  processFiles(fileList);
});




function processFiles(fileList) {
    if (fileList.length != 1) {
        sendError("Error: Multiple files are not supported");
        return;
    }
    const file = fileList[0];

    const name = file.name ? file.name : 'NOT SUPPORTED';
    const type = file.type ? file.type : 'NOT SUPPORTED';
    const size = file.size ? file.size : 'NOT SUPPORTED';
    // console.log({file, name, type, size});

    if (!(file.size && file.size < 10000000)) {
        sendError("File size must be less than 10 MB");
        return;
    }

    if (!document.getElementById('button').disabled) {
        sendError("File already inserted");
        return;
    }


    if (!(file.name && (file.name.includes(".png") || file.name.includes(".jpeg") || file.name.includes(".jpg") || file.name.includes('.svg')))) {
        if (!(file.type && file.type.startsWith("image/") && (file.name.includes("png") || file.name.includes("jpeg") || file.name.includes("jpg") || file.name.includes('svg')))) {
            sendError("File must be either a png, svg, or jpg/jpeg");
            return;
        }
    }

    if (file.name.includes('.svg') && file.type.startsWith('image/') && file.name.includes('svg')) {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            svgString = event.target.result;

            var template = document.createElement('template');
            const html = svgString.trim();
            template.innerHTML = html;
            document.getElementById('image-container').append(template.content.firstChild);

            document.getElementById('drop-area').style.display = 'none';
            document.getElementById('button').disabled = false;
            document.getElementById('button').className = 'start';
            document.getElementById('button-text').textContent = 'Start';

            appendXButton();
        });
        reader.readAsText(file);
    } else {

        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            const img = new Image();
            img.src = event.target.result;
            imgString = event.target.result;
            img.id = 'targetImg';
            const container = document.getElementById('image-container');
            container.appendChild(img);
            appendXButton();

            document.getElementById('drop-area').style.display = 'none';
            document.getElementById('button').disabled = false;
            document.getElementById('button').className = 'start';
            document.getElementById('button-text').textContent = 'Start';

        });
        reader.readAsDataURL(file);
    }
}
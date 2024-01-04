function clicked() {
    try {
        const button = document.getElementById('button');

        if (button.className === "start") {
            
            if (svgString) {

                const container = document.getElementById('image-container');
                container.innerHTML = "";

                button.className = "download";
                document.getElementById('button-text').textContent = 'Download';
                button.disabled = true;

                setProgress(0);

                var template = document.createElement('template');
                const html = svgString.trim();
                template.innerHTML = html;
                const svg = template.content.firstChild;
                const bbox = svg.getBBox();
                const WHRatio = bbox.width / bbox.height;

                const width = svg.getAttribute('width');
                const height = svg.getAttribute('height');
                if (!width || !height) {
                    if (WHRatio > 1) {
                        svg.setAttribute('width', '1500px');
                        svg.setAttribute('width',  `${1500 / WHRatio}px`);
                    } else {
                        svg.setAttribute('height', '1500px');
                        svg.setAttribute('width',  `${1500 * WHRatio}px`);
                    }
                }

                const blob = new Blob([template.innerHTML], {type: 'image/svg+xml'});
                const url = URL.createObjectURL(blob);
                const svgimg = document.createElement('img');
                svgimg.src = url
                
                setTimeout(() => {
                    try {
                        generateGIF(svgimg, null, svgString);
                    } catch (error) {
                        resetDisplay();
                        sendError("Error occured: Please try again");
                    }
                }, 100);

            } else if (imgString) {

                const container = document.getElementById('image-container');
                container.innerHTML = "";

                button.className = "download";
                document.getElementById('button-text').textContent = 'Download';
                button.disabled = true;

                setProgress(0);
                setProgress(0.1, "Vectorizing Image");

                const img = new Image();
                img.src = imgString;

                const maxPixelCount = 2_500_000;
                const pixelCount = img.width * img.height;
                const ratio = Math.sqrt(Math.min(maxPixelCount / pixelCount, 1));

                const canvas = document.createElement("canvas");
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                const image = new Image();
                image.src = canvas.toDataURL();

                
                setTimeout(() => {
                    try {
                        generateGIF(image, imageData);
                    } catch (error) {
                        resetDisplay();
                        sendError("Error occured: Please try again");
                        console.log(error);
                    }
                }, 100);

            } else {
                sendError("No image loaded");
            }
        } else if (button.className === "download") {
            if (downloadLink) {
                downloadLink.click();
            }
        }
    } catch (error) {
        resetDisplay();
        sendError("Error occured: Please try again");
    }
}

function appendXButton() {
    const container = document.getElementById('image-container');
    const xbutton = document.createElement('button');
    xbutton.innerHTML = '&times;';
    xbutton.id = 'x-btn';
    xbutton.addEventListener('click', () => {
        resetDisplay();
    });
    container.appendChild(xbutton);
}

function sendError(message) {
    const err = document.getElementById('error-text');
    err.className = '';
    err.textContent = message;
    err.style.opacity = 1;

    err.getBoundingClientRect();

    err.className = 'error-text-transition';
    err.style.opacity = 0;
}
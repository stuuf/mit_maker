var svgString;
var imgString;
var downloadLink;

function resetDisplay() {

    document.getElementById('drop-area').style.display = 'flex';
    document.getElementById('button').className = 'start';
    document.getElementById('button').disabled = true;
    document.getElementById('button-text').textContent = 'Start';
    if (document.getElementById('x-btn')) {
        document.getElementById('x-btn').remove();
    }
    if (document.getElementById('targetImg')) {
        document.getElementById('targetImg').remove();
    }
    if (document.getElementById('gif')) {
        document.getElementById('gif').remove();
    }
    document.getElementById('image-container').innerHTML = ""
    imgString = null;
    svgString = null;
    downloadLink = null;
    setProgress(-1);
}

async function setProgress(value, message = "") {
    if (value < 0 || value > 1) {
        document.getElementById('progress-container').innerHTML = "";
        document.getElementById('progress-container').style.opacity = 0;
    } else {
        document.getElementById('progress-container').style.opacity = 1;
        var progress = document.getElementById('progress');
        if (!progress) {
            var template = document.createElement('template');
            const str = '<svg id="wave" style="transform:rotate(0deg); transition: 0.3s" viewBox="0 0 1440 220" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(45, 107, 231, 1)" offset="0%"></stop><stop stop-color="rgba(45.802, 0, 84.597, 1)" offset="100%"></stop></linearGradient></defs><path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)" d="M0,176L30,154C60,132,120,88,180,62.3C240,37,300,29,360,36.7C420,44,480,66,540,95.3C600,125,660,161,720,157.7C780,154,840,110,900,102.7C960,95,1020,125,1080,139.3C1140,154,1200,154,1260,157.7C1320,161,1380,169,1440,168.7C1500,169,1560,161,1620,146.7C1680,132,1740,110,1800,113.7C1860,117,1920,147,1980,150.3C2040,154,2100,132,2160,132C2220,132,2280,154,2340,139.3C2400,125,2460,73,2520,66C2580,59,2640,95,2700,121C2760,147,2820,161,2880,157.7C2940,154,3000,132,3060,106.3C3120,81,3180,51,3240,58.7C3300,66,3360,110,3420,135.7C3480,161,3540,169,3600,161.3C3660,154,3720,132,3780,124.7C3840,117,3900,125,3960,117.3C4020,110,4080,88,4140,80.7C4200,73,4260,81,4290,84.3L4320,88L4320,220L4290,220C4260,220,4200,220,4140,220C4080,220,4020,220,3960,220C3900,220,3840,220,3780,220C3720,220,3660,220,3600,220C3540,220,3480,220,3420,220C3360,220,3300,220,3240,220C3180,220,3120,220,3060,220C3000,220,2940,220,2880,220C2820,220,2760,220,2700,220C2640,220,2580,220,2520,220C2460,220,2400,220,2340,220C2280,220,2220,220,2160,220C2100,220,2040,220,1980,220C1920,220,1860,220,1800,220C1740,220,1680,220,1620,220C1560,220,1500,220,1440,220C1380,220,1320,220,1260,220C1200,220,1140,220,1080,220C1020,220,960,220,900,220C840,220,780,220,720,220C660,220,600,220,540,220C480,220,420,220,360,220C300,220,240,220,180,220C120,220,60,220,30,220L0,220Z"></path><defs><linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(45, 107, 231, 1)" offset="0%"></stop><stop stop-color="rgba(45, 107, 231, 1)" offset="100%"></stop></linearGradient></defs><path style="transform:translate(0, 50px); opacity:0.9" fill="url(#sw-gradient-1)" d="M0,110L30,95.3C60,81,120,51,180,40.3C240,29,300,37,360,44C420,51,480,59,540,84.3C600,110,660,154,720,143C780,132,840,66,900,66C960,66,1020,132,1080,143C1140,154,1200,110,1260,110C1320,110,1380,154,1440,146.7C1500,139,1560,81,1620,58.7C1680,37,1740,51,1800,80.7C1860,110,1920,154,1980,172.3C2040,191,2100,183,2160,154C2220,125,2280,73,2340,62.3C2400,51,2460,81,2520,88C2580,95,2640,81,2700,66C2760,51,2820,37,2880,33C2940,29,3000,37,3060,62.3C3120,88,3180,132,3240,139.3C3300,147,3360,117,3420,117.3C3480,117,3540,147,3600,154C3660,161,3720,147,3780,139.3C3840,132,3900,132,3960,132C4020,132,4080,132,4140,132C4200,132,4260,132,4290,132L4320,132L4320,220L4290,220C4260,220,4200,220,4140,220C4080,220,4020,220,3960,220C3900,220,3840,220,3780,220C3720,220,3660,220,3600,220C3540,220,3480,220,3420,220C3360,220,3300,220,3240,220C3180,220,3120,220,3060,220C3000,220,2940,220,2880,220C2820,220,2760,220,2700,220C2640,220,2580,220,2520,220C2460,220,2400,220,2340,220C2280,220,2220,220,2160,220C2100,220,2040,220,1980,220C1920,220,1860,220,1800,220C1740,220,1680,220,1620,220C1560,220,1500,220,1440,220C1380,220,1320,220,1260,220C1200,220,1140,220,1080,220C1020,220,960,220,900,220C840,220,780,220,720,220C660,220,600,220,540,220C480,220,420,220,360,220C300,220,240,220,180,220C120,220,60,220,30,220L0,220Z"></path></svg>';
            const html = str.trim();
            template.innerHTML = html;
            const waves = template.content.firstChild;
            progress = document.createElement('div');
            progress.id = 'progress';
            document.getElementById('progress-container').appendChild(progress);
            progress.appendChild(waves);
            const label = document.createElement('h1');
            label.id = 'progress-text';
            document.getElementById('progress-container').appendChild(label);
        }
        if (progress.style.height !== `${Math.round(value*100)}%`) {
            progress.style.height = `${Math.round(value*100)}%`;
        }
        document.getElementById('progress-text').textContent = message;
    }
}


function generateGIF(image, imageData, svg=null) {

    const maxPaths = parseInt(document.getElementById('max-paths').value)
    const minLength = parseInt(document.getElementById('min-length').value)
    const maxFPS = parseInt(document.getElementById('max-fps').value)
    const maxNumberOfColors = parseInt(document.getElementById('max-colors').value)
    const strokewidth = parseInt(document.getElementById('stroke-width').value)
    const time = parseFloat(document.getElementById('duration').value) * 1000
    const delay = parseFloat(document.getElementById('delay').value) * 1000
    const stagger = parseFloat(document.getElementById('stagger').value) * 1000
    const fadeInStart = parseFloat(document.getElementById('fade-in-percent').value)
    const backgroundColor = document.getElementById('background-color').value;
    const loopCount = parseInt(document.getElementById('count').value);
    const backgroundTolerance = parseInt(document.getElementById('background-tolerance').value);

    const gif = new GIF({
        workers: 5,
        quality: 10,
        repeat: loopCount === 1 ? -1 : (loopCount === 0 ? 0 : loopCount - 1),
        width: image.width,
        height: image.height,
        dither: 'Atkinson'
      });
    
    // Export the GIF
    gif.on('finished', function(blob) {

        resetDisplay();
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'contour-animation.gif';
        link.href = url;
        downloadLink = link;
        document.getElementById('drop-area').style.display = 'none';
        const img = document.createElement("img")
        img.src = url
        img.id = 'gif'

        document.getElementById('image-container').appendChild(img);

        document.getElementById('button').disabled = false;
        document.getElementById('button').className = "download";
        document.getElementById('button-text').textContent = "Download";

        appendXButton();

    });
    
    
    var count = 0;
    var svgArr = [];
    var imgArr;


    const svgstr = (svg) ? svg: ImageTracer.imagedataToSVG(imageData, {rightangleenhance:false, numberofcolors: maxNumberOfColors, pathomit: minLength, strokewidth: strokewidth, mincolorratio: 0.05 });

    var template = document.createElement('template');
    const html = svgstr.trim();
    template.innerHTML = html;
    const el = template.content.firstChild;

    var elements;

    if (!svg) {
        elements = el.childNodes;
        var toRemove = [];
        for (let i = 0; i < elements.length; i++) {
            elements[i].setAttribute("fill", 'rgba(255,255,255,0)');
            const rgb = elements[i].getAttribute('stroke');
            if (rgb) {
                const rgbArray = rgb.match(/\d+/g).map(Number);
                const bgArray = ['0x' + backgroundColor[1] + backgroundColor[2] | 0, '0x' + backgroundColor[3] + backgroundColor[4] | 0, '0x' + backgroundColor[5] + backgroundColor[6] | 0];
                const delta = deltaE(rgbArray, bgArray);
                if (delta < backgroundTolerance) {
                    toRemove.push(elements[i]);
                }
            }
        }
        for (let i = 0; i < toRemove.length; i++) {
            toRemove[i].remove();
        }
        toRemove = [];
        const elArr = Array.prototype.slice.call(elements);
        elArr.sort((a, b) => a.getTotalLength() - b.getTotalLength())
        if (elArr.length > maxPaths && maxPaths > 0) {
            for (let i = 0; i < elArr.length - maxPaths; i++) {
                toRemove.push(elArr[i]);
            }
        }
        for (let i = 0; i < toRemove.length; i++) {
            toRemove[i].remove();
        }

        const bg = document.createElement('rect');
        bg.setAttribute('width', '100%');
        bg.setAttribute('height', '100%');
        bg.setAttribute('fill', backgroundColor);

        el.setAttribute('xmlns', "http://www.w3.org/2000/svg");
        el.prepend(bg);
    } else {
        elements = el.getElementsByTagName('*');
        el.setAttribute('width', image.width);
        el.setAttribute('height', image.height);

        var toRemove = [];
        for (let i = 0; i < elements.length; i++) {
            elements[i].setAttribute('stroke', elements[i].getAttribute('fill'));
            elements[i].setAttribute('stroke-width', strokewidth);
            elements[i].setAttribute('stroke-opacity', '1');
            elements[i].setAttribute("fill", 'rgba(255,255,255,0)');

            if (elements[i].tagName === 'image') {
                toRemove.push(elements[i]);
            }
        }
        for (let i = 0; i < toRemove.length; i++) {
            toRemove[i].remove();
        }

        const bg = document.createElement('rect');
        bg.setAttribute('width', '100%');
        bg.setAttribute('height', '100%');
        bg.setAttribute('fill', backgroundColor);

        el.setAttribute('xmlns', "http://www.w3.org/2000/svg");
        el.prepend(bg);
    }

    async function startAnim() {
        setProgress(0.4, 'Animation Rendering');
        anime({
            targets: 'path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: time,
            delay: function(el, i) { return (stagger / elements.length) * i + delay },
            update: function(anim) {
                const svg = el.outerHTML;
                svgArr.push(svg)
            },
            complete: function (anim) {
                console.log("Pre reduction: " + svgArr.length);
                const interval = Math.ceil(svgArr.length / (maxFPS * ((time + delay + stagger)/1000)));
                svgArr = svgArr.filter((value, index) => index % interval === 0 || index === svgArr.length - 1).slice(0, maxFPS * ((time + delay + stagger)/1000));

                console.log("Post reduction: " + svgArr.length);
                imgArr = new Array(svgArr.length)

                if (svgArr.length < 1) {
                    throw new Error("Animation rendering failed");
                }
                // compile images
                for (let i = 0; i < svgArr.length; i++) {

                    const blob = new Blob([svgArr[i]], {type: 'image/svg+xml'});
                    const url = URL.createObjectURL(blob);
                    const svgimg = document.createElement('img');
                    svgimg.src = url
    
                    // order and add to gif after everything loads
                    svgimg.onload = function() {
                        imgArr[i] = svgimg;
                        count++;
                        if (count == imgArr.length) {
                            for (let j = 0; j < imgArr.length; j++) {

                                const imgFromData = new Image();
                                imgFromData.src = image;

                                var mat1 = cv.imread(imgArr[j]);
                                var mat2 = cv.imread(image);

                                var alpha = (((j+1)/ imgArr.length) < fadeInStart) ? 1 : (1 - (j+1)/imgArr.length) / (1-fadeInStart)
                                var beta = 1 - alpha;
                                var dst = new cv.Mat();
                                cv.addWeighted(mat1, alpha, mat2, beta, 0.0, dst);

                                var canvas = document.createElement('canvas');
                                cv.imshow(canvas, dst);

                                gif.addFrame(canvas, {
                                    delay: Math.round(time / svgArr.length),
                                    copy: true,
                                });
    
                                mat1.delete(); mat2.delete(); dst.delete();

                                if (j == svgArr.length - 1) {
                                    setProgress(0.7, 'GIF Rendering');
                                    gif.render();
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    document.getElementById('svg-container').innerHTML = "";

    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0 && mutation.addedNodes[0] === el) {
                setTimeout(() => {
                    try {
                        startAnim();
                    } catch (error) {
                        resetDisplay();
                        sendError("Error occured: Please try again");
                        console.log(error);
                    }
                }, 1000);
                observer.disconnect();
            }
        }
    });
        
    observer.observe(document.getElementById('svg-container'), { childList: true });
    document.getElementById('svg-container').appendChild(el);
    
}
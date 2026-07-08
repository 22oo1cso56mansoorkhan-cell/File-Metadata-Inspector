// ----- script.js -----
(function() {
    // DOM Elements
    const fileUpload = document.getElementById('fileUpload');
    const uploadArea = document.getElementById('uploadArea');
    const fileInfoSection = document.getElementById('fileInfoSection');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const fileType = document.getElementById('fileType');
    const fileModified = document.getElementById('fileModified');
    const basicMetadata = document.getElementById('basicMetadata');
    const imageMetadata = document.getElementById('imageMetadata');
    const exifMetadata = document.getElementById('exifMetadata');
    const pdfMetadata = document.getElementById('pdfMetadata');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const basicTab = document.getElementById('basicTab');
    const imageTab = document.getElementById('imageTab');
    const exifTab = document.getElementById('exifTab');
    const pdfTab = document.getElementById('pdfTab');

    let currentFile = null;
    let currentFileData = null;

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Format date
    function formatDate(date) {
        if (!date) return 'Not available';
        return new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    // Get file extension
    function getFileExtension(filename) {
        return filename.split('.').pop().toLowerCase();
    }

    // Check if file is image
    function isImageFile(file) {
        return file.type.startsWith('image/');
    }

    // Check if file is PDF
    function isPDFFile(file) {
        return file.type === 'application/pdf' || getFileExtension(file.name) === 'pdf';
    }

    // Extract basic file info
    function extractBasicInfo(file) {
        return {
            name: file.name,
            size: formatFileSize(file.size),
            sizeBytes: file.size,
            type: file.type || 'Unknown',
            lastModified: formatDate(file.lastModified),
            extension: getFileExtension(file.name)
        };
    }

    // Extract image dimensions
    function extractImageDimensions(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    resolve({
                        width: img.width,
                        height: img.height,
                        aspectRatio: (img.width / img.height).toFixed(2)
                    });
                };
                img.onerror = function() {
                    resolve(null);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // Extract PDF info (basic)
    function extractPDFInfo() {
        // Basic PDF info from file object
        return {
            'Pages': 'Not available (use PDF.js for full extraction)',
            'PDF Version': 'Not available',
            'Creator': 'Not available',
            'Producer': 'Not available',
            'Creation Date': 'Not available'
        };
    }

    // Display metadata in grid
    function displayMetadata(container, data, title = '') {
        if (!data || Object.keys(data).length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-info-circle" style="font-size: 2rem; color: #b2bec3;"></i>
                    <p>No metadata available</p>
                </div>
            `;
            container.style.display = 'block';
            return;
        }

        let html = '';
        for (const [key, value] of Object.entries(data)) {
            if (value && value !== 'Not available' && value !== '') {
                html += `
                    <div class="metadata-item">
                        <span class="label">${key}</span>
                        <span class="value">${value}</span>
                    </div>
                `;
            }
        }

        if (html === '') {
            html = `
                <div class="empty-state">
                    <i class="fas fa-info-circle" style="font-size: 2rem; color: #b2bec3;"></i>
                    <p>No metadata available</p>
                </div>
            `;
        }

        container.innerHTML = html;
        container.style.display = 'grid';
    }

    // Process EXIF data
    function processEXIFData(exifData) {
        const result = {};
        
        if (!exifData) return result;

        const exifMap = {
            'Make': 'Camera Make',
            'Model': 'Camera Model',
            'DateTimeOriginal': 'Date Taken',
            'DateTimeDigitized': 'Date Digitized',
            'ExposureTime': 'Exposure Time',
            'FNumber': 'Aperture',
            'ISO': 'ISO Speed',
            'FocalLength': 'Focal Length',
            'Flash': 'Flash',
            'WhiteBalance': 'White Balance',
            'GPSLatitude': 'GPS Latitude',
            'GPSLongitude': 'GPS Longitude',
            'GPSAltitude': 'GPS Altitude',
            'GPSDateStamp': 'GPS Date',
            'GPSLatitudeRef': 'Latitude Ref',
            'GPSLongitudeRef': 'Longitude Ref',
            'Orientation': 'Orientation',
            'Software': 'Software Used',
            'Artist': 'Artist/Photographer',
            'Copyright': 'Copyright',
            'ExposureProgram': 'Exposure Program',
            'MeteringMode': 'Metering Mode',
            'SensingMethod': 'Sensing Method',
            'SceneType': 'Scene Type'
        };

        for (const [key, label] of Object.entries(exifMap)) {
            if (exifData[key] !== undefined && exifData[key] !== null) {
                let value = exifData[key];
                // Format specific values
                if (key === 'ExposureTime' && typeof value === 'number') {
                    value = value < 1 ? `1/${Math.round(1/value)}s` : `${value}s`;
                } else if (key === 'FNumber' && typeof value === 'number') {
                    value = `f/${value}`;
                } else if (key === 'FocalLength' && typeof value === 'number') {
                    value = `${value}mm`;
                } else if (key === 'ISO' && typeof value === 'number') {
                    value = `ISO ${value}`;
                } else if (key === 'Flash' && typeof value === 'number') {
                    value = value === 0 ? 'Flash did not fire' : 'Flash fired';
                } else if (key === 'WhiteBalance' && typeof value === 'number') {
                    value = value === 0 ? 'Auto' : 'Manual';
                } else if (key === 'Orientation' && typeof value === 'number') {
                    const orientations = {
                        1: 'Normal',
                        2: 'Mirrored horizontally',
                        3: 'Rotated 180°',
                        4: 'Mirrored vertically',
                        5: 'Mirrored horizontally, rotated 90° CCW',
                        6: 'Rotated 90° CW',
                        7: 'Mirrored horizontally, rotated 90° CW',
                        8: 'Rotated 90° CCW'
                    };
                    value = orientations[value] || value;
                } else if (typeof value === 'object' && value !== null) {
                    // Handle GPS coordinates
                    if (key.includes('GPS') && typeof value === 'object' && 'numerator' in value) {
                        value = `${value.numerator}/${value.denominator}`;
                    }
                }
                result[label] = String(value);
            }
        }

        return result;
    }

    // Main file processing function
    async function processFile(file) {
        currentFile = file;
        currentFileData = null;

        // Update file info
        const basicInfo = extractBasicInfo(file);
        fileName.textContent = basicInfo.name;
        fileSize.textContent = basicInfo.size;
        fileType.textContent = basicInfo.type;
        fileModified.textContent = basicInfo.lastModified;
        fileInfoSection.style.display = 'block';

        // Show basic metadata
        const basicData = {
            'File Name': basicInfo.name,
            'File Size': basicInfo.size,
            'File Type': basicInfo.type,
            'Extension': basicInfo.extension.toUpperCase(),
            'Last Modified': basicInfo.lastModified
        };
        displayMetadata(basicMetadata, basicData);
        basicTab.querySelector('.empty-state').style.display = 'none';

        // Handle image files
        if (isImageFile(file)) {
            // Extract dimensions
            const dimensions = await extractImageDimensions(file);
            if (dimensions) {
                const imageData = {
                    'Image Width': `${dimensions.width}px`,
                    'Image Height': `${dimensions.height}px`,
                    'Aspect Ratio': dimensions.aspectRatio,
                    'Total Pixels': `${dimensions.width * dimensions.height} pixels`
                };
                displayMetadata(imageMetadata, imageData);
                imageTab.querySelector('.empty-state').style.display = 'none';

                // Extract EXIF data
                try {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const data = new Uint8Array(e.target.result);
                        EXIF.getData(data, function() {
                            const exifData = EXIF.getAllTags(this);
                            if (exifData && Object.keys(exifData).length > 0) {
                                const processedExif = processEXIFData(exifData);
                                displayMetadata(exifMetadata, processedExif);
                                exifTab.querySelector('.empty-state').style.display = 'none';
                            } else {
                                displayMetadata(exifMetadata, {});
                            }
                        });
                    };
                    reader.readAsArrayBuffer(file);
                } catch (error) {
                    console.error('Error reading EXIF data:', error);
                    displayMetadata(exifMetadata, {});
                }
            }

            // Hide PDF tab
            pdfTab.querySelector('.empty-state').style.display = 'block';
            displayMetadata(pdfMetadata, {});
        }

        // Handle PDF files
        else if (isPDFFile(file)) {
            const pdfData = extractPDFInfo();
            displayMetadata(pdfMetadata, pdfData);
            pdfTab.querySelector('.empty-state').style.display = 'none';

            // Hide image and EXIF tabs
            imageTab.querySelector('.empty-state').style.display = 'block';
            displayMetadata(imageMetadata, {});
            exifTab.querySelector('.empty-state').style.display = 'block';
            displayMetadata(exifMetadata, {});
        }

        // Unsupported file type
        else {
            // Show unsupported message in all tabs
            const unsupportedMsg = {
                'Status': 'Unsupported file type. Please upload an image or PDF.'
            };
            displayMetadata(basicMetadata, unsupportedMsg);
            displayMetadata(imageMetadata, unsupportedMsg);
            displayMetadata(exifMetadata, unsupportedMsg);
            displayMetadata(pdfMetadata, unsupportedMsg);
        }

        // Switch to basic tab
        switchTab('basic');
    }

    // Tab switching
    function switchTab(tabId) {
        tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });
        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === tabId + 'Tab');
        });
    }

    // Event Listeners
    fileUpload.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            processFile(this.files[0]);
        }
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            processFile(files[0]);
        }
    });

    // Tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // Initial state
    console.log('File Metadata Inspector initialized');
})();
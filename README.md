# File Metadata Inspector

A powerful web application that extracts and displays comprehensive metadata from uploaded images and PDF files using the Browser File API and EXIF.js library.


## 📋 Table of Contents
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Usage](#-usage)
- [File Structure](#-file-structure)
- [Supported File Types](#-supported-file-types)
- [Metadata Extracted](#-metadata-extracted)
- [Screenshots](#-screenshots)
- [Live Demo](#-live-demo)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Functionality
- **Drag & Drop Upload**: Intuitive file upload with drag-and-drop support
- **Multiple File Support**: Handles images (JPEG, PNG, GIF, BMP, WebP) and PDF files
- **Real-time Processing**: Instant metadata extraction upon file upload
- **Organized Display**: Tabbed interface for different metadata categories

### Metadata Extraction
- **Basic File Info**: File name, size, MIME type, last modified date
- **Image Details**: Dimensions (width, height), aspect ratio, total pixels
- **EXIF Data**: Camera make, model, date taken, aperture, ISO, focal length, flash, white balance, GPS coordinates, and more
- **PDF Information**: Document properties (pages, version, creator, producer, creation date)

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Clean UI**: Modern interface with smooth animations
- **Tab Navigation**: Easy switching between metadata categories
- **Empty States**: Helpful messages when no data is available

## 🛠️ Technologies Used

- **HTML5** - Structure and semantics
- **CSS3** - Styling with Grid, Flexbox, and animations
- **JavaScript (Vanilla)** - Core application logic
- **Font Awesome 6** - Icon library for enhanced UI
- **EXIF.js** - EXIF metadata extraction from images
- **File API** - Browser API for file handling
- **Canvas API** - Image processing and dimension extraction

## 📥 Installation

### Method 1: Direct Download
1. Download all three files:
   - `index.html`
   - `style.css`
   - `script.js`
2. Place them in the same folder/directory
3. Open `index.html` in your web browser

### Method 2: Clone Repository
```bash
git clone https://github.com/yourusername/file-metadata-inspector.git
cd file-metadata-inspector
# Open index.html in your browser
```

### Method 3: Local Server (Optional)
For better performance, you can use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js with http-server
npx http-server

# Using Live Server in VS Code
# Right-click index.html and select "Open with Live Server"
```

Then open `http://localhost:8000` in your browser.

## 🚀 Usage

### Step-by-Step Guide

1. **Launch the Application**
   - Open `index.html` in your web browser
   - You'll see the main interface with upload area and metadata panels

2. **Upload a File**
   - **Option A**: Click the upload area to browse files
   - **Option B**: Drag and drop a file onto the upload area
   - Supported formats: Images (JPEG, PNG, GIF, BMP, WebP) and PDFs

3. **View Metadata**
   - File information automatically displays in the left panel
   - Basic metadata appears in the right panel under "Basic Info" tab
   - Switch between tabs to view different metadata categories:
     - **Basic Info**: File name, size, type, modification date
     - **Image Details**: Dimensions, aspect ratio, total pixels
     - **EXIF Data**: Camera information, GPS, date taken (images only)
     - **PDF Info**: Document properties (PDF files only)

4. **Explore Metadata**
   - Each metadata item is displayed with a clear label and value
   - Empty states are shown when no data is available
   - All metadata is extracted automatically in real-time

### Example Use Cases

- **Photographers**: Extract EXIF data from images including camera settings and GPS coordinates
- **Designers**: Check image dimensions and resolution for design projects
- **Document Management**: Verify PDF metadata and file properties
- **Digital Forensics**: Extract metadata for investigation purposes
- **Content Management**: Organize files by examining metadata

## 📁 File Structure

```
file-metadata-inspector/
├── index.html          # Main HTML structure
├── style.css           # CSS styling
├── script.js           # JavaScript logic
└── README.md           # Documentation
```

## 📊 Supported File Types

| File Type | Extension | EXIF Support | Dimension Extraction |
|-----------|-----------|--------------|---------------------|
| JPEG      | .jpg, .jpeg | ✅ Yes | ✅ Yes |
| PNG       | .png | ❌ No | ✅ Yes |
| GIF       | .gif | ❌ No | ✅ Yes |
| BMP       | .bmp | ❌ No | ✅ Yes |
| WebP      | .webp | ❌ No | ✅ Yes |
| PDF       | .pdf | ❌ No | ❌ No |

## 📋 Metadata Extracted

### Basic File Info
- File Name
- File Size (in KB/MB/GB)
- MIME Type
- File Extension
- Last Modified Date

### Image Details
- Image Width (px)
- Image Height (px)
- Aspect Ratio
- Total Pixels

### EXIF Data (for JPEG images)
- Camera Make
- Camera Model
- Date Taken
- Date Digitized
- Exposure Time
- Aperture (f-stop)
- ISO Speed
- Focal Length
- Flash Status
- White Balance
- GPS Coordinates
- GPS Altitude
- GPS Date
- Software Used
- Artist/Photographer
- Copyright
- Exposure Program
- Metering Mode
- Sensing Method
- Scene Type
- Orientation

### PDF Info
- Number of Pages
- PDF Version
- Creator
- Producer
- Creation Date

## 📸 Screenshots

### Upload Interface
![Upload Interface](https://via.placeholder.com/600x300/6c5ce7/ffffff?text=Upload+Interface)

### Basic File Information
![Basic Info](https://via.placeholder.com/600x300/6c5ce7/ffffff?text=Basic+File+Info)

### Image Details
![Image Details](https://via.placeholder.com/600x300/6c5ce7/ffffff?text=Image+Details)

### EXIF Data
![EXIF Data](https://via.placeholder.com/600x300/6c5ce7/ffffff?text=EXIF+Data)

## 🌐 Live Demo

[View Live Demo](https://your-demo-link.com) *(Optional - Add your deployment link if available)*

## 🌍 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 60+ | ✅ Full |
| Firefox | 60+ | ✅ Full |
| Safari | 12+ | ✅ Full |
| Edge | 79+ | ✅ Full |
| Opera | 50+ | ✅ Full |
| IE | - | ❌ Not Supported |

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write clear commit messages
- Test your changes across different browsers
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [EXIF.js](https://github.com/exif-js/exif-js) - For EXIF metadata extraction
- [Font Awesome](https://fontawesome.com/) - For beautiful icons
- The browser File API team - For file handling capabilities

## 📞 Contact

- **Author**: Mansoor khan
- **Email**: mnsrcse2006@gmail.com

## 🎯 Future Enhancements

- [ ] Add support for more file types (Audio, Video, Documents)
- [ ] Export metadata as JSON/CSV
- [ ] Batch file processing
- [ ] Comparison view for multiple files
- [ ] PDF.js integration for full PDF metadata
- [ ] Dark mode support
- [ ] Copy metadata to clipboard
- [ ] Search/filter metadata

---

**Made with ❤️ by Mansoor Khan**

---

**Note**: If you encounter any issues or have suggestions, please open an issue on GitHub.

# ☁️ Serverless Image Resizer

A fully serverless AWS application that allows users to upload images through a modern web interface. Images are securely uploaded to Amazon S3 using Presigned URLs, automatically resized by AWS Lambda, and stored in a separate S3 bucket for download.

---

## 📌 Overview

This project demonstrates an event-driven, serverless architecture using AWS services. Instead of uploading files through a traditional backend server, the frontend requests a secure Presigned URL from AWS Lambda via API Gateway. The browser uploads the image directly to Amazon S3, which triggers another Lambda function to resize the image using the Pillow library.

The processed image is stored in a separate S3 bucket and can then be viewed or downloaded.

---

## 🌐 Live Demo

**Frontend Website**

```
http://serverless-image-resizer-web.s3-website.ap-south-1.amazonaws.com/
```

---

## 🏗️ Architecture

```
                User
                  │
                  ▼
     HTML • CSS • JavaScript
                  │
                  ▼
           Amazon API Gateway
                  │
                  ▼
      GenerateUploadURL Lambda
                  │
          Presigned Upload URL
                  │
                  ▼
     Amazon S3 (Original Bucket)
                  │
      S3 ObjectCreated Event
                  │
                  ▼
      ImageResizer Lambda (Python)
                  │
      Resize using Pillow Library
                  │
                  ▼
     Amazon S3 (Resized Bucket)
                  │
                  ▼
          Download Resized Image
```

---

# 🚀 Features

- Secure image uploads using Presigned URLs
- Serverless architecture
- Automatic image resizing
- Separate buckets for original and resized images
- Responsive frontend
- Original image preview
- Resized image preview
- Download processed image
- Event-driven workflow
- Modern UI

---

# ☁️ AWS Services Used

| Service | Purpose |
|----------|----------|
| Amazon S3 | Store original and resized images |
| AWS Lambda | Generate Presigned URL and resize images |
| Amazon API Gateway | Expose upload endpoint |
| IAM | Permissions and security |
| Amazon CloudWatch | Logging and monitoring |

---

# 💻 Technologies Used

- Python
- Pillow
- HTML5
- CSS3
- JavaScript
- AWS SDK (Boto3)

---

# 📂 Project Structure

```
Serverless-Image-Resizer
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── lambda
│   ├── generate_upload_url.py
│   ├── image_resizer_lambda.py
│   └── requirements.txt
│
├── screenshots
│
├── README.md
│
└── .gitignore
```

---

# ⚙️ How It Works

### Step 1

The user selects an image from the web application.

↓

### Step 2

The frontend requests a Presigned Upload URL from API Gateway.

↓

### Step 3

API Gateway invokes the **GenerateUploadURL Lambda**.

↓

### Step 4

Lambda returns a secure Presigned URL.

↓

### Step 5

The browser uploads the image directly to Amazon S3.

↓

### Step 6

Amazon S3 automatically triggers the **ImageResizer Lambda**.

↓

### Step 7

The Lambda function resizes and optimizes the uploaded image using Pillow.

↓

### Step 8

The resized image is stored in a separate S3 bucket and becomes available for viewing or downloading.

---

# 📸 Screenshots

Add screenshots here after deployment.

Example:

- Home Page
- Upload Image
- Original Bucket
- Resized Bucket
- API Gateway
- Lambda Console
- CloudWatch Logs

---

# ▶️ Run Locally

Clone the repository

```bash
git clone https://github.com/<YOUR_USERNAME>/Serverless-Image-Resizer.git
```

Move into the project

```bash
cd Serverless-Image-Resizer/frontend
```

Run a local web server

```bash
python -m http.server 8000
```

Open

```
http://localhost:8000
```

---

# 📈 Future Improvements

- Before vs After comparison slider
- Multiple resize dimensions
- Image quality selector
- Authentication using Amazon Cognito
- Upload history dashboard
- CloudFront CDN integration
- Custom domain support
- Image format conversion (PNG, WEBP, JPEG)

---

# 📚 Learning Outcomes

This project demonstrates practical experience with:

- Serverless Computing
- Event-Driven Architecture
- Amazon S3
- AWS Lambda
- API Gateway
- Presigned URLs
- Secure File Uploads
- Image Processing
- Python Automation
- Cloud Application Deployment

---

# 👨‍💻 Author

**Isha Jadhav**

B.Tech Computer Engineering

AWS • Python • Java • Cloud Computing

---

## ⭐ If you found this project useful, consider giving it a star!
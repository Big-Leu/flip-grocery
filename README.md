# Dummy Flipkart Grocery Web Application with Features extraction and freshness detection

## Overview

## Dashboard 
![Dashboard](/image/1.png)
This project simulates a basic online grocery store similar to Flipkart's grocery section. Users can browse different categories such as Staples, Snacks & Beverages, Packaged Food, and more. Additionally, the project includes an innovative Inventory Management section where items are detected in real-time using multiple camera angles and object detection via TensorFlow's Coco SSD model.

The system is designed to scan grocery items (such as packaged food, fruits, and vegetables), detect key product details like Brand Name, MRP, Expiry Date, and, for fruits and vegetables, it even estimates the Freshness Level.

## Features
![Features](/image/2.png)
### Grocery Store Features:
- **Navigation Bar**: Categories for easy browsing of grocery products such as Dals, Pulses, Ghee & Oils, Spices, Dry Fruits, and more.
- **Search Functionality**: Users can search for grocery items.
- **User Profile and Cart**: The application includes mock user profile management and cart integration.
- **Delivery Information**: Display of delivery location and estimated times.
- **Offer Zone**: Promotional offers with discounts on selected items.

### Inventory Section:
![Features](/image/3.png)
The application provides an interactive interface for scanning products in a real-time environment using the following features:

- **Camera Feeds**:
  - Supports three camera angles for object detection. This allows flexibility in capturing different views of the product.
  - Virtual cameras can be selected, and users can start and stop the feeds.

- **Object Detection**:
  - Uses TensorFlow's Coco SSD object detection model to detect items.
  - Objects like grocery products, fruits, and vegetables are automatically detected and identified.
  - Detection results are sent to the backend for further processing.

- **Product Details**:
  - After detection, the application fetches and displays details such as:
    - Brand Name
    - MRP
    - Expiry Date (if available)
    - Type of Object (packaged product, fruit, vegetable)

- **Freshness Detection (Fruits & Vegetables)**:
  - For fruits and vegetables, the freshness level is indicated on a scale of Rotten to Fresh with a confidence level ranging from 70% to 100%.
  - Freshness is determined by analyzing the scanned image using TensorFlow-based models.

- **Scanned Items Section**:
  - All the scanned products are listed for review.
  - Users can refresh the list to view newly scanned items.

## Technology Stack
- **Frontend**:
  - React.js: For the user interface and component management.
  - TensorFlow.js: Integrated for real-time object detection using the Coco SSD model.

- **Backend**:
  - Node.js and Express: For handling API requests and image processing.
  - Custom image processing: Backend processing for scanned products to extract metadata such as Brand, MRP, Expiry, etc.

## Installation

### Prerequisites
- Node.js: Download and install from [Node.js Official Site](https://nodejs.org/).
- NPM: Installed automatically with Node.js.
- TensorFlow.js: Ensure browser compatibility for TensorFlow.js.

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>

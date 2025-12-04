# Project Name

- The_Contactor

## Description

The Contactor is a TypeScript-based mobile application built with Expo, designed as a full replacement for the missing native Contacts app on iOS and Android. The app enables users to manage their personal contacts through an intuitive interface while adhering to clean architecture principles and modular code structure.

## Table of Contents

- Installation
- Features
- Technologies Used
- Platform Support
- Project Structure
- Setup Instructions
- Running the App
- Testing
- Screenshots
- Known Issues
- Future Improvements

### Navigate to project directory

`cd The_Contractor`

### Install dependencies

`npm install`

### Running the App

`npm run`

## Technologies Used

- React Native
- Expo
- Expo File System (expo-file-system)
- React Navigation
- Custom State Management / Data Utility (Util)
- Custom file Manager (Util)

## Platform Support

- iOS
- Android

### Primary Development Platform

- Primary Platform: iOS / Android
- Test Devices: iPhone 14, iPhone 16e, iPhone SE, Samsung s22, Pixel 5, iPhone 16 Pro Max
- OS Version: iOS 16.1, Windows 11.

### Platform-Specific Features

The application integrates multiple native platform-dependent features:

1. **Camera Access** – Capture contact photos using the device camera (iOS/Android).
2. **Photo Library Access** – Select images from the system gallery.
3. **File System Storage** – Read/write JSON contact files using `expo-file-system` in platform-specific directories.
4. **Phone Dialing** – Open the system dialer using `Linking.openURL('tel:')`.
5. **Keyboard-Aware Layout** – Adapts UI behavior on iOS vs Android using `KeyboardAvoidingView`.


## Setup Instructions

- Clone the repository: `git clone https://github.com/Wowa-penguin/T-488-MAPP_Assignment_II.git`

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Expo Go app (for local development)

### Environment Setup

1. Install React Native dependencies
2. Configure development environment
3. Set up emulators/simulators

## Known Issues

- All core features are functioning as expected, and no critical bugs have been encountered during testing.
- There is an expo warn when a picture is selected ([expo-image-picker] `ImagePicker.MediaTypeOptions` have been deprecated. Use `ImagePicker.MediaType` or an array of `ImagePicker.MediaType` instead)

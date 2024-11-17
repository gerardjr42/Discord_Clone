# Convex ChatVerse

Convex ChatVerse is a real-time communication platform built with modern web technologies. It allows users to create servers, add friends, and engage in text and video communication. This project aims to provide a seamless and interactive user experience for online communities.

## Table of Contents

- [Convex ChatVerse](#convex-chatverse)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Other Dependencies](#other-dependencies)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
    - [Logging In](#logging-in)
    - [Adding a Friend](#adding-a-friend)
    - [Creating Servers and Channels](#creating-servers-and-channels)
    - [Chatting and Video Calls](#chatting-and-video-calls)
  - [Contributing](#contributing)

## Introduction

Convex ChatVerse was created to explore the capabilities of real-time web applications using the latest technologies. It serves as a platform for users to connect, communicate, and collaborate in a virtual environment. Whether you're looking to chat with friends or host a video call, Convex ChatVerse provides the tools you need.

## Features

- **User Authentication**: Secure login and registration using Clerk.
- **Real-time Messaging**: Instant text communication with friends and groups.
- **Video Calls**: Host and join video calls using LiveKit.
- **Server and Channel Management**: Create and manage servers and channels for organized communication.
- **Friend System**: Add, accept, and manage friends.

## Tech Stack

### Frontend

- **Next.js**: A React framework for building fast and scalable web applications.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Shadcn/UI**: Accessible and customizable UI components.

### Backend

- **Convex**: A real-time data platform for serverless functions and database operations.
- **LiveKit**: A platform for real-time audio and video communication.

### Other Dependencies

- **Clerk**: User authentication and management.
- **Lucide React**: Icon library for React.
- **Sonner**: Toast notifications for user feedback.

## Getting Started

To get started with Convex ChatVerse, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/gerardjr42/Discord_Clone.git
   cd Discord_Clone
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

### Logging In

- Use the Clerk authentication system to log in or register a new account.

### Adding a Friend

- Navigate to the Friends section and use the "Add Friend" feature to send a friend request.

### Creating Servers and Channels

- Create a new server using the "Create Server" button.
- Within a server, create channels to organize conversations.

### Chatting and Video Calls

- Use the chat interface to send messages in real-time.
- Initiate video calls using the integrated LiveKit components.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

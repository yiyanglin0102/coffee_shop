# ☕ Coffee Shop Management System

A full-stack solution for managing coffee shop operations, built with AWS Amplify and React.

## Features

- **Multi-platform UI**: Responsive web + mobile-ready components
- **Real-time Sync**: Powered by AWS AppSync
- **Menu Management**: Categories, items, modifiers
- **Order Processing**: Ticket workflow from POS to kitchen
- **Inventory Tracking**: Stock level monitoring
- **Role-based Access**: Staff vs. admin permissions

## Architecture
```
src/
├── model/ # Domain models
├── view/ # Platform-specific UI
├── view-model/ # Shared business logic
├── services/ # AWS Amplify wrappers
└── App.js # Entry point

```


**Pattern**: Hybrid MVVM/MVC  
**State**: MobX/Recoil  
**Auth**: Amazon Cognito  

## Tech Stack
```
| Area           | Technology            |
| -------------- | --------------------- |
| Frontend       | React, Material-UI    |
| Mobile         | React Native          |
| Backend        | AWS Amplify (GraphQL) |
| Database       | DynamoDB              |
| Authentication | Cognito               |
| CI/CD          | Amplify Hosting       |
```
## Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-repo/coffee-shop.git
   cd coffee-shop

   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Amplify Configuration**
   ```bash
   amplify init
   amplify push
   ```

4. **Environment Variables**
   ```bash
   cp .env.example .env
   ```
5. **Run Development Server**
   ```bash
   npm start
   ```

## Deployment

    ```bash
   # Deploy to Amplify Hosting
   amplify publish
   
   # Deploy mobile builds
   amplify add hosting
   ```

## Environment Variables
```
| Variable             | Description                        |
|----------------------|------------------------------------|
| REACT_APP_API_KEY    | Amplify GraphQL API Key            |
| REACT_APP_REGION     | AWS Region (e.g. us-east-1)        |
```
## Project Structure
```
| Directory         | Contents                          |
|------------------|-----------------------------------|
| /amplify         | Backend infrastructure            |
| /src/model       | Business domain models            |
| /src/view        | React components (organized by platform) |
| /src/services    | AWS service wrappers              |
```

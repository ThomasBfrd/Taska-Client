# 📌 Taska (Client)

[![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?logo=angular&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![Apollo GraphQL](https://img.shields.io/badge/Apollo%20GraphQL-311C87?logo=apollographql&logoColor=fff)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=fff)](#)


Taska is a web application that provides a personalized dashboard for managers and employees, based on a feature flag system depending on the user's role.

## ✨ Features

### Authentication
- Email/password login with JWT token management
- Role-based access control

### Dynamic Dashboard
- Personalized dashboard based on user role
- Feature flag system with auto-configured UI
- Color-coded cards by feature type

### Feature Flag System

Features are dynamically loaded based on user permissions. 
Card configuration in `card-config.ts`:

``` typescript
export const CARDS: Record<string, FeatureData> = {
  "planning": {color: "sky", icon: "calendar_month", title: "Planning", details: "Aujourd'hui"},
  "active-employees": {color: "sky", icon: "productivity", title: "Membres actifs", details: "Aujourd'hui"},
  // ...
}
```
Then, the features are automaticly loaded in the dashboard when the feature key with their data are received.

## 🛠️ Tech Stack
- Angular 21
- NestJS
- TypeScript
- Tailwind
- Mongoose
- Apollo
- GraphQL
- Vitest

## 📋 Prerequisites
- Node.js (version 22.20.0 or higher)

## 🔧 Installation
Clone the repository, then type in the command line : ```npm i```

- Run in development: ```npm run start```
- Build: ```npm run build```

## 🚀 Getting Started

### Access to your API
Define your api url in your environment files.
If you only want to test the client, you can keep the railway API.

**Employee demo access** : </br>
employee@demo.com / Demo123!

**Manager demo access** : </br>
manager@demo.com / Demo456!

## 🧪 Testing
The project uses Vitest for testing:

- Run unit tests: `npm run test`
- Generate coverage report: `npm run coverage`

## 🖼️ Screenshots
![TaskaLogin](https://i.postimg.cc/fTR2kh8C/image.png)
![TaskaDashboard](https://i.postimg.cc/pdkyW7kw/image.png)

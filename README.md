# TaskSphere - Full-Stack Task Management System

[![CI Pipeline](https://github.com/OWNER/REPOSITORY/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPOSITORY/actions/workflows/ci.yml)
![Node Version](https://img.shields.io/badge/node-20.x-green.svg)
![Docker](https://img.shields.io/badge/docker-compose-blue.svg)
![Jest](https://img.shields.io/badge/tested%20with-jest-red.svg)

A modern, containerized full-stack Task Management application featuring asynchronous background processing with Node.js `EventEmitter`, in-memory caching, multi-stage Docker orchestration, and an automated GitHub Actions CI/CD pipeline.

---

## Architecture Overview

```text
GitHub Push / PR
       │
       ▼
GitHub Actions CI Pipeline (.github/workflows/ci.yml)
├── Job 1: Code Quality & Linting (oxlint + node --check)
└── Job 2: Build & Automated Testing (Jest + Supertest)
       │
       ▼
Deploy / Run via Docker Compose (docker-compose.yml)
├── taskmanager-frontend (React, Vite multi-stage build, Port 5173)
├── taskmanager-backend  (Node/Express API, EventEmitter, Port 5000)
└── taskmanager-mongodb  (Official MongoDB image + Named Volume, Port 27017)
```

---

## Automated CI/CD Pipeline (Practical 12)

The CI/CD pipeline runs on every push and pull request targeting the `main` branch:

1. **Lint Job**: Validates frontend code with `oxlint` and verifies backend syntax with `node --check`.
2. **Build & Test Job**: Installs clean production dependencies with `npm ci` and runs the automated Jest test suite.
3. **Status Reporting**: Reports a green checkmark (`✔ Passed`) on GitHub upon success, or a red X (`✖ Failed`) with step-by-step logs if any test fails.

### Running Tests Locally
```bash
cd task-manager-api
npm test
```

---

## Running with Docker Compose (Practical 11)

To run the entire 3-tier container stack locally:
```bash
docker compose up --build -d
```
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000](http://localhost:5000)
- Database: Port 27017 (persistent volume `mongo-data`)

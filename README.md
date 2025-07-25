# Turbo - Containerized Next.js Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) that has been containerized for deployment.

## Getting Started - Development Mode

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker Containerization

### Building the Docker Image

1. Start the container system if not already running:

```bash
container system start
```

2. Build the Docker image using the macOS container CLI:

```bash
container build --tag turbo .
```

3. Verify the image was created:

```bash
container images ls
```

### Running the Container

1. Run the container:

```bash
container run --name turbo-app turbo
```

2. Check if the container is running:

```bash
container ls
```

The output will show the container's IP address (e.g., 192.168.64.3).

### Accessing the Application

The application isn't directly accessible via localhost due to limitations in the macOS container CLI. Use one of the following methods:

1. Direct access via container IP:

```bash
curl http://192.168.64.3:3000
```

2. Set up a socat relay to forward traffic from localhost to the container:

```bash
socat TCP-LISTEN:3001,reuseaddr,fork TCP:192.168.64.3:3000
```

Then access via: http://localhost:3001

## API Endpoints

### Signup API

The application includes a signup API endpoint that returns a 200 status code and includes the email in the response:

```bash
# Test locally
curl -X POST http://localhost:3000/api/signup -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"test123"}' -v

# Test via container (direct)
curl -X POST http://192.168.64.3:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Test via socat relay
curl -X POST http://localhost:3001/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

Expected response:

```json
{
  "success": true,
  "message": "Signup successful",
  "email": "test@example.com"
}
```

# City Population Service

This project provides a REST API for getting and setting city population data using Node.js, Redis, and Express. Response times are optimized with the use of Redis as an in-memory data store. The server created can handle high throughput for reads and writes (over 100,000 ops/sec).

### Homebrew

Homebrew is used to install `redis` so that we can run `redis-server` and feed the data into memory. If you have homebrew installed on the system that this script runs on, you will be fine. If not, find the link for Redis below.

## Getting Started

To run this project, you will need:

- Homebrew
- [Redis]([Title](https://redis.io/)) 
- Node.js v18

### Install

```bash
npm install
```

### Start

```bash
npm start
```

### Example Usage

```bash
# Test for city that exists
GET /api/population/state/:state/city/:city
GET http://127.0.0.1:5555/api/population/state/Alabama/city/Marion

# Add a new state and city
PUT http://127.0.0.1:5555/api/population/state/Foo/city/Baz 
Content-Type: text/plain

99
```

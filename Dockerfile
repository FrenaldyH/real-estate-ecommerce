# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM golang:1.25-alpine AS builder

WORKDIR /app

# Download dependencies first (cached layer)
COPY go.mod go.sum ./
RUN go mod download

# Copy source and compile
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/main.go

# ── Stage 2: Run ──────────────────────────────────────────────────────────────
FROM alpine:3.20

WORKDIR /app

# ca-certificates needed for HTTPS calls to Gemini API
RUN apk add --no-cache ca-certificates tzdata

COPY --from=builder /app/server .

# Create logs directory
RUN mkdir -p logs

EXPOSE 8080

CMD ["./server"]

FROM golang:1.21.1-alpine as build

RUN apk add alpine-sdk

RUN mkdir /app
WORKDIR /app
COPY ./ .

RUN go clean --modcache

RUN GOOS=linux GOARCH=amd64 go build -a -tags musl -a -installsuffix cgo -o main cmd/main.go
RUN go mod download
RUN ls -a

FROM golang:alpine
COPY --from=build /app/main /

WORKDIR /

COPY server.crt .
COPY server.key .

CMD ["/main"]

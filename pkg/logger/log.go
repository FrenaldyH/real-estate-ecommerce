package logger

import (
	"io"
	"log"
	"log/slog"
	"os"
	"time"
)

var Log *slog.Logger

func Init() {
	err := os.MkdirAll("logs", 0755)
	if err != nil {
		log.Fatalf("Failed to create logs directory: %v", err)
	}

	filename := "logs/" + time.Now().Format("2006-01-02") + ".log"

	file, err := os.OpenFile(filename, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	if err != nil {
		log.Fatalf("Failed to create log file: %v", err)
	}

	multi := io.MultiWriter(os.Stdout, file)

	Log = slog.New(slog.NewJSONHandler(multi, &slog.HandlerOptions{
		Level: slog.LevelDebug,
	}))
}

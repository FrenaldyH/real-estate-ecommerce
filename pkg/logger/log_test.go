package logger_test

import (
	"bytes"
	"encoding/json"
	"log/slog"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
)

func TestLoggerInitialized(t *testing.T) {
	if logger.Log == nil {
		t.Fatal("Logger is not initialized")
	}
}

func TestLogFileCreated(t *testing.T) {
	filename := "logs/" + time.Now().Format("2006-01-02") + ".log"
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		t.Fatalf("Log file %s does not exist", filename)
	}
}

func newTestLogger(buf *bytes.Buffer) *slog.Logger {
	return slog.New(slog.NewJSONHandler(buf, &slog.HandlerOptions{
		Level: slog.LevelDebug,
	}))
}

func TestOutputFormat(t *testing.T) {
	var buf bytes.Buffer
	testLog := newTestLogger(&buf)

	testLog.Info("test message", "key", "value")

	var result map[string]any

	// Check if the output is valid JSON
	if err := json.Unmarshal(buf.Bytes(), &result); err != nil {
		t.Fatalf("Output JSON is not valid: %v", err)
	}

	// Check if all expected fields are present
	for _, field := range []string{"time", "level", "msg"} {
		if _, ok := result[field]; !ok {
			t.Errorf("Expected field '%s' not found in log output", field)
		}
	}

	if result["msg"] != "test message" {
		t.Errorf("Expected message 'test message', got '%s'", result["msg"])
	}
}

// Test: Level DEBUG should be logged correctly in JSON format
func TestLogLevelDebug(t *testing.T) {
	var buf bytes.Buffer
	testLog := newTestLogger(&buf)

	testLog.Debug("debug message")

	if !strings.Contains(buf.String(), "debug message") {
		t.Error("Expected debug message to be logged, but it was not found in output")
	}
}

// Test: Level ERROR should be logged correctly in JSON format
func TestLogLevelError(t *testing.T) {
	var buf bytes.Buffer
	testLog := newTestLogger(&buf)

	testLog.Error("something went wrong", "error", "db timeout")

	var result map[string]any
	json.Unmarshal(buf.Bytes(), &result)

	if result["level"] != "ERROR" {
		t.Errorf("Expected level 'ERROR', got '%s'", result["level"])
	}
}

// Cleanup: Remove log files created during tests
func TestMain(m *testing.M) {
	code := m.Run()
	os.RemoveAll("logs")
	os.Exit(code)
}

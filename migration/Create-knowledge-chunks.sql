
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS knowledge_chunks (
    id         BIGSERIAL PRIMARY KEY,
    source     VARCHAR(20)    NOT NULL,
    ref_id     BIGINT,
    title      TEXT           NOT NULL,
    content    TEXT           NOT NULL,
    embedding  vector(3072),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_source ON knowledge_chunks(source);
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_ref_id ON knowledge_chunks(ref_id);
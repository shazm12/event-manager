-- Event Management Database Schema
-- This file contains the SQL commands to create the database tables

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    max_capacity INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for events table
CREATE INDEX IF NOT EXISTS ix_events_id ON events(id);
CREATE INDEX IF NOT EXISTS ix_events_name ON events(name);

-- Create attendees table
CREATE TABLE IF NOT EXISTS attendees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    event_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Create indexes for attendees table
CREATE INDEX IF NOT EXISTS ix_attendees_id ON attendees(id);
CREATE INDEX IF NOT EXISTS ix_attendees_name ON attendees(name);
CREATE INDEX IF NOT EXISTS ix_attendees_email ON attendees(email);
CREATE INDEX IF NOT EXISTS ix_attendees_event_id ON attendees(event_id);

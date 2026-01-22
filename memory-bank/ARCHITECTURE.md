# Cockpit CMS Architecture

This document provides a high-level architectural overview of the Cockpit Content Platform, a headless CMS built with PHP.

---

## Frameworks and Versions

### Core Technology Stack

- **PHP Version**: 8.3.0 (minimum required)
- **Cockpit Version**: 2.13.3
- **Core Framework**: Lime (custom micro-framework bundled with Cockpit)
- **Console Framework**: Symfony Console 5.3

### Major Dependencies

- **HTTP Client**: Guzzle 7.4.5
- **Database Abstraction**: MongoHybrid (supports MongoDB and MongoLite/SQLite)
- **File Storage**: League Flysystem 3.0 with AWS S3 support
- **Authentication**: Firebase PHP-JWT 6.0, OpenID Connect (jumbojett/openid-connect-php)
- **GraphQL**: webonyx/graphql-php 15.0
- **API Documentation**: Swagger PHP (zircote/swagger-php) 5.0
- **Email**: PHPMailer 6.4
- **Image Processing**: SimpleImage (claviska/simpleimage), ColorThief PHP
- **Security**: Two-Factor Authentication (robthree/twofactorauth)

---

## Application Logic Patterns

### Request Lifecycle

The application follows a single entry point pattern where all requests flow through the main index.php file. The request processing distinguishes between two primary modes:

1. **Admin Interface Requests**: Standard web requests for the administrative dashboard
2. **API Requests**: RESTful and GraphQL API requests (identified by /api/ prefix)

Request processing includes automatic CORS handling for API requests, session initialization for admin requests, and event-driven lifecycle hooks.

### Routing Architecture

The Lime framework provides a flexible routing system supporting:

- **Exact path matching**: Routes defined as literal strings
- **Wildcard routes**: Using asterisk patterns for catch-all segments
- **Parameter routes**: Named parameters with colon prefix notation
- **Regular expression routes**: Custom patterns enclosed in hash marks
- **Class-based routing**: Controllers bound to route namespaces

Routes can be conditionally registered and support HTTP method filtering for GET, POST, and other request types.

### Controller Pattern

Controllers extend the AppAware base class, receiving the application context and request parameters. Actions are invoked dynamically based on URL segments, with a fallback catch-all mechanism for undefined actions.

### Event-Driven Architecture

The application extensively uses an event system for extensibility:

- **Lifecycle events**: bootstrap, before, after, shutdown
- **Module events**: app.admin.init, app.api.init, app.api.request, app.cli.init
- **Content events**: content.item.save.before, content.item.save, content.remove.before
- **Asset events**: assets.asset, assets.asset.update, assets.asset.remove
- **System events**: error, app.system.cache.flush

Events support priority ordering and can halt propagation by returning false.

---

## Software Design Patterns

### Singleton Pattern

The Cockpit class implements a singleton-like pattern through a static instance registry, allowing multiple isolated instances per environment directory while preventing duplicate initialization.

### Service Locator Pattern

The Lime\App class acts as a service container, providing lazy-loaded services through closure-based registration. Services are instantiated on first access and cached for subsequent requests.

### Module Pattern

The application uses a modular architecture where self-contained modules register their own routes, helpers, and event handlers during the bootstrap phase. Each module contains:

- Bootstrap file for initialization
- Admin configuration for dashboard integration
- API endpoints for programmatic access
- CLI commands for console operations

### Helper Pattern

Reusable functionality is encapsulated in Helper classes that extend Lime\Helper. Helpers are registered with the application and accessed through lazy instantiation.

### Observer Pattern

The event system implements an observer pattern where components can subscribe to named events and receive notifications with optional priority ordering.

### Adapter Pattern

Database and file storage implementations use adapters to abstract underlying storage mechanisms:

- MongoHybrid provides a unified interface for MongoDB and SQLite-based storage
- FileStorage adapts League Flysystem for file operations with multiple backend support

### Factory Pattern

Content model creation and instantiation uses factory methods within the content module to generate properly structured data objects.

---

## Component Relations

### Core Components

```
Cockpit (Bootstrap)
    |
    +-- Lime\App (Application Core)
    |       |
    |       +-- Registry (Configuration Storage)
    |       +-- Routes (URL Routing)
    |       +-- Events (Event Dispatcher)
    |       +-- Helpers (Utility Services)
    |       +-- Paths (Path Resolution)
    |
    +-- Services
            |
            +-- dataStorage (MongoHybrid\Client)
            +-- fileStorage (FileStorage/Flysystem)
            +-- memory (MemoryStorage\Client)
            +-- search (IndexHybrid\Manager)
            +-- mailer (Mailer)
            +-- gql (GraphQL Query Processor)
            +-- restApi (REST API Processor)
```

### Module Hierarchy

- **App Module**: Core application functionality, authentication, theming, GraphQL/REST services
- **System Module**: User management, API keys, locales, logging, revisions, spaces management, worker processes
- **Content Module**: Content models, collections, singletons, trees, content population
- **Assets Module**: Media file management, image processing, thumbnails, presets
- **Finder Module**: File browser functionality for storage exploration
- **Identi Module**: OpenID Connect integration for single sign-on
- **Updater Module**: Application update management

### Helper Dependencies

```
App Helpers:
- App, Acl, Async, Auth, Csrf, i18n, ResponseCache, JWT

System Helpers:
- Api, Locales, License, Log, Revisions, System, Spaces, Worker

Content Helpers:
- Content, Model, LinkedContentFilter

Asset Helpers:
- Asset
```

---

## Database Models

### Storage Architecture

The system uses a document-oriented storage model with two supported backends:

1. **MongoLite**: SQLite-based document storage with MongoDB-compatible query syntax (default)
2. **MongoDB**: Native MongoDB support for production deployments

### Core Collections

- **system/users**: User accounts with authentication credentials, roles, and API keys
- **system/api_keys**: API key definitions with role assignments
- **content/singletons**: Single-instance content items with model association
- **content/collections/{modelName}**: Dynamic collections per content model
- **assets**: Media file metadata and references
- **assets/folders**: Asset organization hierarchy

### Content Model Structure

Content models define schema for collections, singletons, and tree structures with:

- Field definitions with types, options, and validation rules
- Internationalization (i18n) support per field
- Multi-value field support
- Default values and required field configuration
- Unique field constraints
- Linked content reference resolution

### Document Metadata

All content documents include system metadata:

- **_id**: Unique document identifier
- **_created**: Creation timestamp
- **_modified**: Last modification timestamp
- **_cby**: Created-by user reference
- **_mby**: Modified-by user reference
- **_state**: Publication state indicator
- **_model**: Model association (for singletons)
- **_pid**: Parent reference (for tree structures)
- **_o**: Order index (for tree structures)

---

## Critical Architectural Decisions

### API Structure

The API layer supports two query paradigms:

1. **REST API**: Path-based endpoints with HTTP method semantics, supporting custom file-based routes in config/api directory
2. **GraphQL**: Single endpoint at /api/gql with schema introspection and variable support

API authentication accepts:

- API keys in header (api-key) or query parameter (api_key)
- User API keys with USR- prefix for user-context requests
- JWT tokens for stateless authentication
- Public token for anonymous access

### Authentication Architecture

- **Session-based**: Admin interface uses PHP sessions with CSRF protection
- **Token-based**: API access through API keys or JWT
- **OpenID Connect**: External identity provider integration via Identi module
- **Two-Factor Authentication**: TOTP-based second factor support
- **Password Security**: bcrypt hashing with password_hash/password_verify

### Multi-Tenancy (Spaces)

The system supports multiple isolated instances (spaces) from a single codebase:

- Spaces stored in .spaces directory
- Each space has independent configuration, storage, and content
- URL pattern /:spacename/ routes to space-specific instance
- CLI operations support --space flag for space selection

### Caching Strategy

- **File-based cache**: PHP file caching for module manifests and compiled assets
- **Memory cache**: RedisLite (SQLite-based) for key-value storage with encryption
- **Response cache**: Optional API response caching with configurable duration
- **OPcache integration**: Automatic invalidation on cache flush

### Background Processing

The system includes a worker infrastructure for asynchronous operations:

- **CLI worker**: Long-running process via tower command
- **Web worker**: HTTP-triggered background processing through cron.php
- **Queue processing**: Worker helper manages task queues and execution

### File Storage Abstraction

File operations use Flysystem abstraction with registered storage adapters:

- **Local filesystems**: Default storage with path aliases (#root, #uploads, #cache, #tmp)
- **AWS S3**: Optional cloud storage integration
- **Custom adapters**: Extensible through configuration

### Search Capabilities

Full-text search through IndexHybrid abstraction:

- **IndexLite**: SQLite-based search index (default)
- **Meilisearch**: Optional external search engine integration

### Internationalization

- Multiple locale support with configurable default
- Per-field i18n enabling for content models
- Automatic locale resolution in content queries
- Translation helper for interface strings

---

## Security Considerations

### Input Validation

- SVG sanitization for uploaded vector graphics
- File type restrictions with forbidden extensions and MIME types
- Upload size limits configurable per installation
- SQL injection prevention through parameterized queries

### Access Control

- Role-based permissions through ACL helper
- API rate limiting for request throttling
- Origin validation for cross-origin requests
- Session fixation prevention through regeneration

### Configuration Security

- Environment variable support via .env files
- Secret key configuration for encryption operations
- Separate security key from default placeholder required

---

*Document generated for AI agent consumption - focuses on architectural patterns and component relationships*

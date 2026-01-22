# Cockpit CMS - Product Requirements Document

> Current State Documentation | Version 2.13.3

---

## 1. Overview

### Project Description

Cockpit is a self-hosted, headless content management system (CMS) built with PHP. It provides a flexible, API-first platform for managing structured content that can be delivered to any frontend application, website, or service through REST and GraphQL APIs.

### Purpose

Cockpit serves as a content backend that separates content management from content presentation. This headless approach enables development teams to:

- Manage structured content through a modern web interface
- Deliver content to any platform via standardized APIs
- Support multiple frontend technologies simultaneously
- Maintain content independently of presentation layer changes

### Target Users

**Primary Users:**
- **Content Editors**: Non-technical users who create, edit, and publish content through the admin interface
- **Developers**: Technical users who integrate content APIs into frontend applications and customize the CMS

**Secondary Users:**
- **System Administrators**: Users responsible for installation, configuration, and user management
- **API Consumers**: External services and applications that consume content through APIs

### Core Value Proposition

Cockpit provides a lightweight, self-hosted alternative to SaaS headless CMS solutions with:
- Full data ownership and control
- Flexible deployment options (PHP hosting, Docker containers)
- No vendor lock-in
- Customizable through modules and addons

---

## 2. Current Features

### Content Management

**Collections**
- Define custom content structures with configurable field types
- Store multiple items per collection with full CRUD operations
- Support pagination, filtering, and sorting of collection items
- Per-field internationalization (i18n) support
- Draft/published state management

**Singletons**
- Single-instance content items for unique pages or settings
- Ideal for global content like site settings, home pages, or contact information
- Same field configuration capabilities as collections

**Trees**
- Hierarchical content structures with parent-child relationships
- Useful for navigation menus, categories, or nested content
- Automatic ordering and position management

**Content Models**
- Visual model builder for defining content structures
- Extensive field type library including text, rich text, boolean, number, date, select, assets, repeater, and more
- Field validation rules and default values
- Unique field constraints
- Linked content references between models

### Asset Management

**Media Library**
- Upload and organize files (images, documents, videos)
- Folder-based organization system
- Metadata storage for all assets
- Search and filter capabilities

**Image Processing**
- On-the-fly image transformations and thumbnails
- Preset-based image processing rules
- Support for common image formats
- Placeholder generation (Thumbhash)
- Color extraction from images

### User Management

**Authentication**
- Username/password authentication with bcrypt hashing
- API key authentication for programmatic access
- JWT token support for stateless authentication
- Magic link login option
- Password reset functionality
- Two-Factor Authentication (TOTP)
- OpenID Connect integration for single sign-on

**Authorization**
- Role-based access control (RBAC)
- Granular permissions per resource type
- Admin and user role separation
- API key permission scoping

### System Administration

**Locale Management**
- Multiple language support
- Interface translation capabilities
- Content localization per field

**Logging and Revisions**
- Activity logging for audit trails
- Content revision history
- Revision comparison and restoration

**API Key Management**
- Create and manage API keys
- Assign roles and permissions to keys
- User-specific API keys with USR- prefix

### Developer Features

**Webhooks and Events**
- Event-driven architecture for extensibility
- Lifecycle events for content operations
- System events for cache and error handling

**CLI Tools**
- Command-line interface via "tower" command
- Cache management commands
- User management commands
- Update management
- Worker process control
- Locale export/import

**Addon System**
- Modular architecture for extensions
- Custom module development support
- Third-party addon installation

---

## 3. Technical Stack

### Backend Technologies

| Component | Technology | Version |
|-----------|------------|---------|
| Language | PHP | 8.3.0+ |
| Framework | Lime (custom micro-framework) | Bundled |
| Console | Symfony Console | 5.3 |
| HTTP Client | Guzzle | 7.4.5 |

### Database

| Type | Technology | Description |
|------|------------|-------------|
| Default | MongoLite (SQLite-based) | MongoDB-compatible query syntax on SQLite |
| Production | MongoDB | Native MongoDB support |
| Search | IndexLite / Meilisearch | Full-text search capabilities |
| Memory | RedisLite | Key-value caching with encryption |

### File Storage

| Adapter | Purpose |
|---------|---------|
| Local Filesystem | Default storage for uploads and cache |
| AWS S3 | Cloud storage integration |
| Flysystem | Storage abstraction layer |

### Authentication Libraries

| Library | Purpose |
|---------|---------|
| Firebase PHP-JWT | JWT token handling |
| OpenID Connect (jumbojett) | SSO integration |
| TwoFactorAuth (robthree) | TOTP 2FA support |

### API Technologies

| Technology | Purpose |
|------------|---------|
| REST API | Path-based endpoints with HTTP semantics |
| GraphQL (webonyx) | Schema-driven query interface |
| Swagger PHP (zircote) | API documentation generation |

### Supporting Libraries

| Library | Purpose |
|---------|---------|
| PHPMailer | Email sending |
| SimpleImage (claviska) | Image manipulation |
| ColorThief PHP | Color extraction |

---

## 4. Design System

### Theme Support

Cockpit implements a dual-theme system with automatic system preference detection:

- **Dark Theme (Default)**: Deep navy backgrounds (#131720) with near-white text (#fafafa)
- **Light Theme**: Light gray backgrounds (#f6f8fa) with near-black text (#121212)

### Typography

**Font Stack**: System fonts for native appearance
- Apple platforms: SF Pro Display
- Windows: Segoe UI
- Cross-platform fallbacks: Helvetica, Arial

**Type Scale**: Modular scale from 0.875rem (small) to 3.5rem (hero text)

### Color System

| Purpose | Dark Theme | Light Theme |
|---------|------------|-------------|
| Primary | #0e8fff (Blue) | #8932ff (Purple) |
| Success | #4caf50 (Green) | #4caf50 (Green) |
| Danger | #f91941 (Red) | #f91941 (Red) |

### Frontend Framework

- **Vue.js 3**: Component-based reactive UI
- **Kiss CSS**: Custom lightweight CSS framework
- **Web Components**: Encapsulated UI elements (kiss-dialog, kiss-card, kiss-grid, etc.)
- **Material Icons Outlined**: Icon system

### Accessibility Features

- WCAG-compliant color contrast
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion preference support
- RTL (Right-to-Left) language support

---

## 5. Project Structure

### Directory Organization

```
Cockpit/
|-- bootstrap.php      # Application initialization
|-- index.php          # Web entry point
|-- tower              # CLI entry point
|-- cron.php           # Background task processor
|-- modules/           # Core application modules
|-- lib/               # Third-party libraries
|-- storage/           # Runtime data (gitignored)
|-- config/            # Configuration files (gitignored)
```

### Core Modules

| Module | Purpose |
|--------|---------|
| App | Core functionality, authentication, admin UI, GraphQL/REST services |
| Content | Content models, collections, singletons, trees |
| Assets | Media file management, image processing |
| System | User management, API keys, locales, logging, spaces |
| Finder | File browser functionality |
| Identi | Avatar generation, OpenID Connect |
| Updater | Application update management |

### Module Structure Pattern

Each module follows a consistent organization:
- `bootstrap.php` - Initialization and event bindings
- `admin.php` - Admin routes and menu registration
- `api.php` - REST API endpoints
- `cli.php` - CLI commands (optional)
- `Controller/` - HTTP request handlers
- `Helper/` - Service classes
- `views/` - PHP templates
- `assets/` - Frontend resources

---

## 6. API Capabilities

### REST API

**Endpoint Structure**: `/api/{resource}/{action}`

**Authentication Methods**:
- API key header: `api-key: YOUR_KEY`
- API key parameter: `?api_key=YOUR_KEY`
- User API key: Keys with `USR-` prefix for user-context
- JWT Bearer token
- Public token for anonymous access

**Content Operations**:
- List items with filtering, sorting, pagination
- Get single item by ID
- Create new items
- Update existing items
- Delete items
- Bulk operations

**Asset Operations**:
- Upload files
- List assets with filtering
- Get asset metadata
- Delete assets
- Image transformation requests

### GraphQL API

**Endpoint**: `/api/gql`

**Features**:
- Schema introspection
- Variable support
- Query and mutation operations
- Type definitions for content models
- Built-in GraphiQL IDE for exploration

**Query Capabilities**:
- Fetch collections and singletons
- Filter with MongoDB-style queries
- Populate linked content references
- Request specific fields

### API Documentation

- OpenAPI/Swagger specification generation
- Self-documenting API structure
- Interactive documentation via Swagger UI

---

## 7. Authentication and Security

### Authentication Mechanisms

| Method | Use Case |
|--------|----------|
| Session-based | Admin interface with CSRF protection |
| API Keys | Server-to-server communication |
| JWT Tokens | Stateless authentication for APIs |
| Magic Links | Passwordless email login |
| 2FA (TOTP) | Enhanced account security |
| OpenID Connect | Enterprise SSO integration |

### Security Features

**Input Protection**:
- SVG sanitization for vector uploads
- File type restrictions (forbidden extensions and MIME types)
- Upload size limits
- SQL injection prevention through parameterized queries

**Access Control**:
- Role-based permissions (ACL)
- API rate limiting
- CORS origin validation
- Session fixation prevention

**Configuration Security**:
- Environment variable support via .env files
- Encrypted memory storage
- Configurable secret keys

---

## 8. Multi-tenancy (Spaces)

### Overview

Cockpit supports multiple isolated instances (spaces) running from a single codebase, enabling:
- Separate content environments (development, staging, production)
- Multi-tenant SaaS deployments
- Isolated client projects

### Space Architecture

- Spaces stored in `.spaces/` directory
- Each space maintains independent:
  - Configuration files
  - Database storage
  - User accounts
  - Content and assets
  - Locale settings

### Access Patterns

- **Web**: URL pattern `/:spacename/` routes to specific space
- **CLI**: `--space` flag selects target space
- **API**: Space-aware authentication and routing

---

## 9. Content Management Details

### Field Types

| Category | Types |
|----------|-------|
| Text | Text, Textarea, Wysiwyg, Markdown, Code |
| Data | Boolean, Number, Date, Time, DateTime |
| Selection | Select, Tags, Checkboxes |
| Media | Asset, Assets (multiple), Gallery |
| Relationships | Content Link, Content Links |
| Structure | Object, Set, Repeater |
| Special | Color, Layout, Custom |

### Content Features

**Internationalization**:
- Per-field i18n toggle
- Multiple locale support
- Automatic locale resolution in queries

**Validation**:
- Required field enforcement
- Unique value constraints
- Custom validation rules

**Metadata**:
- Automatic timestamps (_created, _modified)
- User tracking (_cby, _mby)
- Publication state (_state)
- Parent references for trees (_pid)
- Sort order (_o)

### Content Population

- Automatic resolution of linked content references
- Configurable population depth
- Circular reference handling

---

## 10. Asset Management Details

### Supported Operations

**Upload**:
- Single and multiple file uploads
- Drag-and-drop support
- Progress tracking with Uppy library

**Organization**:
- Folder hierarchy management
- Metadata editing
- Tagging capabilities
- Search and filtering

**Processing**:
- Image resizing and cropping
- Format conversion
- Thumbnail generation
- Preset-based transformations
- Color palette extraction

### Storage Paths

| Alias | Location | Purpose |
|-------|----------|---------|
| #root | Project root | Base path |
| #uploads | storage/uploads | User uploads |
| #cache | storage/cache | Processed assets |
| #tmp | storage/tmp | Temporary files |

---

## 11. Related Documentation

For detailed technical information, refer to the following documentation files:

| Document | Path | Description |
|----------|------|-------------|
| Architecture | `memory-bank/ARCHITECTURE.md` | Comprehensive backend architecture, frameworks, design patterns, database models, and critical architectural decisions |
| Design | `memory-bank/DESIGN.md` | Frontend UI/UX design system including colors, typography, spacing, component patterns, and accessibility features |
| Structure | `memory-bank/STRUCTURE.md` | Complete file and directory organization, module structure patterns, and naming conventions |

---

## Document Information

| Attribute | Value |
|-----------|-------|
| Document Type | Product Requirements Document (Current State) |
| Cockpit Version | 2.13.3 |
| PHP Requirement | 8.3.0+ |
| Last Updated | 2026-01-22 |

---

*This document describes the current implemented state of Cockpit CMS, not planned or future features.*

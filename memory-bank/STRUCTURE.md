# Cockpit CMS - Project Structure

> File and directory organization reference for AI agents

## File Tree Overview

```
Cockpit/
|-- bootstrap.php          # Application bootstrap and Cockpit class definition
|-- index.php              # Web entry point for admin interface
|-- tower                  # CLI entry point (Symfony Console application)
|-- cron.php               # Scheduled task execution (web and CLI modes)
|-- composer.json          # PHP dependency definitions
|-- package.json           # Node.js tooling definitions
|-- Dockerfile             # Container build configuration
|-- favicon.png            # Application icon
|-- robots.txt             # Search engine directives
|-- .htaccess              # Apache server configuration
|-- .editorconfig          # Code style settings
|-- .deepsource.toml       # Static analysis configuration
|-- .npmrc                 # NPM registry settings
|
|-- install/               # First-time setup wizard
|   `-- index.php          # Installation script
|
|-- modules/               # Core application modules (detailed below)
|-- lib/                   # Third-party libraries and utilities (vendor-like)
|-- storage/               # Runtime data directories (gitignored contents)
|-- addons/                # Optional extension modules (gitignored)
|-- memory-bank/           # AI agent documentation files
|
|-- AGENTS.md              # AI agent behavior guidelines
|-- CHANGELOG.md           # Version history
|-- README.md              # Project documentation
|-- SECURITY.md            # Security policies
|-- LICENSE                # MIT License
```

## Critical Files

### Entry Points

| File | Purpose |
|------|---------|
| `index.php` | Main web entry point - initializes admin interface |
| `tower` | CLI executable for command-line operations |
| `cron.php` | Background task processor (supports web and CLI invocation) |
| `install/index.php` | One-time installation wizard |

### Core Bootstrap

| File | Purpose |
|------|---------|
| `bootstrap.php` | Application initialization - defines `Cockpit` class, version constant, autoloading, and environment setup |
| `lib/_autoload.php` | Library autoloader registration |

### Configuration Files

| File | Purpose |
|------|---------|
| `composer.json` | PHP dependencies and autoloading configuration |
| `package.json` | Frontend build tooling dependencies |
| `.htaccess` | Apache rewrite rules and security headers |
| `.editorconfig` | Cross-editor code formatting standards |
| `.deepsource.toml` | Code quality analysis settings |

**Note**: Runtime configuration is stored in `config/` directory (gitignored) and supports `.env` files for environment variables.

## Modules Directory Organization

All functional modules follow a consistent internal structure:

```
modules/
|-- App/                   # Core application module (authentication, admin UI)
|-- Assets/                # Media and file asset management
|-- Content/               # Content models, collections, and data management
|-- Finder/                # File browser functionality
|-- Identi/                # Avatar generation and identity services
|-- System/                # System administration (users, API, settings, locales)
|-- Updater/               # Application update management
```

### Standard Module Structure

Each module follows this organizational pattern:

```
ModuleName/
|-- bootstrap.php          # Module initialization and event bindings
|-- admin.php              # Admin routes and menu registration
|-- api.php                # REST API endpoint definitions
|-- cli.php                # CLI command registration (optional)
|-- icon.svg               # Module icon for admin UI (optional)
|-- README.md              # Module-specific documentation
|
|-- Controller/            # HTTP request handlers
|-- Helper/                # Utility classes and services
|-- Command/               # CLI command implementations (optional)
|-- GraphQL/               # GraphQL schema and resolvers (optional)
|-- RestApi/               # REST API query handlers (optional)
|-- Exception/             # Custom exception classes (optional)
|-- Utils/                 # Module-specific utilities (optional)
|-- data/                  # Static data files (optional)
|
|-- views/                 # PHP view templates
|-- layouts/               # Page layout templates (App module only)
|-- emails/                # Email templates (App module only)
|
|-- assets/                # Frontend resources
    |-- css/               # Stylesheet files
    |-- js/                # JavaScript files
    |-- img/               # Images
    |-- fonts/             # Font files (optional)
    |-- icons/             # SVG icon sets (optional)
    |-- components/        # Reusable UI components
    |-- vue-components/    # Vue.js components
    |-- dialogs/           # Modal dialog components
    |-- vendor/            # Third-party frontend libraries
```

### Module-Specific Notes

**App Module** - Core application functionality:
- Contains `layouts/` for page templates (app.php, canvas.php, email.php, raw.php)
- Contains `emails/` for email templates (magiclink.php, reset-password.php)
- Contains `Exception/` for application-level exceptions
- Contains `GraphQL/` with Types subdirectory for GraphQL schema

**Content Module** - Data modeling:
- Views organized by content type: `collection/`, `singleton/`, `tree/`, `models/`
- Contains `graphql/` (lowercase) with content.php and models.php

**System Module** - Administration:
- Controller has nested `Users/` subdirectory
- Command organized by function: `Cache/`, `Spaces/`, `Utils/`, `Worker/`, `i18n/`
- Views organized by feature: `api/`, `locales/`, `logs/`, `spaces/`, `users/`, `worker/`
- Contains `data/` with static locale definitions

**Assets Module** - Media management:
- Contains `Utils/` for asset processing utilities

## Storage Directory

Runtime data storage (contents gitignored, structure preserved):

```
storage/
|-- cache/                 # Application cache files
|-- data/                  # Database and persistent data files
|-- logs/                  # Application log files
|-- tmp/                   # Temporary files
|-- uploads/               # User-uploaded files
```

## Library Directory

Third-party libraries and utilities:

```
lib/
|-- _autoload.php          # Library autoloader
|-- CLI.php                # Command-line interface utilities
|-- DotEnv.php             # Environment variable loader
|-- FileStorage.php        # File storage abstraction
|-- Mailer.php             # Email sending utilities
|-- RedisLite.php          # Redis-compatible memory storage
|-- SVGSanitizer.php       # SVG file sanitization
|-- Thumbhash.php          # Image placeholder generation
|-- franken-worker.php     # FrankenPHP worker mode support
|-- DeepArrayIterator.php  # Nested array traversal
|-- SimpleImageLib.php     # Image manipulation wrapper
|
|-- Lime/                  # Core PHP micro-framework
|-- MongoLite/             # SQLite-based MongoDB-like database
|-- MongoHybrid/           # Database abstraction layer
|-- IndexLite/             # SQLite full-text search
|-- IndexHybrid/           # Search index abstraction
|-- ESQL/                  # Enhanced SQL utilities
|-- JSONStream/            # JSON streaming parser
|-- QueueLite/             # Job queue implementation
|-- MemoryStorage/         # In-memory data storage
|-- SwaggerPhp/            # OpenAPI documentation generator
|-- vendor/                # Composer-managed dependencies
```

## Directory Organization Patterns

### MVC-Like Structure
Modules follow a controller-view-helper pattern:
- `Controller/` handles HTTP requests and business logic
- `views/` contains PHP templates for HTML rendering
- `Helper/` provides service classes and utilities

### API Organization
APIs are defined at module level with optional dedicated directories:
- `api.php` - REST endpoint route definitions
- `RestApi/` - Complex API query handlers
- `GraphQL/` or `graphql/` - GraphQL schema and resolvers

### Frontend Assets
Assets follow a component-based organization:
- Bundled files (`app.bundle.js`, `app.bundle.css`) for production
- Source files in `css/`, `js/` for development
- Vue components in `vue-components/`
- Reusable UI in `components/`
- Modal dialogs in `dialogs/`

### CLI Commands
Command-line operations organized by function:
- `cli.php` registers commands at module level
- `Command/` directory contains command class implementations
- Subdirectories group related commands (e.g., `Cache/`, `Worker/`)

## File Naming Conventions

| Pattern | Usage |
|---------|-------|
| `PascalCase.php` | PHP classes (Controllers, Helpers, Commands) |
| `lowercase.php` | Entry points, configs, views, templates |
| `kebab-case.js` | JavaScript files |
| `kebab-case.css` | Stylesheet files |
| `*.bundle.*` | Compiled/bundled production assets |
| `icon.svg` | Module icon files |

## Excluded from Documentation

The following directories are excluded from detailed documentation:
- `.claude/`, `.cursor/`, `.idea/`, `.vscode/`, `.zed/`, `.fleet/` - Editor configurations
- `node_modules/` - NPM dependencies (if present)
- `vendor/` within `lib/` - Composer dependencies
- `addons/` - Extension modules (site-specific)
- `storage/*/` contents - Runtime data
- `config/` - Runtime configuration (gitignored)

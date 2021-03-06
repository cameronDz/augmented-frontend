# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.12.1] -2021-03-21
### Fixed
- Footer full width on color for text beyond the content max width

## [0.12.0] -2021-03-21
### Added
- Version to footer

### Changed
- Footer set to be sticky at bottom of page and color stretched full page width
- Center tabs on tab bar
- Set Caffeine, Exercises, and Routines to be within Page, with max-width
- Footer URL pointing to homepage instead of github.io page

### Removed
- Unused sections of app; Sign Up/In buttons, pages with no data
- Removed margin on page body

## [0.11.0] -2021-03-20
### Changed
- Caffeine, Cardio Session, and Exercises list and create API using S3 storage API

### Removed
- Pagination on Caffeine and Cardio Session tables
- Azure API URL from application

## [0.10.1] -2021-03-07
### Added
- Load indicator on Routine sidebar card

### Changed
- Made Routines selectable/changeable in sidebar

### Fixed
- Routine API route

## [0.10.0] -2021-03-06
### Added
- List of Routines to from new storage API
- Webpack Copy module for moving images and favicon
- Generated Augmented logo and favicon

### Changed
- Decomissioned Heroku App routines API for new Heroku S3 Storage api for fetching Routine
- Logo from Bulma's logo to custom Augmented Logo
- Moved assets directory into src to match conventions

### Fixed
- Vulnerable dependency package versions: handlebars, http-proxy, node-forge, serialize-javascript, yargs-parser
- Outdated browserslist issue
- Broken deep dependency for compat-data

## [0.9.0] - 2020-03-19
### Changed
- Several dependency minor/patch versions

### Fixed
- Update major dependency versions for vulnerable packages flagged by GitHub

## [0.8.1] - 2019-11-05
### Fixed
- Using correct form in payload for sessions post request

## [0.8.0] - 2019-11-04
### Added
- Circle loader when waiting on routine payload

### Changed
- Switch react date picker for Material UI date picker

## [0.7.0] - 2019-11-02
### Added
- Webpack bundle analyzer config and script

### Changed
- Converted session creator to function component
- Handling all form data for session creator in redux store
- Moved all package to dev dependencies as none would be needed on a server

### Fixed
- Updated react-router-dom package to use latest react lifecylce methods

## [0.6.0] - 2019-11-02
### Added
- Prop validation for new props coming into session creator class

### Changed
- Moved rountine list request into redux store
- Moved caffeine, exercise, and session create post logic into redux

## [0.5.0] - 2019-11-01
### Changed
- Moved exercise list request into redux state

### Removed
- Uninstalled canvas with current issue causing install to hang

## [0.4.0] - 2019-10-27
### Added
- Wireframes for moving all axios calls into state/reducers

### Changed
- Simplified folder structure

### Removed
- Unused components and excess folders

## [0.3.1] - 2019-10-26
### Changed
- Invalidate logic listening for successful create post
- Webpack naming convention

### Fixed
- Sending axios post for create as JSON instead of stringified JSON
- Invalidate state correctly reflecting when data is invalidated in session

## [0.3.0] - 2019-10-26
### Added
- Download csv button to bottom of sessions table

### Changed
- Best practices and formatting changes to code of lib
- Update latest npm packages in lock file
- Seperate builds for dev and production

### Fixed
- Cardio session data invalidation process, now invalidate date on a 201 response rather than make request for more data
- Added missing peer dependencies

## [0.2.0] - 2019-09-15
### Added
- ESlint with plugins for best practices with StandardJS

### Changed
- Converted Routine component to hook to remove old lifecycle methods

### Fixed
- Updated styling/issues pointed out by linter
- Passing id to dropdown component for determining which item to change, rather than modifying item in dropdown

## [0.1.3] - 2019-09-15
### Changed
- Package JSON key order

### Fixed
- Updated mix-deep and set-value packages for security issues

## [0.1.2] - 2019-09-03
### Added
- Help page to replace multiple reference pages.

### Changed
- Navbar tab change from 'More' drop down to direct link to help page.

### Removed
- About, Contact, Contribute, and Issue pages.

## [0.1.1] - 2019-09-02
### Added
- Split lib function for splitting apart text keys from an object, including tests.
- Table row component used for caffiene intake data.

### Changed
- Set '/session' route to use new tab styled page.
- Condensed display table component code for session data.
- Use new split function to massage caffiene and session data in tables.

### Removed
- Excess comments in sort lib.

## [0.1.0] - 2019-09-02
### Initialized
- Initial adding of change log with base project

# Publishing Guide for Packages

This guide explains how to publish the database service as a private NPM package for use across your microservices.

## Prerequisites

1. **NPM Account**: You need an NPM account with access to publish private packages
2. **Organization**: Create or join an NPM organization 
3. **Authentication**: Login to NPM from your terminal

## Setup Steps

### 1. NPM Authentication

```bash
# Login to NPM
npm login

# Verify you're logged in
npm whoami
```

### 2. Organization Setup

If you haven't created an organization yet:

1. Go to [npmjs.com](https://www.npmjs.com)
2. Click on your profile → "Add Organization"
3. Create an organization named `something`
4. Choose the "Free" plan (allows unlimited private packages)

### 3. Package Configuration

The package is already configured in `package.json`:

```json
{
  "name": "@reop/database-service",
  "version": "1.0.0",
  "publishConfig": {
    "access": "private"
  }
}
```

### 4. Build the Package

```bash
# Build TypeScript to JavaScript
npm run build

# Verify the dist folder contains the compiled files
ls -la dist/
```

### 5. Test the Build

```bash
# Test that the package can be imported
node -e "console.log(require('./dist/index.js'))"
```

### 6. Publish the Package

```bash
# Publish to NPM
npm run publish:private

# Or manually
npm publish --access private
```

### 7. Verify Publication

```bash
# Check if the package is published
npm view @repo/database-service

# Or visit: https://www.npmjs.com/package/@repo/database-service
```

## Using the Package in Other Microservices

### 1. Install the Package

```bash
# In your microservice project
npm install @repo/database-service
```

### 2. Import and Use

```typescript
import { 
  databaseService, 
  userModel, 
  courseModel,
  User,
  CreateUserInput 
} from '@repo/database-service';

// Initialize database connection
await databaseService.initialize();

// Use the models
const user = await userModel.createUser({
  email: 'user@example.com',
  username: 'username',
  first_name: 'John',
  last_name: 'Doe',
  password: 'password123'
});

// Close connection when done
await databaseService.close();
```

## Environment Configuration

Each microservice using this package needs to configure the database connection:

```env
# Database Configuration
DB_HOST=your-aws-rds-endpoint.region.rds.amazonaws.com
DB_PORT=3306
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=repo_db

# Connection Pool Settings
DB_POOL_MIN=2
DB_POOL_MAX=10
```

## Version Management

### Updating the Package

1. **Update version** in `package.json`:
   ```bash
   npm version patch  # 1.0.0 → 1.0.1
   npm version minor  # 1.0.0 → 1.1.0
   npm version major  # 1.0.0 → 2.0.0
   ```

2. **Build and publish**:
   ```bash
   npm run build
   npm run publish:private
   ```

3. **Update in microservices**:
   ```bash
   # In each microservice
   npm update @repo/database-service
   ```

### Breaking Changes

When making breaking changes:

1. **Update major version**: `npm version major`
2. **Update documentation**: Update README and examples
3. **Notify team**: Inform about breaking changes
4. **Test thoroughly**: Test in staging environment first

## Alternative: GitHub Packages

If you prefer GitHub Packages over NPM:

### 1. Update package.json

```json
{
  "name": "@repo/database-service",
  "version": "1.0.0",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/your-org/database-service.git"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### 2. Authenticate with GitHub

```bash
# Create GitHub token with packages:write scope
# Then login
npm login --registry=https://npm.pkg.github.com
```

### 3. Publish

```bash
npm publish
```

## Troubleshooting

### Common Issues

1. **Authentication Error**:
   ```bash
   npm login
   npm whoami
   ```

2. **Organization Access**:
   - Ensure you're a member of the `@repo` organization
   - Check organization permissions

3. **Package Name Conflict**:
   - Ensure the package name is unique within your organization
   - Check if the package already exists

4. **Build Errors**:
   ```bash
   npm run build
   # Check for TypeScript errors
   ```

### Support

For issues with:
- **NPM**: Contact NPM support
- **Organization**: Contact your organization admin
- **Package**: Contact the development team

## Security Considerations

1. **Private Package**: Ensure `"access": "private"` is set
2. **Environment Variables**: Never commit database credentials
3. **Dependencies**: Regularly update dependencies for security patches
4. **Access Control**: Limit who can publish to the package

## Best Practices

1. **Semantic Versioning**: Follow semver for version numbers
2. **Changelog**: Maintain a CHANGELOG.md file
3. **Testing**: Test the package before publishing
4. **Documentation**: Keep documentation up to date
5. **Backward Compatibility**: Maintain backward compatibility when possible 
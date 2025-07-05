FROM mcr.microsoft.com/playwright:v1.53.1-jammy

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code and tests
COPY src ./src
COPY tests ./tests
COPY playwright.config.ts ./

# Build TypeScript
RUN npm run build
# Install Playwright browsers to ensure compatibility
RUN npx playwright install --with-deps chromium

# Run tests
CMD ["npx", "playwright", "test"]
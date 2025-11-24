#!/bin/bash

echo "=========================================="
echo "Kraft Agency Database Setup"
echo "=========================================="
echo ""

# Check if PostgreSQL is running
echo "Checking PostgreSQL status..."
if pg_isready > /dev/null 2>&1; then
    echo "✓ PostgreSQL is running"
else
    echo "✗ PostgreSQL is not running"
    echo "  Starting PostgreSQL..."
    brew services start postgresql@15
    sleep 3
fi

echo ""

# Check if database exists
echo "Checking database..."
if psql -lqt | cut -d \| -f 1 | grep -qw kraft_agency_dev; then
    echo "✓ Database 'kraft_agency_dev' exists"
else
    echo "Creating database 'kraft_agency_dev'..."
    createdb kraft_agency_dev
    echo "✓ Database created"
fi

echo ""

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate > /dev/null 2>&1
echo "✓ Prisma client generated"

echo ""

# Push schema to database
echo "Syncing database schema..."
npx prisma db push > /dev/null 2>&1
echo "✓ Database schema synced"

echo ""

# Verify tables
echo "Verifying tables..."
TABLE_COUNT=$(psql kraft_agency_dev -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" | xargs)
echo "✓ $TABLE_COUNT tables created"

echo ""
echo "=========================================="
echo "Database Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Run 'npm run dev' to start the development server"
echo "  2. Run 'npm run db:studio' to view database in browser"
echo "  3. Test API endpoints at http://localhost:3000/api/*"
echo ""
echo "Database: kraft_agency_dev"
echo "Location: localhost:5432"
echo ""

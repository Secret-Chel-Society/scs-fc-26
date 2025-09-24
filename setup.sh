#!/bin/bash

# SCS FC 26 Database Setup Script
# This script sets up the database using Docker Compose

set -e

echo "🏒 Setting up SCS FC 26 Database..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Database Configuration
POSTGRES_DB=scs_fc_26
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password

# PgAdmin Configuration
PGADMIN_DEFAULT_EMAIL=admin@scsfc26.com
PGADMIN_DEFAULT_PASSWORD=admin
EOF
fi

# Start the database
echo "🚀 Starting PostgreSQL database..."
docker-compose up -d postgres

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Check if database is running
if docker-compose ps postgres | grep -q "Up"; then
    echo "✅ Database is running successfully!"
else
    echo "❌ Failed to start database. Check logs with: docker-compose logs postgres"
    exit 1
fi

# Start PgAdmin (optional)
read -p "🤔 Would you like to start PgAdmin for database management? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting PgAdmin..."
    docker-compose up -d pgadmin
    echo "✅ PgAdmin is running at http://localhost:8080"
    echo "📧 Login with: admin@scsfc26.com / admin"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📊 Database Information:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: scs_fc_26"
echo "   Username: postgres"
echo "   Password: password"
echo ""
echo "🔧 Useful Commands:"
echo "   View logs: docker-compose logs postgres"
echo "   Stop database: docker-compose down"
echo "   Restart database: docker-compose restart postgres"
echo "   Connect to database: docker-compose exec postgres psql -U postgres -d scs_fc_26"
echo ""
echo "📚 Next Steps:"
echo "   1. Connect to the database using your preferred PostgreSQL client"
echo "   2. Verify the schema was created correctly"
echo "   3. Check that sample data was loaded"
echo "   4. Start developing your application!"

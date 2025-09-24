@echo off
REM SCS FC 26 Database Setup Script for Windows
REM This script sets up the database using Docker Compose

echo 🏒 Setting up SCS FC 26 Database...

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    (
        echo # Database Configuration
        echo POSTGRES_DB=scs_fc_26
        echo POSTGRES_USER=postgres
        echo POSTGRES_PASSWORD=password
        echo.
        echo # PgAdmin Configuration
        echo PGADMIN_DEFAULT_EMAIL=admin@scsfc26.com
        echo PGADMIN_DEFAULT_PASSWORD=admin
    ) > .env
)

REM Start the database
echo 🚀 Starting PostgreSQL database...
docker-compose up -d postgres

REM Wait for database to be ready
echo ⏳ Waiting for database to be ready...
timeout /t 10 /nobreak >nul

REM Check if database is running
docker-compose ps postgres | findstr "Up" >nul
if %errorlevel% equ 0 (
    echo ✅ Database is running successfully!
) else (
    echo ❌ Failed to start database. Check logs with: docker-compose logs postgres
    pause
    exit /b 1
)

REM Ask about PgAdmin
set /p start_pgadmin="🤔 Would you like to start PgAdmin for database management? (y/n): "
if /i "%start_pgadmin%"=="y" (
    echo 🚀 Starting PgAdmin...
    docker-compose up -d pgadmin
    echo ✅ PgAdmin is running at http://localhost:8080
    echo 📧 Login with: admin@scsfc26.com / admin
)

echo.
echo 🎉 Setup complete!
echo.
echo 📊 Database Information:
echo    Host: localhost
echo    Port: 5432
echo    Database: scs_fc_26
echo    Username: postgres
echo    Password: password
echo.
echo 🔧 Useful Commands:
echo    View logs: docker-compose logs postgres
echo    Stop database: docker-compose down
echo    Restart database: docker-compose restart postgres
echo    Connect to database: docker-compose exec postgres psql -U postgres -d scs_fc_26
echo.
echo 📚 Next Steps:
echo    1. Connect to the database using your preferred PostgreSQL client
echo    2. Verify the schema was created correctly
echo    3. Check that sample data was loaded
echo    4. Start developing your application!
echo.
pause

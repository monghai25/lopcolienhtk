@echo off
echo ========================================
echo FIX DNS FOR SUPABASE CONNECTION
echo ========================================
echo.

echo Step 1: Flushing DNS cache...
ipconfig /flushdns
echo.

echo Step 2: Registering DNS...
ipconfig /registerdns
echo.

echo Step 3: Renewing IP...
ipconfig /renew
echo.

echo Step 4: Testing connection...
ping -n 4 8.8.8.8
echo.

echo Step 5: Testing Supabase...
ping -n 4 db.fxbsvhdyilztynexwffq.supabase.co
echo.

echo ========================================
echo If ping to Supabase failed:
echo 1. Change DNS to 8.8.8.8 (Google DNS)
echo 2. Try mobile hotspot
echo 3. Check firewall settings
echo ========================================
pause

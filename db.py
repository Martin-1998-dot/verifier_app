import sqlite3

conn = sqlite3.connect('verifier.db')
cur = conn.cursor()

# COMPANY TABLE
cur.execute('''CREATE TABLE IF NOT EXISTS company (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT,
    registration_number TEXT,
    contact_person TEXT,
    email TEXT,
    phone TEXT
)''')

# PROPERTY TABLE
cur.execute('''CREATE TABLE IF NOT EXISTS property (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_name TEXT,
    stand_number TEXT,
    owner_name TEXT,
    owner_contact TEXT,
    owner_email TEXT
)''')

# VEHICLE TABLE
cur.execute('''CREATE TABLE IF NOT EXISTS vehicle (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_make TEXT,
    vehicle_model TEXT,
    registration_number TEXT,
    owner_name TEXT,
    owner_email TEXT
)''')

# PROFESSION TABLE
cur.execute('''CREATE TABLE IF NOT EXISTS profession (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profession_name TEXT,
    license_number TEXT,
    practitioner_name TEXT,
    contact_number TEXT,
    organization_name TEXT
)''')

conn.commit()
conn.close()

print("✅ Database and tables created successfully!")

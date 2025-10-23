import sqlite3

# Connect to SQLite database (creates verifier.db if it doesn't exist)
conn = sqlite3.connect('verifier.db')
c = conn.cursor()

# Company table
c.execute('''
CREATE TABLE IF NOT EXISTS company (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT,
    registration_number TEXT,
    contact_person TEXT
)
''')

# Property table
c.execute('''
CREATE TABLE IF NOT EXISTS property (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_name TEXT,
    stand_plot_number TEXT,
    street_address TEXT,
    suburb_city_province TEXT,
    owner_full_name TEXT,
    owner_contact TEXT,
    owner_email TEXT,
    property_type TEXT,
    year_built TEXT,
    number_of_rooms_units TEXT
)
''')

# Vehicle table
c.execute('''
CREATE TABLE IF NOT EXISTS vehicle (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    make_brand TEXT,
    model TEXT,
    year_of_manufacture TEXT,
    registration_number TEXT,
    vin TEXT,
    color TEXT,
    engine_number TEXT,
    owner_full_name TEXT,
    owner_email TEXT,
    vehicle_type TEXT
)
''')

# DNA/Sample table
c.execute('''
CREATE TABLE IF NOT EXISTS dna_sample (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sample_id TEXT,
    sample_type TEXT,
    donor_full_name TEXT,
    donor_contact TEXT,
    donor_email TEXT,
    collection_date TEXT,
    collected_by TEXT,
    lab_code TEXT,
    storage_location TEXT,
    purpose TEXT
)
''')

# Profession table
c.execute('''
CREATE TABLE IF NOT EXISTS profession (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profession_name TEXT,
    license_number TEXT,
    practitioner_full_name TEXT,
    practitioner_contact TEXT,
    workplace_name TEXT,
    workplace_address TEXT,
    years_experience TEXT,
    specialization_skills TEXT,
    registration_authority TEXT
)
''')

# Scandal / Incident table
c.execute('''
CREATE TABLE IF NOT EXISTS scandal_incident (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    date_of_incident TEXT,
    people_involved TEXT,
    description TEXT,
    location TEXT,
    evidence_available TEXT,
    status_followup TEXT
)
''')

# Commit and close
conn.commit()
conn.close()

print("Database and tables created successfully!")

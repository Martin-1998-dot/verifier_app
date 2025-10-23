import sqlite3

conn = sqlite3.connect('verifier.db')
c = conn.cursor()

c.execute('''
CREATE TABLE IF NOT EXISTS property (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_name TEXT,
    stand_number TEXT,
    owner_full_name TEXT
)
''')

c.execute('''
CREATE TABLE IF NOT EXISTS vehicle (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    make_brand TEXT,
    model TEXT,
    reg_number TEXT,
    owner_full_name TEXT
)
''')

c.execute('''
CREATE TABLE IF NOT EXISTS profession (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profession_name TEXT,
    practitioner_full_name TEXT,
    license_number TEXT,
    workplace TEXT
)
''')

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

conn.commit()
conn.close()

print("Database created successfully.")

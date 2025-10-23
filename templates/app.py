from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# --- Database setup ---
def init_db():
    conn = sqlite3.connect('verifier.db')
    c = conn.cursor()

    # Tables
    c.execute('''CREATE TABLE IF NOT EXISTS property (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    property_name TEXT,
                    stand_number TEXT,
                    owner_full_name TEXT
                )''')

    c.execute('''CREATE TABLE IF NOT EXISTS vehicle (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    make_brand TEXT,
                    model TEXT,
                    reg_number TEXT,
                    owner_full_name TEXT
                )''')

    c.execute('''CREATE TABLE IF NOT EXISTS profession (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    profession_name TEXT,
                    practitioner_full_name TEXT,
                    license_number TEXT,
                    workplace TEXT
                )''')

    c.execute('''CREATE TABLE IF NOT EXISTS dna_sample (
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
                )''')

    conn.commit()
    conn.close()

# Initialize DB at startup
init_db()

# --- Routes ---
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/save', methods=['POST'])
def save_data():
    data = request.get_json()
    section = data.get('section')
    fields = data.get('fields', {})

    conn = sqlite3.connect('verifier.db')
    c = conn.cursor()

    # Insert into correct table
    if section == 'property':
        c.execute("INSERT INTO property (property_name, stand_number, owner_full_name) VALUES (?, ?, ?)",
                  (fields.get('property_name'), fields.get('stand_number'), fields.get('owner_full_name')))
    elif section == 'vehicle':
        c.execute("INSERT INTO vehicle (make_brand, model, reg_number, owner_full_name) VALUES (?, ?, ?, ?)",
                  (fields.get('make_brand'), fields.get('model'), fields.get('reg_number'), fields.get('owner_full_name')))
    elif section == 'profession':
        c.execute("INSERT INTO profession (profession_name, practitioner_full_name, license_number, workplace) VALUES (?, ?, ?, ?)",
                  (fields.get('profession_name'), fields.get('practitioner_full_name'),
                   fields.get('license_number'), fields.get('workplace')))
    elif section == 'dna_sample':
        c.execute("""INSERT INTO dna_sample 
                     (sample_id, sample_type, donor_full_name, donor_contact, donor_email, 
                      collection_date, collected_by, lab_code, storage_location, purpose)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                  (fields.get('sample_id'), fields.get('sample_type'), fields.get('donor_full_name'),
                   fields.get('donor_contact'), fields.get('donor_email'), fields.get('collection_date'),
                   fields.get('collected_by'), fields.get('lab_code'), fields.get('storage_location'),
                   fields.get('purpose')))

    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

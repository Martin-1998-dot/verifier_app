from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# ---------- HOME (FRONT END) ----------
@app.route('/')
def home():
    return render_template('index.html')  # The search page for verifiers


# ---------- DASHBOARD (DATA ENTRY) ----------
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')  # The admin entry form


# ---------- ADD RECORD ----------
@app.route('/add_record', methods=['POST'])
def add_record():
    section = request.args.get('section')
    data = request.get_json()

    tables = {
        "company": ["company_name", "registration_number", "contact_person", "email", "phone"],
        "property": ["property_name", "stand_number", "owner_name", "owner_contact", "owner_email"],
        "vehicle": ["vehicle_make", "vehicle_model", "registration_number", "owner_name", "owner_email"],
        "profession": ["profession_name", "license_number", "practitioner_name", "contact_number", "organization_name"]
    }

    if section not in tables:
        return jsonify({"error": "Invalid section"}), 400

    cols = tables[section]
    values = [data.get(c, "") for c in cols]
    placeholders = ", ".join(["?"] * len(cols))

    conn = sqlite3.connect('verifier.db')
    cur = conn.cursor()
    cur.execute(f"INSERT INTO {section} ({', '.join(cols)}) VALUES ({placeholders})", values)
    conn.commit()
    conn.close()

    return jsonify({"message": f"{section.capitalize()} record added successfully!"})


# ---------- SEARCH RECORD ----------
@app.route('/search', methods=['GET'])
def search():
    section = request.args.get('section')
    query = request.args.get('q', '').lower()

    tables = {
        "company": ["company_name", "registration_number", "contact_person"],
        "property": ["property_name", "stand_number", "owner_name"],
        "vehicle": ["vehicle_make", "vehicle_model", "registration_number"],
        "profession": ["profession_name", "license_number", "practitioner_name"]
    }

    if section not in tables:
        return jsonify({"error": "Invalid section"}), 400

    cols = tables[section]
    conn = sqlite3.connect('verifier.db')
    cur = conn.cursor()

    # Search across multiple columns
    sql = f"SELECT * FROM {section} WHERE " + " OR ".join([f"LOWER({c}) LIKE ?" for c in cols])
    values = [f"%{query}%"] * len(cols)

    cur.execute(sql, values)
    results = cur.fetchall()
    conn.close()

    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)

import sqlite3
from typing import List, Dict, Any, Tuple

class SQLiteDB:
    def __init__(self, db_name: str):
        self.db_name = db_name
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()

    def create_table(self, table_name: str, columns: Dict[str, str]):
        """
        columns: dict of column_name -> type (e.g., {"id": "INTEGER PRIMARY KEY", "name": "TEXT"})
        """
        columns_with_types = ", ".join([f"{col} {col_type}" for col, col_type in columns.items()])
        sql = f"CREATE TABLE IF NOT EXISTS {table_name} ({columns_with_types});"
        self.cursor.execute(sql)
        self.conn.commit()

class SQLiteDBActions:

    def __init__(self, db_name=None):
        if not db_name:
            self = None
            raise LookupError.add_note("Please provide the DB name")
        else:
            self.conn = conn = sqlite3.connect(db_name)
            self.cursor = self.conn.cursor()

    def insert_into_table(self, table_name: str, data: Dict[str, Any]):
        """
        data: dict of column_name -> value
        """
        try:
            columns = ", ".join(data.keys())
            placeholders = ", ".join(["?" for _ in data])
            values = tuple(data.values())
            sql = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
            self.cursor.execute(sql, values)
            self.conn.commit()
        except sqlite3.IntegrityError as error:
            print("Unique value duplicated, could not insert")

    def fetch_from_table(self, table_name: str, columns: List[str] = None, where: str = None, params: Tuple = ()):
        """
        columns: list of columns to fetch (default is all)
        where: optional WHERE clause (e.g., "id = ?")
        params: values to substitute into WHERE clause
        """
        cols = ", ".join(columns) if columns else "*"
        sql = f"SELECT {cols} FROM {table_name}"
        if where:
            sql += f" WHERE {where} = ?"
            self.cursor.execute(sql, params)
        else:
            self.cursor.execute(sql)
        return self.cursor.fetchall()
    
    def update_table(self, table, set_columns: dict, where_columns: dict):
        
        set_clause = ', '.join([f"{col} = ?" for col in set_columns.keys()])
        where_clause = ' AND '.join([f"{col} = ?" for col in where_columns.keys()])

        sql = f"UPDATE {table} SET {set_clause} WHERE {where_clause}"

        params = list(set_columns.values()) + list(where_columns.values())

        self.cursor.execute(sql, params)
        self.conn.commit()


    def close(self):
        self.conn.close()

#Test
if __name__ == "__main__":
    db = SQLiteDB("analysis.db")

    # Create a table
    db.create_table("users", {
        "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
        "name": "TEXT UNIQUE",
        "email": "TEXT"
    })

    db = SQLiteDBActions('analysis.db')

    # Insert into the table
    db.insert_into_table("users", {
        "name": "Alice",
        "email": "alice@example.com"
    })

    # Insert into the table
    db.insert_into_table("users", {
        "name": "Bob",
        "email": "bob@example.com"
    })

    # Fetch from the table
    users = db.fetch_from_table("users")
    for user in users:
        print(user)

        # Fetch from the table
    users = db.fetch_from_table("users", where="name", params=("Bob",))
    for user in users:
        print(user)

    db.update_table("users",{"email":"testingUpdate@mars.ai"}, {"name":"Bob"})

    # Fetch from the table
    users = db.fetch_from_table("users")
    for user in users:
        print(user)

    db.close()

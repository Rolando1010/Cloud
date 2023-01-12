from . import app
from flask import request, render_template, send_from_directory
from .file_system.files import get_path_files, upload_files, delete_file_path
from .file_system.directories import create_directory
from .file_system.path import STORAGE_PATH
from .notes import get_quick_note, save_quick_note, get_notes, save_note, get_note, update_note, delete_note

get_path = lambda: request.args.get("path", "")

@app.get("/api/files")
def list_files_view():
    return get_path_files(get_path())

@app.post("/api/files")
def upload_files_view():
    files = request.files.getlist("files")
    return {"files": upload_files(get_path(), files)}

@app.delete("/api/files")
def delete_file_view():
    file = request.args.get("file", "")
    return delete_file_path(get_path(), file)

@app.post("/api/directories")
def create_directory_view():
    directory = request.json["directory"]
    return create_directory(get_path(), directory)

@app.get("/api/quick-note")
def get_quick_note_view():
    return {"text": get_quick_note()}

@app.put("/api/quick-note")
def save_quick_note_view():
    save_quick_note(request.json["text"])
    return {"success": True}

@app.get("/api/notes")
def get_notes_view():
    return {"notes": get_notes()}

@app.post("/api/notes")
def save_note_view():
    title = request.json["title"]
    description = request.json["description"]
    save_note(title, description)
    return {"success": True}

@app.get("/api/notes/<int:note_id>")
def get_note_view(note_id: int):
    note = get_note(note_id)
    if note:
        return {"success": True, "note": note}
    return {"success": False, "message": "Not finded note"}

@app.put("/api/notes/<int:note_id>")
def update_note_view(note_id: int):
    title = request.json["title"]
    description = request.json["description"]
    update_note(note_id, title, description)
    return {"success": True}

@app.delete("/api/notes/<int:note_id>")
def delete_note_view(note_id: int):
    delete_note(note_id)
    return {"success": True}

@app.get("/media/<path:path>")
def get_media(path):
    return send_from_directory(STORAGE_PATH, path=path)

view = lambda **kwargs: render_template("index.html")

app.get("/")(view)
app.get("/files")(view)
app.get("/notes")(view)
app.get("/notes/new")(view)
app.get("/notes/<int:note_id>")(view)
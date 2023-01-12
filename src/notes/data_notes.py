import json
from src.file_system.path import get_absolute_path

FILE_PATH = get_absolute_path("../notes.json")

def get_data_notes() -> dict[str, str]:
    notes_file = open(FILE_PATH)
    data_notes = json.load(notes_file)
    notes_file.close()
    return data_notes

def save_data_notes(data_notes: dict) -> None:
    json_notes = json.dumps(data_notes, indent=4)
    notes_file = open(FILE_PATH, "w")
    notes_file.write(json_notes)
    notes_file.close()
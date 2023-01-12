from datetime import datetime
from .data_notes import get_data_notes, save_data_notes

def get_quick_note() -> str:
    return get_data_notes()["quick_note"]

def save_quick_note(text: str) -> None:
    data_notes = get_data_notes()
    data_notes["quick_note"] = text
    save_data_notes(data_notes)

def get_notes() -> list[dict[str, str]]:
    return get_data_notes()["notes"]

def save_note(title: str, description: str):
    now = datetime.now()
    date = now.strftime("%d/%m/%Y %H:%M:%S")
    data_notes = get_data_notes()
    notes = data_notes["notes"]
    max_id = 0
    for note in notes:
        if note["id"] > max_id:
            max_id = note["id"]
    id = max_id + 1
    notes.append({
        "id": id,
        "title": title,
        "description": description,
        "date": date
    })
    data_notes["notes"] = notes
    save_data_notes(data_notes)

def get_note(note_id: int) -> dict[str, str]:
    notes = get_notes()
    filtered_notes = [n for n in notes if n["id"] == note_id]
    return filtered_notes[0] if filtered_notes else None

def update_note(note_id: int, title: str, description: str) -> None:
    data_notes = get_data_notes()
    notes = data_notes["notes"]
    for i in range(0, len(notes)):
        if notes[i]["id"] == note_id:
            notes[i]["title"] = title
            notes[i]["description"] = description
    data_notes["notes"] = notes
    save_data_notes(data_notes)

def delete_note(note_id: int) -> None:
    data_notes = get_data_notes()
    notes = [n for n in data_notes["notes"] if n["id"] != note_id]
    data_notes["notes"] = notes
    save_data_notes(data_notes)
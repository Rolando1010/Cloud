from datetime import datetime
from .data_notes import get_data_notes, save_data_notes
from .encoding import encode, decode

def get_quick_note() -> str:
    return get_data_notes()["quick_note"]

def save_quick_note(text: str) -> None:
    data_notes = get_data_notes()
    data_notes["quick_note"] = text
    save_data_notes(data_notes)

def get_notes() -> list[dict[str, str]]:
    return get_data_notes()["notes"]

def save_note(title: str, description: str, code: str):
    now = datetime.now()
    date = now.strftime("%d/%m/%Y %H:%M:%S")
    data_notes = get_data_notes()
    notes = data_notes["notes"]
    max_id = 0
    for note in notes:
        if note["id"] > max_id:
            max_id = note["id"]
    id = max_id + 1
    if code: description = encode(description, code)
    notes.append({
        "id": id,
        "title": title,
        "description": description,
        "encoded": code != "",
        "date": date
    })
    data_notes["notes"] = notes
    save_data_notes(data_notes)

def get_note(note_id: int, code: str="") -> dict[str, str]:
    notes = get_notes()
    filtered_notes = [n for n in notes if n["id"] == note_id]
    if filtered_notes:
        filtered_note = filtered_notes[0]
        decoded_text = decode(filtered_note["description"], code)
        if decoded_text != False: filtered_note["description"] = decoded_text
        return filtered_note
    return

def update_note(note_id: int, title: str, description: str, code: str) -> "str | None":
    error = ""
    data_notes = get_data_notes()
    notes = data_notes["notes"]
    for i in range(0, len(notes)):
        if notes[i]["id"] == note_id:
            if notes[i].get("encoded", False):
                print((code))
                if decode(notes[i]["description"], code) == False: error = "Incorrect code"
                elif decode(description, code) != False: error = "Try of save encoded text"
                else: notes[i]["description"] = encode(description, code)
            else:
                notes[i]["description"] = description
            notes[i]["title"] = title
    data_notes["notes"] = notes
    save_data_notes(data_notes)
    return error

def delete_note(note_id: int) -> None:
    data_notes = get_data_notes()
    notes = [n for n in data_notes["notes"] if n["id"] != note_id]
    data_notes["notes"] = notes
    save_data_notes(data_notes)
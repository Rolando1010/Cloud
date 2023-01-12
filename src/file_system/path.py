import os
from pathlib import Path

STORAGE_PATH = "../storage"

def add_paths(origin_path: str, addable_path: str) -> str:
    remove_initial_diagonal = lambda path: path[1:] if path and path[0] == "/" else path
    new_path = os.path.join(
        origin_path,
        remove_initial_diagonal(addable_path)
    )
    if new_path[-1] == "\\": return new_path[:-1]
    return new_path

def get_absolute_path(directory: str) -> str:
    return add_paths(
        str(Path(__file__).resolve().parent.parent),
        directory
    ).replace("\\", "/")

get_storage_directory = lambda directory: get_absolute_path(add_paths(STORAGE_PATH, directory))
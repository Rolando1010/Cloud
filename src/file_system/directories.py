import os
import shutil
from .path import STORAGE_PATH, add_paths, get_absolute_path

def create_directory(path: str, new_directory: str) -> dict[str, str]:
    actual_directory = get_absolute_path(add_paths(STORAGE_PATH, path))
    new_directory_path = add_paths(actual_directory, new_directory)
    success = True
    message = ""
    try:
        os.mkdir(new_directory_path)
    except FileNotFoundError:
        success = False
        message = "not existing path"
    except FileExistsError:
        success = False
        message = "folder alredy exists"
    return {
        "success": success,
        "message": message
    }

def delete_directory(path: str, directory_name: str) -> dict[str, str]:
    success = True
    message = ""
    try:
        shutil.rmtree(path + "/" + directory_name)
    except FileNotFoundError:
        success = False
        message = "file not found"
    return {
        "success": success,
        "message": message,
        "directory": directory_name
    }
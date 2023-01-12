import os
import shutil
from werkzeug.datastructures import FileStorage
from .path import get_storage_directory, add_paths
from .directories import delete_directory

def get_path_files(directory: str) -> dict[str, list[str]]:
    path = get_storage_directory(directory)
    success = False
    message = ""
    try:
        results = os.listdir(path)
        success = True
    except FileNotFoundError:
        results = []
        message = "file not found"
    except NotADirectoryError:
        results = []
        message = "not a directory"
    files: list[str] = []
    directories: list[str] = []
    for result in results:
        result_path = add_paths(path, result)
        if os.path.isdir(result_path):
            directories += [result]
        else:
            files += [result]
    return {
        "files": files,
        "directories": directories,
        "success": success,
        "message": message
    }

def upload_files(directory: str, files: list[FileStorage]):
    path = get_storage_directory(directory)
    results: list[dict[str, str]] = []
    for file in files:
        file.save(path + "/" + file.filename)
        results += [{
            "success": True,
            "message": "",
            "file": file.name
        }]
    return results

def delete_file(path: str, file_name: str) -> dict[str, str]:
    success = True
    message = ""
    try:
        os.remove(path + "/" + file_name)
    except FileNotFoundError:
        success = False
        message = "file not found"
    return {
        "success": success,
        "mesage": message,
        "file": file_name
    }

def delete_file_path(directory: str, file: str):
    path = get_storage_directory(directory)
    result = (delete_directory if os.path.isdir(path + "/" + file) else delete_file)(path, file)
    return result

def move_files(origin_folder: str, destination_folder: str, files: list[str]):
    origin = get_storage_directory(origin_folder)
    destination = get_storage_directory(destination_folder)
    results: list[str, str] = []
    for file in files:
        success = True
        message = ""
        try:
            shutil.move(origin + "/" + file, destination)
        except FileExistsError:
            success = False
            message = "cannot move into a file"
        except shutil.Error:
            success = False
            message = "cannot move a directory into itself"
        results = [{
            "success": success,
            "message": message,
            "file": file
        }]    
    return results
import os
import shutil
from .path import get_storage_directory, add_paths
from .directories import delete_directory

def get_files_path(directory):
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
    files = []
    directories = []
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

def upload_files(directory, files):
    path = get_storage_directory(directory)
    results = []
    for file in files:
        success = True
        message = ""
        try:
            with open(path + "/" + file.name, "wb+") as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
        except FileNotFoundError:
            success = False
            message = "directory not found"
        except PermissionError:
            success = False
            message = "file or folder alredy exists"
        results += [{
            "success": success,
            "message": message,
            "file": file.name
        }]
    return results

def delete_file(path, file_name):
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

def delete_file_path(directory, file):
    path = get_storage_directory(directory)
    result = (delete_directory if os.path.isdir(path + "/" + file) else delete_file)(path, file)
    return result

def move_files(origin_folder, destination_folder, files):
    origin = get_storage_directory(origin_folder)
    destination = get_storage_directory(destination_folder)
    results = []
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
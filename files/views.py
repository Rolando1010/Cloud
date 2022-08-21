from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from .files import delete_file_path, get_files_path, move_files, upload_files
from .directories import create_directory

get_path_from_request = lambda request: request.GET.get("path", "")

class FilesView(ViewSet):
    def list(self, request):
        path = get_path_from_request(request)
        return Response(get_files_path(path))
    
    def upload(self, request):
        path = get_path_from_request(request)
        files = request.FILES.getlist("files")
        return Response(upload_files(path, files))
    
    def remove(self, request):
        path = get_path_from_request(request)
        file = request.GET.get("file", "")
        return Response(delete_file_path(path, file))
    
    def move(self, request):
        origin = get_path_from_request(request)
        destination = request.data.get("destination", "")
        files = request.data.get("files", [])
        return Response(move_files(origin, destination, files))

class DirectoriesView(ViewSet):
    def create(self, request):
        path = get_path_from_request(request)
        directory = request.data.get("directory", "")
        return Response(create_directory(path, directory))
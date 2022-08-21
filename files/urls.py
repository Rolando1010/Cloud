from django.urls import path
from .views import *

urlpatterns = [
    path("", FilesView.as_view({
        "get": "list",
        "post": "upload",
        "delete": "remove",
        "put": "move"
    })),
    path("directories", DirectoriesView.as_view({
        "post": "create"
    }))
]
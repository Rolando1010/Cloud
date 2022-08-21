from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", include("view.urls")),
    path("files/", include("files.urls")),
    path("admin/", admin.site.urls)
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
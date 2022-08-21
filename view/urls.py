from django.urls import path
from django.shortcuts import render

view = lambda request: render(request, "view.html")

urlpatterns = [
    path("", view)
]
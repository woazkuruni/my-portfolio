from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve


urlpatterns = [

    path(
        "admin/",
        admin.site.urls
    ),

    path(
        "",
        include("portfolio.urls")
    ),

    # =====================================================
    # MEDIA FILES
    # =====================================================
    # Render production environment-এও uploaded/media
    # project images serve করার জন্য.
    re_path(
        r"^media/(?P<path>.*)$",
        serve,
        {
            "document_root": settings.MEDIA_ROOT,
        },
    ),

]
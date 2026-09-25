from pathlib import Path
import os


# =========================================================
# BASE DIRECTORY
# =========================================================

BASE_DIR = Path(__file__).resolve().parent.parent


# =========================================================
# SECURITY
# =========================================================

# Production-এ Render Environment Variable থেকে আসবে.
# Local development-এর জন্য fallback key.
SECRET_KEY = os.environ.get(
    "DJANGO_SECRET_KEY",
    "django-insecure-local-development-key-change-me"
)


# Local:
# DEBUG=True
#
# Render:
# DEBUG=False

DEBUG = os.environ.get(
    "DEBUG",
    "True"
).lower() == "true"


# =========================================================
# ALLOWED HOSTS
# =========================================================

ALLOWED_HOSTS = [
    "127.0.0.1",
    "localhost",
]


# Render automatically provides this environment variable.

RENDER_EXTERNAL_HOSTNAME = os.environ.get(
    "RENDER_EXTERNAL_HOSTNAME"
)

if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(
        RENDER_EXTERNAL_HOSTNAME
    )


# Optional custom hosts from environment variable.
#
# Example:
# ALLOWED_HOSTS=myportfolio.com,www.myportfolio.com

extra_hosts = os.environ.get(
    "ALLOWED_HOSTS",
    ""
)

if extra_hosts:

    ALLOWED_HOSTS.extend(
        [
            host.strip()
            for host in extra_hosts.split(",")
            if host.strip()
        ]
    )


# =========================================================
# CSRF TRUSTED ORIGINS
# =========================================================

CSRF_TRUSTED_ORIGINS = []


if RENDER_EXTERNAL_HOSTNAME:

    CSRF_TRUSTED_ORIGINS.append(
        f"https://{RENDER_EXTERNAL_HOSTNAME}"
    )


# Optional custom trusted origins.
#
# Example:
# CSRF_TRUSTED_ORIGINS=https://myportfolio.com,https://www.myportfolio.com

extra_csrf_origins = os.environ.get(
    "CSRF_TRUSTED_ORIGINS",
    ""
)

if extra_csrf_origins:

    CSRF_TRUSTED_ORIGINS.extend(
        [
            origin.strip()
            for origin in extra_csrf_origins.split(",")
            if origin.strip()
        ]
    )


# =========================================================
# INSTALLED APPS
# =========================================================

INSTALLED_APPS = [

    "django.contrib.admin",

    "django.contrib.auth",

    "django.contrib.contenttypes",

    "django.contrib.sessions",

    "django.contrib.messages",

    "django.contrib.staticfiles",

    "portfolio",

]


# =========================================================
# MIDDLEWARE
# =========================================================

MIDDLEWARE = [

    "django.middleware.security.SecurityMiddleware",

    # WhiteNoise must stay directly after SecurityMiddleware.
    "whitenoise.middleware.WhiteNoiseMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",

    "django.middleware.common.CommonMiddleware",

    "django.middleware.csrf.CsrfViewMiddleware",

    "django.contrib.auth.middleware.AuthenticationMiddleware",

    "django.contrib.messages.middleware.MessageMiddleware",

    "django.middleware.clickjacking.XFrameOptionsMiddleware",

]


# =========================================================
# URL CONFIG
# =========================================================

ROOT_URLCONF = "portfolio_project.urls"


# =========================================================
# TEMPLATES
# =========================================================

TEMPLATES = [

    {

        "BACKEND":
            "django.template.backends.django.DjangoTemplates",

        "DIRS": [
            BASE_DIR / "templates",
        ],

        "APP_DIRS": True,

        "OPTIONS": {

            "context_processors": [

                "django.template.context_processors.request",

                "django.contrib.auth.context_processors.auth",

                "django.contrib.messages.context_processors.messages",

            ],

        },

    },

]


# =========================================================
# WSGI
# =========================================================

WSGI_APPLICATION = "portfolio_project.wsgi.application"


# =========================================================
# DATABASE
# =========================================================

DATABASES = {

    "default": {

        "ENGINE":
            "django.db.backends.sqlite3",

        "NAME":
            BASE_DIR / "db.sqlite3",

    }

}


# =========================================================
# PASSWORD VALIDATION
# =========================================================

AUTH_PASSWORD_VALIDATORS = [

    {

        "NAME":
            "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",

    },

    {

        "NAME":
            "django.contrib.auth.password_validation.MinimumLengthValidator",

    },

    {

        "NAME":
            "django.contrib.auth.password_validation.CommonPasswordValidator",

    },

    {

        "NAME":
            "django.contrib.auth.password_validation.NumericPasswordValidator",

    },

]


# =========================================================
# INTERNATIONALIZATION
# =========================================================

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Dhaka"

USE_I18N = True

USE_TZ = True


# =========================================================
# STATIC FILES
# =========================================================

STATIC_URL = "/static/"


# collectstatic output directory

STATIC_ROOT = BASE_DIR / "staticfiles"


# Django 6 compatible storage configuration

STORAGES = {

    "default": {

        "BACKEND":
            "django.core.files.storage.FileSystemStorage",

    },

    "staticfiles": {

        "BACKEND":
            "whitenoise.storage.CompressedManifestStaticFilesStorage",

    },

}


# =========================================================
# MEDIA FILES
# =========================================================

MEDIA_URL = "/media/"

MEDIA_ROOT = BASE_DIR / "media"


# =========================================================
# EMAIL
# =========================================================

EMAIL_BACKEND = (
    "django.core.mail.backends.console.EmailBackend"
)


# =========================================================
# PROXY / HTTPS
# =========================================================

SECURE_PROXY_SSL_HEADER = (
    "HTTP_X_FORWARDED_PROTO",
    "https",
)


# Production cookies should only travel over HTTPS.

SESSION_COOKIE_SECURE = not DEBUG

CSRF_COOKIE_SECURE = not DEBUG


# =========================================================
# DEFAULT PRIMARY KEY
# =========================================================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
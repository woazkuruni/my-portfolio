from django.contrib import admin
from django.utils.html import format_html

from .models import Project, Skill, Course


# =========================================================
# PROJECT ADMIN
# =========================================================

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    # -----------------------------------------------------
    # PROJECT LIST PAGE
    # -----------------------------------------------------

    list_display = (
        "project_thumbnail",
        "title",
        "live_status",
        "github_status",
        "created_at",
    )

    list_display_links = (
        "title",
    )

    search_fields = (
        "title",
        "description",
    )

    list_filter = (
        "created_at",
    )

    ordering = (
        "-created_at",
    )

    list_per_page = 20

    save_on_top = True

    # -----------------------------------------------------
    # READ ONLY FIELDS
    # -----------------------------------------------------

    readonly_fields = (
        "project_image_preview",
        "created_at",
    )

    # -----------------------------------------------------
    # PROJECT FORM LAYOUT
    # -----------------------------------------------------

    fieldsets = (

        (
            "Project Information",
            {
                "fields": (
                    "title",
                    "description",
                )
            },
        ),

        (
            "Project Image",
            {
                "fields": (
                    "image",
                    "project_image_preview",
                )
            },
        ),

        (
            "Project Links",
            {
                "fields": (
                    "project_link",
                    "github_link",
                )
            },
        ),

        (
            "System Information",
            {
                "fields": (
                    "created_at",
                )
            },
        ),

    )

    # =====================================================
    # PROJECT THUMBNAIL
    # =====================================================

    @admin.display(description="Preview")
    def project_thumbnail(self, obj):

        if obj and obj.image:
            return format_html(
                """
                <img
                    src="{}"
                    alt="{}"
                    style="
                        width:72px;
                        height:48px;
                        object-fit:cover;
                        border-radius:8px;
                        border:1px solid #e2e8f0;
                        display:block;
                    "
                >
                """,
                obj.image.url,
                obj.title,
            )

        return format_html(
            """
            <span
                style="
                    color:#94a3b8;
                    font-size:12px;
                    font-weight:500;
                "
            >
                {}
            </span>
            """,
            "No image",
        )

    # =====================================================
    # LARGE IMAGE PREVIEW
    # =====================================================

    @admin.display(description="Image Preview")
    def project_image_preview(self, obj):

        if obj and obj.image:
            return format_html(
                """
                <img
                    src="{}"
                    alt="{}"
                    style="
                        width:100%;
                        max-width:480px;
                        max-height:280px;
                        object-fit:cover;
                        border-radius:12px;
                        border:1px solid #e2e8f0;
                        box-shadow:
                            0 10px 28px
                            rgba(15,23,42,.10);
                        display:block;
                    "
                >
                """,
                obj.image.url,
                obj.title,
            )

        return format_html(
            """
            <span
                style="
                    display:inline-block;
                    padding:10px 14px;
                    color:#94a3b8;
                    background:#f8fafc;
                    border:1px dashed #cbd5e1;
                    border-radius:8px;
                    font-size:13px;
                "
            >
                {}
            </span>
            """,
            "Upload an image to see the preview.",
        )

    # =====================================================
    # LIVE PROJECT STATUS
    # =====================================================

    @admin.display(description="Live Project")
    def live_status(self, obj):

        if obj and obj.project_link:
            return format_html(
                """
                <span
                    style="
                        display:inline-flex;
                        align-items:center;
                        gap:6px;
                        padding:5px 10px;
                        color:#15803d;
                        background:#ecfdf3;
                        border:1px solid #bbf7d0;
                        border-radius:20px;
                        font-size:11px;
                        font-weight:700;
                        white-space:nowrap;
                    "
                >
                    {}
                </span>
                """,
                "● Available",
            )

        return format_html(
            """
            <span
                style="
                    display:inline-flex;
                    align-items:center;
                    padding:5px 9px;
                    color:#94a3b8;
                    background:#f8fafc;
                    border-radius:20px;
                    font-size:11px;
                    font-weight:600;
                    white-space:nowrap;
                "
            >
                {}
            </span>
            """,
            "○ Not Added",
        )

    # =====================================================
    # GITHUB STATUS
    # =====================================================

    @admin.display(description="GitHub")
    def github_status(self, obj):

        if obj and obj.github_link:
            return format_html(
                """
                <span
                    style="
                        display:inline-flex;
                        align-items:center;
                        gap:6px;
                        padding:5px 10px;
                        color:#1d4ed8;
                        background:#eff6ff;
                        border:1px solid #bfdbfe;
                        border-radius:20px;
                        font-size:11px;
                        font-weight:700;
                        white-space:nowrap;
                    "
                >
                    {}
                </span>
                """,
                "● Available",
            )

        return format_html(
            """
            <span
                style="
                    display:inline-flex;
                    align-items:center;
                    padding:5px 9px;
                    color:#94a3b8;
                    background:#f8fafc;
                    border-radius:20px;
                    font-size:11px;
                    font-weight:600;
                    white-space:nowrap;
                "
            >
                {}
            </span>
            """,
            "○ Not Added",
        )


# =========================================================
# SKILL ADMIN
# =========================================================

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
    )

    list_display_links = (
        "name",
    )

    list_filter = (
        "category",
    )

    search_fields = (
        "name",
        "category",
    )

    ordering = (
        "category",
        "name",
    )

    list_per_page = 30


# =========================================================
# COURSE ADMIN
# =========================================================

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "icon",
        "order",
    )

    list_display_links = (
        "name",
    )

    list_editable = (
        "order",
    )

    search_fields = (
        "name",
        "icon",
    )

    ordering = (
        "order",
        "name",
    )

    list_per_page = 30


# =========================================================
# DJANGO ADMIN SITE SETTINGS
# =========================================================

admin.site.site_header = "MyPortfolio Admin"
admin.site.site_title = "MyPortfolio Admin"
admin.site.index_title = "Portfolio Management"

admin.site.enable_nav_sidebar = True

# Custom authentication templates
admin.site.login_template = "admin/login.html"
admin.site.logout_template = "admin/logged_out.html"

from django.db import models


# =========================================================
# PROJECT MODEL
# =========================================================

class Project(models.Model):

    title = models.CharField(
        max_length=200
    )

    description = models.TextField()

    image = models.ImageField(
        upload_to="project_images/",
        blank=True,
        null=True
    )

    project_link = models.URLField(
        blank=True,
        null=True
    )

    github_link = models.URLField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title


# =========================================================
# SKILL MODEL
# =========================================================

class Skill(models.Model):

    CATEGORY_CHOICES = [
        ("Programming", "Programming"),
        ("Web Development", "Web Development"),
        ("AI / Machine Learning", "AI / Machine Learning"),
        ("Database", "Database"),
        ("Tools & Technologies", "Tools & Technologies"),
    ]

    name = models.CharField(
        max_length=100
    )

    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES,
        default="Programming"
    )

    def __str__(self):
        return self.name


# =========================================================
# COURSE MODEL
# =========================================================

class Course(models.Model):

    name = models.CharField(
        max_length=150
    )

    icon = models.CharField(
        max_length=100,
        default="fa-solid fa-book"
    )

    order = models.PositiveIntegerField(
        default=0
    )

    class Meta:
        ordering = [
            "order",
            "name",
        ]

    def __str__(self):
        return self.name
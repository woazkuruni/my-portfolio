from django.shortcuts import render

from .models import (
    Project,
    Skill,
    Course,
)


def home(request):

    # =====================================================
    # PROJECTS
    # =====================================================

    projects = Project.objects.all()


    # =====================================================
    # SKILLS
    # =====================================================

    skills = Skill.objects.all()

    skill_categories = [
        "Programming",
        "Web Development",
        "AI / Machine Learning",
        "Database",
        "Tools & Technologies",
    ]


    # =====================================================
    # COURSES
    # =====================================================

    courses = Course.objects.all()


    # =====================================================
    # TEMPLATE CONTEXT
    # =====================================================

    context = {
        "projects": projects,
        "skills": skills,
        "skill_categories": skill_categories,
        "courses": courses,
    }


    return render(
        request,
        "portfolio/home.html",
        context
    )
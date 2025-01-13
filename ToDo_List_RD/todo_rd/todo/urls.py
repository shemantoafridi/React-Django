from django.urls import path
from . import views

# urlpatterns = [
#     path('tasks/', views.getTasks),
#     path('tasks/add/', views.addTask),
#     path('tasks/<int:pk>/update/', views.updateTask),
#     path('tasks/<int:pk>/delete/', views.deleteTask),
# ]



urlpatterns = [
    # path(' ', views.redirect_to_api, name='redirect_to_api'),  # Redirect /api/ to /api/tasks/
    path('', views.getTasks, name="getTasks"),  # Add a root endpoint for /api/
    path("tasks/", views.getTasks, name="getTasks"),  # List of tasks
    path("tasks/add/", views.addTask, name="addtask"),  # Add a new task
    path("tasks/<int:pk>/update/", views.updateTask, name="updatetask"),  # Update a task
    path("tasks/<int:pk>/delete/", views.deleteTask, name="deletetask"),  # Delete a task
    # path('', views.api_root, name='api-root'),  # Add a root endpoint for /api/
]

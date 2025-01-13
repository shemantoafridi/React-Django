from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer

def redirect_to_api(request):
    return redirect("tasks")

# @api_view(['GET'])
# def api_root(request):
#     return Response({
#         "message": "Welcome to the To-Do List API",
#         "endpoints": {
#             "Get Tasks": "/api/tasks/",
#             "Add Task": "/api/tasks/add/",
#             "Update Task": "/api/tasks/<int:pk>/update/",
#             "Delete Task": "/api/tasks/<int:pk>/delete/"
#         }
#     })

@api_view(['GET'])
def getTasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addTask(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def updateTask(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist:
        return Response({"error": "Task not found"}, status=404)

    data = request.data
    serializer = TaskSerializer(task, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def deleteTask(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response('Task deleted successfully!')

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from google import genai
import os
 
client = genai.Client(api_key=os.environ.get("GOOGLE_API_KEY"))

chat_history = []

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def chat_view(request):
    message = request.data.get("message")

    chat_history.append({
        "role": "You",
        "text": message
    })

    context = "\n".join(
        f"{msg['role']}: {msg['text']}"
        for msg in chat_history
    )

    response = client.models.generate_content(
        model='gemini-3.6-flash',
        contents=context,
    )

    chat_history.append({
        "role": "Bot",
        "text": response.text
    })

    return Response({
        "reply": response.text
    })
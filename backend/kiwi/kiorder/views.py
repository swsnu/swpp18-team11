from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from gtts import gTTS
from io import BytesIO
from base64 import b64encode


# Create your views here.


def hello_world(request):
    return HttpResponse("HELLO!")


def order_tts(request):
    try:
        number = int(request.GET['number'])
        text = f"{number}번 손님 음식 나왔습니다"
        gtts = gTTS(text, lang="ko")
    except (TypeError, ValueError):
        return HttpResponseBadRequest()
    io = BytesIO()
    gtts.write_to_fp(io)
    b64ed_mp3 = b64encode(io.getvalue()).decode()
    url = f"data:audio/mpeg;base64,{b64ed_mp3}"
    return JsonResponse({"url": url})


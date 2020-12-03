from django.contrib.auth import logout
from django.shortcuts import render, redirect

from HomePage.forms import SignUpForm
from HomePage.models import Link


def home(request):
    return render(request, 'index.html')


def sign_up(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('profile')
    else:
        form = SignUpForm()
    return render(request, 'sign_up.html', {'form': form})


def sign_out(request):
    logout(request)
    return redirect('home')


def unique_url_reversal(request, alias_url):
    user_alias = Link.objects.filter(alias=alias_url).first()
    if user_alias:
        user_alias.visitors += 1
        user_alias.is_active = True
        user_alias.save()
        return redirect(user_alias.url)

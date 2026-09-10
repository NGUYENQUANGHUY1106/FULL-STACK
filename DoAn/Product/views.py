from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

def send_welcome_email(user):
    subject  = 'Chào mừng bạn đén với website'
    from_email = settings.DEFAULT_FROM_EMAIL
    to = [user.email]

    text_content = f"Chào {user.username},cảm ơn bạn đã đăng kí"

    # render HTML

    html_content = render_to_string('emails/welcome')
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self) :
        return self.username
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    full_name= models.CharField(max_length=300)
    phone= models.CharField(max_length=100, default='none')
    adresse= models.CharField(max_length=500, default='ministère d`Agriculture')
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.full_name
    

def create_user_profile(sender, instance, created , **akwargs):
    if created:
        Profile.objects.create(user=instance)
def save_user_profile(sender, instance , **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile,sender=User)

class File(models.Model):
    user= models.ForeignKey(User, on_delete=models.CASCADE)
    file=models.FileField(upload_to='uploads/')
    name=models.CharField(max_length=250)
    description= models.TextField(blank=True)
    uploaded_at= models.DateTimeField(auto_now_add=True)
    share_key= models.CharField(max_length=20,blank=True, null= True, unique=True)

    def __str__(self):
        return self.name
    
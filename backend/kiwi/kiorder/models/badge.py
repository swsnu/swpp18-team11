from django.db import models

class Badge(models.Model):
    name = models.CharField(max_length=255)
    icon = models.ImageField(upload_to="images/thumbnail/", null=True)

    def __str__(self):
        return self.name
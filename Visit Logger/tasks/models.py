from django.db import models

class Task(models.Model):
    number = models.IntegerField(default=0)
    message = models.CharField(max_length=100, blank=True, default="")
    color = models.CharField(max_length=6, default="ffffff")
    geometry = models.IntegerField(default=0)
    deleted = models.BooleanField(default=False)

    def __str__(self):
        return f'#{self.number} : id={self.id} : {self.message} : {self.color} : {self.geometry} : {self.deleted}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if (self.deleted):
            self.message = ''
            self.color = 'ffffff'
            self.geometry = 0
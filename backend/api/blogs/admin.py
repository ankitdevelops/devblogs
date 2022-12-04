from django.contrib import admin
from api.blogs.models import Blog, Comment, Like, ReadingList

# Register your models here.
class BlogAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}


admin.site.register(Blog, BlogAdmin)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(ReadingList)

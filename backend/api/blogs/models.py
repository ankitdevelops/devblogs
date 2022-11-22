from django.db import models
from django.utils.text import slugify
from api.account.models import User

# Create your models here.


class Blog(models.Model):
    category_choices = (
        ("web_design", "WEB DESIGN"),
        ("html", "HTML"),
        ("freebies", "FREEBIES"),
        ("javascript", "JAVASCRIPT"),
        ("css", "CSS"),
        ("tutorials", "TUTORIALS"),
        ("others", "OTHERS"),
    )
    options = (
        ("draft", "DRAFT"),
        ("published", "PUBLISHED"),
    )
    title = models.CharField(max_length=500)
    slug = models.SlugField(max_length=500, unique=True)
    thumbnail = models.ImageField(upload_to="blog/thumbnail/%Y/%m/")
    content = models.TextField()
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="authorBlogs"
    )
    category = models.CharField(max_length=100, choices=category_choices)
    status = models.CharField(max_length=50, choices=options)
    is_featured = models.BooleanField(default=False)
    is_must_read = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    test = models.URLField(default="sd")

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Blog, self).save(*args, **kwargs)


class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} wrote a comment on post: {self.blog.title}"

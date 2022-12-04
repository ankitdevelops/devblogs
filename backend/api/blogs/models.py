from django.db import models
from django.utils.text import slugify

# from api.account.models import User
from django.conf import settings

# Create your models here.


class BlogQuerySet(models.QuerySet):
    def allBlogs(self):
        return self.all()

    def filtered(self):
        return self.filter(
            status="published",
            is_archived=False,
        )


class MyBlogManager(models.Manager):
    def get_queryset(self):
        return BlogQuerySet(self.model, using=self._db)

    def allBlogs(self):
        return self.get_queryset().allBlogs()

    def filtered(self):
        return self.get_queryset().filtered()


class Blog(models.Model):
    class Category(models.TextChoices):
        HTML = "html", "HTML"
        JAVASCRIPT = "javascript", "JavaScript"
        CSS = "css", "CSS"
        TUTORIALS = "tutorials", "Tutorials"
        DJANGO = "django", "Django"
        PYTHON = "python", "Python"
        OTHERS = "others", "Others"

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"

    title = models.CharField(max_length=500)
    slug = models.SlugField(max_length=500, unique=True)
    thumbnail = models.ImageField(upload_to="blog/thumbnail/%Y/%m/")
    content = models.TextField()
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="authorBlogs"
    )
    category = models.CharField(max_length=100, choices=Category.choices)
    status = models.CharField(
        max_length=50, choices=Status.choices, default=Status.DRAFT
    )
    is_featured = models.BooleanField(default=False)
    must_read = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Blog, self).save(*args, **kwargs)

    objects = MyBlogManager()


class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} wrote a comment on post: {self.blog.title}"


class Like(models.Model):
    post = models.ForeignKey(Blog, related_name="likes", on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="likes_user", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.user} liked {self.post}"


class ReadingList(models.Model):
    post = models.ForeignKey(
        Blog, on_delete=models.CASCADE, related_name="reading_list_post"
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="reading_list_user",
        on_delete=models.CASCADE,
    )

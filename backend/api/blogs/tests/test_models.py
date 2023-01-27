from django.test import TestCase
from api.account.models import User
from api.blogs.models import Blog
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse


class TestBlog(TestCase):
    image = open("test_img.png", "rb")

    def setUp(self) -> None:
        self.user = User.objects.create(
            name="Ankit",
            username="ankit",
            email="ankit@gmail.com",
            password="testing321",
        )
        self.blog = Blog.objects.create(
            title="An awesome title",
            content="this is content",
            category="html",
            status="published",
            thumbnail=SimpleUploadedFile(
                self.image.name, self.image.read(), content_type="image/png"
            ),
            author=self.user,
        )

    def test_blog_create(self):
        self.assertEqual(self.blog.title, "An awesome title")
        self.assertEqual(self.blog.author.email, self.user.email)
        self.assertEqual(self.blog.content, "this is content")
        self.assertEqual(self.blog.status, "published")
        self.assertEqual(self.blog.category, "html")
        self.assertEqual(self.blog.thumbnail.read(), open("test_img.png", "rb").read())
        self.assertEqual(self.blog.slug, "an-awesome-title")

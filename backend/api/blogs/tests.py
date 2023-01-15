from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.authtoken.models import Token
from .models import Blog
from api.account.models import User
import io
from PIL import Image


class BlogTests(APITestCase):
    image = open("test_img.png", "rb")
    client = APIClient()

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

    def generate_photo_file(self):
        file = io.BytesIO()
        image = Image.new("RGBA", size=(100, 100), color=(155, 0, 0))
        image.save(file, "png")
        file.name = "test.png"
        file.seek(0)
        return file

    def test_blog_content(self):
        self.assertEqual(self.blog.title, "An awesome title")
        self.assertEqual(self.blog.author.email, self.user.email)
        self.assertEqual(self.blog.content, "this is content")
        self.assertEqual(self.blog.status, "published")
        self.assertEqual(self.blog.category, "html")
        self.assertEqual(self.blog.thumbnail.read(), open("test_img.png", "rb").read())
        self.assertEqual(self.blog.slug, "an-awesome-title")

    def test_blog_list_view(self):
        response = self.client.get(reverse("blog-home"))
        blog_count = Blog.objects.count()
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "An awesome title")
        self.assertEqual(len(response.data), blog_count)

    def test_blog_create_view(self):

        data = {
            "title": "An awesome title2",
            "content": "this is content2",
            "category": "css",
            "status": "published",
            "thumbnail": self.generate_photo_file(),
            # "author": self.client.login(email="ankit@gmail.com", password="testing321"),
        }

        response = self.client.post("blog-home", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response)

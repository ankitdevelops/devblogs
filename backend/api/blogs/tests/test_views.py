from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from django.urls import reverse

from api.blogs.models import Blog
from api.account.models import User
from rest_framework_simplejwt.tokens import AccessToken

# function to generate photo file
# imports
import io
from PIL import Image


def generate_photo_file():
    file = io.BytesIO()
    image = Image.new("RGBA", size=(100, 100), color=(155, 0, 0))
    image.save(file, "png")
    file.name = "test.png"
    file.seek(0)
    return file


class BlogViewTest(APITestCase):
    client = APIClient()

    def setUp(self) -> None:
        self.user = User.objects.create_user(
            name="Ankit",
            username="ankit",
            email="ankit@gmail.com",
            password="testing321",
        )

        token = AccessToken.for_user(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_blog_create(self):
        blog_content = {
            "title": "An awesome title2",
            "content": "this is content2",
            "category": "css",
            "status": "published",
            "thumbnail": generate_photo_file(),
        }

        response = self.client.post(
            reverse("blog-home"),
            blog_content,
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_blog_list_view(self):
        response = self.client.get(reverse("blog-home"))
        blog_count = Blog.objects.count()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertContains(response.data, "An awesome title")
        self.assertEqual(len(response.data), blog_count)

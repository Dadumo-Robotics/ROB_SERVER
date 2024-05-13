from django.test import TestCase

# Create your tests here.

from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from .models import *
from .serializers import *

class UserViewsTestCase(APITestCase):
    def test_create_user(self):
        data = {'username': 'testuser', 'email': 'test@example.com', 'password': 'testpassword'}
        response = self.client.post('/users/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='testuser').exists())

    def test_delete_user(self):
        user = User.objects.create_user(username='testuser', email='test@example.com', password='testpassword')
        response = self.client.delete(f'/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(User.objects.filter(username='testuser').exists())

class RobotViewsTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpassword')
        self.client.force_authenticate(user=self.user)

    def test_create_robot(self):
        data = {'name': 'Test Robot', 'description': 'A test robot'}
        response = self.client.post('/robots/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Robot.objects.filter(name='Test Robot', owner=self.user).exists())

    def test_delete_robot(self):
        robot = Robot.objects.create(name='Test Robot', description='A test robot', owner=self.user)
        response = self.client.delete(f'/robots/{robot.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Robot.objects.filter(name='Test Robot').exists())


class RobotModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpassword')

    def test_create_robot(self):
        robot = Robot.objects.create(name='Test Robot', state=True, owner=self.user)
        self.assertEqual(robot.name, 'Test Robot')
        self.assertEqual(robot.state, True)
        self.assertEqual(robot.owner, self.user)

    def test_str_representation(self):
        robot = Robot.objects.create(name='Test Robot', state=True, owner=self.user)
        self.assertEqual(str(robot), 'Test Robot (ID: {})'.format(robot.id))

    def test_missing_name(self):
        with self.assertRaises(ValueError):
            Robot.objects.create(state=True, owner=self.user)

    def test_missing_owner(self):
        with self.assertRaises(ValueError):
            Robot.objects.create(name='Test Robot', state=True)

    def test_default_state(self):
        robot = Robot.objects.create(name='Test Robot', owner=self.user)
        self.assertEqual(robot.state, False)

class UserSerializerTestCase(TestCase):
    def test_valid_user_serialization(self):
        user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpassword',
            'first_name': 'Test',
            'last_name': 'User',
        }
        serializer = UserSerializer(data=user_data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')

class EmailSerializerTestCase(TestCase):
    def test_valid_email_serialization(self):
        email_data = {'email': 'test@example.com'}
        serializer = EmailSerializer(data=email_data)
        self.assertTrue(serializer.is_valid())

class RobotSerializerTestCase(TestCase):
    def test_valid_robot_serialization(self):
        user = User.objects.create(username='testuser', email='test@example.com', password='testpassword')
        robot_data = {'name': 'Test Robot', 'state': True, 'owner': user}
        serializer = RobotSerializer(data=robot_data)
        self.assertTrue(serializer.is_valid())


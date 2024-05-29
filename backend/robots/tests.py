from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Robot
from users.models import CustomUser
from django.test import TestCase

# Create your tests here.

class RobotTests(APITestCase):
    def setUp(self):
        # Crear un usuario de prueba
        self.user = CustomUser.objects.create_user(
            email='testuser@example.com',
            password='testpassword',
            first_name='Test',
            last_name='User',
            role='user'
        )

        # Crear un robot de prueba asociado al usuario
        self.robot = Robot.objects.create(
            name='Test Robot',
            state=True,
            owner=self.user
        )

    def test_list_robots(self):
        url = reverse('robot-list')
        # Autenticar el usuario
        self.client.force_authenticate(user=self.user)
        # Realizar solicitud GET para obtener la lista de robots
        response = self.client.get(url)
        # Verificar que la solicitud fue exitosa (código de estado 200)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verificar que el robot creado está en la lista
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Robot')

    def test_retrieve_robot(self):
        url = reverse('retrieve-robot', kwargs={'pk': self.robot.pk})
        # Autenticar el usuario
        self.client.force_authenticate(user=self.user)
        # Realizar solicitud GET para obtener los detalles del robot
        response = self.client.get(url)
        # Verificar que la solicitud fue exitosa (código de estado 200)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verificar que los detalles del robot son correctos
        self.assertEqual(response.data['name'], 'Test Robot')
        self.assertEqual(response.data['state'], True)
        self.assertEqual(response.data['owner'], self.user.id)

    def test_create_robot(self):
        url = reverse('robot-list')
        # Autenticar el usuario
        self.client.force_authenticate(user=self.user)
        # Datos para crear un nuevo robot
        data = {'name': 'New Robot', 'state': False}
        # Realizar solicitud POST para crear un nuevo robot
        response = self.client.post(url, data)
        # Verificar que la solicitud fue exitosa (código de estado 201)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Verificar que el robot se creó correctamente
        self.assertEqual(Robot.objects.count(), 2)
        self.assertEqual(Robot.objects.last().name, 'New Robot')
        self.assertEqual(Robot.objects.last().state, False)
        self.assertEqual(Robot.objects.last().owner, self.user)

    def test_update_robot(self):
        url = reverse('update-robot', kwargs={'pk': self.robot.pk})
        # Autenticar el usuario
        self.client.force_authenticate(user=self.user)
        # Datos para actualizar el robot
        data = {'name': 'Updated Robot', 'state': False}
        # Realizar solicitud PUT para actualizar el robot
        response = self.client.put(url, data)
        # Verificar que la solicitud fue exitosa (código de estado 200)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verificar que el robot se actualizó correctamente
        self.assertEqual(Robot.objects.last().name, 'Updated Robot')
        self.assertEqual(Robot.objects.last().state, False)

    def test_delete_robot(self):
        url = reverse('delete-robot', kwargs={'pk': self.robot.pk})
        # Autenticar el usuario
        self.client.force_authenticate(user=self.user)
        # Realizar solicitud DELETE para eliminar el robot
        response = self.client.delete(url)
        # Verificar que la solicitud fue exitosa (código de estado 204)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # Verificar que el robot se eliminó correctamente
        self.assertEqual(Robot.objects.count(), 0)

import time
from locust import HttpUser, task, between

class startContact(HttpUser):
    wait_time = between(1, 5)
    @task
    def get_contact(self):
        self.client.get("/health")
        self.client.get("/contacts")
    
    @task(3)
    def view_items(self):
        for contact_id in range(10):
            self.client.get(f"/contacts/{contact_id}", name="/contacts")
            time.sleep(1)
    
    def on_start(self):
        self.client.post("/contacts", json={"contact_id":0,"firstname":"Adas","lastname":"Bryan","email":"Adas.Bryan@contact.com","phone":"62856555378"})

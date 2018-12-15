from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.login()
        response = self.client.get('/kiorder/api/v1/franchise', params={"keyword": ""})
        print(response.content)
        franchise_id = response.json()["data"][0]["id"]
        response = self.client.get(
            f"/kiorder/api/v1/franchise/{franchise_id}/store",
            params={"lat": 0, "lng": 0, "radius_in_km": 2400000}
        )
        print(response.content)
        store_id = response.json()["data"][0]["id"]
        self.client.post(
            "/kiorder/api/v1/user/current_store",
            {"store_id": store_id}
        )

    def on_stop(self):
        """ on_stop is called when the TaskSet is stopping """
        self.logout()

    def login(self):
        self.client.post("/kiorder/api/v1/user/sign_in", {"username":"user1", "password":"user1"})

    def logout(self):
        self.client.get("/kiorder/api/v1/user/sign_out")

    def fetch_purchsables(self):
        resp = self.client.get('/kiorder/api/v1/purchasable')

    @task(1)
    def profile(self):
        self.fetch_purchsables()


class WebsiteUser(HttpLocust):
    task_set = UserBehavior


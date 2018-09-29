
class Abort(Exception):
    def __init__(self, code, message, status_code):
        super().__init__()
        self.status_code = status_code 
        self.code = code
        self.message = message


from Types.User import User

class UsersCalls:
    def __init__(self):
        dummy_users = [
            User(id="1",
                 firstname="Alice",
                 lastname="Weidel",
                 email="alice@weidel.de",
                 telephone="110",
                 password_hash="13A",
                 address_id=2),
            User(id="2",
                 firstname="Bob",
                 lastname="Shakespeare",
                 email="jeevacation@gmail.com",
                 telephone="911",
                 password_hash="13B",
                 address_id=1)
        ]
        self.Users = dummy_users

    def GetAllUsers(self) -> list[User]:
        return self.Users
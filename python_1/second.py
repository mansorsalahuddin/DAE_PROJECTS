user_database = {
    "user1": "password1",
    "user2": "password2",
}

def welcome():
    print("Welcome to the App! Please log in to continue.")

def log_in():
    while True:
        username = input("Enter your username: ")
        password = input("Enter your password: ")

        if username in user_database and user_database[username] == password:
            print("Login successful! Proceeding to the main menu...")
            main_menu()
            break  # Exit the loop on successful login
        else:
            print("Invalid credentials. Please try again.")

def main_menu():
    print("Main Menu")
    print("1. Option 1")
    print("2. Option 2")
    print("3. Log Out")

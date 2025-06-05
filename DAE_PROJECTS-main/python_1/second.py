# User database with sample users
user_database = {
    "user1": "password1",
    "user2": "password2",
}

# Define tasks list
tasks = []

class Task:
    def __init__(self, title, description, due_date):
        self.title = title
        self.description = description
        self.due_date = due_date
        self.is_complete = False  # Add completion status

    def mark_done(self):
        self.is_complete = True

# Welcome screen
def welcome():
    print("Welcome to the App! Please log in to continue.")

# Register a new user
def register():
    print("\nRegister a New Account")
    username = input("Choose a username: ")
    password = input("Choose a password: ")
    
    if username in user_database:
        print("Username already exists. Please log in instead.")
        log_in()
    else:
        user_database[username] = password
        print("Account created successfully! You can now log in.")
        log_in()

# Log in with option to register
def log_in():
    while True:
        choice = input("Enter 'login' to log in or 'register' to create a new account: ").lower()
        
        if choice == "login":
            username = input("Enter your username: ")
            password = input("Enter your password: ")

            if username in user_database and user_database[username] == password:
                print("Login successful! Proceeding to the main menu...")
                main_menu()
                break  # Exit the loop on successful login
            else:
                print("Invalid credentials. Please try again.")
        
        elif choice == "register":
            register()
            break
        else:
            print("Invalid option. Please enter 'login' or 'register'.")

# Main menu
def main_menu():
    while True:
        print("\nMain Menu")
        print("1. View Tasks")
        print("2. Add Task")
        print("3. Edit Task")
        print("4. Mark as Done")
        print("5. Delete Task")
        print("6. Log Out")
        
        choice = input("Choose an option: ")
        
        if choice == "1":
            view_tasks()
        elif choice == "2":
            add_task()
        elif choice == "3":
            edit_task()
        elif choice == "4":
            mark_as_done()
        elif choice == "5":
            delete_task()
        elif choice == "6":
            log_out()
            break  # Exit to the login screen
        else:
            print("Invalid choice. Please try again.")

# View tasks
def view_tasks():
    print("\nYour Tasks:")
    if tasks:
        for todo, task in enumerate(tasks, start=1):
            status = "Complete" if task.is_complete else "Incomplete"
            print(f"{todo}. {task.title} - {task.description} (Due: {task.due_date}) - Status: {status}")
    else:
        print("No tasks available.")
    input("Press Enter to return to the main menu.")

# Add a task
def add_task():
    title = input("Enter task title: ")
    description = input("Enter task description: ")
    due_date = input("Enter task due date: ")
    
    new_task = Task(title, description, due_date)
    tasks.append(new_task)
    print("Task has been added successfully.")

# Edit a task
def edit_task():
    view_tasks()
    task_num = int(input("Enter the task number to edit: ")) - 1
    if 0 <= task_num < len(tasks):
        tasks[task_num].title = input("Enter new title: ")
        tasks[task_num].description = input("Enter new description: ")
        tasks[task_num].due_date = input("Enter new due date: ")
        print("Task has been updated successfully.")
    else:
        print("Task not found.")

# Mark a task as done
def mark_as_done():
    view_tasks()
    task_num = int(input("Enter the task number to mark as done: ")) - 1
    if 0 <= task_num < len(tasks):
        tasks[task_num].mark_done()
        print("Task marked as done.")
    else:
        print("Task not found.")

# Delete a task
def delete_task():
    view_tasks()
    task_num = int(input("Enter the task number to delete: ")) - 1
    if 0 <= task_num < len(tasks):
        del tasks[task_num]
        print("Task has been deleted successfully.")
    else:
        print("Task not found.")

# Log out
def log_out():
    print("Logging out... Returning to login screen.")
    log_in()

# Start the program
welcome()
log_in()

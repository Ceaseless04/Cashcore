from .models import User, Budget, Loan, Saving, Stock

retrieve_all_users = User.objects.all()


def retrieve_user_by_id(user_id):
    user_data = User.objects.get(userID=user_id)
    return{
        'user_name': user_data.username,
        'user_fullname': user_data.fullName,
        'user_email': user_data.email
    }

def delete_user_by_id(user_id):
    victim = User.objects.get(userID=user_id)
    victim.delete

def create_user(username, fullname, email, password, time, userID):
    user = User(
        userID = userID,
        username = username,
        fullName = fullname,
        email = email,
        password_hash = password,
        createdAt = time 
    )
    user.save()
    

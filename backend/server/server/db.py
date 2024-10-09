from supabase import create_client, Client

# Supabase credentials
supabase_url = "https://your-project-url.supabase.co"  # Replace with your actual URL
supabase_key = "your-anon-key"  # Replace with your actual API key

# Create the Supabase client
supabase: Client = create_client(supabase_url, supabase_key)

# Querying data from a table (example: 'users' table)
def fetch_users():
    response = supabase.table("users").select("*").execute()
    if response.status_code == 200:
        users = response.data
        print("Users fetched successfully:")
        for user in users:
            print(user)
    else:
        print(f"Error fetching users: {response.status_code} - {response.error_message}")

# Call the function to fetch users
fetch_users()

#yaohua branch

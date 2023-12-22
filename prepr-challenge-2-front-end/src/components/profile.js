
function Profile(){
    const user = JSON.parse(window.localStorage.getItem('user'));

    return (
        <>
        {
    user &&  (
                <div>
                <ul style={{ listStyle: 'none' }}>
                    <li >First Name: {user.first_name}</li>
                    <li>Last Name: {user.last_name}</li>
                    <li>Username: {user.user_name}</li>
                    <li>Email: {user.email}</li>
                    <li>User Type: {user.user_type}</li>
                    <li>Language: {user.lanuage}</li>
                </ul>
                </div>
            
                )
        }
        </>
    )
    
}

export default Profile;
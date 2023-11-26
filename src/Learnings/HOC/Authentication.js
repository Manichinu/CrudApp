
var Authenticated = true;

function UserAuthentication(Component) {
    return function () {
        if (!Authenticated) {
            return <p>User not Authenticated</p>
        }
        return <Component />
    }
}

export default UserAuthentication;
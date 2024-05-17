import { useUserStore } from "@stores/user/user.store";


const ProfileScreen = () => {
    const { id } = useUserStore();
    return (
        <div>
            <h1>Profile Screen</h1>
            <p>User ID: {id}</p>
        </div>
    )
}

export default ProfileScreen;

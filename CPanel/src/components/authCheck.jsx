import axios from './axioscreds'

export async function AuthCheck() {
    try {
        const response = await axios.get(`/auth/check`);
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default AuthCheck;
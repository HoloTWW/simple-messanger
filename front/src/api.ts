import { useAuth } from "./Auth/AuthContext";

// uri

const raw_uri = {
    check_auth:'/api/check-auth',
    login:'/api/login',
    logout:'/api/logout',
}

const host = "http://127.0.0.1:5000";

export const uri_dict = Object.fromEntries(
  Object.entries(raw_uri).map(([key, value]) => [key, `${host}${value}`])
);


export const useApi = () => {
    const { logout } = useAuth();

    const fetchData = async <T>(url: string): Promise<T | null> => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                return await response.json() as T;
            } else {
                if (response.status === 401 || response.status === 403) {
                    console.error('Ошибка авторизации');
                    logout();
                    return null;
                } else {
                    console.error('Ошибка запроса:', response.status, response.statusText);
                    return null;
                }
            }
        } catch (error) {
            console.error('Ошибка при запросе:', error);
            return null;
        }
    };

    return { fetchData };
};
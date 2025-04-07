import React, { createContext, useState, useContext, useEffect } from 'react';
import { uri_dict } from '../../components/api';

export interface User {
    id: number;
    username: string;
    // Добавьте другие поля пользователя
  }
  
export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          const response = await fetch(uri_dict.check_auth, {
            credentials: 'include',
          });
  
          if (response.ok) {
            const data = await response.json() as { user: User };
            setUser(data.user);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Ошибка при проверке аутентификации:', error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
  
      checkAuthStatus();
    }, []);
  
    const login = async (username: string, password: string): Promise<boolean> => {
      try {
        const response = await fetch(uri_dict.login, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
          credentials: 'include',
        });
  
        const data = await response.json() as { user: User, message?: string, error?: string };
  
        if (response.ok) {
          setUser(data.user);
          return true;
        } else {
          console.error('Ошибка авторизации:', data.message || data.error);
          return false;
        }
      } catch (error) {
        console.error('Ошибка при запросе:', error);
        return false;
      }
    };
  
    const logout = async (): Promise<boolean> => {
      try {
        const response = await fetch(uri_dict.logout, {
          method: 'POST',
          credentials: 'include',
        });
  
        if (response.ok) {
          setUser(null);
          return true;
        } else {
        //   console.error('Ошибка при выходе из системы:', response.message || response.error);
        console.error('Ошибка при выходе из системы:');
          return false;
        }
      } catch (error) {
        console.error('Ошибка при запросе:', error);
        return false;
      }
    };
  
    const value: AuthContextType = {
      user,
      loading,
      login,
      logout,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
};
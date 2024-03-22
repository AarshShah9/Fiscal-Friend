import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { URL } from '../utils/constants';

interface AuthContextType {
  isAuthenticated: boolean;
  login: SubmitHandler<LoginData>;
  signup: SubmitHandler<SignupData>;
  logout: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user?: User;
}

export type LoginData = {
  email: string;
  password: string;
};

export type SignupData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  photo?: string;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .post(`${URL}/auth/me`)
      .then((res) => {
        if (res.status === 201) {
          setIsAuthenticated(true);
          setIsLoading(false);
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [isLoading, location.pathname]);

  const login = useCallback((data: LoginData) => {
    axios
      .post(`${URL}/auth/login`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setIsAuthenticated(true);
        setIsLoading(false);
        navigate('/dashboard/');
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const signup = useCallback((data: SignupData) => {
    axios
      .post(`${URL}/auth/register`, {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      })
      .then((res) => {
        setIsAuthenticated(true);
        setIsLoading(false);
        navigate('/dashboard/');
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const logout = useCallback(() => {
    axios
      .post(`${URL}/auth/logout`)
      .then((res) => {
        setIsAuthenticated(false);
        setIsLoading(false);
        setUser(undefined);
        navigate('/');
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        signup,
        logout,
        isLoading,
        user,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;

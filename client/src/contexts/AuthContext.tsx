import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';

interface AuthContextType {
  isAuthenticated: boolean;
  login: SubmitHandler<LoginData>;
  signup: SubmitHandler<SignupData>;
  logout: () => void;
  isLoading: boolean;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post('http://localhost:4000/auth/me')
      .then((res) => {
        if (res.status === 201) {
          setIsAuthenticated(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const login = useCallback((data: LoginData) => {
    axios
      .post('http://localhost:4000/auth/login', {
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
      .post('http://localhost:4000/auth/register', {
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

  const logout = () => {
    // const logout = useCallback(() => {
    //   axios
    //     .post('http://localhost:4000/auth/logout')
    //     .then((res) => {
    //       setIsAuthenticated(false);
    //       setIsLoading(false);
    //       navigate('/login');
    //     })
    //     .catch((err) => {
    //       setIsLoading(false);
    //     });
    // }, []);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;

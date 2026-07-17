import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, subscriptionService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    const token = localStorage.getItem('token');
    if (token && currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    const data = await authService.login(email, password);
    const currentUser = {
      username: data.username,
      email: data.email,
      subscriptionStatus: data.subscribed || data.subscriptionStatus || false,
      role: data.role,
      isApproved: data.isApproved,
    };
    setUser(currentUser);
    setIsAuthenticated(true);
    return currentUser;
  };

  const logoutUser = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshUser = () => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  };

  const subscribe = async (days) => {
    if (!user) return;
    const response = await subscriptionService.subscribeUser(days, user.email);
    // Refresh user state
    refreshUser();
    return response;
  };

  const cancelSubscription = async () => {
    if (!user) return;
    const response = await subscriptionService.cancelSubscription(user.email);
    // Refresh user state
    refreshUser();
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        loginUser,
        logoutUser,
        refreshUser,
        subscribe,
        cancelSubscription,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

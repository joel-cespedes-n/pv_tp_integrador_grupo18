import { createContext, useState, useEffect } from "react";
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }
    }, []);
    useEffect(() => {
        if (admin){
            localStorage.setItem("admin", JSON.stringify(admin));
        } else {
            localStorage.removeItem("admin");
        }
    }, [admin]);

    const loginAdmin = (nombre, sector) => {
        setAdmin({ nombre, sector});
    };

    const logoutAdmin = () => {
    setAdmin(null);
  localStorage.removeItem("admin");
};

    return(
        <AdminContext.Provider value={{ admin, loginAdmin, logoutAdmin}}>
            {children}
        </AdminContext.Provider>
    );
};
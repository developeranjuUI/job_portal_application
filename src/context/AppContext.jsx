import { createContext, useState, useEffect } from "react";
import { jobsData } from "../assets/assets";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [searchFilter, setSearchFilter] = useState({
        title:'',
        location:'',
    })

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const value = {
        setSearchFilter,searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs, showRecruiterLogin, setShowRecruiterLogin
    }

    // function to fetch data
    const fetchJobs = async () => {
        setJobs(jobsData);
    }
    useEffect(() => {
        fetchJobs();
    },[]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}
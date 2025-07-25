import { createContext, useState, useEffect } from "react";
// import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [searchFilter, setSearchFilter] = useState({
        title:'',
        location:'',
    })

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const [companyToken, setCompanyToken] = useState(null);

    const [companyData, setCompanyData] = useState(null);
    

    const value = {
        setSearchFilter,searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs, showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken, companyData, setCompanyData,
        backendUrl
    }

    // function to fetch data
    const fetchJobs = async () => {
        try {
            
            const {data} = await axios.get(backendUrl+'/api/jobs')
            if(data.success){
                setJobs(data.jobs)
                console.log(data.jobs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // fumction to fetch the company data

    const fetchCompanyData = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/company/company', {headers:{token:companyToken}})
            if(data.success) {
                setCompanyData(data.company)
                console.log(data)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        fetchJobs();
        const storedCompanyToken = localStorage.getItem('companyToken');

        if(storedCompanyToken){
            setCompanyToken(storedCompanyToken)
        }
    },[]);

    useEffect(() => {
        if(companyToken) {
            fetchCompanyData()
        }
    },[companyToken])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}
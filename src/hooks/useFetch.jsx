import { useEffect, useState } from "react";

const useFetch = (url, method = "GET") => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [options, setOptions] = useState(null);

    const addNewData = (recipe) => {
        console.log(recipe);
        setOptions({
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe),
        });
    }; 


    useEffect(() => {
        const fetchData = async (fetchConfig) => {
            setIsPending(true);
            try {
                const req = await fetch(url, { ...fetchConfig });
                if (!req.ok) {
                    throw new Error(req.statusText);
                }
                const data = await req.json();
                setData(data);
                setError(null);
                setIsPending(false);
            } catch (err) {
                setError(err.message);
                setIsPending(false);
            }
        };
        if (method === "GET") {
            fetchData();
        }
        if (method === "POST" && options) {
            fetchData(options);
        }
    }, [url, method, options]);
    return { data, error, isPending, addNewData };
};
export default useFetch;
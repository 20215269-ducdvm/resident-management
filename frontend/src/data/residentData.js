import axios from 'axios';

export const getResidents = async () => {
    try {
        const response = await axios.get("http://localhost:5100/api/Resident", {            
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

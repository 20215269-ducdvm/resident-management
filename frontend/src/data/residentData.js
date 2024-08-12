export const getResidents = async () => {
    try {
        const response = await fetch("http://localhost:5100/api/Resident", {            
            headers: {
                "Content-Type": "application/json"
            }
        });
        const residents = await response.json();
        return residents;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};
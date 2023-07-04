const formatDate = (dateString) => {
    const date = new Date(Date.parse(dateString));
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

// Format the time as "HH:mm" (e.g., 13:25)
const formatTime = (dateString) => {
    const date = new Date(Date.parse(dateString));
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

module.exports = { formatDate, formatTime };

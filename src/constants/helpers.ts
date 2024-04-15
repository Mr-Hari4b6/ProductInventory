const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const monthName = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const suffix = getDaySuffix(day);

    return `${day}${suffix}`;
};

const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
};

export default { formatDate, getDaySuffix }
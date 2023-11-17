import { parseISO, formatDistanceToNow } from "date-fns";

const TimeCalculation = ({ time }) => {
    var timeAgo = '';
    const date = parseISO(time);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;

    return <span>{timeAgo}</span>

}
export default TimeCalculation;
"use client";
import useCountDown from "@/app/hooks/useCountDown";

const CountDown = ({ currDate, date }: { currDate: Date; date: Date }) => {
    const endDate = new Date(date);
    const now = currDate;

    const countdown = useCountDown({ currentTime: now.getTime(), endTime: endDate.getTime() });

    return (
        <div className="countdown-timer">
            <div className="countdown-item">
                <div className="countdown-number">{countdown.hours.toString().padStart(2, "0")}</div>
                <div className="countdown-text">Hours</div>
            </div>
            <div className="countdown-item">
                <div className="countdown-number">{countdown.minutes.toString().padStart(2, "0")}</div>
                <div className="countdown-text">Minutes</div>
            </div>
            <div className="countdown-item">
                <div className="countdown-number">{countdown.seconds.toString().padStart(2, "0")}</div>
                <div className="countdown-text">Seconds</div>
            </div>
        </div>
    );
};

export default CountDown;

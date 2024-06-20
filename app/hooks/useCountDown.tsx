import { useEffect, useRef, useState } from "react";

const useCountDown = ({ currentTime, endTime }: { currentTime: number; endTime: number }) => {
    const timeDifference = useRef(endTime - currentTime < 0 ? 0 : endTime - currentTime);

    const [countdown, setCountdown] = useState({
        hours: Math.floor(timeDifference.current / (1000 * 60 * 60)),
        minutes: Math.floor((timeDifference.current % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDifference.current % (1000 * 60)) / 1000),
    });

    useEffect(() => {
        const interval = setInterval(() => {
            timeDifference.current = timeDifference.current - 1000;
            if (timeDifference.current > 0) {
                const hours = Math.floor(timeDifference.current / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference.current % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference.current % (1000 * 60)) / 1000);

                setCountdown({ hours, minutes, seconds });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return countdown;
};

export default useCountDown;

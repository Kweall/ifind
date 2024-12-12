import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../../widgets/Header";
import style from "./Holidays.module.css";
import { fetchHolidays, Holiday } from "./lib";
import image from '../../assets/holiday.svg';

interface HolidaysPageProps {
    type?: string;
}

const HolidaysPage: React.FC<HolidaysPageProps> = () => {
    const { type = "today" } = useParams();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const holidaysSection = useRef<HTMLDivElement>(null);
    const countriesSection = useRef<HTMLDivElement>(null);

    const loadHolidays = async () => {
        const dateKey = selectedDate.toISOString().split('T')[0]; 

        const cachedHolidays = localStorage.getItem(dateKey);
        if (cachedHolidays) {
            setHolidays(JSON.parse(cachedHolidays));
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth() + 1;
            const day = selectedDate.getDate();
            const data = await fetchHolidays(year, month, day);
            localStorage.setItem(dateKey, JSON.stringify(data));
            setHolidays(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHolidays();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);

    const handleMonthChange = (offset: number) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + offset);
        newDate.setDate(1);
        setSelectedDate(newDate);
    };

    const getFormattedDate = (date: Date) =>
        `${date.toLocaleString("en-US", { month: "long" })} ${date.getDate()}`;

    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className={style.holidays}>
            <Header
                holidaysRef={holidaysSection}
                countriesRef={countriesSection}
            />
            <div className={style.container}>
                <h1 className={style.title}>
                    {type === 'today' ? selectedDate.toLocaleString("en-US", { month: "long" }) : capitalizeFirstLetter(type)} Holidays
                </h1>
                <div className={style.calendar}>
                    <button
                        className={style.navButton}
                        onClick={() => handleMonthChange(-1)}
                    >
                        {"<"}
                    </button>
                    <div className={style.dates}>
                        {Array.from(
                            { length: new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate() },
                            (_, i) => {
                                const date = new Date(
                                    selectedDate.getFullYear(),
                                    selectedDate.getMonth(),
                                    i + 1
                                );
                                return (
                                    <div
                                        key={i}
                                        className={`${style.date} ${
                                            date.toDateString() ===
                                            selectedDate.toDateString()
                                                ? style.selectedDate
                                                : ""
                                        }`}
                                        onClick={() => setSelectedDate(date)}
                                    >
                                        {i + 1}
                                    </div>
                                );
                            }
                        )}
                    </div>
                    <button
                        className={style.navButton}
                        onClick={() => handleMonthChange(1)}
                    >
                        {">"}
                    </button>
                </div>
                <h2 className={style.subtitle}>
                    {getFormattedDate(selectedDate)} Holidays
                </h2>
                {loading ? (
                    <div className={style.loadingSpinnerContainer}>
                        <div className={style.loadingSpinner}></div>
                    </div>
                ) : error ? (
                    <div className={style.error}>Error: {error}</div>
                ) : holidays.length > 0 ? (
                    <div className={style.holidayGrid}>
                        {holidays.map((holiday, index) => (
                            <div key={index} className={style.holidayCard}>
                                <img
                                    src={image}
                                    className={style.holidayImage}
                                />
                                <div className={style.holidayInfo}>
                                    <span className={style.holidayName}>
                                        {holiday.name}
                                    </span>
                                    <span className={style.holidayDescription}>
                                        {holiday.description || "No description available"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={style.noData}>
                        No holidays found for {getFormattedDate(selectedDate)}.
                    </div>
                )}
            </div>
        </div>
    );
};

export default HolidaysPage;
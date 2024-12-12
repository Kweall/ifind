import style from "./Header.module.css"
import { useNavigate, useLocation } from 'react-router-dom'
import { PageRoutes } from "../../pages/PageRoutes"
import { Logo } from "../../shared/ui/logo"

interface HeaderProps {
    holidaysRef: React.RefObject<HTMLDivElement>;
    countriesRef: React.RefObject<HTMLDivElement>;
}

const Header = ({ holidaysRef, countriesRef }: HeaderProps) => {
    const navigate = useNavigate()
    const location = useLocation();

    const isToday = location.pathname === PageRoutes.Today;
    const isHolidays = location.pathname.startsWith(PageRoutes.Holidays); 
    const isCountries = location.pathname.startsWith(PageRoutes.Countries);

    const handleNavigation = (route: string, sectionRef?: React.RefObject<HTMLDivElement>) => {
        if (window.location.pathname === PageRoutes.Home && sectionRef) {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate(route);
        }
    };

    return (
        <div className={style.container}>
            <div onClick={() => navigate(PageRoutes.Home)} style={{ cursor: 'pointer' }}>
                <Logo />
            </div>
            <div className={style.navigation}>
                <span className={isToday ? style.button_on : style.button_off} onClick={() => handleNavigation(PageRoutes.Today)}>
                    TODAY
                </span>
                <span className={isHolidays ? style.button_on : style.button_off} onClick={() => handleNavigation(PageRoutes.Home, holidaysRef)}>
                    HOLIDAYS
                </span>
                <span className={isCountries ? style.button_on : style.button_off} onClick={() => handleNavigation(PageRoutes.Home, countriesRef)}>
                    COUNTRIES
                </span>
            </div>
        </div>
    )
}

export default Header
import Header from "../../widgets/Header"
import style from "./Home.module.css"
import calendar from '../../assets/calendar.svg'
import { useNavigate } from "react-router-dom"
import { PageRoutes } from "../PageRoutes"
import { categories } from "../../shared/data/holidays"
import { Logo } from "../../assets/Logo"
import { useRef } from "react"

const HomePage = () => {
    const navigate = useNavigate()

    const holidaysSection = useRef<HTMLDivElement>(null);
    const countriesSection = useRef<HTMLDivElement>(null);
    
    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const country = event.target.value;
        if (country === 'USA'){
            navigate(`${PageRoutes.Countries}/${country}`);
        } else {
            navigate(`${PageRoutes.Countries}/${country.toLowerCase()}`);
        }
    }

    const handleCategoryClick = (categoryTitle: string) => {
        navigate(`${PageRoutes.Holidays}/${categoryTitle.toLowerCase()}`);
    };

    return (
        <div className={style.home}>
            <Header
                holidaysRef={holidaysSection}
                countriesRef={countriesSection}
            />
            <div className={style.container}>
                <div className={style.intro}>
                    <div className={style.left_side}>
                        <span className={style.main_text}>
                        Discover Today’s Global Celebrations and Events
                        </span>
                        <span className={style.text}>
                        Explore the wide variety of holidays, festivals, and special occasions happening today across the globe. 
                        From traditional cultural celebrations to global festivals, there's always something to celebrate. 
                        Join the world in marking these exciting moments and make today memorable, no matter where you are!
                        </span>
                        <button className={style.button} onClick={() => navigate(PageRoutes.Today)}>Explore Today’s Events</button>
                    </div>
                    <div className={style.right_side}>
                    <div className={style.box}>
                    <img src={calendar} width="400px" height="auto" />
                    </div>
                    </div>
                </div>
                <div className={style.cardsSection} ref={holidaysSection}>
                    <h2 className={style.sectionTitle}>Choose a Celebration Type</h2>
                    <div className={style.cards}>
                        {categories.map((category, index) => (
                        <div key={index} className={style.card} onClick={() => handleCategoryClick(category.title)}>
                            <div className={style.cardIcon}>{category.icon}</div>
                            <h3 className={style.cardTitle}>{category.title}</h3>
                            <p className={style.cardDescription}>{category.description}</p>
                        </div>
                        ))}
                    </div>
                </div>
                <div className={style.intro} ref={countriesSection} >
                <div className={style.left_side}>
                        <span className={style.main_text}>
                            Discover Events by Country
                        </span>
                        <span className={style.text}>
                            Explore holidays, festivals, and special occasions happening across different countries. 
                            Select a country from the dropdown to view the exciting events taking place there today. 
                            Make today unforgettable by exploring celebrations worldwide!
                        </span>
                        <select className={style.dropdown} onChange={handleCountryChange}>
                            <option value="">Select a Country</option>
                            <option value="USA">USA</option>
                            <option value="Indian">India</option>
                            <option value="Brazil">Brazil</option>
                            <option value="German">Germany</option>
                            <option value="Japanese">Japan</option>
                            <option value="Russian">Russia</option>
                        </select>
                    </div>
                    <div className={style.right_side}>
                        <Logo width={'500px'} height={'auto'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
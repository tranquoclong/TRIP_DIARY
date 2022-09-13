import React from 'react'
import SectionContainer from '../SectionContainer'
import Country from './Country'
import styles from './CountryList.module.css'

const CountryList = () => {
    return (
        <div>
            <SectionContainer>
                <div className={styles.wrapper}>
                    <div className={styles["title-container"]}>
                        <label className={styles["title-label"]}>The most popular countries</label>
                    </div>
                    <div className={styles["country-list"]}>
                        <div className={styles["country-list-inner"]}>
                            <Country img="https://wrld-wa-ec1-prod.b-cdn.net/accounts/54f6aa31246e3866392296af3e8a29c9/trips/2022-01-29/231168/72jgx4pyimrm-img_0879.jpeg?width=640&height=640" name="Austria" numOfTrips="3"/>
                            <Country img="https://wrld-wa-ec1-prod.b-cdn.net/accounts/54f6aa31246e3866392296af3e8a29c9/trips/2022-01-29/231168/72jgx4pyimrm-img_0879.jpeg?width=640&height=640" name="Austria" numOfTrips="2"/>
                            <Country img="https://wrld-wa-ec1-prod.b-cdn.net/accounts/54f6aa31246e3866392296af3e8a29c9/trips/2022-01-29/231168/72jgx4pyimrm-img_0879.jpeg?width=640&height=640" name="Austria" numOfTrips="1"/>
                            <Country img="https://wrld-wa-ec1-prod.b-cdn.net/accounts/54f6aa31246e3866392296af3e8a29c9/trips/2022-01-29/231168/72jgx4pyimrm-img_0879.jpeg?width=640&height=640" name="Austria" numOfTrips="1"/>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </div>
    )
}

export default CountryList
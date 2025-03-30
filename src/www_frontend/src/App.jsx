import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {www_backend as actor} from "../../declarations/www_backend";

export default function GeneratorApp() {
    const [activity, setActivity] = useState(null);
    const [place, setPlace] = useState(null);
    const [time, setTime] = useState(null);
    const [activities, setActivities] = useState([]);
    const [times, setTimes] = useState([]);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchImages() {
        const activities = await actor.getActivities();
        const places = await actor.getPlaces();
        const times = await actor.getTimes();
        setActivities(activities);
        setPlaces(places);
        setTimes(times);
    }


    async function initStartData() {
        let activities = [];
        activities.push(["tennis", "/tennis.jpg"]);
        activities.push(["climbing", "/climbing.webp"])
        activities.push(["football", "/football.jpg"])
        activities.push(["restaurant", "/restaurant.jpg"])
        activities.push(["picnic", "/family-picnic.webp"])
        await actor.deleteAll();
        for (let activity of activities) {
            await actor.addActivity(activity[0], activity[1]);
        }

        let places = []
        places.push(["Home city", "/home.webp"])
        places.push(["London", "/london.webp"])
        places.push(["Prague", "/prague.webp"])
        places.push(["Milano", "/milano.webp"])
        for (let place of places) {
            await actor.addPlace(place[0], place[1])
        }

        let times = [];
        times.push(["morning", "morning.jpg"])
        times.push(["day", "day.png"])
        times.push(["evening", "evening.jpg"])
        times.push(["night", "night.jpg"])
        for (let time of times) {
            await actor.addTime(time[0], time[1]);
        }
    }

    useEffect(() => {
        initStartData().then(() => {
            fetchImages().then(() => {
                setLoading(false)
            });
        });
    }, []);

    const getRandomItem = (arr) => {
        return arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;
    };

    const generateRandom = () => {
        const newActivity = getRandomItem(activities);
        const newPlace = getRandomItem(places);
        const newTime = getRandomItem(times);
        console.log(newActivity);
        console.log(newPlace);
        console.log(newTime);
        setActivity(newActivity);
        setPlace(newPlace);
        setTime(newTime);
    };

    if (loading) {
        return <h1> Loading ... </h1>
    }
    return (
        <div className="d-flex flex-column align-items-center gap-3 p-3">
            <h1>What Where When</h1>
            <Button onClick={generateRandom} variant="primary">
                Згенерувати
            </Button>
            <div className="d-flex flex-wrap justify-content-center gap-3">
                <Card style={{width: "18rem"}}>
                    <Card.Img variant="top" src={activity ? activity[1] : "unknown.png"}
                              alt={activity ? activity[0] : "activity"}/>
                    <Card.Body>
                        <Card.Title className="text-center">{activity ? activity[0] : "Activity"}</Card.Title>
                    </Card.Body>
                </Card>
                <Card style={{width: "18rem"}}>
                    <Card.Img variant="top" src={place ? place[1] : "unknown.png"} alt={place ? place[0] : "place"}/>
                    <Card.Body>
                        <Card.Title className="text-center">{place ? place[0] : "Place"}</Card.Title>
                    </Card.Body>
                </Card>
                <Card style={{width: "18rem"}}>
                    <Card.Img variant="top" src={time ? time[1] : "unknown.png"} alt={time ? time[0] : "time"}/>
                    <Card.Body>
                        <Card.Title className="text-center">{time ? time[0] : "Time"}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {www_backend as actor} from "../../declarations/www_backend";

export default function GeneratorApp() {
    const [activity, setActivity] = useState(null);
    const [place, setPlace] = useState(null);
    const [time, setTime] = useState(null);
    const [images, setImages] = useState({activities: [], places: [], times: []});
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(true);

    async function fetchImages() {
        const activities = await actor.getActivities();
        const blob = new Blob([new Uint8Array(activities[0][0][1])], { type: "image/jpg" })
        console.log(activities[0][0][1].length)
        console.log(new Uint8Array(activities[0][0][1]))
        const url = URL.createObjectURL(blob)
        setUrl(url);
        const places = await actor.getPlaces();
        const times = await actor.getTimes();
        setImages({activities, places, times});
    }

    const imageToBlob = async (imageUrl) => {
        let uint8Array;
        await fetch(imageUrl)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                uint8Array = new Uint8Array(buffer);
            })
            .catch(err => console.error("Error loading image:", err));
        return uint8Array;
    };

    async function initStartData() {
        let activities = [];
        activities.push("tennis", "/tennis.jpg");
        // activities.push("climbing", await fetchImageAsBlob("https://climbinghouse.com/wp-content/uploads/2023/06/woman_climbing_up_mountain-1.jpg"))
        // activities.push("football", await fetchImageAsBlob("https://bsmedia.business-standard.com/_media/bs/img/article/2024-07/13/full/1720844888-869.jpg"))
        // activities.push("restaurant", await fetchImageAsBlob("https://qul.imgix.net/b5dad46d-690e-4369-9ada-9cf86e6078c6/641947_sld.jpg"))
        // activities.push("picnic", await fetchImageAsBlob("https://activeforlife.com/content/uploads/2018/08/family-picnic.jpg"))
        for (let activity in activities) {
            const file = await imageToBlob(activity[1])
            console.log(file.length)
            await actor.addActivity(activity[0], file);
        }

        // let places = []
        // places.push("Home city", await fetchImageAsBlob("https://thedailyguardian.com/wp-content/uploads/2024/04/544f82520cfdcf50f1d9132f05db2e1a.jpg"))
        // places.push("Paris", await fetchImageAsBlob("https://img.static-af.com/transform/45cb9a13-b167-4842-8ea8-05d0cc7a4d04/"))
        // places.push("London", await fetchImageAsBlob("https://railtour.ch/itineraries/destination-tours/London%20-%20Mit%20gutem%20Gewissen-95474/1098/image-thumb__1098__img-text-teaser/London%20-%20das%20gr%C3%BCne%20London%20entdecken-199835.541f8de9.jpg"))
        // places.push("Prague", await fetchImageAsBlob("https://statemag.state.gov/wp-content/uploads/2023/10/1123pom-3-1.jpg"))
        // places.push("Milano", await fetchImageAsBlob("hhttps://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Milan_Cathedral_from_Piazza_del_Duomo.jpg/800px-Milan_Cathedral_from_Piazza_del_Duomo.jpg"))
        // for (let place in places) {
        //     if (place[1]) {
        //         const file = await imageToBlob(place[1])
        //         await actor.addPlace(place[0], file);
        //     }
        // }

        // let times = [];
        // times.push("morning", await fetchImageAsBlob("https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_799838_17368258050432446.jpg"))
        // times.push("day", await fetchImageAsBlob("https://images.photowall.com/products/44323/sunny-day.jpg?h=699&q=85"))
        // times.push("evening", await fetchImageAsBlob("https://images.pexels.com/photos/221421/pexels-photo-221421.jpeg?cs=srgb&dl=pexels-pixabay-221421.jpg&fm=jpg"))
        // times.push("night", await fetchImageAsBlob("https://static.scientificamerican.com/dam/m/57fc603972fdb/original/GettyImages-2166462891_WEB.jpg?m=1732209326.208"))
        // for (let time in times) {
        //     if (time[1]) {
        //         await actor.addTime(time[0], time[1]);
        //     }
        // }
    }

    useEffect(() => {
        console.log("use effect")
        initStartData().then(() => {
            fetchImages().then(() => {setLoading(false)});
        });
    }, []);

    const getRandomItem = (arr) => {
        return arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;
    };

    const generateRandom = () => {
        setActivity(getRandomItem(images.activities));
        setPlace(getRandomItem(images.places));
        setTime(getRandomItem(images.times));
    };
    if(loading){
        return <h1> Loading ... </h1>
    }
    return (
        <div className="d-flex flex-column align-items-center gap-3 p-3">
            <Button onClick={generateRandom} variant="primary">Згенерувати</Button>
            <Card.Img src={url} alt={"IMAGE"}/>
            {/*{activity && place && time && (*/}
            {/*    <div className="d-flex flex-wrap justify-content-center gap-3">*/}
            {/*        <Card style={{width: "18rem"}}>*/}
            {/*            <Card.Img variant="top" src={URL.createObjectURL(new Blob([activity[1]]))} alt={activity[0]}/>*/}
            {/*            <Card.Body>*/}
            {/*                <Card.Title className="text-center">{activity[0]}</Card.Title>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*        <Card style={{width: "18rem"}}>*/}
            {/*            <Card.Img variant="top" src={URL.createObjectURL(new Blob([place[1]]))} alt={place[0]}/>*/}
            {/*            <Card.Body>*/}
            {/*                <Card.Title className="text-center">{place[0]}</Card.Title>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*        <Card style={{width: "18rem"}}>*/}
            {/*            <Card.Img variant="top" src={URL.createObjectURL(new Blob([time[1]]))} alt={time[0]}/>*/}
            {/*            <Card.Body>*/}
            {/*                <Card.Title className="text-center">{time[0]}</Card.Title>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}

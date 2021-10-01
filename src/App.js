import React, { Component } from "react";
import "./App.css";
import "bootswatch/dist/journal/bootstrap.css";

import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";

const PLACES = [
    { name: "Симферополь", cityName: "Simferopol" },
    { name: "Севастополь", cityName: "Sevastopol" },
    { name: "Евпатория", cityName: "Yevpatoriya" },
    { name: "Керчь", cityName: "Kerch" },
    { name: "Бахчисарай", cityName: "Bakhchysarai" },
    { name: "Феодосия", cityName: "Feodosiya" },
    { name: "Ялта", cityName: "Yalta" },
    { name: "Алушта", cityName: "Alushta" },
];

class WeatherDisplay extends Component {
    constructor() {
        super();
        this.state = {
            weatherData: null,
        };
    }
    componentDidMount() {
        const cityName = this.props.cityName;
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric`;
        fetch(URL)
            .then((res) => res.json())
            .then((json) => {
                this.setState({ weatherData: json });
            });
    }
    render() {
        const weatherData = this.state.weatherData;
        if (!weatherData) return <div>Loading</div>;
        const weather = weatherData.weather[0];
        const iconUrl =
            "http://openweathermap.org/img/w/" + weather.icon + ".png";
        return (
            <div>
                <h3>
                    В городе {weatherData.name} {weather.description}
                    <img src={iconUrl} alt={weatherData.description} />
                </h3>
                <p>Температура: {weatherData.main.temp}°</p>
                <p>Самая высокая: {weatherData.main.temp_max}°</p>
                <p>Самая низкая: {weatherData.main.temp_min}°</p>
                <p>Ветер: {weatherData.wind.speed} м/с</p>
            </div>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            activePlace: 0,
        };
    }
    render() {
        const activePlace = this.state.activePlace;
        return (
            <div>
                <Navbar bg="light">
                    <Container>
                        <Navbar.Brand>Погода в Крыму</Navbar.Brand>
                    </Container>
                </Navbar>
                <br />
                <Container>
                    <Row>
                        <Col md={4} sm={4}>
                            <Nav
                                className="flex-column"
                                variant="pills"
                                activeKey={activePlace}
                                onSelect={(index) => {
                                    this.setState({ activePlace: index });
                                }}
                            >
                                {PLACES.map((place, index) => (
                                    <Nav.Item key={index}>
                                        <Nav.Link eventKey={index}>
                                            {place.name}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </Col>
                        <Col md={8} sm={8}>
                            <WeatherDisplay
                                key={activePlace}
                                cityName={PLACES[activePlace].cityName}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;

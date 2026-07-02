import React, { useEffect, useState } from 'react';
import './Bymodel.css';
import { Stack, Container, Card } from '@mui/material';
import { Link, useParams } from 'react-router-dom';


const Bymodel = () => {
    const { model } = useParams();
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);
    const [overviewSpec, setoverviewSpec] = useState([]);

console.log(overviewSpec,'cehck')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/carDeatils`);
                const data = await res.json();
                const allModels = data.cars.flatMap(car => car.models);
                const modelInfo = allModels.find(
                    modelDetails => modelDetails.name.toLowerCase() === model.toLowerCase()
                );
                const brandB = data.cars.find(car =>
                    car.models.some(m => m.name.toLowerCase() === model.toLowerCase())
                );
                // Update state with brand + modelInfo
                setoverviewSpec([
                    {
                        brand: brandB?.brand || "Unknown",
                        modelInfo: modelInfo || {}
                    }
                ]);
                console.log(modelInfo.description, "test")
            } catch (error) {
                console.error("Error fetching car details:", error);
            }
        };

        fetchData();
    }, [model]); // dependency array (model must be available)


    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch(`http://localhost:3000/images-by-model`);
                const data = await res.json();
                const modelImages = data.find(item => item.name === model);
                if (modelImages && modelImages.images) {
                    setImages(modelImages.images);
                } else {
                    console.warn("No images found for this model.");
                }
            } catch (err) {
                console.error("Error fetching images:", err);
            }
        };

        fetchImages();
    }, [model]);

    // Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [images]);

    const prevSlide = () => {
        setIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (images.length === 0) return <p>Loading...</p>;



    return (
        <div style={{ marginTop: '78px' }}>
            <section className='photo-grid search-back'>
                <Container className='model-container'>
                    <Card className='photo-back' style={{ padding: '1rem' }}>
                        <Stack className="btn-back-home">
                            <Link to="/" className="back-link">&larr; Back to Search</Link>
                        </Stack>
                        <div className="carousel-container">
                            <button onClick={prevSlide} className="nav-button">❮</button>
                            <img src={images[index]} alt={`Car ${index}`} className="carousel-image" />
                            <button onClick={nextSlide} className="nav-button">❯</button>
                        </div>
                    </Card>
                </Container>
            </section>
            <section className='overview-details-model'>
                <Container className='model-container'>
                    <Card className='photo-back' style={{ padding: '1rem' }}>
                        <h2 className='text-center'>Quick Overview & Technical Specs</h2>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <Stack className=''>
                                    <ul className='list-unstyled'>

                                        {

                                            overviewSpec.map((overview, index) => (
                                                <li className='d-flex flex-column gap-3' key={index}>
                                                    <div className="card shadow-hover" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: "10px" }}>
                                                        <strong><i className="bi bi-car-front me-2"></i>Brand:</strong>
                                                        <span>{overview.brand}</span>
                                                    </div>
                                                    <div className="card shadow-hover" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: "10px" }}>
                                                        <strong><i className="bi bi-ui-checks-grid me-2"></i>Model:</strong>
                                                        <span>{overview.modelInfo.name}</span>
                                                    </div>
                                                    <div className="card shadow-hover" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: "10px" }}>
                                                        <strong><i className="bi bi-calendar3 me-2"></i>Year:</strong>
                                                        <span>{overview.modelInfo.year}</span>
                                                    </div>
                                                    <div className="card shadow-hover" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: "10px" }}>
                                                        <strong><i className="bi bi-fuel-pump me-2"></i>Car Type:</strong>
                                                        <span>{overview.modelInfo.car_type}</span>
                                                    </div>
                                                </li>

                                            ))
                                        }
                                    </ul>
                                    {/* <ul style={{ listStyle: "none", padding: 0 }}>
  {overviewSpec.map((overview, index) => (
    <li key={index}>
      <div className="card shadow-hover" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: "10px" }}>
        <strong><i className="bi bi-car-front me-2"></i>Brand:</strong>
        <span>{overview.brand}</span>
      </div>

      <div className="card shadow-hover" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: "10px" }}>
        <strong><i className="bi bi-ui-checks-grid me-2"></i>Model:</strong>
        <span>{overview.name}</span>
      </div>

      <div className="card shadow-hover" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: "10px" }}>
        <strong><i className="bi bi-calendar3 me-2"></i>Year:</strong>
        <span>{overview.year}</span>
      </div>

      <div className="card shadow-hover" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: "10px" }}>
        <strong><i className="bi bi-fuel-pump me-2"></i>Car Type:</strong>
        <span>{overview.car_type}</span>
      </div>
    </li>
  ))}
</ul> */}

                                </Stack>
                            </div>
                            <div className='col-lg-6'>
                                <Stack className=''>
                                    <ul className='list-unstyled overview-one'>
                                        <div className='card shadow-hover'>
                                            <li >
                                                <strong><i className="bi bi-gear me-2"></i>Engine :</strong>
                                                <span> 2.0L Inline-4</span>
                                            </li>
                                        </div>
                                        <div className='card shadow-hover'>
                                            <li>
                                                <strong><i className="bi bi-gear me-2"></i>Transmission :</strong>
                                                <span> 6-speed Manual</span>
                                            </li>
                                        </div>
                                        <div className='card shadow-hover'>
                                            <li>
                                                <strong><i className="bi bi-fuel-pump me-2"></i>Fuel Type :</strong>
                                                <span> Gasoline</span>
                                            </li>
                                        </div>
                                        <div className='card shadow-hover'>
                                            <li>
                                                <strong><i className="bi bi-speedometer me-2"></i>Mileage :</strong>
                                                <span> 30 MPG</span>
                                            </li>
                                        </div>
                                        <div className='card shadow-hover'>
                                            <li>
                                                <strong><i className="bi bi-speedometer me-2"></i>Top Speed :</strong>
                                                <span> 120 mph</span>
                                            </li>
                                        </div>
                                    </ul>
                                </Stack>
                            </div>
                        </div>
                    </Card>
                </Container>

            </section>
            <section className='desc-high'>
                <Container className='model-container'>
                    <Card className='photo-back' style={{ padding: '1rem' }}>
                        <h2 className='text-center'>Description & Highlights</h2>
                        <Stack>
                            {
                                overviewSpec.map((desc,index) => (
                                    <p className='text-justify'>
                                        {desc.modelInfo.description}
                                    </p>
                                ))
                            }
                        </Stack>
                    </Card>
                </Container>
            </section>
            <section className='priceandfinance'>
                <Container className='model-container'>
                    <Card className='photo-back' style={{ padding: '1rem' }}>
                        <h2 className='text-center'>Price & Finance Options</h2>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <div className='card shadow-hover'>
                                    <Stack className='price'>
                                        <div className="label text-center">💰 MSRP</div>
                                        <div className="value text-center">$22,000</div>
                                    </Stack>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='card shadow-hover'>
                                    <Stack className='price'>
                                        <div className="label text-center">📉 Pre-book Discount</div>
                                        <div className="value text-center">5% Off</div>
                                    </Stack>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='card shadow-hover'>
                                    <Stack className='price'>
                                        <div className="label text-center">📆 EMI Starts At</div>
                                        <div className="value text-center">$350/mo</div>
                                    </Stack>
                                </div>

                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-lg-4 text-center'>
                                <button className="btn btn-primary">🚗 Book Now</button>
                            </div>
                            <div className='col-lg-4 text-center'>
                                <button className="btn btn-warning">📨 Request Quote</button>
                            </div>
                            <div className='col-lg-4 text-center'>
                                <button className="testdrive btn btn-success">🧪 Book Test Drive</button>
                            </div>
                        </div>
                    </Card>
                </Container>
            </section>
        </div>
    );
};

export default Bymodel;

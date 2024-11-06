// src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Estilos personalizados para Home

const Home = () => {
    return (
        <div className="home-container">
            <header className="hero-section">
                <h1>Bienvenido a MyFarmacia</h1>
                <p>Tu tienda de confianza para productos de salud y bienestar.</p>
                <Link to="/products" className="btn-primary">Explorar Productos</Link>
            </header>

            <section className="about-section">
                <h2>Sobre Nosotros</h2>
                <p>
                    En MyFarmacia, nos dedicamos a proporcionar productos de calidad que mejoran tu salud y bienestar. 
                    Ofrecemos una amplia gama de medicamentos, suplementos, y productos de cuidado personal para satisfacer todas tus necesidades.
                </p>
            </section>

            <section className="benefits-section">
                <h2>¿Por Qué Elegirnos?</h2>
                <div className="benefits">
                    <div className="benefit-item">
                        <h3>Envío Rápido</h3>
                        <p>Recibe tus productos en la puerta de tu casa en el menor tiempo posible.</p>
                    </div>
                    <div className="benefit-item">
                        <h3>Atención 24/7</h3>
                        <p>Nuestro equipo está disponible para ayudarte en cualquier momento.</p>
                    </div>
                    <div className="benefit-item">
                        <h3>Calidad Garantizada</h3>
                        <p>Trabajamos solo con los mejores proveedores y marcas del mercado.</p>
                    </div>
                </div>
            </section>

            <section className="featured-products-section">
                <h2>Productos Destacados</h2>
                <div className="featured-products">
                    {/* Puedes reemplazar esto con productos reales */}
                    <div className="product-card">
                        <h3>Producto A</h3>
                        <p>Descripción breve del producto.</p>
                        <Link to="/products" className="btn-secondary">Ver más</Link>
                    </div>
                    <div className="product-card">
                        <h3>Producto B</h3>
                        <p>Descripción breve del producto.</p>
                        <Link to="/products" className="btn-secondary">Ver más</Link>
                    </div>
                    <div className="product-card">
                        <h3>Producto C</h3>
                        <p>Descripción breve del producto.</p>
                        <Link to="/products" className="btn-secondary">Ver más</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

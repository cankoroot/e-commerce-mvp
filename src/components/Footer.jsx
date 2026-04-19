import React from 'react'

function Footer() {

    function handleAboutClick() {
        alert("Bu proje, React kullanılarak oluşturulmuş basit bir e-ticaret uygulamasıdır. Ürünler, kullanıcı arayüzü ve temel işlevsellik içermektedir. Proje, React'in bileşen tabanlı mimarisini ve temel özelliklerini öğrenmek isteyenler için tasarlanmıştır.");
    }

    return (
        <div>
            <div className='footer-container'>
                <p className='footer-text'>© 2025 <a className='footer-link' href="https://github.com/cankoroot" target="_blank" rel="noopener noreferrer">cankoroot</a> E-Ticaret. All rights reserved.</p>
                <p onClick={handleAboutClick} className='about'>Hakkımızda</p>
            </div>
        </div>
    )
}

export default Footer
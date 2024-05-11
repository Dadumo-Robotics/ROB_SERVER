import logo from '../mutimedia/logo.svg';
import '../styles/Pagina.css';
import VideoSection from './VideoSection'
import Footer from './Footer'
import Header from './Header'


function Pagina() {
  return (
    
    <div className='Pagina'>
        <Header/>
        <main className='main'>
          <VideoSection></VideoSection>
        </main>
        <Footer/>

    </div>
  );
}

export default Pagina;

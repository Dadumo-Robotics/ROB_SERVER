import logo from './logo.svg';
import './pagina.css';
import VideoSection from './video_section'
import Footer from './footer'
import Header from './header'


function Pagina() {
  return (
    
    <div className='Pagina'>
        <Header/>
        <main>
          <VideoSection></VideoSection>
        </main>
        <Footer/>

    </div>
  );
}

export default Pagina;

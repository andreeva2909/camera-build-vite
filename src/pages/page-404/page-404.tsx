import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AppRoute } from '../../constants';

function Page404(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <section className="catalog">
            <div className="container" style={{textAlign: 'center', marginTop: '100px'}}>
              <h1 className="title title--h2">404 page not found</h1>
              <Link className="btn" to={`${AppRoute.Main}?page=1`}>Вернуться на главную страницу</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Page404;

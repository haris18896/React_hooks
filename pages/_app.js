import "../public/static/site.css";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyApp({ Component, pageProps}) {
    return <Component {...pageProps} />;
}
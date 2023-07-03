import ReactDOM from 'react-dom/client'
import './index.css';
import { createRootElement } from './root';

ReactDOM.createRoot(document.getElementById('root')).render(
  createRootElement()
);
